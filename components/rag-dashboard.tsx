'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  Database, 
  Search, 
  RefreshCw, 
  Trash2, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Info 
} from 'lucide-react'

interface RAGStats {
  enabled: boolean
  totalVectors?: number
  indexName?: string
  error?: string
}

interface IngestionStats {
  totalFiles: number
  successfulFiles: number
  failedFiles: number
  totalChunks: number
  errors: string[]
}

interface SearchResult {
  content: string
  metadata: any
  score: number
}

export default function RAGDashboard() {
  const [ragStats, setRagStats] = useState<RAGStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [ingestionProgress, setIngestionProgress] = useState<IngestionStats | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    checkRAGStatus()
  }, [])

  const checkRAGStatus = async () => {
    try {
      const response = await fetch('/api/rag/ingest')
      const data = await response.json()
      setRagStats(data)
    } catch (error) {
      console.error('Failed to check RAG status:', error)
      setMessage({ type: 'error', text: 'Failed to check RAG status' })
    }
  }

  const ingestPortfolio = async () => {
    setIsLoading(true)
    setMessage(null)
    
    try {
      const response = await fetch('/api/rag/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ingest_portfolio' }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setIngestionProgress(data.stats)
        setMessage({ type: 'success', text: `Ingestion completed! ${data.stats.successfulFiles}/${data.stats.totalFiles} files processed` })
        await checkRAGStatus()
      } else {
        setMessage({ type: 'error', text: data.error || 'Ingestion failed' })
      }
    } catch (error) {
      console.error('Ingestion failed:', error)
      setMessage({ type: 'error', text: 'Ingestion failed due to network error' })
    } finally {
      setIsLoading(false)
    }
  }

  const searchDocuments = async () => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/rag/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSearchResults(data.results)
        setMessage({ type: 'info', text: `Found ${data.results.length} relevant documents` })
      } else {
        setMessage({ type: 'error', text: data.error || 'Search failed' })
      }
    } catch (error) {
      console.error('Search failed:', error)
      setMessage({ type: 'error', text: 'Search failed due to network error' })
    } finally {
      setIsLoading(false)
    }
  }

  const uploadFile = async () => {
    if (!selectedFile) return
    
    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('contentType', 'uploaded_document')
    
    try {
      const response = await fetch('/api/rag/upload', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: `File "${data.fileName}" uploaded and ingested successfully` })
        setSelectedFile(null)
        await checkRAGStatus()
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' })
      }
    } catch (error) {
      console.error('Upload failed:', error)
      setMessage({ type: 'error', text: 'Upload failed due to network error' })
    } finally {
      setIsLoading(false)
    }
  }

  if (!ragStats) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            RAG System Dashboard
          </CardTitle>
          <CardDescription>Loading RAG system status...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!ragStats.enabled) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            RAG System Dashboard
          </CardTitle>
          <CardDescription>Retrieval-Augmented Generation system management</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              RAG system is not enabled. Please configure PINECONE_API_KEY and OPENAI_API_KEY in your environment variables.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            RAG System Dashboard
          </CardTitle>
          <CardDescription>
            Manage your knowledge base and vector search system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Enabled
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Total Vectors</p>
              <p className="text-2xl font-bold">{ragStats.totalVectors || 0}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Index Name</p>
              <p className="text-sm text-muted-foreground">{ragStats.indexName || 'Unknown'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {message && (
        <Alert className={
          message.type === 'success' ? 'border-green-200 bg-green-50' :
          message.type === 'error' ? 'border-red-200 bg-red-50' :
          'border-blue-200 bg-blue-50'
        }>
          {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
           message.type === 'error' ? <AlertCircle className="h-4 w-4" /> :
           <Info className="h-4 w-4" />}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Ingestion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Ingestion
            </CardTitle>
            <CardDescription>
              Ingest your portfolio content into the knowledge base
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={ingestPortfolio} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              Ingest Portfolio Content
            </Button>

            {ingestionProgress && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{ingestionProgress.successfulFiles}/{ingestionProgress.totalFiles} files</span>
                </div>
                <Progress 
                  value={(ingestionProgress.successfulFiles / ingestionProgress.totalFiles) * 100} 
                  className="w-full" 
                />
                {ingestionProgress.errors.length > 0 && (
                  <div className="text-sm text-red-600">
                    {ingestionProgress.errors.length} errors occurred
                  </div>
                )}
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Upload Additional Files</p>
              <div className="space-y-2">
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept=".md,.pdf,.docx,.html,.txt"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <Button 
                  onClick={uploadFile} 
                  disabled={!selectedFile || isLoading}
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload & Ingest
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Documents
            </CardTitle>
            <CardDescription>
              Test the semantic search functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter search query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchDocuments()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={searchDocuments} disabled={isLoading}>
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="text-xs">
                        {result.metadata.type || 'document'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Score: {result.score.toFixed(3)}
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      {result.metadata.source || 'Unknown source'}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {result.content.substring(0, 200)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            System Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={checkRAGStatus} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
            
            <Button variant="destructive" disabled>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Index (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
