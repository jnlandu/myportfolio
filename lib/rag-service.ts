import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';

export interface RAGConfig {
  chunkSize: number;
  chunkOverlap: number;
  topK: number;
}

export class RAGService {
  private pinecone: Pinecone;
  private embeddings: OpenAIEmbeddings;
  private config: RAGConfig;
  private vectorStore: PineconeStore | null = null;

  constructor() {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('PINECONE_API_KEY is required');
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required');
    }

    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small', // Cost-effective and fast
    });

    this.config = {
      chunkSize: parseInt(process.env.RAG_CHUNK_SIZE || '1000'),
      chunkOverlap: parseInt(process.env.RAG_CHUNK_OVERLAP || '200'),
      topK: parseInt(process.env.RAG_TOP_K || '5'),
    };
  }

  async initializeVectorStore(): Promise<void> {
    try {
      const indexName = process.env.PINECONE_INDEX_NAME || 'portfolio-rag';
      const index = this.pinecone.index(indexName);
      
      this.vectorStore = await PineconeStore.fromExistingIndex(
        this.embeddings,
        { pineconeIndex: index }
      );
      
      console.log('✅ Vector store initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize vector store:', error);
      throw error;
    }
  }

  async processDocuments(documents: Document[]): Promise<void> {
    if (!this.vectorStore) {
      await this.initializeVectorStore();
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: this.config.chunkSize,
      chunkOverlap: this.config.chunkOverlap,
      separators: ['\n\n', '\n', '. ', ' ', ''],
    });

    console.log(`📄 Processing ${documents.length} documents...`);
    
    for (const doc of documents) {
      try {
        const splitDocs = await textSplitter.splitDocuments([doc]);
        
        // Add metadata for better retrieval
        const enrichedDocs = splitDocs.map((splitDoc, index) => ({
          ...splitDoc,
          metadata: {
            ...splitDoc.metadata,
            chunkIndex: index,
            totalChunks: splitDocs.length,
            source: doc.metadata?.source || 'unknown',
            type: doc.metadata?.type || 'document',
          },
        }));

        await this.vectorStore!.addDocuments(enrichedDocs);
        console.log(`✅ Processed: ${doc.metadata?.source || 'unknown'} (${splitDocs.length} chunks)`);
      } catch (error) {
        console.error(`❌ Failed to process document: ${doc.metadata?.source}`, error);
      }
    }
  }

  async searchSimilarDocuments(query: string): Promise<Document[]> {
    if (!this.vectorStore) {
      await this.initializeVectorStore();
    }

    try {
      const results = await this.vectorStore!.similaritySearch(
        query,
        this.config.topK
      );
      
      console.log(`🔍 Found ${results.length} relevant documents for query: "${query}"`);
      return results;
    } catch (error) {
      console.error('❌ Failed to search documents:', error);
      return [];
    }
  }

  async searchWithScores(query: string): Promise<Array<{ document: Document; score: number }>> {
    if (!this.vectorStore) {
      await this.initializeVectorStore();
    }

    try {
      const results = await this.vectorStore!.similaritySearchWithScore(
        query,
        this.config.topK
      );
      
      return results.map(([document, score]) => ({ document, score }));
    } catch (error) {
      console.error('❌ Failed to search documents with scores:', error);
      return [];
    }
  }

  async buildRAGContext(query: string): Promise<string> {
    const relevantDocs = await this.searchSimilarDocuments(query);
    
    if (relevantDocs.length === 0) {
      return '';
    }

    // Build context from relevant documents
    const context = relevantDocs
      .map((doc, index) => {
        const source = doc.metadata?.source || 'unknown';
        const type = doc.metadata?.type || 'document';
        return `[Source ${index + 1}: ${source} (${type})]\n${doc.pageContent}\n`;
      })
      .join('\n---\n\n');

    console.log(`📚 Built RAG context with ${relevantDocs.length} relevant documents`);
    return context;
  }

  // Health check method
  async isHealthy(): Promise<boolean> {
    try {
      if (!this.vectorStore) {
        await this.initializeVectorStore();
      }
      
      // Simple search to test connectivity
      await this.vectorStore!.similaritySearch('test', 1);
      return true;
    } catch (error) {
      console.error('❌ RAG service health check failed:', error);
      return false;
    }
  }

  // Get statistics about the vector store
  async getStats(): Promise<{ totalVectors: number; indexName: string }> {
    try {
      const indexName = process.env.PINECONE_INDEX_NAME || 'portfolio-rag';
      const index = this.pinecone.index(indexName);
      const stats = await index.describeIndexStats();
      
      return {
        totalVectors: stats.totalRecordCount || 0,
        indexName,
      };
    } catch (error) {
      console.error('❌ Failed to get RAG stats:', error);
      return { totalVectors: 0, indexName: 'unknown' };
    }
  }
}

// Singleton instance
let ragServiceInstance: RAGService | null = null;

export function getRagService(): RAGService {
  if (!isRAGEnabled()) {
    throw new Error('RAG service is not enabled. Please configure PINECONE_API_KEY and OPENAI_API_KEY.');
  }
  
  if (!ragServiceInstance) {
    ragServiceInstance = new RAGService();
  }
  return ragServiceInstance;
}

export const isRAGEnabled = (): boolean => {
  return process.env.RAG_ENABLED === 'true' && 
         !!process.env.PINECONE_API_KEY && 
         !!process.env.OPENAI_API_KEY;
};
