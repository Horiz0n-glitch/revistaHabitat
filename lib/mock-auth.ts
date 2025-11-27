// Mock authentication for v0 preview environment
// In production, replace this with actual Directus authentication

export interface MockUser {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: "admin" | "editor" | "user"
}

// Mock users for demo
const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "admin@habitat.com",
    full_name: "Admin User",
    avatar_url: "/placeholder.svg",
    role: "admin",
  },
  {
    id: "2",
    email: "editor@habitat.com",
    full_name: "Editor User",
    avatar_url: "/placeholder.svg",
    role: "editor",
  },
  {
    id: "3",
    email: "user@habitat.com",
    full_name: "Regular User",
    avatar_url: "/placeholder.svg",
    role: "user",
  },
]

// Simple in-memory session storage for demo
let currentUser: MockUser | null = null

export async function mockLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // For demo, accept any password for existing users
  const user = mockUsers.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: "Usuario no encontrado" }
  }

  currentUser = user

  // Store in localStorage for persistence across page reloads
  if (typeof window !== "undefined") {
    localStorage.setItem("mockUser", JSON.stringify(user))
  }

  return { success: true }
}

export async function mockRegister(
  email: string,
  password: string,
  fullName: string,
): Promise<{ success: boolean; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if user already exists
  if (mockUsers.find((u) => u.email === email)) {
    return { success: false, error: "El email ya está registrado" }
  }

  // Create new user
  const newUser: MockUser = {
    id: String(mockUsers.length + 1),
    email,
    full_name: fullName,
    role: "user",
  }

  mockUsers.push(newUser)
  currentUser = newUser

  // Store in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("mockUser", JSON.stringify(newUser))
  }

  return { success: true }
}

export async function mockLogout(): Promise<void> {
  currentUser = null
  if (typeof window !== "undefined") {
    localStorage.removeItem("mockUser")
  }
}

export async function mockGetCurrentUser(): Promise<MockUser | null> {
  // Try to get from memory first
  if (currentUser) {
    return currentUser
  }

  // Try to restore from localStorage
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockUser")
    if (stored) {
      currentUser = JSON.parse(stored)
      return currentUser
    }
  }

  return null
}

export async function mockUpdateProfile(updates: Partial<MockUser>): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!currentUser) {
    return { success: false, error: "No hay usuario autenticado" }
  }

  currentUser = { ...currentUser, ...updates }

  if (typeof window !== "undefined") {
    localStorage.setItem("mockUser", JSON.stringify(currentUser))
  }

  return { success: true }
}

export async function getCurrentUser(): Promise<{ success: boolean; data?: any; error?: string }> {
  const user = await mockGetCurrentUser()

  if (!user) {
    return { success: false, error: "No hay usuario autenticado" }
  }

  // Transform MockUser to match expected user structure
  return {
    success: true,
    data: {
      id: user.id,
      email: user.email,
      first_name: user.full_name.split(" ")[0],
      last_name: user.full_name.split(" ").slice(1).join(" "),
      avatar: user.avatar_url,
      role: user.role,
      date_created: new Date().toISOString(),
    },
  }
}
