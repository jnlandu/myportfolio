import fs from 'fs/promises';
import path from 'path';
import { Document } from 'langchain/document';

// Lazy imports to prevent build issues when dependencies aren't available
let pdfParse: any = null;
let mammoth: any = null;
let cheerio: any = null;

// Dynamically import dependencies only when needed
async function getPdfParse() {
  if (!pdfParse) {
    try {
      pdfParse = await import('pdf-parse');
    } catch (error) {
      console.warn('pdf-parse not available:', error);
      throw new Error('PDF parsing not available');
    }
  }
  return pdfParse;
}

async function getMammoth() {
  if (!mammoth) {
    try {
      mammoth = await import('mammoth');
    } catch (error) {
      console.warn('mammoth not available:', error);
      throw new Error('DOCX parsing not available');
    }
  }
  return mammoth;
}

async function getCheerio() {
  if (!cheerio) {
    try {
      cheerio = await import('cheerio');
    } catch (error) {
      console.warn('cheerio not available:', error);
      throw new Error('HTML parsing not available');
    }
  }
  return cheerio;
}

export interface DocumentParser {
  parse(filePath: string, content?: Buffer): Promise<Document>;
}

export class MarkdownParser implements DocumentParser {
  async parse(filePath: string): Promise<Document> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const fileName = path.basename(filePath, '.md');
      
      // Extract frontmatter and content
      const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
      const match = content.match(frontmatterRegex);
      
      let metadata: Record<string, any> = {
        source: fileName,
        type: 'blog_post',
        filePath,
      };
      
      let pageContent = content;
      
      if (match) {
        const [, frontmatter, body] = match;
        pageContent = body.trim();
        
        // Parse YAML frontmatter (simple key: value parsing)
        const lines = frontmatter.split('\n');
        for (const line of lines) {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
            metadata[key] = value;
          }
        }
      }
      
      return new Document({
        pageContent: pageContent.trim(),
        metadata,
      });
    } catch (error) {
      console.error(`Failed to parse markdown file: ${filePath}`, error);
      throw error;
    }
  }
}

export class PDFParser implements DocumentParser {
  async parse(filePath: string, content?: Buffer): Promise<Document> {
    try {
      const pdfParse = await getPdfParse();
      const buffer = content || await fs.readFile(filePath);
      const data = await pdfParse.default(buffer);
      
      const fileName = path.basename(filePath, '.pdf');
      
      return new Document({
        pageContent: data.text.trim(),
        metadata: {
          source: fileName,
          type: 'pdf',
          filePath,
          pages: data.numpages,
          info: data.info,
        },
      });
    } catch (error) {
      console.error(`Failed to parse PDF file: ${filePath}`, error);
      throw error;
    }
  }
}

export class DOCXParser implements DocumentParser {
  async parse(filePath: string, content?: Buffer): Promise<Document> {
    try {
      const mammoth = await getMammoth();
      const buffer = content || await fs.readFile(filePath);
      const result = await mammoth.extractRawText({ buffer });
      
      const fileName = path.basename(filePath, '.docx');
      
      return new Document({
        pageContent: result.value.trim(),
        metadata: {
          source: fileName,
          type: 'docx',
          filePath,
          warnings: result.messages,
        },
      });
    } catch (error) {
      console.error(`Failed to parse DOCX file: ${filePath}`, error);
      throw error;
    }
  }
}

export class HTMLParser implements DocumentParser {
  async parse(filePath: string, content?: Buffer): Promise<Document> {
    try {
      const cheerio = await getCheerio();
      const htmlContent = content?.toString() || await fs.readFile(filePath, 'utf-8');
      const $ = cheerio.load(htmlContent);
      
      // Remove script and style elements
      $('script, style, nav, header, footer').remove();
      
      // Extract text content
      const text = $('body').text().replace(/\s+/g, ' ').trim();
      const title = $('title').text() || $('h1').first().text() || path.basename(filePath);
      
      const fileName = path.basename(filePath, '.html');
      
      return new Document({
        pageContent: text,
        metadata: {
          source: fileName,
          type: 'html',
          filePath,
          title,
        },
      });
    } catch (error) {
      console.error(`Failed to parse HTML file: ${filePath}`, error);
      throw error;
    }
  }
}

export class TextParser implements DocumentParser {
  async parse(filePath: string, content?: Buffer): Promise<Document> {
    try {
      const textContent = content?.toString() || await fs.readFile(filePath, 'utf-8');
      const fileName = path.basename(filePath);
      
      return new Document({
        pageContent: textContent.trim(),
        metadata: {
          source: fileName,
          type: 'text',
          filePath,
        },
      });
    } catch (error) {
      console.error(`Failed to parse text file: ${filePath}`, error);
      throw error;
    }
  }
}

export class DocumentParserFactory {
  private static parsers = new Map<string, DocumentParser>([
    ['.md', new MarkdownParser()],
    ['.markdown', new MarkdownParser()],
    ['.pdf', new PDFParser()],
    ['.docx', new DOCXParser()],
    ['.doc', new DOCXParser()],
    ['.html', new HTMLParser()],
    ['.htm', new HTMLParser()],
    ['.txt', new TextParser()],
    ['.text', new TextParser()],
    ['.readme', new TextParser()],
  ]);

  static getParser(filePath: string): DocumentParser | null {
    const ext = path.extname(filePath).toLowerCase();
    return this.parsers.get(ext) || null;
  }

  static getSupportedExtensions(): string[] {
    return Array.from(this.parsers.keys());
  }

  static async parseFile(filePath: string, content?: Buffer): Promise<Document | null> {
    const parser = this.getParser(filePath);
    if (!parser) {
      console.warn(`No parser available for file: ${filePath}`);
      return null;
    }

    try {
      return await parser.parse(filePath, content);
    } catch (error) {
      console.error(`Failed to parse file: ${filePath}`, error);
      return null;
    }
  }
}

// Utility function to parse multiple files
export async function parseDirectory(
  directoryPath: string,
  recursive: boolean = true
): Promise<Document[]> {
  const documents: Document[] = [];
  
  try {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directoryPath, entry.name);
      
      if (entry.isDirectory() && recursive) {
        const subDocs = await parseDirectory(fullPath, recursive);
        documents.push(...subDocs);
      } else if (entry.isFile()) {
        const doc = await DocumentParserFactory.parseFile(fullPath);
        if (doc) {
          documents.push(doc);
        }
      }
    }
  } catch (error) {
    console.error(`Failed to parse directory: ${directoryPath}`, error);
  }
  
  return documents;
}
