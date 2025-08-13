'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const items: TOCItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      
      // Skip main title (h1) and table of contents heading
      if (level === 1 || text.toLowerCase().includes('table of contents')) {
        continue
      }

      // Create slug-like id from text
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim()

      items.push({
        id,
        text,
        level
      })
    }

    setTocItems(items)
  }, [content])

  // Handle scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting) {
            setActiveId(id)
            
            // Auto-scroll active item into view in TOC
            setTimeout(() => {
              const activeElement = document.querySelector(`a[href="#${id}"]`)
              if (activeElement) {
                activeElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest'
                })
              }
            }, 100)
          }
        })
      },
      {
        rootMargin: '-100px 0px -80% 0px'
      }
    )

    // Observe all headings
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [tocItems])

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className={cn("sticky top-28 h-fit max-h-[calc(100vh-10rem)]", className)}>
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex flex-col relative">
        <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider flex items-center flex-shrink-0">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Table of Contents
        </h3>
        <div className="relative flex-1 min-h-0">
          <nav className="space-y-1.5 overflow-y-auto overscroll-contain pr-2 -mr-2 max-h-[60vh] scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
            {tocItems.map(({ id, text, level }, key) => (
              <a
                key={key}
                href={`#${id}`}
                className={cn(
                  "block text-sm text-gray-400 hover:text-primary transition-all duration-200 py-1.5 px-2 rounded-md hover:bg-gray-800/50",
                  level === 2 && "pl-2 font-medium",
                  level === 3 && "pl-6 text-xs",
                  level === 4 && "pl-10 text-xs",
                  level === 5 && "pl-14 text-xs",
                  level === 6 && "pl-18 text-xs",
                  activeId === id && "text-primary font-medium bg-primary/10 border-l-2 border-primary"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(id)
                  if (element) {
                    const yOffset = -100 // Account for sticky header + nav
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                    window.scrollTo({ top: y, behavior: 'smooth' })
                  }
                }}
              >
                <span className="line-clamp-2">{text}</span>
              </a>
            ))}
          </nav>
          {/* Fade gradient at bottom when scrollable */}
          {tocItems.length > 10 && (
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  )
}
