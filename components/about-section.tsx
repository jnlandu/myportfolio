"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, MapPin, Calendar, GraduationCap, Users, Heart } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-primary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm bg-primary/10 border-primary/30">
            {/* <Users className="h-3 w-3 mr-2" /> */}
            About Me
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Who I am
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
            Hi there! I'm Jérémie 👋. I am an AI enthusiast and mathematician passionate about the intersection 
            of theoretical mathematics and practical AI applications.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Profile & Story */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Profile Header */}
            <Card className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary/50 shadow-lg shadow-primary/20">
                      <Image 
                        src="/images/profile.jpg" 
                        alt="Jérémie N. Mabiala" 
                        fill 
                        className="object-cover object-center" 
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-1">Jérémie N. Mabiala</h3>
                    <p className="text-gray-300 mb-2">AI Researcher & Mathematical Scientist</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>Senegal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Available for collaboration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story */}
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                <span className="text-primary font-semibold">Welcome!</span> I am Jérémie N. Mabiala. 
                If you're from an English-speaking culture, you can call me Jeremy. I am currently a{" "}
                <span className="text-primary font-semibold">resident tutor</span> in Artificial Intelligence at
                the <strong>African Masters in Machine Intelligence</strong> (<span className="text-primary">AMMI</span>), 
                a pan-African flagship master's program in Artificial Intelligence founded by Google and Meta, 
                hosted at the African Institute for Mathematical Sciences (AIMS) Senegal. 
              </p>

              <p>
                Before that, I graduated from <span className="text-primary font-medium">Stellenbosch University</span> and{" "}
                <span className="text-primary font-medium">AIMS South Africa</span> in February 2024 with a Master's degree in
                Mathematical Sciences. I worked on Mathematical Statistics, specifically{" "}
                <span className="text-primary font-medium">Functional Data Analysis</span>. My master's thesis is titled{" "}
                <strong className="text-white">Gaussian Processes for Multivariate Functional Data</strong>, and it is available at the{" "}
                <span className="text-primary font-medium">AIMS Archive</span>. 
              </p>

              <p>
                I also hold a Bachelor's degree (equivalent to Bac +5) in Mathematics from the{" "}
                <span className="text-primary font-medium">University of Kinshasa</span>, the Congo's leading university. 
                There I graduated in the top 5% in my department with{" "}
                <span className="text-primary font-medium">"Grande Distinction"</span> (the Congolese equivalent of Summa Cum
                Laude). During my time there, I worked on Functional Analysis, which was my early math interest, and I
                served as a teaching assistant and subsidiary lecturer for two years.
              </p>

              <p>
                I am passionate about <span className="text-primary font-medium">teaching, gaining knowledge, and sharing it with others</span>. 🤝{" "}
                I am particularly interested in <strong className="text-white">Mathematics, Theoretical Aspects of Machine Learning and/or Deep Learning</strong> and their
                applications. My interests also extend to <strong className="text-white">Mathematical Modeling, Functional Data Analysis</strong>,
                Large Language Models, and Reinforcement Learning.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-6 rounded-xl border border-primary/20">
                <p className="text-primary font-medium flex items-center gap-2">
                  <Heart className="h-4 w-4 fill-current" />
                  Personal Note
                </p>
                <p className="mt-2">
                  I am a hobbyist developer and an apprentice writer. I like to keep myself curious about technologies and history. When I'm not doing math
                  or training neural networks, you'll find me  reading and exploring technogolies, posts on X, or listening  to music and podcasts.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills & Languages */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Languages */}
            <Card className="bg-black/50 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Languages
                </h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 font-medium">
                        French
                      </span>
                      <span className="text-sm text-primary font-medium">Native</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-blue-400 h-2 rounded-full w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 font-medium">
                        English
                      </span>
                      <span className="text-sm text-primary font-medium">Fluent</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-blue-400 h-2 rounded-full w-[90%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 font-medium">
                        Lingala
                      </span>
                      <span className="text-sm text-primary font-medium">Native</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-blue-400 h-2 rounded-full w-full" />
                    </div>
                  </div>

                  {/* <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 font-medium">
                        Swahili
                      </span>
                      <span className="text-sm text-gray-400">Basic</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-2 rounded-full w-[40%]" />
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* Academic Timeline */}
            <Card className="bg-black/50 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Academic Journey
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-primary">Current - AMMI Tutor</p>
                      <p className="text-sm text-gray-400">African Institute for Mathematical Sciences, Senegal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Feb 2024 - 2025 -  MSc in AI </p>
                      <p className="text-sm text-gray-400">AMMI, African Institute for Mathematical Sciences, Senegal </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Mars 2023 -  Mars 2024 - Master's Degree</p>
                      <p className="text-sm text-gray-400">Stellenbosch University & AIMS South Africa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Bachelor's Degree</p>
                      <p className="text-sm text-gray-400">University of Kinshasa, Congo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="bg-gradient-to-br from-primary/20 to-blue-500/20 border-primary/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Let's Connect!</h4>
                <p className="text-sm text-gray-300 mb-4">
                  I'm always excited to discuss AI, mathematics, and potential connexions.
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <p>
                    📧 <span className="text-primary">jeremie</span> at aims.ac.za  ||   📧 <span className="text-primary">jeremy</span> at aimsammi.org
                  </p>
                  {/* <p>
                    📧 <span className="text-primary">jeremy</span> at aimsammi.org
                  </p> */}
                </div>
                <Button 
                  asChild 
                  className="mt-4 bg-primary hover:bg-primary/80 text-black font-medium"
                >
                  <Link href="#contact">
                    Get In Touch
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Status Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <p className="text-sm text-gray-300">
              I'm currently updating this website. Feel free to reach out for any inquiries! 
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}