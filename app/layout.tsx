import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { PostHogConsent } from "@/components/posthog-consent"
import { ThemeProvider } from "@/components/theme-provider"
import { ParticlesBackground } from "@/components/ui/particles-background"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { getSiteMetadata } from "@/lib/portfolio-config"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const siteMetadata = getSiteMetadata()

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  applicationName: siteMetadata.applicationName,
  manifest: "/manifest.json",
  icons: {
    icon: "/icon1.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <ParticlesBackground />
          {children}
          <PostHogConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
