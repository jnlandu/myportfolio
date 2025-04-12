import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jérémie N. Mabiala - AI Researcher & Mathematical Scientist",
  description:
    "Personal portfolio of Jérémie N. Mabiala, AI researcher and mathematician specializing in Machine Learning, Functional Data Analysis, and Mathematical Modeling",
  keywords: [
    "Jérémie N. Mabiala",
    "Jérémie Mabiala",
    "Jérémie Nlandu Mabiala",
    "Jérémie Nlandu",
    "Mabiala Jérémie",
    "Mabiala Nlandu",
    "AI Researcher",
    "Mathematical Scientist",
    "Machine Learning",
    "Functional Data Analysis",
    "Mathematical Modeling",
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ChatButton />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import { ChatButton } from "@/components/chat-button"
