import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-black/50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who I Am</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            AI researcher and mathematician passionate about the intersection of theoretical mathematics and practical
            AI applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                <Image src="/images/profile.jpeg" alt="Jérémie N. Mabiala" fill className="object-cover object-center" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Jérémie N. Mabiala</h3>
                <p className="text-gray-400">AI Researcher & Mathematical Scientist</p>
              </div>
            </div>

            <p>
              <span className="text-primary font-medium">Welcome!</span> I am Jérémie N. Mabiala. If you're from an
              English-speaking culture, you can call me Jeremy. I am currently a <b> <span className="text-primary">resident tutor </span> </b> in Artificial Intelligence at
              the <b> African Masters in Machine Intelligence </b> (<span className="text-primary">AMMI</span>), a pan-African
              flagship master's program in Artificial Intelligence founded by Google and Meta, hosted at the African Institute for Mathematical Sciences,(AIMS) Senegal. I am an AI
              enthusiast and math lover.
            </p>

            <p>
              Before that, I graduated from <span className="text-primary">Stellenbosch University</span> and{" "}
              <span className="text-primary">AIMS South Africa</span> in February 2024 with a Master's degree in
              Mathematical Sciences. I worked on Mathematical Statistics, specifically{" "}
              <span className="text-primary">Functional Data Analysis</span>. My master's thesis is titled{" "}
              <strong>Gaussian Processes for Multivariate Functional Data</strong>, and it is available at the{" "}
              <span className="text-primary">AIMS Archive</span>.
            </p>

            <p>
              I also hold a Bachelor's degree (equivalent to Bac +5) in Mathematics from the{" "}
              <span className="text-primary">University of Kinshasa</span>, the Congo's leading university. There I
              graduated in the top 5% in my department with "Grande Distinction" (the Congolese equivalent of Summa Cum
              Laude). During my time there, I worked on Functional Analysis, which was my early math interest, and I
              served as a teaching assistant and subsidiary lecturer for two years.
            </p>

            <p>
              I am passionate about teaching, gaining knowledge, and sharing it with others.  I am particularly interested in{" "}
              <strong>Mathematics, Theoretical Aspects of Machine Learning and/or Deep Learning</strong> and their
              applications. My interests also extend to <strong>Mathematical Modeling, Functional Data Analysis</strong>
              , Large Language Models, and Reinforcement Learning.
            </p>

            <p>I am a hobbyist developer and an apprentice writer.</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Research Interests</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Theoretical Machine Learning</h4>
                  <p className="text-sm text-gray-400">
                    Mathematical foundations of machine learning algorithms and their theoretical guarantees
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Deep Learning</h4>
                  <p className="text-sm text-gray-400">
                    Neural network architectures, optimization methods, and generalization properties
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Functional Data Analysis</h4>
                  <p className="text-sm text-gray-400">
                    Statistical methods for analyzing and modeling functional data
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Explainable AI</h4>
                  <p className="text-sm text-gray-400">
                    Methods for making AI systems more transparent and interpretable
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Languages</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>French</span>
                    <span>Native</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>English</span>
                    <span>Fluent</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Lingala</span>
                    <span>Native</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Swahili</span>
                    <span>Basic</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-primary italic">
                I am currently updating this website. Please, feel free to reach out to{" "}
                <span className="font-medium">firstname(in french)</span> at aims.ac.za or{" "}
                <span className="font-medium">firstname (in english)</span> at aimsammi.org for any inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

