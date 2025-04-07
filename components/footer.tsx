import Link from "next/link"
import { Mail, Twitter, Linkedin, Github, Heart } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-black py-12">
      <div className="container">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl text-primary script-font mb-6">Jérémie N. Mabiala</h2>

          <div className="flex gap-6 mb-8">
            <Link href="#" aria-label="Email">
              <Mail className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
            </Link>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            <Link href="#home" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-sm hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#publications" className="text-sm hover:text-primary transition-colors">
              Publications
            </Link>
            <Link href="#education" className="text-sm hover:text-primary transition-colors">
              Education
            </Link>
            <Link href="#skills" className="text-sm hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#motivations" className="text-sm hover:text-primary transition-colors">
              Motivations
            </Link>
            <Link href="#citations" className="text-sm hover:text-primary transition-colors">
              Citations
            </Link>
            <Link href="#blog" className="text-sm hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="#contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <Separator className="mb-8" />

          <div className="text-center">
            <p className="mb-4">
              Alrights Reserved <span className="text-primary">Jérémie N. Mabiala</span> ©2024.
            </p>
            <p className="text-gray-400 mb-4">
              This is my personal blog where I share my thoughts and experiences on various topics, in particular, AI,
              Machine Learning, Data Science, and Programming. Feel free to{" "}
              <span className="text-primary">steal it</span> and make it yours. Please, don't forget to star the{" "}
              <span className="text-primary">repo</span> if you like it.
            </p>
            <p className="flex items-center justify-center text-sm text-gray-500">
              Made with <Heart className="h-4 w-4 text-primary mx-1" /> and Mathematics
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

