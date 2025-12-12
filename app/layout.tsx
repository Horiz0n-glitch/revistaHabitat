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
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://revistahabitat.com.ar"),
  title: "Revista Habitat - Arquitectura y Patrimonio",
  description: "Revista de arquitectura, conservación, restauración, historia y patrimonio",
  generator: "Horizont",
  openGraph: {
    title: "Revista Habitat",
    description: "Revista de arquitectura, conservación, restauración, historia y patrimonio",
    type: "website",
    locale: "es_AR",
    siteName: "Revista Habitat",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
