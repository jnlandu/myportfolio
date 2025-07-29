import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, MessageSquare, Send, Globe, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
      
      <div className="container relative">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/30">
            <MessageSquare className="h-3 w-3 mr-1" />
            Let's Connect
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mb-6"></div>
          <p className="max-w-3xl text-lg text-gray-300 leading-relaxed">
            I'm always excited to collaborate on research projects, discuss AI innovations, or connect with fellow researchers. 
            Whether you have a question, opportunity, or just want to say hello, I'd love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-black/60 to-gray-900/60 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Email</h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-300">
                  <span className="font-medium">Academic:</span> jeremy@aimsammi.org
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Personal:</span> jnlandu00@gmail.com
                </p>
              </div>
              <p className="text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg">
                Response within 24-48 hours
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-black/60 to-gray-900/60 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Location</h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-300 font-medium">AIMS Senegal</p>
                <p className="text-gray-400 text-sm">KM 2, Route de Joal</p>
                <p className="text-gray-400 text-sm">Mbour, Senegal</p>
              </div>
              <p className="text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg">
                Currently based in West Africa
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-black/60 to-gray-900/60 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Social</h3>
              <div className="space-y-3 mb-4">
                <Link href="https://linkedin.com/in/jeremienlandu" className="flex items-center text-gray-300 hover:text-primary transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn
                </Link>
                <Link href="https://github.com/jnlandu" className="flex items-center text-gray-300 hover:text-primary transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
                <Link href="https://twitter.com/ValentinMabiala" className="flex items-center text-gray-300 hover:text-primary transition-colors">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Twitter/X
                </Link>
              </div>
              <p className="text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg">
                Most active on LinkedIn
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-gradient-to-br from-black/60 to-gray-900/60 border-primary/20 backdrop-blur-sm">
          <CardContent className="p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-3 text-white">Send Me a Message</h3>
              <p className="text-gray-400">Have a specific question or collaboration idea? Let's discuss it!</p>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-200 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Full Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Your full name" 
                    className="bg-gray-800/50 border-gray-700 focus:border-primary transition-colors h-12" 
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-200 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@domain.com" 
                    className="bg-gray-800/50 border-gray-700 focus:border-primary transition-colors h-12" 
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="subject" className="text-sm font-semibold text-gray-200 flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="What would you like to discuss?" 
                  className="bg-gray-800/50 border-gray-700 focus:border-primary transition-colors h-12" 
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="message" className="text-sm font-semibold text-gray-200 flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell me more about your idea, question, or how we might collaborate..." 
                  className="min-h-[150px] bg-gray-800/50 border-gray-700 focus:border-primary transition-colors resize-none" 
                />
              </div>
              
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Bottom Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <Calendar className="h-4 w-4 text-primary" />
            <p className="text-primary font-medium">
              Currently updating this portfolio • Best reached at{" "}
              <span className="font-bold">jeremie@aims.ac.za</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

