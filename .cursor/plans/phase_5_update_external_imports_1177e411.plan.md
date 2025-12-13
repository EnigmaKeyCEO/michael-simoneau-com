---
name: "Phase 5: Update External Imports"
overview: Update all import statements in files that consume the moved components to use the new feature-based paths. This includes route definitions, page components, App.tsx, and test files.
todos:
  - id: update-main-tsx-imports
    content: Update all component imports in src/main.tsx to use new feature-based paths
    status: completed
  - id: update-main-tsx-lazy-load
    content: Update lazy loading path in src/main.tsx from NewMainPage to MainPage
    status: completed
  - id: update-main-page-imports
    content: Update all component imports in src/pages/MainPage.tsx to use new feature-based paths
    status: completed
  - id: update-main-page-usage
    content: Update component usage in MainPage.tsx (NewHeroSection to HeroSection)
    status: completed
  - id: update-full-profile-imports
    content: Update component imports in src/pages/FullProfile.tsx to use new paths
    status: completed
  - id: update-crypto-fabric-imports
    content: Update component imports in src/pages/CryptoFabric.tsx to use new paths
    status: completed
  - id: update-app-tsx-imports
    content: Update component imports in src/App.tsx to use new paths
    status: completed
  - id: find-test-imports
    content: Search for all test files that import from components directory
    status: completed
  - id: update-test-imports
    content: Update all test file imports to use new feature-based paths
    status: completed
  - id: verify-cross-component-imports
    content: Verify and fix any cross-component imports within moved components
    status: completed
  - id: verify-build
    content: Verify application builds without errors after import updates
    status: completed
  - id: verify-routes
    content: Verify all routes resolve correctly and lazy loading works
    status: completed
---

# Phase 5: Update External Imports

## Objective

Update all import statements throughout the codebase that reference moved components to use the new feature-based directory structure. This ensures the application builds and runs correctly after the reorganization.

## Prerequisites

- Phase 2 completed (components moved)
- Phase 3 completed (components renamed)
- Phase 4 completed (feature infrastructure created)

## Import Path Mapping

### Feature Components

- `Blog`, `BlogPost`, `BlogTeaser` → `features/blog/components/`
- `JPMorganProject`, `StoneXProject` → `features/portfolio/components/`
- `ZeroTruth`, `ZeroNavigation` → `features/zero-truth/components/`
- `CryptoFabricHero` → `features/crypto-fabric/components/`
- `Interview`, `InterviewButton` → `features/interview/components/`
- `HeroSection`, `AboutMeSection`, `ServiceOffering`, `CTOTriage`, `SearchOptimizedSummary` → `features/profile/components/`

### UI Primitives

- `InteractiveButton` → `ui/buttons/`
- `XIcon` → `ui/icons/`
- `SpeechPlayer`, `UniversalPlayer` → `ui/players/`

### Layout Components

- `MainNav`, `ContactFooter`, `NotFound`, `CookieNotice` → `layout/`

### Backgrounds

- `AnimatedBackground`, `NebulaStormBackground`, `QuantumBackground` → `backgrounds/`

### Foundation

- `Seo` → `foundation/seo/`

## Files Requiring Import Updates

### 1. Route Configuration (`src/main.tsx`)

**Current imports:**

```typescript
import { NotFound } from "./components/NotFound";
import { Blog } from "./components/Blog";
import { BlogPost } from "./components/BlogPost";
import { Interview } from "./components/Interview";
import { ZeroTruth } from "./components/ZeroTruth";
```

**Updated imports:**

```typescript
import { NotFound } from "./layout/NotFound";
import { Blog } from "./features/blog/components/Blog";
import { BlogPost } from "./features/blog/components/BlogPost";
import { Interview } from "./features/interview/components/Interview";
import { ZeroTruth } from "./features/zero-truth/components/ZeroTruth";
```

**Lazy import update:**

```typescript
// Current
const LazyMainPage = lazy(() => 
  import("./pages/NewMainPage").then(module => ({
    default: module.NewMainPage
  }))
);

// Updated
const LazyMainPage = lazy(() => 
  import("./pages/MainPage").then(module => ({
    default: module.MainPage
  }))
);
```

### 2. Main Page (`src/pages/MainPage.tsx` - renamed from NewMainPage.tsx)

**Current imports:**

```typescript
import { MainNav } from '../components/MainNav';
import { NewHeroSection } from '../components/NewHeroSection';
import { StoneXProject, JPMorganProject } from '../components/portfolio';
import { AboutMeSection } from '../components/AboutMeSection';
import { ServiceOffering } from '../components/ServiceOffering';
import { CTOTriage } from '../components/CTOTriage';
import { BlogTeaser } from '../components/BlogTeaser';
import { ContactFooter } from '../components/ContactFooter';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Seo } from '../components/Seo';
import { SearchOptimizedSummary } from '../components/SearchOptimizedSummary';
import { CryptoFabricHero } from '../components/CryptoFabricHero';
```

**Updated imports:**

```typescript
import { MainNav } from '../layout/MainNav';
import { HeroSection } from '../features/profile/components/HeroSection';
import { StoneXProject } from '../features/portfolio/components/StoneXProject';
import { JPMorganProject } from '../features/portfolio/components/JPMorganProject';
import { AboutMeSection } from '../features/profile/components/AboutMeSection';
import { ServiceOffering } from '../features/profile/components/ServiceOffering';
import { CTOTriage } from '../features/profile/components/CTOTriage';
import { BlogTeaser } from '../features/blog/components/BlogTeaser';
import { ContactFooter } from '../layout/ContactFooter';
import { AnimatedBackground } from '../backgrounds/AnimatedBackground';
import { Seo } from '../foundation/seo/Seo';
import { SearchOptimizedSummary } from '../features/profile/components/SearchOptimizedSummary';
import { CryptoFabricHero } from '../features/crypto-fabric/components/CryptoFabricHero';
```

**Component usage update:**

- `<NewHeroSection />` → `<HeroSection />`

### 3. Full Profile Page (`src/pages/FullProfile.tsx`)

**Current imports:**

```typescript
import { AnimatedBackground } from "../components/AnimatedBackground";
import { MainNav } from "../components/MainNav";
import { Seo } from "../components/Seo";
```

**Updated imports:**

```typescript
import { AnimatedBackground } from "../backgrounds/AnimatedBackground";
import { MainNav } from "../layout/MainNav";
import { Seo } from "../foundation/seo/Seo";
```

### 4. Crypto Fabric Page (`src/pages/CryptoFabric.tsx`)

**Current imports:**

```typescript
import { AnimatedBackground } from "../components/AnimatedBackground";
import { MainNav } from "../components/MainNav";
import { Seo } from "../components/Seo";
```

**Updated imports:**

```typescript
import { AnimatedBackground } from "../backgrounds/AnimatedBackground";
import { MainNav } from "../layout/MainNav";
import { Seo } from "../foundation/seo/Seo";
```

### 5. App Component (`src/App.tsx`)

**Check for imports:**

- Verify if `App.tsx` imports any moved components
- Update if necessary

**Current imports (from earlier read):**

```typescript
import { SpeechProvider } from "./contexts/SpeechContext";
import { CookieNotice } from "./components/CookieNotice";
```

**Updated imports:**

```typescript
import { SpeechProvider } from "./contexts/SpeechContext";
import { CookieNotice } from "./layout/CookieNotice";
```

### 6. Test Files (`src/__tests__/`)

**Files to check and update:**

- `src/__tests__/e2e/FullProfile.test.ts`
- Any other test files importing components

**Update pattern:**

- Find all imports from `../components/` or `../../components/`
- Update to new feature-based paths
- Update relative path depth as needed

### 7. Component Cross-References

**Within moved components that import other moved components:**

**Blog components:**

- `BlogPost.tsx` may import `XIcon` → update to `../../../ui/icons/XIcon`
- `BlogPost.tsx` may import `MainNav` → update to `../../../layout/MainNav`
- `BlogPost.tsx` may import `Seo` → update to `../../../foundation/seo/Seo`

**Zero Truth components:**

- `ZeroTruth.tsx` imports `NebulaStormBackground` → update to `../../../backgrounds/NebulaStormBackground`
- `ZeroTruth.tsx` imports `MainNav` → update to `../../../layout/MainNav`
- `ZeroTruth.tsx` imports `Seo` → update to `../../../foundation/seo/Seo`

**Profile components:**

- `HeroSection.tsx` may import `InterviewButton` → update to `../../../features/interview/components/InterviewButton`
- `ServiceOffering.tsx` imports `InteractiveButton` → update to `../../../ui/buttons/InteractiveButton`

**Interview components:**

- `Interview.tsx` may import `MainNav`, `Seo`, `AnimatedBackground` → update paths

## Import Path Reference Guide

### From `src/pages/` to features:

- To blog: `../features/blog/components/`
- To portfolio: `../features/portfolio/components/`
- To zero-truth: `../features/zero-truth/components/`
- To crypto-fabric: `../features/crypto-fabric/components/`
- To interview: `../features/interview/components/`
- To profile: `../features/profile/components/`

### From `src/pages/` to other directories:

- To layout: `../layout/`
- To backgrounds: `../backgrounds/`
- To foundation: `../foundation/seo/`
- To ui: `../ui/{category}/`

### From `src/main.tsx`:

- To features: `./features/{feature}/components/`
- To layout: `./layout/`
- To backgrounds: `./backgrounds/`
- To foundation: `./foundation/seo/`

### From `src/App.tsx`:

- To layout: `./layout/`
- To contexts: `./contexts/` (unchanged)

## Systematic Update Process

### Step 1: Update Route Configuration

1. Update `src/main.tsx` imports
2. Update lazy loading paths
3. Verify route definitions still work

### Step 2: Update Page Components

1. Update `src/pages/MainPage.tsx` (all imports)
2. Update `src/pages/FullProfile.tsx` imports
3. Update `src/pages/CryptoFabric.tsx` imports
4. Update component usage (e.g., `<NewHeroSection />` → `<HeroSection />`)

### Step 3: Update App Component

1. Update `src/App.tsx` imports if needed

### Step 4: Update Test Files

1. Find all test files in `src/__tests__/`
2. Update imports to new paths
3. Update relative path depth as needed

### Step 5: Verify Cross-Component Imports

1. Check moved components for imports of other moved components
2. Update those imports (should have been done in Phase 2, but verify)

## Validation Checklist

After updating imports:

- [ ] `src/main.tsx` imports updated
- [ ] `src/pages/MainPage.tsx` imports updated
- [ ] `src/pages/FullProfile.tsx` imports updated
- [ ] `src/pages/CryptoFabric.tsx` imports updated
- [ ] `src/App.tsx` imports updated
- [ ] All test files updated
- [ ] Application builds without errors
- [ ] No TypeScript errors
- [ ] Routes resolve correctly
- [ ] Lazy loading works
- [ ] All components render correctly

## Common Import Patterns

### Single Component Import

```typescript
// Old
import { Blog } from "./components/Blog";

// New
import { Blog } from "./features/blog/components/Blog";
```

### Multiple Components from Same Feature

```typescript
// Old
import { Blog } from "./components/Blog";
import { BlogPost } from "./components/BlogPost";

// New (can be separate or combined)
import { Blog } from "./features/blog/components/Blog";
import { BlogPost } from "./features/blog/components/BlogPost";
```

### Portfolio Barrel Import (Temporary)

```typescript
// Old
import { StoneXProject, JPMorganProject } from '../components/portfolio';

// New (until Phase 6 creates barrel exports)
import { StoneXProject } from '../features/portfolio/components/StoneXProject';
import { JPMorganProject } from '../features/portfolio/components/JPMorganProject';
```

## Error Handling

If imports fail:

1. Verify file paths are correct
2. Check relative path depth
3. Verify component exports match import names
4. Check for case sensitivity issues
5. Verify TypeScript path aliases if configured

## Dependencies

- Requires Phases 2, 3, and 4 completion
- Enables Phase 6 (barrel exports can then simplify imports)
- Sets up for Phase 7 (documentation updates)

## Next Phase

Phase 6 will create barrel exports (`index.ts` files) that allow cleaner imports like:

```typescript
import { Blog, BlogPost } from './features/blog';
```