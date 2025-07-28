import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  readTime?: string
  watchTime?: string
  category: string
  tags: string[]
  type: "video" | "text"
  views: number
  featured?: boolean
  author?: string
  content?: string
  videoUrl?: string
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllBlogPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the id
      return {
        id,
        content: matterResult.content,
        ...matterResult.data,
      } as BlogPost
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    return {
      id: slug,
      content: matterResult.content,
      ...matterResult.data,
    } as BlogPost  
  } catch (error) {
    return null
  }
}

export function getBlogCategories(): string[] {
  const posts = getAllBlogPosts()
  const categories = [...new Set(posts.map(post => post.category))]
  return categories.sort()
}

export function getBlogTags(): string[] {
  const posts = getAllBlogPosts()
  const allTags = posts.flatMap(post => post.tags || [])
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.sort()
}
