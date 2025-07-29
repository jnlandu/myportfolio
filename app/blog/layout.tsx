import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import { ChatButton } from "@/components/chat-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jérémie N. Mabiala - Resident Tutor in Machine Learning, AIMS Senegal",
  description:
    "Personal portfolio of Jérémie N. Mabiala", //, Resident Tutor in Machine Learning at AIMS Senegal, AI researcher and mathematician specializing in Machine Learning, Functional Data Analysis, and Mathematical Modeling",
  keywords: [
    "Jérémie N. Mabiala",
    "Jérémie Mabiala",
    "Jérémie Nlandu Mabiala",
    "Jérémie Nlandu",
    "Mabiala Jérémie",
    "Mabiala Nlandu",
    "African Master in Machine Intelligence, AMMI",
    "African Institute for Mathematical Sciences, AIMS",
    "AIMS Senegal",
    "University of Stellenbosch",
    "African Institute for Mathematical Sciences, South Africa",
    "AIMS South Africa",
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



