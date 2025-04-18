import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Define the directory where your posts are stored
const postsDirectory = path.join(process.cwd(), 'content/blog')

export type PostData = {
  id: string
  content: string
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
  videoUrl?: string
}

// Function to get data for a single post by ID (filename without .md)
export function getPostData(id: string): PostData {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    // Handle case where file doesn't exist, e.g., throw an error or return null
    throw new Error(`Post with id "${id}" not found at ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id and content
  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as { // Type assertion for front matter fields
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
      videoUrl?: string
    }),
  }
}

// Function to get sorted data for all posts (for the blog index page)
export function getAllPostsData(): PostData[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'))
  
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')
    return getPostData(id)
  })

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Function to get all post IDs (for generating static paths)
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'))

  // Returns an array that looks like:
  // [
  //   { params: { id: 'gaussian-processes' } },
  //   { params: { id: 'another-post' } }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}