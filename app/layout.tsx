import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Revista Habitat - Arquitectura y Diseño",
  description: "Revista digital de arquitectura, diseño de interiores y urbanismo",
  generator: "Horizont",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
