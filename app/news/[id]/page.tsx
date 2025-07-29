import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"

type NewsItem = {
  id: string
  title: string
  summary: string
  content: string
  image?: string
  date: string
  category: "research" | "academic" | "event" | "award" | "publication" | "media"
  url?: string
  isNew?: boolean
  featured?: boolean
}

// Sample news data (in a real app, this would come from a CMS or database)
const newsItems: NewsItem[] = [
  {
    id: "ammi-admission",
    title: "Accepted into the African Masters in Machine Intelligence (AMMI) Program",
    summary: "Excited to announce my acceptance into the prestigious AMMI program at AIMS Senegal, founded by Google and Meta.",
    content: `I am thrilled to announce my acceptance into the African Masters in Machine Intelligence (AMMI) program at AIMS Senegal. This prestigious program, founded by Google and Meta, represents a significant milestone in my academic journey and a gateway to advancing AI research in Africa.

The AMMI program is designed to train the next generation of African AI researchers and engineers. Located at the beautiful AIMS campus in Mbour, Senegal, this intensive program brings together the brightest minds from across the African continent to study cutting-edge machine learning techniques, work on real-world problems, and collaborate with world-renowned researchers.

**What makes AMMI special:**

- **World-class Faculty:** The program features lectures from leading AI researchers from top universities and tech companies worldwide
- **Hands-on Research:** Students engage in original research projects that address African challenges using AI
- **Industry Partnerships:** Direct connections with Google, Meta, and other leading tech companies
- **Pan-African Network:** Opportunity to collaborate with talented peers from across Africa

**My Research Focus:**

During my time at AMMI, I plan to focus on:
- Explainable AI systems for decision-making in resource-constrained environments
- Applications of machine learning to solve real-world African challenges
- Developing AI solutions that are both technically sound and culturally appropriate

This opportunity represents not just personal growth, but a chance to contribute to the broader goal of making Africa a leader in AI research and innovation. I'm excited to be part of this journey and to work alongside brilliant minds who share the vision of using AI to create positive impact across the continent.

I want to express my gratitude to my mentors, professors, and family who have supported me throughout this journey. This is just the beginning, and I look forward to sharing more updates as I progress through this incredible program.`,
    image: "/placeholder.jpg",
    date: "March 15, 2024",
    category: "academic",
    isNew: true,
    featured: true,
  },
  {
    id: "research-grant",
    title: "Received Research Grant for Explainable AI Project",
    summary: "Our team has been awarded a significant grant to further our research on transparent decision-making in AI systems.",
    content: `I'm excited to share that our research team has been awarded a significant research grant to advance our work on explainable artificial intelligence (XAI). This funding will enable us to deepen our investigation into transparent decision-making processes in AI systems, with a particular focus on applications in critical domains where understanding AI reasoning is essential.

**Project Overview:**

Our research project, titled "Transparent Decision-Making in AI: Building Trust Through Explainability," addresses one of the most pressing challenges in modern AI deployment - the black box problem. As AI systems become increasingly complex and are deployed in high-stakes scenarios, the need for transparency and interpretability becomes paramount.

**Research Objectives:**

1. **Developing Novel XAI Techniques:** We will create new methods for making complex AI models more interpretable without sacrificing performance
2. **Real-world Applications:** Focus on applications in healthcare, finance, and autonomous systems where explainability is crucial
3. **User-Centric Design:** Ensure our explanations are useful for different stakeholders, from domain experts to end users
4. **Evaluation Frameworks:** Develop robust metrics for assessing the quality and usefulness of AI explanations

**Why This Matters:**

Explainable AI is not just an academic exercise - it's fundamental to building trust in AI systems and ensuring they can be deployed responsibly. In many domains, regulations require that automated decisions be explainable. More importantly, understanding how AI systems make decisions helps us identify biases, improve performance, and build better systems.

**Team and Collaboration:**

This project brings together researchers from multiple institutions across Africa and internationally. Our interdisciplinary team includes computer scientists, statisticians, domain experts, and human-computer interaction researchers. This diversity of perspectives is crucial for developing XAI solutions that are both technically sound and practically useful.

**Looking Forward:**

Over the next three years, we plan to publish our findings in top-tier venues, develop open-source tools for the research community, and collaborate with industry partners to translate our research into real-world applications. We're particularly excited about the potential to contribute to the responsible deployment of AI in African contexts.

This grant represents recognition of the importance of our work and provides the resources needed to make significant advances in explainable AI. I'm grateful to the funding agency and excited to work with our talented team to push the boundaries of what's possible in AI transparency.`,
    image: "/placeholder.jpg",
    date: "March 10, 2024",
    category: "research",
    isNew: true,
  },
  // Add more news items as needed
]

interface NewsPageProps {
  params: Promise<{ id: string }>
}

function getNewsItem(id: string): NewsItem | undefined {
  return newsItems.find(item => item.id === id)
}

export async function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id,
  }))
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params
  const newsItem = getNewsItem(id)

  if (!newsItem) {
    return {
      title: 'News Item Not Found',
    }
  }

  return {
    title: `${newsItem.title} - Jérémie N. Mabiala`,
    description: newsItem.summary,
    keywords: ['news', newsItem.category, 'research', 'academic', 'AI', 'machine learning'],
  }
}

export default async function NewsItemPage({ params }: NewsPageProps) {
  const { id } = await params
  const newsItem = getNewsItem(id)

  if (!newsItem) {
    notFound()
  }

  const getCategoryColor = (category: NewsItem["category"]) => {
    switch (category) {
      case "research": return "bg-blue-500"
      case "academic": return "bg-green-500"
      case "event": return "bg-purple-500"
      case "award": return "bg-yellow-500"
      case "publication": return "bg-red-500"
      case "media": return "bg-orange-500"
      default: return "bg-gray-500"
    }
  }

  const getCategoryLabel = (category: NewsItem["category"]) => {
    switch (category) {
      case "research": return "Research"
      case "academic": return "Academic"
      case "event": return "Event"
      case "award": return "Award"
      case "publication": return "Publication"
      case "media": return "Media"
      default: return category
    }
  }

  return (
    <>
      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container max-w-7xl">
          <MainNav />
        </div>
      </header>

      <main className="bg-black text-white min-h-screen pt-8 pb-20">
        <div className="container max-w-4xl">
          <Link href="/news" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to news
          </Link>

          {/* Hero Image */}
          {newsItem.image && (
            <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
              <Image 
                src={newsItem.image} 
                alt={newsItem.title} 
                fill 
                className="object-cover" 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={`${getCategoryColor(newsItem.category)} text-white`}>
                  {getCategoryLabel(newsItem.category)}
                </Badge>
                {newsItem.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                {newsItem.featured && <Badge className="bg-primary text-white">Featured</Badge>}
              </div>
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex gap-2">
                <Badge className={`${getCategoryColor(newsItem.category)} text-white`}>
                  {getCategoryLabel(newsItem.category)}
                </Badge>
                {newsItem.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{newsItem.title}</h1>
            <p className="text-xl text-gray-300 mb-6">{newsItem.summary}</p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert prose-headings:text-primary prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-blue-400 prose-strong:text-white max-w-none">
            {newsItem.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith(':**')) {
                // Handle section headers
                const header = paragraph.replace(/\*\*/g, '').replace(':', '')
                return <h3 key={index} className="text-2xl font-semibold text-primary mt-8 mb-4">{header}</h3>
              } else if (paragraph.startsWith('- ')) {
                // Handle bullet points
                const items = paragraph.split('\n').filter(item => item.startsWith('- '))
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-6">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-200">
                        {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                      </li>
                    ))}
                  </ul>
                )
              } else {
                // Handle regular paragraphs
                return (
                  <p key={index} className="mb-4 leading-relaxed text-gray-200">
                    {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, partIndex) => {
                      if (partIndex === 0) return part
                      const [boldText, ...rest] = part.split('</strong>')
                      return (
                        <span key={partIndex}>
                          <strong className="text-white">{boldText}</strong>
                          {rest.join('</strong>')}
                        </span>
                      )
                    })}
                  </p>
                )
              }
            })}
          </div>

          {/* Share and Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h3 className="font-medium mb-2">Share this news</h3>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Link href="/news">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                All News
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
