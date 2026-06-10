import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "India's Got Latent",
  description: "Watch India's Got Latent episodes.",
  keywords: ["India", "talent show", "comedy", "entertainment", "reality show"],
  authors: [{ name: "India's Got Latent" }],
  openGraph: {
    title: "India's Got Latent",
    description: "Watch India's Got Latent episodes.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
