"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { PublicationsSection } from "@/components/publications-section"
import { MotivationsSection } from "@/components/motivations-section"
import { CitationsSection } from "@/components/citations-section"
// import { NewsSection } from "@/components/news-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { NewsSection } from "@/components/news-sections"

export default function Home() {
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

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-border">
        <div className="container">
          <MainNav />
        </div>
      </div>

      <div
        className="fixed inset-0 bg-cover bg-center opacity-10 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/profile.jpg')",
          transform: `translateY(${scrollY * 0.5}px)`,
          filter: "blur(8px) brightness(0.3)",
        }}
      />

      <HeroSection />
      <AboutSection />
      {/* <NewsSection /> */}
      <ProjectsSection />
      {/* <PublicationsSection /> */}
      {/* <EducationSection /> */}
      {/* <SkillsSection /> */}
      {/* <MotivationsSection /> */}
      {/* <CitationsSection /> */}
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

