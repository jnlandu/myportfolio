import { NextRequest, NextResponse } from 'next/server';
import { getRagService, isRAGEnabled } from '@/lib/rag-service';

export async function POST(request: NextRequest) {
  try {
    // Check if RAG is enabled
    if (!isRAGEnabled()) {
      return NextResponse.json(
        { error: 'RAG system is not enabled' },
        { status: 503 }
      );
    }

    const { query, topK = 5 } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const ragService = getRagService();
    
    // Search with scores for better debugging
    const results = await ragService.searchWithScores(query);

    return NextResponse.json({
      success: true,
      query,
      results: results.map(({ document, score }) => ({
        content: document.pageContent,
        metadata: document.metadata,
        score,
      })),
      totalResults: results.length,
    });

  } catch (error) {
    console.error('RAG search API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to search documents',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
