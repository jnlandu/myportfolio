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
// import { BlogSectionWrapper } from "@/components/blog-section-wrapper"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { NewsSection } from "@/components/news-sections"
import { JsonLd } from "@/components/json-ld"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  
  // Portfolio structured data
  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jeremie Mabiala",
    "url": "https://www.jmabiala.com",
    "sameAs": [
      "https://www.linkedin.com/in/jeremie-mabiala",
      "https://github.com/jeremie-mabiala",
      "https://twitter.com/jeremie_mabiala"
    ],
    "jobTitle": "AI Researcher & Machine Learning Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Your Organization"
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Your University"
      }
    ],
    "knowsAbout": [
      "Machine Learning",
      "Artificial Intelligence",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Python",
      "TensorFlow",
      "PyTorch"
    ]
  }

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
    <main className="min-h-screen">
      <JsonLd data={portfolioJsonLd} />
      <MainNav />

      <HeroSection />
      <AboutSection />
      {/* <NewsSection /> */}
      <ProjectsSection />
      {/* <PublicationsSection /> */}
      {/* <EducationSection /> */}
      {/* <SkillsSection /> */}
      {/* <MotivationsSection /> */}
      {/* <CitationsSection /> */}
      {/* <BlogSectionWrapper /> */}
      <ContactSection />
      <Footer />
    </main>
  )
}

