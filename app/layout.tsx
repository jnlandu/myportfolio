import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { ChatButton } from "@/components/chat-button"
import { JsonLd } from "@/components/json-ld"
import { generateSEO, generateJSONLD, siteConfig } from "@/lib/seo"
import { Toaster } from "sonner"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
})

// Generate comprehensive SEO metadata
export const metadata: Metadata = generateSEO({
  title: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
})

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Generate structured data for the website
  const websiteJsonLd = generateJSONLD({
    type: 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url
  })

  const personJsonLd = generateJSONLD({
    type: 'Person'
  })

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={personJsonLd} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
            <ChatButton />
            <Toaster 
              theme="dark"
              position="bottom-right"
              expand={false}
              richColors
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



