"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { directusLogout } from "@/lib/directus/auth"
import { useState } from "react"

export function LogoutButton() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await directusLogout()
            router.push("/")
            router.refresh()
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleLogout}
            disabled={isLoading}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
        </Button>
    )
}
