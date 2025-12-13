---
name: "Phase 2: Move and Reorganize Components"
overview: Move all components from the flat structure into their new feature-based, domain-organized locations. This phase physically relocates files and updates internal imports within moved components.
todos:
  - id: move-blog-components
    content: Move Blog.tsx, BlogPost.tsx, BlogTeaser.tsx to features/blog/components/ and update internal imports
    status: completed
  - id: move-portfolio-components
    content: Move JPMorganProject.tsx, StoneXProject.tsx to features/portfolio/components/ and update internal imports
    status: completed
  - id: move-zero-truth-components
    content: Move ZeroTruth.tsx, ZeroNavigation.tsx to features/zero-truth/components/ and update internal imports
    status: completed
  - id: move-crypto-fabric-components
    content: Move CryptoFabricHero.tsx to features/crypto-fabric/components/ and update internal imports
    status: completed
  - id: move-interview-components
    content: Move Interview.tsx, InterviewButton.tsx to features/interview/components/ and update internal imports
    status: completed
  - id: move-profile-components
    content: Move AboutMeSection.tsx, ServiceOffering.tsx, CTOTriage.tsx, SearchOptimizedSummary.tsx, NewHeroSection.tsx to features/profile/components/ and update internal imports
    status: completed
  - id: move-ui-buttons
    content: Move InteractiveButton.tsx to ui/buttons/ and update internal imports
    status: completed
  - id: move-ui-icons
    content: Move XIcon.tsx to ui/icons/ and update internal imports
    status: completed
  - id: move-ui-players
    content: Move SpeechPlayer.tsx, UniversalPlayer.tsx to ui/players/ and update internal imports
    status: completed
  - id: move-layout-components
    content: Move MainNav.tsx, ContactFooter.tsx, NotFound.tsx, CookieNotice.tsx to layout/ and update internal imports
    status: completed
  - id: move-background-components
    content: Move AnimatedBackground.tsx, NebulaStormBackground.tsx, QuantumBackground.tsx to backgrounds/ and update internal imports
    status: completed
  - id: move-foundation-components
    content: Move Seo.tsx to foundation/seo/ and update internal imports
    status: completed
---

# Phase 2: Move and Reorganize Components

## Objective
Physically move components from `src/components/` into their new domain-organized locations. Update imports within moved components to reflect new paths. This phase establishes the new component organization.

## Prerequisites
- Phase 1 must be completed (directories created)
- All new directory structure exists

## Migration Tasks

### Feature Modules Migration

#### Blog Feature (`src/features/blog/components/`)
Move from `src/components/`:
- `Blog.tsx` → `src/features/blog/components/Blog.tsx`
- `BlogPost.tsx` → `src/features/blog/components/BlogPost.tsx`
- `BlogTeaser.tsx` → `src/features/blog/components/BlogTeaser.tsx`

**Import updates within moved files:**
- Update imports referencing other blog components
- Update imports for shared utilities (`../utils/markdown.ts` → `../../../utils/markdown.ts`)
- Update imports for models (`../models/BlogPost.ts` → `../../../models/BlogPost.ts`)
- Update imports for data (`../data/blogData.ts` → `../../../data/blogData.ts`)
- Update imports for contexts (`../contexts/` → `../../../contexts/`)
- Update imports for hooks (`../hooks/` → `../../../hooks/`)

#### Portfolio Feature (`src/features/portfolio/components/`)
Move from `src/components/portfolio/`:
- `JPMorganProject.tsx` → `src/features/portfolio/components/JPMorganProject.tsx`
- `StoneXProject.tsx` → `src/features/portfolio/components/StoneXProject.tsx`
- Delete `src/components/portfolio/index.ts` (will recreate in Phase 6)

**Import updates within moved files:**
- Update relative imports to reflect new depth
- Update any imports referencing other portfolio components

#### Zero Truth Feature (`src/features/zero-truth/components/`)
Move from `src/components/`:
- `ZeroTruth.tsx` → `src/features/zero-truth/components/ZeroTruth.tsx`
- `ZeroNavigation.tsx` → `src/features/zero-truth/components/ZeroNavigation.tsx`

**Import updates within moved files:**
- Update imports for `NebulaStormBackground` (will be in `../../../backgrounds/`)
- Update imports for `MainNav` (will be in `../../../layout/`)
- Update imports for `Seo` (will be in `../../../foundation/seo/`)
- Update imports for zero parser (`../utils/zeroParser.ts` → `../../../utils/zeroParser.ts`)

#### Crypto Fabric Feature (`src/features/crypto-fabric/components/`)
Move from `src/components/`:
- `CryptoFabricHero.tsx` → `src/features/crypto-fabric/components/CryptoFabricHero.tsx`

**Import updates within moved files:**
- Update any relative imports to reflect new depth

#### Interview Feature (`src/features/interview/components/`)
Move from `src/components/`:
- `Interview.tsx` → `src/features/interview/components/Interview.tsx`
- `InterviewButton.tsx` → `src/features/interview/components/InterviewButton.tsx`

**Import updates within moved files:**
- Update relative imports to reflect new depth
- Update imports for shared components (MainNav, Seo, etc.)

#### Profile Feature (`src/features/profile/components/`)
Move from `src/components/`:
- `AboutMeSection.tsx` → `src/features/profile/components/AboutMeSection.tsx`
- `ServiceOffering.tsx` → `src/features/profile/components/ServiceOffering.tsx`
- `CTOTriage.tsx` → `src/features/profile/components/CTOTriage.tsx`
- `SearchOptimizedSummary.tsx` → `src/features/profile/components/SearchOptimizedSummary.tsx`
- `NewHeroSection.tsx` → `src/features/profile/components/NewHeroSection.tsx` (will rename in Phase 3)

**Import updates within moved files:**
- Update imports for `InteractiveButton` (will be in `../../../ui/buttons/`)
- Update imports for `InterviewButton` (will be in `../../../features/interview/components/`)
- Update relative imports to reflect new depth

### UI Primitives Migration

#### Buttons (`src/ui/buttons/`)
Move from `src/components/`:
- `InteractiveButton.tsx` → `src/ui/buttons/InteractiveButton.tsx`

**Import updates:**
- Update any relative imports within the component

#### Icons (`src/ui/icons/`)
Move from `src/components/`:
- `XIcon.tsx` → `src/ui/icons/XIcon.tsx`

**Import updates:**
- Update any relative imports within the component

#### Players (`src/ui/players/`)
Move from `src/components/`:
- `SpeechPlayer.tsx` → `src/ui/players/SpeechPlayer.tsx`
- `UniversalPlayer.tsx` → `src/ui/players/UniversalPlayer.tsx`

**Import updates:**
- Update relative imports to reflect new depth
- Update imports for contexts (`../contexts/` → `../../../contexts/`)

### Layout Components Migration (`src/layout/`)
Move from `src/components/`:
- `MainNav.tsx` → `src/layout/MainNav.tsx`
- `ContactFooter.tsx` → `src/layout/ContactFooter.tsx`
- `NotFound.tsx` → `src/layout/NotFound.tsx`
- `CookieNotice.tsx` → `src/layout/CookieNotice.tsx`

**Import updates within moved files:**
- Update imports for `XIcon` (will be in `../ui/icons/`)
- Update imports for contexts (`../contexts/` → `../../contexts/`)
- Update imports for services (`../services/` → `../../services/`)
- Update relative imports to reflect new depth

### Backgrounds Migration (`src/backgrounds/`)
Move from `src/components/`:
- `AnimatedBackground.tsx` → `src/backgrounds/AnimatedBackground.tsx`
- `NebulaStormBackground.tsx` → `src/backgrounds/NebulaStormBackground.tsx`
- `QuantumBackground.tsx` → `src/backgrounds/QuantumBackground.tsx`

**Import updates within moved files:**
- Update relative imports to reflect new depth
- Update imports for three.js dependencies (should remain the same)

### Foundation Migration (`src/foundation/seo/`)
Move from `src/components/`:
- `Seo.tsx` → `src/foundation/seo/Seo.tsx`

**Import updates:**
- Update relative imports to reflect new depth

## Import Path Patterns

When updating imports, use these relative path patterns:

**From feature components:**
- To shared contexts: `../../../contexts/`
- To shared hooks: `../../../hooks/`
- To shared services: `../../../services/`
- To shared utils: `../../../utils/`
- To shared models: `../../../models/`
- To shared data: `../../../data/`
- To layout: `../../../layout/`
- To backgrounds: `../../../backgrounds/`
- To foundation: `../../../foundation/`
- To ui: `../../../ui/`
- To other features: `../../../features/{feature-name}/components/`

**From layout components:**
- To contexts: `../../contexts/`
- To services: `../../services/`
- To ui: `../ui/`

**From ui components:**
- To contexts: `../../../contexts/`
- To services: `../../../services/`

## Validation Checklist

After each migration group:
- [ ] Files moved successfully
- [ ] Internal imports updated within moved files
- [ ] No broken import paths
- [ ] File structure matches expected organization

## Important Notes

1. **Do NOT update external imports yet** - Files that import these components (like `main.tsx`, `pages/`) will be updated in Phase 5
2. **Preserve file contents** - Only update import paths, don't change component logic
3. **Test incrementally** - After moving each feature module, verify no syntax errors
4. **Handle circular dependencies** - Be aware of components importing each other

## Files That Will Import Moved Components (Updated in Phase 5)

- `src/main.tsx`
- `src/pages/NewMainPage.tsx` (will be renamed to `MainPage.tsx` in Phase 3)
- `src/pages/FullProfile.tsx`
- `src/pages/CryptoFabric.tsx`
- `src/App.tsx`
- Test files in `src/__tests__/`

## Dependencies

- Requires Phase 1 completion
- Sets up structure for Phase 3 (renaming), Phase 4 (infrastructure), Phase 5 (external imports)

## Next Phase

Phase 3 will rename `NewHeroSection` to `HeroSection` and update all references