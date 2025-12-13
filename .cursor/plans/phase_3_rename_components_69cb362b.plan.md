---
name: "Phase 3: Rename Components"
overview: Rename components to remove "New" prefix and use consistent, descriptive naming. Update all references across the codebase, including imports, exports, and component usage.
todos:
  - id: rename-hero-section-file
    content: Rename NewHeroSection.tsx to HeroSection.tsx in features/profile/components/
    status: completed
  - id: update-hero-section-export
    content: Update export name from NewHeroSection to HeroSection in HeroSection.tsx
    status: completed
  - id: find-hero-section-references
    content: Search codebase for all references to NewHeroSection (imports, usage, comments)
    status: completed
  - id: update-hero-section-imports
    content: Update all import statements for HeroSection to use new path and name
    status: completed
  - id: update-hero-section-usage
    content: Update all JSX usage of NewHeroSection to HeroSection
    status: completed
  - id: rename-main-page-file
    content: Rename NewMainPage.tsx to MainPage.tsx in pages/
    status: completed
  - id: update-main-page-export
    content: Update export name from NewMainPage to MainPage in MainPage.tsx
    status: completed
  - id: update-main-page-imports
    content: Update lazy import in main.tsx to use MainPage
    status: completed
  - id: update-main-page-usage
    content: Update LazyNewMainPage variable and usage to LazyMainPage
    status: completed
  - id: check-css-references
    content: Check and update any CSS classes, IDs, or data attributes referencing old names
    status: completed
  - id: update-test-files
    content: Update test files that reference old component names
    status: completed
  - id: verify-naming-consistency
    content: Verify all components follow consistent PascalCase naming without prefixes
    status: completed
---

# Phase 3: Rename Components

## Objective
Remove inconsistent naming patterns (specifically the "New" prefix) and establish consistent, descriptive component names. Update all references throughout the codebase.

## Prerequisites
- Phase 2 must be completed (components moved to new locations)
- All components are in their new feature-based locations

## Renaming Tasks

### Primary Rename: NewHeroSection → HeroSection

#### 1. Rename the Component File
- `src/features/profile/components/NewHeroSection.tsx` → `src/features/profile/components/HeroSection.tsx`

#### 2. Update Component Export Name
Within `HeroSection.tsx`:
- Change `export const NewHeroSection` → `export const HeroSection`
- Update component name in JSX if self-referenced

#### 3. Update All Import Statements

**Files that import HeroSection (update import paths and names):**

**`src/pages/NewMainPage.tsx`** (will be renamed to `MainPage.tsx` in this phase):
- Update import: `import { NewHeroSection } from '../components/NewHeroSection'` 
  → `import { HeroSection } from '../features/profile/components/HeroSection'`
- Update usage: `<NewHeroSection />` → `<HeroSection />`

**Any other files importing NewHeroSection:**
- Search codebase for all occurrences of `NewHeroSection`
- Update import paths to new location
- Update component name in usage

### Secondary Rename: NewMainPage → MainPage

#### 1. Rename the Page File
- `src/pages/NewMainPage.tsx` → `src/pages/MainPage.tsx`

#### 2. Update Component Export Name
Within `MainPage.tsx`:
- Change `export const NewMainPage` → `export const MainPage`

#### 3. Update All References to NewMainPage

**`src/main.tsx`:**
- Update import: `import("./pages/NewMainPage")` → `import("./pages/MainPage")`
- Update lazy load: `LazyNewMainPage` → `LazyMainPage`
- Update component usage: `<LazyNewMainPage />` → `<LazyMainPage />`
- Update Suspense fallback if it references "NewMainPage"

**Any test files:**
- Update imports and references to use `MainPage`

### Additional Component Name Consistency Checks

#### Verify Naming Consistency
Check for other inconsistent naming patterns:
- Components with "New" prefix (should be removed)
- Components with inconsistent casing
- Components with unclear/abbreviated names

**Components to verify:**
- `ServiceOffering` (was `SecurityAudit` - already renamed, verify consistency)
- `InteractiveButton` (was `QuantumButton` - already renamed, verify consistency)
- All other components should follow PascalCase with descriptive names

## Search and Replace Strategy

### Step 1: Find All References
Use grep/search to find all occurrences:
- `NewHeroSection` (case-sensitive)
- `NewMainPage` (case-sensitive)
- `new-hero-section` (CSS classes, IDs)
- `new-main-page` (CSS classes, IDs)

### Step 2: Update References Systematically

**Import statements:**
- Update import paths to new locations
- Update imported component names

**Component usage:**
- Update JSX component tags
- Update any string references in comments/docs

**CSS/className references:**
- Update any CSS class names if they reference "new-hero-section"
- Update any element IDs if they reference "new-hero-section"
- Update any data attributes if they reference old names

**Route definitions:**
- Verify routes don't reference old component names
- Update lazy loading references

## Files Requiring Updates

### Critical Files
1. **`src/pages/MainPage.tsx`** (renamed from NewMainPage.tsx)
   - Import statement for HeroSection
   - Component usage: `<HeroSection />`
   - Export name: `export const MainPage`

2. **`src/main.tsx`**
   - Lazy import path: `"./pages/MainPage"`
   - Variable name: `LazyMainPage`
   - Component usage: `<LazyMainPage />`

3. **`src/features/profile/components/HeroSection.tsx`** (renamed from NewHeroSection.tsx)
   - Export name: `export const HeroSection`
   - Any internal references

### Additional Files to Check
- `src/App.tsx` (if it references these components)
- Test files in `src/__tests__/`
- Any configuration files referencing component names
- Documentation files (README.md, etc.)

## Validation Checklist

After renaming:
- [ ] File renamed successfully
- [ ] Export name updated in component file
- [ ] All import statements updated
- [ ] All component usages updated
- [ ] No broken references (grep for old names)
- [ ] Application builds without errors
- [ ] Routes still work correctly
- [ ] Lazy loading still functions

## Import Path Updates

When updating imports, use the new feature-based paths:

**For HeroSection:**
```typescript
// Old
import { NewHeroSection } from '../components/NewHeroSection';

// New
import { HeroSection } from '../features/profile/components/HeroSection';
```

**For MainPage:**
```typescript
// Old
import { NewMainPage } from './pages/NewMainPage';

// New  
import { MainPage } from './pages/MainPage';
```

## CSS/ID/Class Name Considerations

If any CSS classes, element IDs, or data attributes reference the old names:
- `id="new-hero-section"` → `id="hero-section"` (if needed)
- `className="new-hero-section"` → `className="hero-section"` (if needed)
- Update any selectors in CSS files
- Update any test selectors

## Testing Considerations

- Update test files that reference old component names
- Update test imports
- Verify test selectors still work
- Check snapshot tests if they exist

## Dependencies

- Requires Phase 2 completion (components must be in new locations)
- Sets up for Phase 4 (feature module infrastructure)
- Enables Phase 5 (external import updates)

## Next Phase

Phase 4 will create feature module infrastructure (types.ts files, hooks directories, barrel exports, README files)