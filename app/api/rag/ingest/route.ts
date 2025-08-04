import { NextRequest, NextResponse } from 'next/server';
import { getIngestionService } from '@/lib/ingestion-service';
import { isRAGEnabled } from '@/lib/rag-service';

export async function POST(request: NextRequest) {
  // Early return if RAG is not enabled to prevent build errors
  if (!isRAGEnabled()) {
    return NextResponse.json(
      { error: 'RAG system is not enabled. Please configure PINECONE_API_KEY and OPENAI_API_KEY.' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { action } = body;

    const ingestionService = getIngestionService();

    switch (action) {
      case 'ingest_portfolio':
        console.log('🚀 Starting portfolio content ingestion...');
        const stats = await ingestionService.ingestPortfolioContent();
        return NextResponse.json({
          success: true,
          message: 'Portfolio content ingestion completed',
          stats,
        });

      case 'ingest_file':
        const { filePath, contentType } = body;
        if (!filePath) {
          return NextResponse.json(
            { error: 'filePath is required for file ingestion' },
            { status: 400 }
          );
        }
        
        const fileSuccess = await ingestionService.ingestFile(filePath, contentType);
        return NextResponse.json({
          success: fileSuccess,
          message: fileSuccess ? 'File ingested successfully' : 'File ingestion failed',
        });

      case 'clear_index':
        const clearSuccess = await ingestionService.clearIndex();
        return NextResponse.json({
          success: clearSuccess,
          message: clearSuccess ? 'Index cleared successfully' : 'Index clearing failed',
        });

      case 'get_stats':
        const indexStats = await ingestionService.getIngestionStats();
        return NextResponse.json({
          success: true,
          stats: indexStats,
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: ingest_portfolio, ingest_file, clear_index, get_stats' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('RAG ingestion API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error during ingestion',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Early return if RAG is not enabled to prevent build errors
  if (!isRAGEnabled()) {
    return NextResponse.json({
      enabled: false,
      error: 'RAG system is not enabled. Please configure PINECONE_API_KEY and OPENAI_API_KEY.',
    });
  }

  try {
    // Get ingestion stats
    const ingestionService = getIngestionService();
    const stats = await ingestionService.getIngestionStats();

    return NextResponse.json({
      enabled: true,
      stats,
      supportedFormats: ['.md', '.pdf', '.docx', '.html', '.txt'],
    });

  } catch (error) {
    console.error('RAG status API error:', error);
    return NextResponse.json(
      { 
        enabled: false,
        error: 'Failed to get RAG status',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
