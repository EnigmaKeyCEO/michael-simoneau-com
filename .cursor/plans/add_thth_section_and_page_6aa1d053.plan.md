---
name: Add THTH Section and Page
overview: Add a THTH section to MainPage.tsx and create a dedicated `/thth` page following the same pattern as `/crypto-fabric`, including a feature module structure with hero component and full page component.
todos:
  - id: create-thth-feature-structure
    content: Create src/features/thth/ directory structure with types.ts, index.ts, and README.md
    status: pending
  - id: create-thth-hero-component
    content: Create src/features/thth/components/ThthHero.tsx component based on CryptoFabricHero pattern
    status: pending
  - id: create-thth-page
    content: Create src/pages/Thth.tsx full page component based on CryptoFabric.tsx pattern
    status: pending
  - id: add-thth-route
    content: Add /thth route to src/main.tsx router configuration
    status: pending
  - id: add-thth-to-mainpage
    content: Add ThthHero component to src/pages/MainPage.tsx after CryptoFabricHero
    status: pending
---

# Add THTH Section and Page

## Overview

Based on the review of https://0thth.com/, THTH is "The First Token with Intrinsic Value" built on Zeroth, a living cryptographic economy. This plan adds a THTH section to the main page and creates a dedicated `/thth` route following the same architectural pattern as `/crypto-fabric`.

## Structure Analysis

The `/crypto-fabric` implementation follows this pattern:

- Feature module: `src/features/crypto-fabric/` with components, types, index, and README
- Hero component: `src/features/crypto-fabric/components/CryptoFabricHero.tsx` (used in MainPage)
- Full page: `src/pages/CryptoFabric.tsx` (standalone route)
- Route registration: Added to `src/main.tsx` router config
- Asset: `public/crypto-fabric.jpeg` (logo/image)

## Implementation Plan

### 1. Create THTH Feature Module Structure

Create `src/features/thth/` directory with:

- `components/ThthHero.tsx` - Hero section component for MainPage (similar to CryptoFabricHero)
- `types.ts` - TypeScript type definitions
- `index.ts` - Module exports
- `README.md` - Feature documentation

### 2. Create ThthHero Component

Create `src/features/thth/components/ThthHero.tsx`:

- Similar structure to `CryptoFabricHero.tsx`
- Content based on THTH website:
- Title: "THTH - The First Token with Intrinsic Value"
- Tagline: "Built on Zeroth, a living cryptographic economy where value emerges from positional truth, not speculation"
- Key features: Dashboard, Mint, Whitepaper, Visualization
- Link to `/thth` route
- Styling consistent with existing design (cyan/blue gradients, similar layout)
- Uses framer-motion for animations
- Includes link to `/thth` page

### 3. Create THTH Full Page Component

Create `src/pages/Thth.tsx`:

- Similar structure to `CryptoFabric.tsx`
- Sections based on THTH website content:
- Header with logo/title
- Core value proposition (intrinsic value token)
- Key features (Dashboard, Mint, Whitepaper, Visualization)
- Zeroth economy explanation
- Links to external resources (dashboard, mint, whitepaper, visualization)
- SEO metadata (title, description, keywords, structured data)
- Uses AnimatedBackground and MainNav components

### 4. Add Route Configuration

Update `src/main.tsx`:

- Import `Thth` component from `./pages/Thth`
- Add route: `{ path: "thth", element: <Thth /> }` after crypto-fabric route

### 5. Add THTH Section to MainPage

Update `src/pages/MainPage.tsx`:

- Import `ThthHero` from `../features/thth/components/ThthHero`
- Add `<ThthHero />` component after `<CryptoFabricHero />` (around line 236)

### 6. Asset Consideration

- Note: THTH logo/image asset needed in `public/` directory (similar to `crypto-fabric.jpeg`)
- Component will reference `/thth.jpeg` or `/thth.png` (to be determined)
- If asset doesn't exist, use placeholder or note in implementation

## Files to Create

1. `src/features/thth/components/ThthHero.tsx`
2. `src/features/thth/types.ts`
3. `src/features/thth/index.ts`
4. `src/features/thth/README.md`
5. `src/pages/Thth.tsx`

## Files to Modify

1. `src/pages/MainPage.tsx` - Add ThthHero import and component
2. `src/main.tsx` - Add THTH route

## Content Themes (from website review)

- Intrinsic value token (first of its kind)
- Built on Zeroth cryptographic economy
- Value emerges from positional truth, not speculation
- Every hash carries its price, every block remembers its worth
- Dashboard for tracking
- Mint functionality
- Whitepaper documentation
- 3D Visualization

## Design Consistency

- Follow same visual style as CryptoFabric (cyan/blue gradients, dark theme)
- Use same animation patterns (framer-motion)
- Maintain responsive design patterns
- Use same component structure and naming conventions