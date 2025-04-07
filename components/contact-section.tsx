import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            Feel free to reach out for collaborations, research opportunities, or just to say hello
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-400 mb-4">
                firstname(in french) at aims.ac.za
                <br />
                firstname(in english) at aimsammi.org
              </p>
              <p className="text-sm text-gray-500">I typically respond within 24-48 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-400 mb-4">
                AIMS Senegal
                <br />
                KM 2, Route de Joal
                <br />
                Mbour, Senegal
              </p>
              <p className="text-sm text-gray-500">Currently based in Senegal for my studies</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Social Media</h3>
              <p className="text-gray-400 mb-4">
                Connect with me on LinkedIn, Twitter, and GitHub for updates on my research and projects.
              </p>
              <p className="text-sm text-gray-500">I'm most active on LinkedIn for professional networking</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 bg-black/50 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Send Me a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" className="bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="Message subject" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" className="min-h-[150px] bg-background/50" />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-primary italic">
            I am currently updating this website. Please, feel free to reach out to{" "}
            <span className="font-medium">firstname(in french)</span> at aims.ac.za or{" "}
            <span className="font-medium">firstname (in english)</span> at aimsammi.org for any inquiries.
          </p>
        </div>
      </div>
    </section>
  )
}

