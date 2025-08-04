import { NextRequest, NextResponse } from 'next/server';
import { getIngestionService } from '@/lib/ingestion-service';
import { isRAGEnabled } from '@/lib/rag-service';
import { DocumentParserFactory } from '@/lib/document-parsers';

export async function POST(request: NextRequest) {
  try {
    // Check if RAG is enabled
    if (!isRAGEnabled()) {
      return NextResponse.json(
        { error: 'RAG system is not enabled' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const contentType = formData.get('contentType') as string || 'document';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check if file type is supported
    const supportedExtensions = DocumentParserFactory.getSupportedExtensions();
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!supportedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { 
          error: `Unsupported file type: ${fileExtension}`,
          supportedTypes: supportedExtensions
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Ingest the file
    const ingestionService = getIngestionService();
    const success = await ingestionService.ingestFromBuffer(buffer, file.name, contentType);

    if (success) {
      return NextResponse.json({
        success: true,
        message: `File "${file.name}" ingested successfully`,
        fileName: file.name,
        fileSize: file.size,
        contentType,
      });
    } else {
      return NextResponse.json(
        { error: `Failed to ingest file: ${file.name}` },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('File upload API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload and ingest file',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Get supported file types
export async function GET() {
  try {
    const supportedExtensions = DocumentParserFactory.getSupportedExtensions();
    
    return NextResponse.json({
      supportedTypes: supportedExtensions,
      maxFileSize: '10MB', // You can configure this
      ragEnabled: isRAGEnabled(),
    });

  } catch (error) {
    console.error('File upload info API error:', error);
    return NextResponse.json(
      { error: 'Failed to get upload information' },
      { status: 500 }
    );
  }
}
