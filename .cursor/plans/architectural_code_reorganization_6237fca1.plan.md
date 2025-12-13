---
name: Architectural Code Reorganization
overview: Reorganize the codebase into a feature-based, domain-driven architecture that reflects the sophisticated and thought-provoking nature of the site's content. This includes grouping components by domain, separating UI primitives, establishing clear boundaries, and implementing consistent naming conventions.
todos: []
---

# Architectural Code Reorganization Plan

## Overview

Transform the flat component structure into a feature-based, domain-driven architecture that mirrors the sophisticated content. The reorganization will create clear boundaries, improve maintainability, and reflect the enterprise architecture principles evident in the site's content.

## Current State Analysis

**Issues Identified:**

- Flat component structure (30+ components in single directory)
- Mixed concerns (UI primitives, features, layouts, backgrounds all together)
- Inconsistent naming (`NewHeroSection` vs `HeroSection` patterns)
- No clear domain boundaries (blog, portfolio, zero-truth, crypto-fabric mixed)
- Background/animation components scattered
- No feature modules with associated hooks/types/utils

**Content Domains Identified:**

1. **Zero Truth** - Philosophical treatise with complex navigation
2. **Crypto Fabric** - Conceptual framework presentation
3. **Portfolio** - Enterprise project showcases (StoneX, JPMorgan)
4. **Blog** - Content management system
5. **Interview** - Interactive interview experience
6. **Profile** - Professional profile and services
7. **Core UI** - Navigation, backgrounds, SEO, primitives

## Proposed Architecture

### New Directory Structure

```
src/
├── features/                    # Feature-based modules
│   ├── blog/
│   │   ├── components/
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   └── BlogTeaser.tsx
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── README.md
│   ├── portfolio/
│   │   ├── components/
│   │   │   ├── PortfolioShowcase.tsx
│   │   │   ├── JPMorganProject.tsx
│   │   │   └── StoneXProject.tsx
│   │   ├── types.ts
│   │   └── README.md
│   ├── zero-truth/
│   │   ├── components/
│   │   │   ├── ZeroTruth.tsx
│   │   │   └── ZeroNavigation.tsx
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── README.md
│   ├── crypto-fabric/
│   │   ├── components/
│   │   │   └── CryptoFabricHero.tsx
│   │   ├── types.ts
│   │   └── README.md
│   ├── interview/
│   │   ├── components/
│   │   │   ├── Interview.tsx
│   │   │   └── InterviewButton.tsx
│   │   ├── types.ts
│   │   └── README.md
│   └── profile/
│       ├── components/
│       │   ├── HeroSection.tsx          # Renamed from NewHeroSection
│       │   ├── AboutMeSection.tsx
│       │   ├── ServiceOffering.tsx
│       │   ├── CTOTriage.tsx
│       │   └── SearchOptimizedSummary.tsx
│       ├── types.ts
│       └── README.md
├── ui/                           # Reusable UI primitives
│   ├── buttons/
│   │   ├── InteractiveButton.tsx
│   │   └── index.ts
│   ├── icons/
│   │   ├── XIcon.tsx
│   │   └── index.ts
│   ├── players/
│   │   ├── SpeechPlayer.tsx
│   │   ├── UniversalPlayer.tsx
│   │   └── index.ts
│   └── README.md
├── layout/                       # Layout components
│   ├── MainNav.tsx
│   ├── ContactFooter.tsx
│   ├── NotFound.tsx
│   ├── CookieNotice.tsx
│   └── README.md
├── backgrounds/                  # Background/animation components
│   ├── AnimatedBackground.tsx
│   ├── NebulaStormBackground.tsx
│   ├── QuantumBackground.tsx
│   └── README.md
├── foundation/                   # Core infrastructure
│   ├── seo/
│   │   ├── Seo.tsx
│   │   └── index.ts
│   └── README.md
├── pages/                        # Page-level components (unchanged)
├── contexts/                     # React contexts (unchanged)
├── hooks/                       # Shared hooks (unchanged)
├── services/                     # Services (unchanged)
├── models/                       # Type definitions (unchanged)
├── data/                         # Static data (unchanged)
└── utils/                        # Utilities (unchanged)
```

## Implementation Steps

Each phase has a detailed plan document with comprehensive tasks, validation checklists, and implementation guidance.

### Phase 1: Create New Structure

**📋 Full Plan:** [phase_1_create_new_structure_9d6261d8.plan.md](~/.cursor/plans/phase_1_create_new_structure_9d6261d8.plan.md)

1. Create new directory structure (`features/`, `ui/`, `layout/`, `backgrounds/`, `foundation/`)
2. Create README.md files for each major directory explaining purpose and guidelines

### Phase 2: Move and Reorganize Components

**📋 Full Plan:** [phase_2_move_and_reorganize_components_16291359.plan.md](~/.cursor/plans/phase_2_move_and_reorganize_components_16291359.plan.md)

**Feature Modules:**

- Move blog components → `features/blog/components/`
- Move portfolio components → `features/portfolio/components/`
- Move zero-truth components → `features/zero-truth/components/`
- Move crypto-fabric components → `features/crypto-fabric/components/`
- Move interview components → `features/interview/components/`
- Move profile components → `features/profile/components/`

**UI Primitives:**

- Move `InteractiveButton.tsx` → `ui/buttons/`
- Move `XIcon.tsx` → `ui/icons/`
- Move `SpeechPlayer.tsx`, `UniversalPlayer.tsx` → `ui/players/`

**Layout Components:**

- Move `MainNav.tsx`, `ContactFooter.tsx`, `NotFound.tsx`, `CookieNotice.tsx` → `layout/`

**Backgrounds:**

- Move `AnimatedBackground.tsx`, `NebulaStormBackground.tsx`, `QuantumBackground.tsx` → `backgrounds/`

**Foundation:**

- Move `Seo.tsx` → `foundation/seo/`

### Phase 3: Rename Components

**📋 Full Plan:** [phase_3_rename_components_69cb362b.plan.md](~/.cursor/plans/phase_3_rename_components_69cb362b.plan.md)

- `NewHeroSection.tsx` → `HeroSection.tsx` (in `features/profile/components/`)
- `NewMainPage.tsx` → `MainPage.tsx` (in `pages/`)
- Update all imports across the codebase

### Phase 4: Create Feature Module Infrastructure

**📋 Full Plan:** [phase_4_create_feature_module_infrastructure_abe8480d.plan.md](~/.cursor/plans/phase_4_create_feature_module_infrastructure_abe8480d.plan.md)

- Add `types.ts` files to each feature module
- Add `hooks/` directories where needed (e.g., `features/blog/hooks/`)
- Create placeholder `index.ts` barrel exports for each feature module
- Add README.md files documenting each feature module

### Phase 5: Update External Imports

**📋 Full Plan:** [phase_5_update_external_imports_1177e411.plan.md](~/.cursor/plans/phase_5_update_external_imports_1177e411.plan.md)

- Update all import statements in:
  - `src/main.tsx`
  - `src/pages/MainPage.tsx` (renamed from `NewMainPage.tsx`)
  - All component files
  - Test files

### Phase 6: Create Barrel Exports

**📋 Full Plan:** [phase_6_create_barrel_exports_a55f9142.plan.md](~/.cursor/plans/phase_6_create_barrel_exports_a55f9142.plan.md)

- Create `index.ts` files for feature modules to enable clean imports:
  ```typescript
  // features/blog/index.ts
  export { Blog } from './components/Blog';
  export { BlogPost } from './components/BlogPost';
  export { BlogTeaser } from './components/BlogTeaser';
  export type * from './types';
  ```


### Phase 7: Update Documentation

**📋 Full Plan:** [phase_7_update_documentation_d0131378.plan.md](~/.cursor/plans/phase_7_update_documentation_d0131378.plan.md)

- Update `src/README.md` with new architecture
- Add architecture diagrams (Mermaid)
- Document feature module patterns
- Update `.cursorrules` compliance
- Update root `README.md`

## Key Files to Modify

### Critical Import Updates:

- `src/main.tsx` - Route definitions
- `src/pages/NewMainPage.tsx` → `src/pages/MainPage.tsx` - Main page imports
- `src/pages/FullProfile.tsx` - Profile page imports
- `src/pages/CryptoFabric.tsx` - Crypto fabric imports
- All feature components importing other components

### New Files to Create:

- Feature module `index.ts` barrel exports
- Feature module `README.md` files
- `ui/README.md`, `layout/README.md`, `backgrounds/README.md`, `foundation/README.md`

## Naming Conventions

**Components:**

- Use PascalCase: `HeroSection.tsx`, `BlogPost.tsx`
- Remove "New" prefix: `NewHeroSection` → `HeroSection`
- Use descriptive names: `ServiceOffering` (not `SecurityAudit`)

**Directories:**

- Use kebab-case: `zero-truth/`, `crypto-fabric/`
- Feature modules: `features/{domain}/`
- UI primitives: `ui/{category}/`

**Barrel Exports:**

- Each feature module exports via `index.ts`
- Enables: `import { Blog, BlogPost } from '@/features/blog'`

## Benefits

1. **Clarity**: Clear separation of concerns and domain boundaries
2. **Scalability**: Easy to add new features without cluttering
3. **Maintainability**: Related code grouped together
4. **Discoverability**: Developers can find code by domain
5. **Reflects Content**: Architecture mirrors the sophisticated, domain-driven nature of the site
6. **Enterprise Patterns**: Follows feature-based architecture common in enterprise applications

## Migration Strategy

1. Create new directories first (non-breaking)
2. Move files incrementally, updating imports as we go
3. Test after each feature module migration
4. Update documentation progressively
5. Final cleanup: remove old empty directories

## Testing Considerations

- Update test imports to match new structure
- Ensure lazy loading still works with new paths
- Verify all routes resolve correctly
- Check that dynamic imports in `main.tsx` still function

## Documentation Requirements

Each feature module README should include:

- Purpose and domain description
- Component overview
- Usage examples
- Related hooks/types/utils
- Dependencies on other modules