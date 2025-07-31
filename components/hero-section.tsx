"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Twitter, Linkedin, Github, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslation } from "@/components/language-provider"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const t = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20">
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 to-black z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(30, 64, 175, 0.2) 0%, transparent 50%)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      />

      <div className="container relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30">
            <Image src="/images/profile.jpg" alt="Jeremy N. Mabiala" fill className="object-cover object-center" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-background p-3 rounded-full border border-border">
            <div className="bg-primary/20 p-2 rounded-full">
              <div className="bg-primary text-white p-2 rounded-full">
                <span className="sr-only">AI Enthusiast</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-brain-circuit"
                >
                  <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
                  <path d="M16 8V5c0-1.1.9-2 2-2" />
                  <path d="M12 13h4" />
                  <path d="M12 18h6a2 2 0 0 1 2 2v1" />
                  <path d="M12 8h8" />
                  <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                  <path d="M16.5 13a.5.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                  <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                  <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-primary">{t.hero.greeting}</span>
              <div className="script-font text-5xl md:text-7xl mt-2">{t.hero.name}</div>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mt-4">{t.hero.title}</h2>
          </div>

          <p className="text-gray-300 text-lg">
            {t.hero.description}
          </p>

          <div className="flex gap-4 mt-2">
            <Button asChild>
              <Link href="#projects">{t.hero.viewResume}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#contact">{t.hero.contactMe}</Link>
            </Button>
          </div>

          <div className="flex gap-4 mt-4">
            <Link href="mailto:jeremie@aims.ac.za" aria-label="Email">
              <Mail className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <Link href="https://twitter.com/ValentinMabiala" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <Link href="https://www.linkedin.com/in/jnlandu00a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <Link href="https://github.com/jnlandu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
          </div>
        </motion.div>

        
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about" aria-label="Scroll down">
          <ArrowDown className="h-6 w-6 text-primary" />
        </Link>
      </div>
    </section>
  )
}

