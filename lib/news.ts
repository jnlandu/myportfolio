import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  date: string
  category: "research" | "academic" | "event" | "award" | "publication" | "media"
  tags: string[]
  image?: string
  isNew?: boolean
  featured?: boolean
}

const newsDirectory = path.join(process.cwd(), 'content/news')

export function getAllNewsItems(): NewsItem[] {
  try {
    if (!fs.existsSync(newsDirectory)) {
      console.warn('News directory does not exist:', newsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(newsDirectory)
    const allNewsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(newsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          id,
          title: data.title || '',
          summary: data.summary || '',
          content,
          date: data.date || '',
          category: data.category || 'academic',
          tags: data.tags || [],
          image: data.image,
          isNew: data.isNew || false,
          featured: data.featured || false,
        } as NewsItem
      })

    // Sort by date (newest first)
    return allNewsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading news items:', error)
    return []
  }
}

export function getNewsItemBySlug(slug: string): NewsItem | null {
  try {
    const allNews = getAllNewsItems()
    return allNews.find(item => item.id === slug) || null
  } catch (error) {
    console.error('Error getting news item:', error)
    return null
  }
}

export function getFeaturedNews(): NewsItem | null {
  const allNews = getAllNewsItems()
  return allNews.find(item => item.featured) || null
}

export function getNewsByCategory(category: NewsItem['category']): NewsItem[] {
  const allNews = getAllNewsItems()
  return allNews.filter(item => item.category === category)
}

export function getRecentNews(limit: number = 4): NewsItem[] {
  const allNews = getAllNewsItems()
  return allNews.filter(item => !item.featured).slice(0, limit)
}

// Generate static params for Next.js
export function generateNewsStaticParams() {
  const allNews = getAllNewsItems()
  return allNews.map((item) => ({
    id: item.id,
  }))
}
