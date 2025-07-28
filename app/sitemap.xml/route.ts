import { getAllBlogPosts, type BlogPost } from '@/lib/blog'
import { siteConfig } from '@/lib/seo'

export async function GET() {
  const posts = getAllBlogPosts()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>${siteConfig.url}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  ${posts.map((post: BlogPost) => `
  <url>
    <loc>${siteConfig.url}/blog/${post.id}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
