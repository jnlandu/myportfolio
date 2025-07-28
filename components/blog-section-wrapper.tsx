import { BlogSection } from "./blog-section"
import { getAllBlogPosts } from "@/lib/blog"

export async function BlogSectionWrapper() {
  const posts = await getAllBlogPosts()
  return <BlogSection posts={posts} />
}
