import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getSiteMetadata } from "@/lib/portfolio-config"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const siteMetadata = getSiteMetadata()

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  applicationName: siteMetadata.applicationName,
  manifest: "/manifest.json",
  icons: {
    icon: "/icon1.png",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: siteMetadata.themeColor,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
