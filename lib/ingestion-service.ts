import { getRagService, isRAGEnabled } from './rag-service';
import { parseDirectory, DocumentParserFactory } from './document-parsers';
import { Document } from 'langchain/document';
import fs from 'fs/promises';
import path from 'path';

export interface IngestionStats {
  totalFiles: number;
  successfulFiles: number;
  failedFiles: number;
  totalChunks: number;
  errors: string[];
}

export class DocumentIngestionService {
  private ragService: any = null;

  constructor() {
    // Only initialize RAG service if enabled
    if (isRAGEnabled()) {
      try {
        this.ragService = getRagService();
      } catch (error) {
        console.warn('RAG service not available during initialization:', error);
      }
    }
  }

  async ingestPortfolioContent(): Promise<IngestionStats> {
    if (!this.ragService) {
      throw new Error('RAG service is not available. Please configure PINECONE_API_KEY and OPENAI_API_KEY.');
    }

    const stats: IngestionStats = {
      totalFiles: 0,
      successfulFiles: 0,
      failedFiles: 0,
      totalChunks: 0,
      errors: [],
    };

    console.log('🚀 Starting portfolio content ingestion...');

    try {
      // Define content sources
      const contentSources = [
        {
          path: '/Users/jeremie/dev/projects/myportfolio/v3/content/blog',
          type: 'blog_posts',
          recursive: false,
        },
        {
          path: '/Users/jeremie/dev/projects/myportfolio/v3/content/news',
          type: 'news_articles',
          recursive: false,
        },
        // Add more sources as needed
        // {
        //   path: '/Users/jeremie/dev/projects/myportfolio/v3/docs',
        //   type: 'documentation',
        //   recursive: true,
        // },
      ];

      // Process each content source
      for (const source of contentSources) {
        await this.ingestDirectory(source.path, source.type, source.recursive, stats);
      }

      // Process individual important files
      await this.ingestSpecialFiles(stats);

      console.log('✅ Portfolio content ingestion completed!');
      console.log(`📊 Stats: ${stats.successfulFiles}/${stats.totalFiles} files processed, ${stats.totalChunks} chunks created`);
      
      if (stats.errors.length > 0) {
        console.log('⚠️ Errors encountered:');
        stats.errors.forEach(error => console.log(`  - ${error}`));
      }

    } catch (error) {
      console.error('❌ Fatal error during ingestion:', error);
      stats.errors.push(`Fatal error: ${error}`);
    }

    return stats;
  }

  private async ingestDirectory(
    directoryPath: string,
    contentType: string,
    recursive: boolean,
    stats: IngestionStats
  ): Promise<void> {
    try {
      console.log(`📁 Processing directory: ${directoryPath}`);
      
      const exists = await fs.access(directoryPath).then(() => true).catch(() => false);
      if (!exists) {
        console.log(`⚠️ Directory not found: ${directoryPath}`);
        return;
      }

      const documents = await parseDirectory(directoryPath, recursive);
      
      // Enrich documents with content type
      const enrichedDocs = documents.map(doc => ({
        ...doc,
        metadata: {
          ...doc.metadata,
          contentType,
          ingestionDate: new Date().toISOString(),
        },
      }));

      stats.totalFiles += enrichedDocs.length;

      if (enrichedDocs.length > 0) {
        await this.ragService.processDocuments(enrichedDocs);
        stats.successfulFiles += enrichedDocs.length;
        stats.totalChunks += enrichedDocs.length; // Approximate, will be updated after splitting
      }

    } catch (error) {
      console.error(`❌ Failed to ingest directory: ${directoryPath}`, error);
      stats.errors.push(`Directory ${directoryPath}: ${error}`);
    }
  }

  private async ingestSpecialFiles(stats: IngestionStats): Promise<void> {
    const specialFiles = [
      {
        path: '/Users/jeremie/dev/projects/myportfolio/v3/README.md',
        type: 'project_readme',
        title: 'Portfolio Project README',
      },
      // Add more special files like CV, papers, etc.
      // {
      //   path: '/path/to/your/cv.pdf',
      //   type: 'cv',
      //   title: 'Curriculum Vitae',
      // },
      // {
      //   path: '/path/to/your/research-paper.pdf',
      //   type: 'research_paper',
      //   title: 'Research Paper Title',
      // },
    ];

    for (const file of specialFiles) {
      try {
        const exists = await fs.access(file.path).then(() => true).catch(() => false);
        if (!exists) {
          console.log(`⚠️ Special file not found: ${file.path}`);
          continue;
        }

        console.log(`📄 Processing special file: ${file.title}`);
        
        const document = await DocumentParserFactory.parseFile(file.path);
        if (document) {
          // Enrich with special file metadata
          document.metadata = {
            ...document.metadata,
            contentType: file.type,
            title: file.title,
            ingestionDate: new Date().toISOString(),
            isSpecialFile: true,
          };

          await this.ragService.processDocuments([document]);
          stats.totalFiles += 1;
          stats.successfulFiles += 1;
          stats.totalChunks += 1;
        } else {
          stats.failedFiles += 1;
          stats.errors.push(`Failed to parse special file: ${file.path}`);
        }

      } catch (error) {
        console.error(`❌ Failed to process special file: ${file.path}`, error);
        stats.totalFiles += 1;
        stats.failedFiles += 1;
        stats.errors.push(`Special file ${file.path}: ${error}`);
      }
    }
  }

  async ingestFile(filePath: string, contentType?: string): Promise<boolean> {
    try {
      console.log(`📄 Ingesting single file: ${filePath}`);
      
      const document = await DocumentParserFactory.parseFile(filePath);
      if (!document) {
        console.error(`❌ Failed to parse file: ${filePath}`);
        return false;
      }

      // Enrich with metadata
      document.metadata = {
        ...document.metadata,
        contentType: contentType || 'document',
        ingestionDate: new Date().toISOString(),
      };

      await this.ragService.processDocuments([document]);
      console.log(`✅ Successfully ingested: ${filePath}`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to ingest file: ${filePath}`, error);
      return false;
    }
  }

  async ingestFromBuffer(
    content: Buffer,
    fileName: string,
    contentType?: string
  ): Promise<boolean> {
    try {
      console.log(`📄 Ingesting from buffer: ${fileName}`);
      
      const document = await DocumentParserFactory.parseFile(fileName, content);
      if (!document) {
        console.error(`❌ Failed to parse buffer content: ${fileName}`);
        return false;
      }

      // Enrich with metadata
      document.metadata = {
        ...document.metadata,
        contentType: contentType || 'document',
        ingestionDate: new Date().toISOString(),
        source: fileName,
      };

      await this.ragService.processDocuments([document]);
      console.log(`✅ Successfully ingested from buffer: ${fileName}`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to ingest from buffer: ${fileName}`, error);
      return false;
    }
  }

  async clearIndex(): Promise<boolean> {
    try {
      console.log('🗑️ Clearing RAG index...');
      // Note: Pinecone doesn't have a direct "clear all" method
      // You would need to delete and recreate the index
      // For now, we'll implement a warning
      console.log('⚠️ Index clearing not implemented. Please manually delete the Pinecone index if needed.');
      return true;
    } catch (error) {
      console.error('❌ Failed to clear index:', error);
      return false;
    }
  }

  async getIngestionStats(): Promise<any> {
    if (!this.ragService) {
      return { totalVectors: 0, indexName: 'unknown', error: 'RAG not enabled' };
    }

    try {
      return await this.ragService.getStats();
    } catch (error) {
      console.error('❌ Failed to get ingestion stats:', error);
      return { totalVectors: 0, indexName: 'unknown' };
    }
  }
}

// Singleton instance
let ingestionServiceInstance: DocumentIngestionService | null = null;

export function getIngestionService(): DocumentIngestionService {
  if (!isRAGEnabled()) {
    throw new Error('Ingestion service is not available. RAG is not enabled.');
  }
  
  if (!ingestionServiceInstance) {
    ingestionServiceInstance = new DocumentIngestionService();
  }
  return ingestionServiceInstance;
}
