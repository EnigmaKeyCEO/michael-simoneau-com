// Re-export shared types
export type { BlogPost, ContentBlock } from '../../models/BlogPost';

// Blog-specific types
export interface BlogFilters {
  category?: string;
  tag?: string;
  searchQuery?: string;
}

export interface BlogNavigationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

