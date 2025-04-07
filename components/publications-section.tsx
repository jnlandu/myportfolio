import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export function PublicationsSection() {
  return (
    <section id="publications" className="py-20 bg-black/50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            My Research
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Publications & Preprints</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">Academic papers, conference proceedings, and research contributions</p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-black/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Gaussian Processes for Multivariate Functional Data
              </CardTitle>
              <CardDescription>Master's Thesis, AIMS South Africa & Stellenbosch University (2024)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                This thesis explores novel statistical methods for analyzing multivariate functional data using Gaussian
                processes. The work contributes to the field of Functional Data Analysis with applications in various
                domains including environmental monitoring, biomedical signal processing, and economic time series
                analysis.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">Functional Data Analysis</Badge>
                <Badge variant="secondary">Gaussian Processes</Badge>
                <Badge variant="secondary">Statistical Modeling</Badge>
                <Badge variant="secondary">Multivariate Analysis</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href="#">
                  <span>View Publication</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Transparent Decision-Making for Electric Vehicle Routing: A Comparative Study
              </CardTitle>
              <CardDescription>Preprint (2024)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                This research paper presents a comparative study of various Deep Reinforcement Learning (DRL) models
                combined with Graph Neural Networks (GNN) and Explainable AI (XAI) techniques for electric vehicle
                routing optimization. The study evaluates the performance of different models in optimizing routes and
                their ability to explain decision-making processes.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">Deep Reinforcement Learning</Badge>
                <Badge variant="secondary">Graph Neural Networks</Badge>
                <Badge variant="secondary">Explainable AI</Badge>
                <Badge variant="secondary">Electric Vehicle Routing</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href="#">
                  <span>View Preprint</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-black/50 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Functional Analysis Approaches to Mathematical Modeling: A Review
              </CardTitle>
              <CardDescription>University of Kinshasa Journal of Mathematics (2021)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                This review paper explores the application of functional analysis techniques in mathematical modeling
                across various domains. The paper provides a comprehensive overview of how functional analysis can be
                used to develop more accurate and efficient mathematical models for complex systems.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">Functional Analysis</Badge>
                <Badge variant="secondary">Mathematical Modeling</Badge>
                <Badge variant="secondary">Differential Equations</Badge>
                <Badge variant="secondary">Applied Mathematics</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href="#">
                  <span>View Publication</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

