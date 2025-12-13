---
name: "Phase 1: Create New Structure"
overview: Create the new directory structure for feature-based architecture, including all top-level directories and initial README files. This phase establishes the foundation without moving any files.
todos:
  - id: create-feature-dirs
    content: Create all feature module directories (blog, portfolio, zero-truth, crypto-fabric, interview, profile) with components/ and hooks/ subdirectories
    status: pending
  - id: create-ui-dirs
    content: Create UI primitive directories (buttons, icons, players)
    status: pending
  - id: create-layout-dir
    content: Create layout directory
    status: pending
  - id: create-backgrounds-dir
    content: Create backgrounds directory
    status: pending
  - id: create-foundation-dir
    content: Create foundation/seo directory structure
    status: pending
  - id: create-features-readme
    content: Create src/features/README.md with feature module guidelines
    status: pending
  - id: create-ui-readme
    content: Create src/ui/README.md with UI primitive guidelines
    status: pending
  - id: create-layout-readme
    content: Create src/layout/README.md with layout component guidelines
    status: pending
  - id: create-backgrounds-readme
    content: Create src/backgrounds/README.md with background component guidelines
    status: pending
  - id: create-foundation-readme
    content: Create src/foundation/README.md with foundation component guidelines
    status: pending
---

# Phase 1: Create New Structure

## Objective

Establish the new directory structure that will house the reorganized codebase. This phase creates empty directories and documentation, preparing for component migration in subsequent phases.

## Tasks

### 1. Create Feature Module Directories

Create the following directory structure under `src/features/`:

- `src/features/blog/components/`
- `src/features/blog/hooks/`
- `src/features/portfolio/components/`
- `src/features/zero-truth/components/`
- `src/features/zero-truth/hooks/`
- `src/features/crypto-fabric/components/`
- `src/features/interview/components/`
- `src/features/profile/components/`

### 2. Create UI Primitives Directories

Create the following directory structure under `src/ui/`:

- `src/ui/buttons/`
- `src/ui/icons/`
- `src/ui/players/`

### 3. Create Layout Directory

Create `src/layout/` directory

### 4. Create Backgrounds Directory

Create `src/backgrounds/` directory

### 5. Create Foundation Directory

Create `src/foundation/seo/` directory structure

### 6. Create README Files

Create comprehensive README.md files for each major directory:

**`src/features/README.md`**

- Purpose: Feature-based modules organized by domain
- Structure explanation
- Guidelines for adding new features
- Module naming conventions

**`src/ui/README.md`**

- Purpose: Reusable UI primitives and components
- Organization by category (buttons, icons, players)
- When to add components here vs features
- Usage guidelines

**`src/layout/README.md`**

- Purpose: Layout and navigation components
- Components that affect overall page structure
- Usage patterns

**`src/backgrounds/README.md`**

- Purpose: Background and animation components
- Three.js and animation patterns
- Performance considerations

**`src/foundation/README.md`**

- Purpose: Core infrastructure components (SEO, etc.)
- Cross-cutting concerns
- Foundation vs feature distinction

## Validation

- All directories exist and are empty (except README files)
- README files provide clear guidance
- Directory structure matches proposed architecture
- No files moved yet (this is structure-only phase)

## Dependencies

None - this is the first phase

## Next Phase

Phase 2 will move components into these new directories