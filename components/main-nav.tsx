"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  const routes = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    // { href: "#news", label: "News" },
    { href: "#projects", label: "Projects" },
    // { href: "#publications", label: "Publications" },
    // { href: "#education", label: "Education" },
    // { href: "#skills", label: "Skills" },
    // { href: "#motivations", label: "Motivations" },
    // { href: "#citations", label: "Citations" },
    { href: "/blog", label: "Blog" },
    // { href: "#contact", label: "Contact" },
  ]

  return (
    <div className="flex justify-between items-center py-4">
      <Link href="/" className="flex items-center">
        <span className="text-2xl md:text-3xl text-primary script-font">Jérémie N. Mabiala</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {routes.map((route) => (
          <Link key={route.href} href={route.href} className="text-sm font-medium transition-colors hover:text-primary">
            {route.label}
          </Link>
        ))}
        <Button variant="outline" size="sm" asChild>
          <Link href="#contact">Get in Touch</Link>
        </Button>
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col gap-4 mt-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

