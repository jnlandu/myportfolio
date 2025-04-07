import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, BookOpen, Users, Lightbulb, Globe } from "lucide-react"

export function MotivationsSection() {
  return (
    <section id="motivations" className="py-20 bg-black/50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            What Drives Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Motivations in Life</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            The core principles and aspirations that guide my personal and professional journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Passion for Knowledge</h3>
                <p className="text-gray-400">
                  My insatiable curiosity and love for learning drive me to continuously explore new concepts and ideas.
                  I believe that knowledge is the foundation of innovation and progress.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence in Research</h3>
                <p className="text-gray-400">
                  I strive for excellence in all my research endeavors, pushing the boundaries of what's possible and
                  contributing meaningful advancements to the scientific community.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Education as Empowerment</h3>
                <p className="text-gray-400">
                  Following in the footsteps of my father and grandfather who were teachers, I believe in the
                  transformative power of education to empower individuals and communities.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Collaborative Innovation</h3>
                <p className="text-gray-400">
                  I'm motivated by the power of collaboration across disciplines and cultures. By working together with
                  diverse minds, we can solve complex problems and create innovative solutions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ethical AI Development</h3>
                <p className="text-gray-400">
                  I'm driven by the vision of creating AI systems that are not only powerful but also transparent, fair,
                  and beneficial to humanity. Ethical considerations are at the core of my research.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">African Innovation</h3>
                <p className="text-gray-400">
                  I'm passionate about contributing to the growth of AI research and innovation in Africa. I believe in
                  building local capacity and addressing unique challenges through technology.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-xl text-primary italic">
            "My ultimate motivation is to use my knowledge and skills to create positive impact, bridging the gap
            between theoretical research and practical applications that improve lives."
          </p>
        </div>
      </div>
    </section>
  )
}

