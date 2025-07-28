import { Metadata } from 'next'

// SEO Configuration
export const siteConfig = {
  name: "Jérémie N. Mabiala",
  title: "Jérémie N. Mabiala - AI Researcher & Mathematical Scientist",
  description: "Personal portfolio of Jérémie N. Mabiala, Resident Tutor in Machine Learning at AIMS Senegal, AI researcher and mathematician specializing in Machine Learning, Functional Data Analysis, and Mathematical Modeling.",
  url: "https://www.jmabiala.com",
  ogImage: "https://www.jmabiala.com/images/og-image.jpg",
  author: {
    name: "Jérémie N. Mabiala",
    email: "jeremie@jmabiala.com",
    twitter: "@jeremie_mabiala",
    linkedin: "jeremie-nlandu-mabiala",
    github: "jnlandu"
  },
  keywords: [
    "Jérémie N. Mabiala",
    "Jérémie Mabiala", 
    "Jérémie Nlandu Mabiala",
    "Jérémie Nlandu",
    "AI Researcher",
    "Mathematical Scientist",
    "Machine Learning",
    "Functional Data Analysis",
    "Mathematical Modeling",
    "AMMI",
    "AIMS Senegal",
    "Deep Learning",
    "Data Science",
    "Statistics",
    "Mathematics",
    "Research",
    "Academia",
    "PhD",
    "Publications"
  ]
}

// Generate metadata for pages
export function generateSEO({
  title,
  description,
  image = siteConfig.ogImage,
  url = siteConfig.url,
  noIndex = false,
  keywords = [],
  publishedTime,
  modifiedTime,
  authors = [siteConfig.author.name],
  type = "website"
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  type?: "website" | "article"
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const fullDescription = description || siteConfig.description
  const allKeywords = [...siteConfig.keywords, ...keywords]

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    authors: authors.map(name => ({ name })),
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    
    // Open Graph
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        }
      ],
      locale: 'en_US',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      creator: siteConfig.author.twitter,
      images: [image],
    },

    // Additional meta tags
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification tags (add your verification codes)
    verification: {
      google: 'a489a1e69e94e097', // Your existing Google verification
      // yandex: 'verification_code',
      // yahoo: 'verification_code',
      // other: 'verification_code',
    },

    // Canonical URL
    alternates: {
      canonical: url,
    },
  }

  // Article-specific metadata
  if (type === 'article' && (publishedTime || modifiedTime)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors,
      tags: keywords,
    }
  }

  return metadata
}

// Generate JSON-LD structured data
export function generateJSONLD({
  type = 'Person',
  name = siteConfig.author.name,
  description = siteConfig.description,
  url = siteConfig.url,
  image = siteConfig.ogImage,
  additionalData = {}
}: {
  type?: 'Person' | 'Article' | 'BlogPosting' | 'WebSite'
  name?: string
  description?: string
  url?: string
  image?: string
  additionalData?: Record<string, any>
} = {}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    image,
    ...additionalData
  }

  if (type === 'Person') {
    return {
      ...baseData,
      jobTitle: 'Resident Tutor in Machine Learning & AI Researcher',
      affiliation: {
        '@type': 'Organization',
        name: 'African Institute for Mathematical Sciences (AIMS) Senegal'
      },
      alumniOf: [
        {
          '@type': 'Organization',
          name: 'University of Stellenbosch'
        },
        {
          '@type': 'Organization', 
          name: 'African Institute for Mathematical Sciences'
        }
      ],
      knowsAbout: [
        'Machine Learning',
        'Artificial Intelligence', 
        'Functional Data Analysis',
        'Mathematical Modeling',
        'Deep Learning',
        'Statistics',
        'Mathematics'
      ],
      sameAs: [
        `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`,
        `https://linkedin.com/in/${siteConfig.author.linkedin}`,
        `https://github.com/${siteConfig.author.github}`
      ]
    }
  }

  if (type === 'WebSite') {
    return {
      ...baseData,
      author: {
        '@type': 'Person',
        name: siteConfig.author.name
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  }

  return baseData
}

// Blog post specific SEO
export function generateBlogSEO({
  title,
  excerpt,
  slug,
  publishedDate,
  modifiedDate,
  category,
  tags = [],
  coverImage,
  readingTime
}: {
  title: string
  excerpt: string
  slug: string
  publishedDate: string
  modifiedDate?: string
  category: string
  tags?: string[]
  coverImage?: string
  readingTime?: number
}) {
  const url = `${siteConfig.url}/blog/${slug}`
  const keywords = [category, ...tags, 'blog', 'tutorial', 'guide']
  
  const metadata = generateSEO({
    title,
    description: excerpt,
    url,
    image: coverImage || siteConfig.ogImage,
    keywords,
    publishedTime: publishedDate,
    modifiedTime: modifiedDate,
    type: 'article'
  })

  const jsonLD = generateJSONLD({
    type: 'BlogPosting',
    name: title,
    description: excerpt,
    url,
    image: coverImage || siteConfig.ogImage,
    additionalData: {
      headline: title,
      datePublished: publishedDate,
      dateModified: modifiedDate || publishedDate,
      author: {
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.url
      },
      publisher: {
        '@type': 'Person',
        name: siteConfig.author.name,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/images/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      articleSection: category,
      keywords: keywords.join(', '),
      ...(readingTime && {
        timeRequired: `PT${Math.ceil(readingTime)}M`
      })
    }
  })

  return { metadata, jsonLD }
}
