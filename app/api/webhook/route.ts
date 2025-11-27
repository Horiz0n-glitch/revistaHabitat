import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!stripeSecretKey || !webhookSecret) {
      console.error("[v0] Stripe configuration missing")
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-12-18.acacia",
    })

    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("[v0] Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      const userId = session.metadata?.userId
      const magazineId = session.metadata?.magazineId

      if (!userId || !magazineId) {
        console.error("[v0] Missing metadata in session:", session.id)
        return NextResponse.json({ error: "Missing metadata" }, { status: 400 })
      }

      console.log("[v0] Purchase completed (mock):", {
        userId,
        magazineId,
        sessionId: session.id,
        amount: (session.amount_total || 0) / 100,
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
