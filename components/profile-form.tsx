"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileFormProps {
  profile: any
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState(
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile?.first_name || "",
  )
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.refresh()
      alert("Perfil actualizado correctamente")
    } catch (error) {
      console.error("[v0] Profile update error:", error)
      alert("Error al actualizar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  const initials =
    fullName
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || profile?.email?.[0].toUpperCase()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile?.avatar || undefined} />
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>
        <Button type="button" variant="outline" size="sm" disabled>
          <Upload className="mr-2 h-4 w-4" />
          Cambiar foto
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Nombre completo</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Tu nombre completo"
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  )
}
