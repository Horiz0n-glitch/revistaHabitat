"use server"

import { cookies } from "next/headers"
import { createDirectus, rest, authentication, login, logout, readMe, createUser, refresh } from "@directus/sdk"
import type { DirectusSchema } from "./types"

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || ""
const AUTH_COOKIE_NAME = "directus_session_token"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

interface AuthResult {
  success: boolean
  error?: string
}

interface UserResult {
  success: boolean
  data?: any
  error?: string
}

/**
 * Create a fresh Directus client for authentication
 */
function createAuthClient() {
  if (!DIRECTUS_URL) {
    throw new Error("DIRECTUS_URL not configured")
  }
  return createDirectus<DirectusSchema>(DIRECTUS_URL).with(rest()).with(authentication("json"))
}

/**
 * Login with email and password
 */
export async function directusLogin(email: string, password: string): Promise<AuthResult> {
  try {
    console.log("[Auth] Attempting login for:", email)
    const client = createAuthClient()

    // Authenticate with Directus
    const result = await client.login({ email, password })

    console.log("[Auth] Login successful, token received")

    if (!result?.access_token) {
      console.error("[Auth] No access token in response")
      return { success: false, error: "No se recibió token de autenticación" }
    }

    // Store the token in a cookie
    const cookieStore = await cookies()
    cookieStore.set(AUTH_COOKIE_NAME, result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    })

    return { success: true }
  } catch (error: any) {
    console.error("[Auth] Login error details:", {
      message: error?.message,
      errors: error?.errors,
      status: error?.response?.status,
      data: error?.response?.data,
    })

    // Handle specific Directus errors
    if (error?.errors?.[0]?.message) {
      return { success: false, error: error.errors[0].message }
    }

    if (error?.message) {
      return { success: false, error: error.message }
    }

    return { success: false, error: "Credenciales inválidas. Verifica tu email y contraseña." }
  }
}

/**
 * Register a new user via API route
 */
export async function directusRegister(email: string, password: string, fullName: string): Promise<AuthResult> {
  try {
    console.log("[Auth] Registering user via API:", email)

    // Build absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const apiUrl = `${baseUrl}/api/auth/register`

    console.log("[Auth] API URL:", apiUrl)

    // Call our API route instead of Directus directly
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        fullName,
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      return { success: false, error: data.error || "Error al crear la cuenta" }
    }

    console.log("[Auth] User registered successfully, logging in...")

    // Automatically log in after registration
    return await directusLogin(email, password)
  } catch (error: any) {
    console.error("[Auth] Registration error:", error)
    return { success: false, error: "Error al crear la cuenta. Por favor, intenta de nuevo." }
  }
}

/**
 * Logout the current user
 */
export async function directusLogout(): Promise<void> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (token) {
      const client = createAuthClient()
      client.setToken(token)
      await client.logout()
    }
  } catch (error) {
    console.error("[Auth] Logout error:", error)
  } finally {
    // Always clear the cookie
    const cookieStore = await cookies()
    cookieStore.delete(AUTH_COOKIE_NAME)
  }
}

/**
 * Get the current authenticated user
 */
export async function directusGetCurrentUser(): Promise<UserResult> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      return { success: false, error: "No hay sesión activa" }
    }

    const client = createAuthClient()
    client.setToken(token)

    // Get current user info
    const user = await client.request(
      readMe({
        fields: ["*"],
      })
    )

    if (!user) {
      return { success: false, error: "Usuario no encontrado" }
    }

    return {
      success: true,
      data: user,
    }
  } catch (error: any) {
    console.error("[Auth] Get current user error:", error)

    // If token is invalid, clear it
    const cookieStore = await cookies()
    cookieStore.delete(AUTH_COOKIE_NAME)

    return { success: false, error: "Sesión inválida o expirada" }
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const result = await directusGetCurrentUser()
  return result.success
}

/**
 * Refresh authentication token
 */
export async function directusRefreshToken(): Promise<AuthResult> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      return { success: false, error: "No hay sesión activa" }
    }

    const client = createAuthClient()
    client.setToken(token)

    const result = await client.refresh()

    if (!result?.access_token) {
      return { success: false, error: "No se pudo refrescar el token" }
    }

    // Update the cookie with new token
    cookieStore.set(AUTH_COOKIE_NAME, result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    })

    return { success: true }
  } catch (error: any) {
    console.error("[Auth] Refresh token error:", error)
    return { success: false, error: "Error al refrescar token" }
  }
}
