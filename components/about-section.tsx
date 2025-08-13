"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, MapPin, Calendar, GraduationCap, Users, Heart } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

export function AboutSection() {
  const t = useTranslation()

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
            {t.about.title}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.about.title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
            {t.about.description}
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
                <span className="text-primary font-semibold">{t.about.welcome}</span> {t.about.story.paragraph1}
              </p>

              <p>
                {t.about.story.paragraph2}
              </p>

              <p>
                {t.about.story.paragraph3}
              </p>

              <p>
                {t.about.story.paragraph4}
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-6 rounded-xl border border-primary/20">
                <p className="text-primary font-medium flex items-center gap-2">
                  <Heart className="h-4 w-4 fill-current" />
                  {t.about.story.personalNote.title}
                </p>
                <p className="mt-2">
                  {t.about.story.personalNote.content}
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
                  {t.about.languages.title}
                </h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 font-medium">
                        {t.about.languages.french}
                      </span>
                      <span className="text-sm text-primary font-medium">{t.about.languages.native}</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-blue-400 h-2 rounded-full w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 font-medium">
                        {t.about.languages.english}
                      </span>
                      <span className="text-sm text-primary font-medium">{t.about.languages.fluent}</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-blue-400 h-2 rounded-full w-[90%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 font-medium">
                        {t.about.languages.lingala}
                      </span>
                      <span className="text-sm text-primary font-medium">{t.about.languages.native}</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-blue-400 h-2 rounded-full w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Timeline */}
            <Card className="bg-black/50 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  {t.about.academicJourney.title}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-primary">{t.about.academicJourney.current}</p>
                      <p className="text-sm text-gray-400">{t.about.academicJourney.currentDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t.about.academicJourney.masters2024}</p>
                      <p className="text-sm text-gray-400">{t.about.academicJourney.masters2024Desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t.about.academicJourney.masters2023}</p>
                      <p className="text-sm text-gray-400">{t.about.academicJourney.masters2023Desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t.about.academicJourney.bachelors}</p>
                      <p className="text-sm text-gray-400">{t.about.academicJourney.bachelorsDesc}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="bg-gradient-to-br from-primary/20 to-blue-500/20 border-primary/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">{t.about.contact.title}</h4>
                <p className="text-sm text-gray-300 mb-4">
                  {t.about.contact.description}
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <p>
                    📧 <span className="text-primary">jeremie</span> at aims.ac.za  ||   📧 <span className="text-primary">jeremy</span> at aimsammi.org
                  </p>
                </div>
                <Button 
                  asChild 
                  className="mt-4 bg-primary hover:bg-primary/80 text-black font-medium"
                >
                  <Link href="#contact">
                    {t.about.contact.getInTouch}
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
              {t.about.contact.updateNote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}