import { BlogAnalyticsDashboard } from '@/components/blog-analytics'
import { MainNav } from '@/components/main-nav'
import { Badge } from '@/components/ui/badge'

export default function BlogAnalyticsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-border">
        <div className="container">
          <MainNav />
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-10">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="mb-0">
                Analytics
              </Badge>
              <h1 className="text-3xl font-bold">Blog Performance</h1>
            </div>
            <p className="text-gray-400 max-w-2xl">
              Track how your content is performing with detailed analytics and engagement metrics.
            </p>
          </div>

          {/* Dashboard */}
          <BlogAnalyticsDashboard />
        </div>
      </div>
    </main>
  )
}
