"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageToggle } from "@/components/language-toggle"
import { useTranslation } from "@/components/language-provider"

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const t = useTranslation()

  const routes = [
    { href: "/#home", label: t.nav.home },
    { href: "/#about", label: t.nav.about },
    { href: "/#news", label: t.nav.news },
    { href: "/#projects", label: t.nav.projects },
    // { href: "/#publications", label: t.nav.publications },
    // { href: "/#education", label: t.nav.education },
    // { href: "/#skills", label: t.nav.skills },
    // { href: "/#motivations", label: t.nav.motivations },
    // { href: "/#citations", label: t.nav.citations },
    { href: "/blog", label: t.nav.blog },
    // { href: "/#contact", label: t.nav.contact },
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
        <LanguageToggle />
        <Button variant="outline" size="sm" asChild>
          <Link href="/#contact">{t.nav.getInTouch}</Link>
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
            <div className="mt-4">
              <LanguageToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

