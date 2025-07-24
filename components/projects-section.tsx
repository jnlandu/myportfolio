import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Globe, Smartphone, Code } from "lucide-react"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            My Work
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Projects</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            Exploring the frontiers of AI research through innovative projects and collaborations
          </p>
        </div>

        <Tabs defaultValue="research" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="webmobile">Web & Mobile</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
          </TabsList>

          <TabsContent value="research" className="space-y-8">
            <Card className="bg-black/50 border-primary/20 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <CardTitle className="text-xl md:text-2xl text-primary mb-4">
                      Transparent Decision-Making for Electric Vehicle Routing: Integrating DRL, GNN, and XAI
                    </CardTitle>
                    <CardDescription className="text-gray-400 mb-6">
                      This is the current research project I am working on with colleagues from Tunisia, Senegal, and
                      DR. Congo. The goal of this project is to conduct a comparative study of various Deep
                      Reinforcement Learning (DRL) models combinded with GNN and XAI.
                    </CardDescription>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Key Objectives:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                          <li>Evaluate performance in optimizing electric vehicle routes</li>
                          <li>Analyze how well each model explains its decisions</li>
                          <li>Provide a transparent decision-making process</li>
                          <li>Compare various DRL architectures with GNN integration</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Collaborators:</h4>
                        <p className="text-sm text-gray-400">Researchers from Tunisia, Senegal, and DR Congo</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <Link href="#">
                        <Github className="h-4 w-4" />
                        <span>Repository</span>
                      </Link>
                    </Button>
                    <Button size="sm" className="gap-2" asChild>
                      <Link href="#">
                        <ExternalLink className="h-4 w-4" />
                        <span>Learn More</span>
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative min-h-[300px]">
                  <Image
                    src="/images/project-banner.png"
                    alt="Electric Vehicle Routing Project"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-black/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  Gaussian Processes for Multivariate Functional Data
                </CardTitle>
                <CardDescription>Master's Thesis Research Project</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  My master's thesis focused on developing novel statistical methods for analyzing multivariate
                  functional data using Gaussian processes. This research contributes to the field of Functional Data
                  Analysis with applications in various domains.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-medium mb-2">Methodologies:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                      <li>Gaussian Process Regression</li>
                      <li>Functional Principal Component Analysis</li>
                      <li>Multivariate Statistical Analysis</li>
                      <li>Bayesian Inference</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Applications:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                      <li>Environmental Data Analysis</li>
                      <li>Biomedical Signal Processing</li>
                      <li>Economic Time Series</li>
                      <li>Climate Data Modeling</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href="#">
                    <span>View Thesis</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="webmobile" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-black/50 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl text-primary">AI Research Hub</CardTitle>
                  </div>
                  <CardDescription>Web Application</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    A collaborative platform for AI researchers to share papers, datasets, and code implementations.
                    Features include paper summaries, discussion forums, and integration with popular research
                    repositories.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">MongoDB</Badge>
                    <Badge variant="secondary">GraphQL</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <Link href="#">
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </Link>
                  </Button>
                  <Button size="sm" className="gap-2" asChild>
                    <Link href="#">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl text-primary">MathViz</CardTitle>
                  </div>
                  <CardDescription>Mobile Application</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    An educational mobile app that visualizes complex mathematical concepts through interactive 3D
                    models and animations. Designed to help students understand abstract mathematical theories.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">React Native</Badge>
                    <Badge variant="secondary">Three.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Firebase</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <Link href="#">
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </Link>
                  </Button>
                  <Button size="sm" className="gap-2" asChild>
                    <Link href="#">
                      <ExternalLink className="h-4 w-4" />
                      <span>App Store</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl text-primary">DataFlow</CardTitle>
                  </div>
                  <CardDescription>Web Dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    An interactive data visualization dashboard for analyzing and presenting research results. Features
                    include customizable charts, statistical analysis tools, and export capabilities.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">Vue.js</Badge>
                    <Badge variant="secondary">D3.js</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">Flask</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <Link href="#">
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </Link>
                  </Button>
                  <Button size="sm" className="gap-2" asChild>
                    <Link href="#">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-black/50 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl text-primary">StudyBuddy</CardTitle>
                  </div>
                  <CardDescription>Mobile Application</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    A productivity app designed for students and researchers to organize study materials, track research
                    progress, and collaborate with peers. Includes features like pomodoro timer, note-taking, and
                    citation management.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">Flutter</Badge>
                    <Badge variant="secondary">Dart</Badge>
                    <Badge variant="secondary">Firebase</Badge>
                    <Badge variant="secondary">Cloud Functions</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <Link href="#">
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </Link>
                  </Button>
                  <Button size="sm" className="gap-2" asChild>
                    <Link href="#">
                      <ExternalLink className="h-4 w-4" />
                      <span>Play Store</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="grid md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Personal Portfolio Website</CardTitle>
                <CardDescription>Web Development Project</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Designed and developed a personal portfolio website using modern web technologies to showcase my
                  research, projects, and academic background.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href="#">
                    <Github className="h-4 w-4" />
                    <span>Source Code</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-black/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Travel Photography</CardTitle>
                <CardDescription>Visual Documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Documenting my academic and research travels across Africa and beyond, capturing the beautiful
                  landscapes, architecture, and cultural experiences that inspire my work.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Photography</Badge>
                  <Badge variant="secondary">Travel</Badge>
                  <Badge variant="secondary">Cultural Documentation</Badge>
                  <Badge variant="secondary">Visual Storytelling</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="gap-2" asChild>
                  <Link href="/gallery">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Gallery</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

