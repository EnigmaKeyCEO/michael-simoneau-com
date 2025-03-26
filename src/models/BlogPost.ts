// FROM HOMELESS TO $200M ARCHITECT
// Quantum-resistant blog post models for our firestore database #quantumReady #billionDollarProof

export type ContentBlockType = 'paragraph' | 'heading' | 'code' | 'list' | 'callout';

export interface BaseContentBlock {
  type: ContentBlockType;
  content: string;
}

export interface ParagraphBlock extends BaseContentBlock {
  type: 'paragraph';
}

export interface HeadingBlock extends BaseContentBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface CodeBlock extends BaseContentBlock {
  type: 'code';
  language: string;
}

export interface ListBlock extends BaseContentBlock {
  type: 'list';
  items: string[];
}

export interface CalloutBlock extends BaseContentBlock {
  type: 'callout';
}

export type ContentBlock = ParagraphBlock | HeadingBlock | CodeBlock | ListBlock | CalloutBlock;

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  heroImage: string;
  featured?: boolean;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
  publishedAt?: number; // timestamp, undefined if draft
  // AI-generated metadata
  generatedImageUrl?: string;
  generatedImagePrompt?: string;
}

// Helper functions to create content blocks
export const createParagraph = (content: string): ParagraphBlock => ({
  type: 'paragraph',
  content
});

export const createHeading = (content: string, level: 1 | 2 | 3 | 4 | 5 | 6): HeadingBlock => ({
  type: 'heading',
  level,
  content
});

export const createCode = (content: string, language: string): CodeBlock => ({
  type: 'code',
  language,
  content
});

export const createList = (items: string[]): ListBlock => ({
  type: 'list',
  items,
  content: '' // Content field is required by BaseContentBlock but unused in this type
});

export const createCallout = (content: string): CalloutBlock => ({
  type: 'callout',
  content
}); 