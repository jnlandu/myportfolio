import RAGDashboard from '@/components/rag-dashboard'

export default function RAGDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">RAG System Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Manage your knowledge base and vector search system
        </p>
      </div>
      <RAGDashboard />
    </div>
  )
}

export const metadata = {
  title: 'RAG Dashboard - Portfolio',
  description: 'Manage the Retrieval-Augmented Generation system for enhanced AI chat',
}
