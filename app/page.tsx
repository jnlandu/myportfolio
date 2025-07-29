import { MainNav } from "@/components/main-nav"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { PublicationsSection } from "@/components/publications-section"
import { MotivationsSection } from "@/components/motivations-section"
import { CitationsSection } from "@/components/citations-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { NewsSection } from "@/components/news-sections"
import { JsonLd } from "@/components/json-ld"
// import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export default function Home() {
  // Portfolio structured data
  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": ["Jeremie Mabiala", "Jérémie N. Mabiala", "Mabiala Jérémie N."],
    "url": "https://www.jmabiala.com",
    "sameAs": [
      "https://www.linkedin.com/in/jeremie-mabiala",
      "https://github.com/jeremie-mabiala",
      "https://twitter.com/jeremie_mabiala"
    ],
    "jobTitle": "Student in Artificial Intelligence",
    "worksFor": {
      "@type": "Organization",
      "name": "African Institute for Mathematical Sciences (AIMS) Senegal"
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Stellenbosch University"
      },
       {
        "@type": "Organization",
        "name": "AIMS, South Africa"
      },
      {
        "@type": "Organization",
        "name": "Université de Kinshasa"
      },
      {
        "@type": "Organization",
        "name": "Ecole Centrale des Arts et Métiers (ECAM) Kinshasa"
      },
      {
        "@type": "Organization",
        "name": "Complexe Scolaire Mambo"
      }
    ],
    "knowsAbout": [
      "Machine Learning",
      "Artificial Intelligence",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Python",
      "TensorFlow",
      "PyTorch",
      "TypScript",
      "JavaScript",
      "Mathematics",
      "Statistics",
    ]
  }

  return (
    <main className="bg-black text-white min-h-screen pb-10">
      <JsonLd data={portfolioJsonLd} />
      
      {/* <SmoothScrollProvider> */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-border">
          <div className="container">
            <MainNav />
          </div>
        </div>

        <HeroSection />
        <AboutSection />
        <NewsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      {/* </SmoothScrollProvider> */}
    </main>
  )
}

