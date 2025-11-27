import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/mock-auth"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    const { magazineId, magazineTitle, price } = await request.json()

    const userResult = await getCurrentUser()

    if (!userResult.success || !userResult.data) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const user = userResult.data

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      console.error("[v0] Stripe secret key not configured")
      return NextResponse.json({ error: "Payment system not configured" }, { status: 500 })
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-12-18.acacia",
    })

    // In production with Directus, check existing purchases from database

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ars",
            product_data: {
              name: magazineTitle,
              description: "Revista digital en formato PDF",
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/compra-exitosa?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/revistas/${magazineId}`,
      metadata: {
        userId: user.id,
        magazineId: magazineId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Checkout error:", error)
    return NextResponse.json({ error: "Error al crear la sesión de pago" }, { status: 500 })
  }
}
