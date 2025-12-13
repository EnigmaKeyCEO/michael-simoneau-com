// Re-export types from zeroParser
export type { ZeroContent, Chapter, Principle } from '../../utils/zeroParser';

// Zero Truth specific types
export interface ZeroNavigationState {
  activeChapterId: string | null;
  activePrincipleId: string | null;
}

export type ZeroViewMode = 'mobile' | 'desktop';

