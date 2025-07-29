"use client"

import { useEffect, useState } from "react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0)

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault()
        const targetElement = document.querySelector(anchor.hash)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          })
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("click", handleAnchorClick)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}
