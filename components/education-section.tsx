import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function EducationSection() {
  return (
    <section id="education" className="py-20 bg-black/50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            My Background
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">My academic journey in mathematics and artificial intelligence</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:translate-x-px"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {/* AMMI */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="md:text-right order-2 md:order-1">
                <Badge className="mb-2">2024 - Present</Badge>
                <h3 className="text-xl font-bold mb-2">African Masters in Machine Intelligence (AMMI)</h3>
                <p className="text-primary mb-2">AIMS Senegal</p>
                <p className="text-gray-400 mb-4">
                  A pan-African master's program in Artificial Intelligence founded by Google and Meta, hosted at AIMS
                  Senegal.
                </p>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Badge variant="outline">Deep Learning</Badge>
                  <Badge variant="outline">Computer Vision</Badge>
                  <Badge variant="outline">NLP</Badge>
                  <Badge variant="outline">Reinforcement Learning</Badge>
                </div>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="absolute -left-4 md:left-auto md:-right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-background rounded-full"></div>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-video relative rounded-md overflow-hidden">
                      <Image src="/images/aims-logo.png" alt="AMMI Logo" fill className="object-contain" />
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-400">
                        Currently focusing on advanced AI techniques and their applications in solving African and
                        global challenges.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Stellenbosch University & AIMS South Africa */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative">
                <div className="absolute -left-4 md:left-auto md:-left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-background rounded-full"></div>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-video relative rounded-md overflow-hidden">
                      <Image
                        src="/images/stellenbosch-logo.png"
                        alt="Stellenbosch University Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-400">
                        Completed Master's thesis on "Gaussian Processes for Multivariate Functional Data" with a focus
                        on statistical methods for analyzing multivariate functional data.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Badge className="mb-2">2023 - 2024</Badge>
                <h3 className="text-xl font-bold mb-2">Master's in Mathematical Sciences</h3>
                <p className="text-primary mb-2">Stellenbosch University & AIMS South Africa</p>
                <p className="text-gray-400 mb-4">
                  Graduated in February 2024 with a Master's degree in Mathematical Sciences, specializing in
                  Mathematical Statistics and Functional Data Analysis.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Functional Data Analysis</Badge>
                  <Badge variant="outline">Mathematical Statistics</Badge>
                  <Badge variant="outline">Gaussian Processes</Badge>
                  <Badge variant="outline">Data Science</Badge>
                </div>
              </div>
            </div>

            {/* University of Kinshasa */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="md:text-right order-2 md:order-1">
                <Badge className="mb-2">2016 - 2021</Badge>
                <h3 className="text-xl font-bold mb-2">Bachelor's in Mathematics</h3>
                <p className="text-primary mb-2">University of Kinshasa</p>
                <p className="text-gray-400 mb-4">
                  Graduated with "Grande Distinction" (Summa Cum Laude) in the top 5% of my department. Served as a
                  teaching assistant and subsidiary lecturer for two years.
                </p>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Badge variant="outline">Functional Analysis</Badge>
                  <Badge variant="outline">Mathematical Modeling</Badge>
                  <Badge variant="outline">Teaching</Badge>
                </div>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="absolute -left-4 md:left-auto md:-right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-background rounded-full"></div>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="mt-4">
                      <p className="text-sm text-gray-400">
                        Developed a strong foundation in mathematics with a focus on functional analysis. Gained
                        teaching experience as an assistant and lecturer.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

