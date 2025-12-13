---
name: "Phase 4: Create Feature Module Infrastructure"
overview: Establish the infrastructure for each feature module by creating types.ts files, hooks directories where needed, README.md documentation, and preparing for barrel exports. This phase completes the feature module structure.
todos:
  - id: create-blog-types
    content: Create src/features/blog/types.ts with blog-specific types extracted from components
    status: pending
  - id: create-blog-hooks-dir
    content: Create src/features/blog/hooks/ directory and extract hooks if needed
    status: pending
  - id: create-blog-readme
    content: Create src/features/blog/README.md with comprehensive documentation
    status: pending
  - id: create-portfolio-types
    content: Create src/features/portfolio/types.ts with portfolio-specific types
    status: pending
  - id: create-portfolio-readme
    content: Create src/features/portfolio/README.md with comprehensive documentation
    status: pending
  - id: create-zero-truth-types
    content: Create src/features/zero-truth/types.ts, re-exporting from zeroParser if needed
    status: pending
  - id: create-zero-truth-hooks-dir
    content: Create src/features/zero-truth/hooks/ directory and extract hooks if needed
    status: pending
  - id: create-zero-truth-readme
    content: Create src/features/zero-truth/README.md with comprehensive documentation
    status: pending
  - id: create-crypto-fabric-types
    content: Create src/features/crypto-fabric/types.ts with crypto-fabric-specific types
    status: pending
  - id: create-crypto-fabric-readme
    content: Create src/features/crypto-fabric/README.md with comprehensive documentation
    status: pending
  - id: create-interview-types
    content: Create src/features/interview/types.ts with interview-specific types
    status: pending
  - id: create-interview-readme
    content: Create src/features/interview/README.md with comprehensive documentation
    status: pending
  - id: create-profile-types
    content: Create src/features/profile/types.ts with profile-specific types extracted from components
    status: pending
  - id: create-profile-readme
    content: Create src/features/profile/README.md with comprehensive documentation
    status: pending
  - id: create-placeholder-barrel-exports
    content: Create placeholder index.ts files in each feature module (will be completed in Phase 6)
    status: pending
---

# Phase 4: Create Feature Module Infrastructure

## Objective

Complete the feature module structure by adding type definitions, hooks directories, comprehensive documentation, and preparing the foundation for barrel exports. Each feature module becomes a self-contained, well-documented domain.

## Prerequisites

- Phase 2 completed (components moved)
- Phase 3 completed (components renamed)

## Infrastructure Tasks by Feature Module

### Blog Feature (`src/features/blog/`)

#### 1. Create Types File

**File:** `src/features/blog/types.ts`

**Content to include:**

- Extract types from `BlogPost.tsx` component if any
- Extract types from `Blog.tsx` component if any
- Extract types from `BlogTeaser.tsx` component if any
- Reference shared types from `src/models/BlogPost.ts` if needed
- Define any blog-specific types:
  - Blog filter types
  - Blog navigation types
  - Blog state types

**Example structure:**

```typescript
// Re-export shared types
export type { BlogPost, ContentBlock } from '../../../models/BlogPost';

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
```

#### 2. Create Hooks Directory

**Directory:** `src/features/blog/hooks/`

**Potential hooks to create:**

- `useBlogPosts.ts` - Hook for fetching/managing blog posts
- `useBlogFilters.ts` - Hook for filtering blog posts
- `useBlogNavigation.ts` - Hook for pagination/navigation

**Note:** Only create hooks if they don't already exist in `src/hooks/`. If logic exists in components, consider extracting to hooks.

#### 3. Create README.md

**File:** `src/features/blog/README.md`

**Sections to include:**

- Purpose: Blog content management and display system
- Components overview:
  - `Blog.tsx` - Blog listing page
  - `BlogPost.tsx` - Individual blog post view
  - `BlogTeaser.tsx` - Blog post preview component
- Usage examples
- Dependencies:
  - Uses `src/data/blogData.ts` for content
  - Uses `src/models/BlogPost.ts` for types
  - Uses `src/utils/markdown.ts` for parsing
- Related hooks/types/utils
- Integration with routing

### Portfolio Feature (`src/features/portfolio/`)

#### 1. Create Types File

**File:** `src/features/portfolio/types.ts`

**Content to include:**

- Extract types from `JPMorganProject.tsx`
- Extract types from `StoneXProject.tsx`
- Define shared portfolio types:
  - Project metrics types
  - Project showcase types
  - Portfolio configuration types

**Example structure:**

```typescript
export interface ProjectMetric {
  label: string;
  value: string | number;
  description?: string;
}

export interface ProjectShowcase {
  title: string;
  company: string;
  description: string;
  metrics: ProjectMetric[];
  technologies: string[];
  achievements: string[];
}
```

#### 2. Create README.md

**File:** `src/features/portfolio/README.md`

**Sections to include:**

- Purpose: Enterprise project showcases and case studies
- Components overview:
  - `JPMorganProject.tsx` - JPMorgan PaymentNet showcase
  - `StoneXProject.tsx` - StoneX white-label app showcase
- Usage examples
- Project data structure
- Dependencies and related modules

### Zero Truth Feature (`src/features/zero-truth/`)

#### 1. Create Types File

**File:** `src/features/zero-truth/types.ts`

**Content to include:**

- Re-export types from `src/utils/zeroParser.ts` if they exist
- Define zero-truth specific types:
  - Navigation state types
  - Chapter/principle types (if not in zeroParser)
  - View mode types (mobile/desktop)

**Check `src/utils/zeroParser.ts` for existing types:**

- `ZeroContent`
- `Chapter`
- `Principle`
- Re-export these if they exist

#### 2. Create Hooks Directory

**Directory:** `src/features/zero-truth/hooks/`

**Potential hooks to create:**

- `useZeroNavigation.ts` - Hook for chapter/principle navigation
- `useZeroContent.ts` - Hook for parsing and managing zero content
- `useZeroViewMode.ts` - Hook for mobile/desktop view switching

#### 3. Create README.md

**File:** `src/features/zero-truth/README.md`

**Sections to include:**

- Purpose: Philosophical treatise presentation system
- Components overview:
  - `ZeroTruth.tsx` - Main zero truth presentation component
  - `ZeroNavigation.tsx` - Navigation controls for chapters/principles
- Content structure (chapters, principles)
- Dependencies:
  - Uses `src/utils/zeroParser.ts` for content parsing
  - Uses `public/zero.txt` for content source
- Navigation patterns
- Mobile vs desktop views

### Crypto Fabric Feature (`src/features/crypto-fabric/`)

#### 1. Create Types File

**File:** `src/features/crypto-fabric/types.ts`

**Content to include:**

- Extract types from `CryptoFabricHero.tsx`
- Define crypto fabric concept types:
  - Concept section types
  - Animation state types
  - Navigation types

#### 2. Create README.md

**File:** `src/features/crypto-fabric/README.md`

**Sections to include:**

- Purpose: Crypto Fabric conceptual framework presentation
- Components overview:
  - `CryptoFabricHero.tsx` - Hero section introducing Crypto Fabric concept
- Concept explanation
- Dependencies and integration points

### Interview Feature (`src/features/interview/`)

#### 1. Create Types File

**File:** `src/features/interview/types.ts`

**Content to include:**

- Extract types from `Interview.tsx`
- Extract types from `InterviewButton.tsx`
- Define interview-specific types:
  - Interview question/answer types
  - Interview state types
  - Navigation types

#### 2. Create README.md

**File:** `src/features/interview/README.md`

**Sections to include:**

- Purpose: Interactive interview experience presentation
- Components overview:
  - `Interview.tsx` - Main interview component
  - `InterviewButton.tsx` - Button to navigate to interview
- Interview content structure
- Dependencies and related features

### Profile Feature (`src/features/profile/`)

#### 1. Create Types File

**File:** `src/features/profile/types.ts`

**Content to include:**

- Extract types from `HeroSection.tsx`
- Extract types from `AboutMeSection.tsx`
- Extract types from `ServiceOffering.tsx`
- Extract types from `CTOTriage.tsx`
- Extract types from `SearchOptimizedSummary.tsx`
- Define shared profile types:
  - Service types
  - CTO triage types
  - Profile section types

**Example structure:**

```typescript
export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CTOTriageOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
```

#### 2. Create README.md

**File:** `src/features/profile/README.md`

**Sections to include:**

- Purpose: Professional profile and service offerings presentation
- Components overview:
  - `HeroSection.tsx` - Main hero section
  - `AboutMeSection.tsx` - About me section
  - `ServiceOffering.tsx` - Service offerings display
  - `CTOTriage.tsx` - CTO triage/interactive tool
  - `SearchOptimizedSummary.tsx` - SEO-optimized summary
- Component relationships
- Usage in main page
- Dependencies and integration

## General Infrastructure Tasks

### Create Barrel Export Files (Preparation)

**Note:** Full barrel exports will be created in Phase 6, but prepare the structure here.

For each feature module, create placeholder `index.ts` files:

- `src/features/blog/index.ts` (placeholder, will be completed in Phase 6)
- `src/features/portfolio/index.ts` (placeholder, will be completed in Phase 6)
- `src/features/zero-truth/index.ts` (placeholder, will be completed in Phase 6)
- `src/features/crypto-fabric/index.ts` (placeholder, will be completed in Phase 6)
- `src/features/interview/index.ts` (placeholder, will be completed in Phase 6)
- `src/features/profile/index.ts` (placeholder, will be completed in Phase 6)

**Placeholder content:**

```typescript
// Barrel exports will be added in Phase 6
// This file prepares the structure for feature module exports
```

### Extract Types from Components

For each component, identify:

1. **Props types** - Extract to `types.ts` if shared across components
2. **State types** - Extract if used in multiple places
3. **Configuration types** - Extract if used for configuration
4. **API/Data types** - Extract if used for data structures

**Guidelines:**

- Keep component-specific types in the component file
- Extract shared types to `types.ts`
- Re-export types from shared models/utils when appropriate

## README.md Template Structure

Each feature module README should follow this structure:

```markdown
# [Feature Name] Feature Module

## Purpose
[Description of the feature's purpose and domain]

## Components

### [ComponentName]
[Description of component, its purpose, and usage]

## Types

[Description of types defined in types.ts]

## Hooks

[Description of hooks if any]

## Usage Examples

[Code examples showing how to use the feature]

## Dependencies

- [List dependencies on other modules]
- [List dependencies on shared utilities]
- [List dependencies on external libraries]

## Related Modules

[Links to related feature modules or shared code]
```

## Validation Checklist

After creating infrastructure for each feature:

- [ ] `types.ts` file created with appropriate types
- [ ] Types extracted from components where appropriate
- [ ] `hooks/` directory created if hooks are needed
- [ ] `README.md` created with comprehe