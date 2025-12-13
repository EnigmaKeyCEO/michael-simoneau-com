# Features Directory

## Purpose

This directory contains feature-based modules organized by business domain. Each feature module represents a distinct area of functionality or content domain within the application.

## Structure

Each feature module follows a consistent structure:

```
features/{feature-name}/
├── components/          # Feature-specific React components
├── hooks/              # Feature-specific React hooks (optional)
├── types.ts           # Feature-specific TypeScript types
├── index.ts           # Barrel exports for clean imports
└── README.md          # Feature-specific documentation
```

## Feature Modules

### blog
Blog content management and display system. Includes blog listing, individual post views, and blog teasers.

### portfolio
Enterprise project showcases and case studies. Displays major projects like StoneX and JPMorgan.

### zero-truth
Philosophical treatise presentation system. Complex navigation for chapters and principles.

### crypto-fabric
Crypto Fabric conceptual framework presentation. Introduces the Crypto Fabric concept.

### interview
Interactive interview experience presentation. Interview content and navigation.

### profile
Professional profile and service offerings. Hero section, about me, services, CTO triage, and SEO-optimized summaries.

## Guidelines for Adding New Features

1. **Create a new directory** under `features/` using kebab-case naming (e.g., `new-feature/`)
2. **Create subdirectories**:
   - `components/` - Required for feature components
   - `hooks/` - Optional, only if feature-specific hooks are needed
3. **Create required files**:
   - `types.ts` - Feature-specific types
   - `index.ts` - Barrel exports
   - `README.md` - Feature documentation
4. **Follow naming conventions**:
   - Directory: kebab-case (`zero-truth`, `crypto-fabric`)
   - Components: PascalCase (`BlogPost.tsx`, `HeroSection.tsx`)
   - Types: PascalCase interfaces/types

## Module Naming Conventions

- **Directories**: Use kebab-case (`zero-truth/`, `crypto-fabric/`)
- **Components**: Use PascalCase (`BlogPost.tsx`, `HeroSection.tsx`)
- **Hooks**: Use camelCase with `use` prefix (`useBlogPosts.ts`)
- **Types**: Use PascalCase (`BlogFilters`, `ProjectMetric`)

## Import Patterns

### Using Barrel Exports (Recommended)
```typescript
import { Blog, BlogPost } from './features/blog';
import { HeroSection, AboutMeSection } from './features/profile';
```

### Direct Imports (When Needed)
```typescript
import { Blog } from './features/blog/components/Blog';
```

## Dependencies

- Feature modules may import from:
  - `../ui/` - UI primitives
  - `../layout/` - Layout components
  - `../backgrounds/` - Background components
  - `../foundation/` - Foundation components
  - `../../services/` - Shared services
  - `../../contexts/` - React contexts
  - `../../hooks/` - Shared hooks
  - `../../utils/` - Utilities
  - `../../models/` - Type definitions
  - `../../data/` - Static data

## Cross-Feature Dependencies

Avoid importing from other feature modules when possible. If necessary, use direct imports:
```typescript
import { InterviewButton } from '../interview/components/InterviewButton';
```

