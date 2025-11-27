"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface PurchaseButtonProps {
  magazineId: string
  magazineTitle: string
  price: number
}

export function PurchaseButton({ magazineId, magazineTitle, price }: PurchaseButtonProps) {
  const handlePurchase = () => {
    alert(
      "Versión Demo: Esta es una demostración. Para habilitar compras reales, conecta las integraciones de Supabase y Stripe.",
    )
  }

  return (
    <Button size="lg" className="w-full group" onClick={handlePurchase}>
      <ShoppingCart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
      Comprar ahora (Demo)
    </Button>
  )
}
