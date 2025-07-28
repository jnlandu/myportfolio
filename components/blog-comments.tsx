"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface BlogCommentsProps {
  slug: string
  title: string
}

export function BlogComments({ slug, title }: BlogCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!commentsRef.current) return

    // Clear any existing giscus
    const existingScript = document.querySelector('script[src*="giscus"]')
    const existingGiscus = document.querySelector('.giscus')
    if (existingScript) existingScript.remove()
    if (existingGiscus) existingGiscus.remove()

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", process.env.NEXT_PUBLIC_GISCUS_REPO || "jnlandu/myportfolio")
    script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "R_kgDONVaBMA")
    script.setAttribute("data-category", "Blog Comments")
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "DIC_kwDONVaBMM4ClQFN")
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "top")
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light")
    script.setAttribute("data-lang", "en")
    script.setAttribute("data-loading", "lazy")
    script.crossOrigin = "anonymous"
    script.async = true

    commentsRef.current.appendChild(script)

    return () => {
      if (existingScript) existingScript.remove()
      if (existingGiscus) existingGiscus.remove()
    }
  }, [slug, theme])

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-primary">Comments & Discussion</h3>
      <div ref={commentsRef} />
    </div>
  )
}
