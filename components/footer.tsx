"use client"

import Link from "next/link"
import { Mail, Twitter, Linkedin, Github, Heart, ArrowUpRight, BookOpen, Briefcase, User, MessageSquare, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-provider"

export function Footer() {
  const t = useTranslation()

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
        }} />
      </div>
      
      <div className="container relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-3">
                  Jérémie N. Mabiala
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t.footer.description}
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                <Link 
                  href="mailto:jeremie@aims.ac.za" 
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary/20 border border-gray-700 hover:border-primary/40 flex items-center justify-center transition-all duration-300 group"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </Link>
                <Link 
                  href="https://linkedin.com/in/jeremienlandu" 
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-400/40 flex items-center justify-center transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </Link>
                <Link 
                  href="https://github.com/jnlandu" 
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-600/20 border border-gray-700 hover:border-gray-400/40 flex items-center justify-center transition-all duration-300 group"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                </Link>
                <Link 
                  href="https://twitter.com/ValentinMabiala" 
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-500/20 border border-gray-700 hover:border-blue-500/40 flex items-center justify-center transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                {t.footer.quickLinks}
              </h4>
              <nav className="space-y-3">
                <Link href="#home" className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                  <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.nav.home}
                </Link>
                <Link href="#about" className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                  <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.nav.about}
                </Link>
                <Link href="#news" className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                  <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.nav.news}
                </Link>
                <Link href="#contact" className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                  <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.nav.contact}
                </Link>
              </nav>
            </div>

            {/* Work Links */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                {t.footer.myWork}
              </h4>
              <nav className="space-y-3">
                <Link href="#projects" className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                  <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.footer.projects}
                </Link>
                <Link href="/blog" className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                  <BookOpen className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.footer.blog}
                </Link>
                <Link href="/gallery" className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                  <ArrowUpRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.footer.gallery}
                </Link>
                <Link href="/news" className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.footer.allNews}
                </Link>
              </nav>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                {t.footer.connect}
              </h4>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Interested in AI research collaboration or have questions about my work? 
                  I'd love to connect and discuss opportunities.
                </p>
                <Button asChild className="w-full bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 text-primary">
                  <Link href="#contact">
                    <Mail className="h-4 w-4 mr-2" />
                    {t.footer.getInTouch}
                  </Link>
                </Button>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>📍 {t.footer.currentlyBased}</p>
                  <p>🎓 {t.footer.studentAt}</p>
                  <p>🔬 {t.footer.focus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 mb-2">
                © 2025 <span className="text-primary font-semibold">Jérémie N. Mabiala</span>. {t.footer.copyright}
              </p>
              <p className="text-sm text-gray-500">
                {t.footer.builtWith}
                <Link href="https://github.com/jnlandu/myportfolio" className="text-primary hover:text-primary/80 ml-1">
                  {t.footer.viewSource}
                </Link>
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <p className="flex items-center text-sm text-gray-500 mb-2">
                {t.footer.madeWith} <Heart className="h-4 w-4 text-red-400 mx-1 animate-pulse" />.
              </p>
              <p className="text-xs text-gray-600">
                {t.footer.forkDesign}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

