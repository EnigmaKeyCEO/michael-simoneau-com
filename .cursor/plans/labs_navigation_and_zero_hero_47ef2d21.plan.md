# Labs Navigation and Zero Hero Implementation

## Overview

Update the navigation to replace "Crypto Fabric" with a futuristic sliding "Labs" navigation. When activated, "Labs" transforms to uppercase "LABS" and slides all the way to the left to become "MS: LABS:" (integrated with the logo area), then displays the three lab items: "Zeroth Theory" | "Crypto Fabric" | "THTH Token" in that order. Create the missing ZeroHero component that shares the NebulaStormBackground with the /zero destination page.

## Current State

- **Navigation**: `MainNav.tsx` has a "CryptoFabric" button that scrolls to `#crypto-fabric` section, and a "ZERO" link to `/zero` route
- **Hero Components**: 
- `CryptoFabricHero` exists at `src/features/crypto-fabric/components/CryptoFabricHero.tsx` with id="crypto-fabric" and button to `/crypto-fabric`
- `ThthHero` exists at `src/features/thth/components/ThthHero.tsx` with id="thth" and button to `/thth`
- **Missing**: `ZeroHero` component
- **Pages**: All three full pages exist (`/crypto-fabric`, `/zero`, `/thth`)
- **Background**: `/zero` page uses `NebulaStormBackground` from `src/backgrounds/NebulaStormBackground.tsx`

## Implementation Plan

### 1. Create ZeroHero Component

**File**: `src/features/zero-truth/components/ZeroHero.tsx`

Create a new hero component similar to `CryptoFabricHero` and `ThthHero`:

- Use `NebulaStormBackground` as the background (same as `/zero` page)
- Set `id="zero"` for navigation targeting
- Include title "ZEROTH THEORY" with styling matching the Zero page aesthetic
- Add a button linking to `/zero` route
- Match the visual style of other heroes but with Zero-themed colors (cyan/emerald gradients)

**Key features**:

- Full-height hero section with snap scrolling
- Motion animations using framer-motion
- Button to navigate to `/zero` page
- Uses `NebulaStormBackground` component

### 2. Add ZeroHero to MainPage

**File**: `src/pages/MainPage.tsx`

- Import `ZeroHero` from `../features/zero-truth/components/ZeroHero`
- Add `<ZeroHero />` component between `CryptoFabricHero` and `ThthHero` (or in appropriate order)
- Ensure proper section wrapping with snap scrolling

### 3. Update MainNav Component

**File**: `src/layout/MainNav.tsx`

Replace the "CryptoFabric" button with a futuristic sliding "Labs" navigation:

**Desktop Navigation** (lines 36-80):

- Remove the `button` for CryptoFabric (line 53)
- Remove the standalone "ZERO" link (lines 72-79) - it will be part of Labs
- Add "Labs" button/trigger that activates the futuristic navigation
- When Labs is activated:

1. "Labs" text transforms to uppercase "LABS"
2. "LABS" slides all the way to the left, positioning next to "MS" logo
3. Logo area displays "MS: LABS:" (colon-separated, futuristic styling)
4. Navigation items appear: "Zeroth Theory" | "Crypto Fabric" | "THTH Token"
5. Items are pipe-separated (|) and clickable
6. Order: Zeroth Theory → Crypto Fabric → THTH Token

- Use click to toggle the expanded state
- Use framer-motion for smooth sliding animations
- When collapsed, return to normal "Labs" button position

**Mobile Navigation** (lines 90-140):

- Remove the CryptoFabric button (line 112)
- Remove the standalone ZERO link (lines 131-138)
- Add "Labs" button that expands to show:
- "Zeroth Theory" → scrolls to `#zero`
- "Crypto Fabric" → scrolls to `#crypto-fabric`
- "THTH Token" → scrolls to `#thth`
- Use expand/collapse pattern similar to existing mobile menu
- On mobile, show vertical list instead of horizontal pipe-separated format

**Implementation details**:

- Use React state (`isLabsExpanded`) to manage expanded/collapsed state
- Use framer-motion `AnimatePresence` and `motion` components for animations
- Logo area needs to be flexible to accommodate "MS: LABS:" when expanded
- Use `handleSectionLinkClick` for scrolling to hero sections:
- "Zeroth Theory" → `#zero`
- "Crypto Fabric" → `#crypto-fabric`
- "THTH Token" → `#thth`
- Ensure navigation collapses when navigating or clicking outside
- Style with futuristic aesthetic: uppercase text, colon separators, pipe separators
- Add smooth transitions for sliding animation
- Consider backdrop blur or overlay when expanded for focus

### 4. Update Hero Component Exports

**File**: `src/features/zero-truth/index.ts`

- Add export for `ZeroHero` component

### 5. Verify Hero Buttons

Ensure all hero components have buttons linking to their full pages:

- ✅ `CryptoFabricHero` - already has button to `/crypto-fabric` (line 80-86)
- ✅ `ThthHero` - already has button to `/thth` (line 75-81)
- ⚠️ `ZeroHero` - will be created with button to `/zero`

## Files to Modify

1. **Create**: `src/features/zero-truth/components/ZeroHero.tsx`
2. **Modify**: `src/pages/MainPage.tsx` - Add ZeroHero import and component
3. **Modify**: `src/layout/MainNav.tsx` - Replace CryptoFabric with Labs dropdown
4. **Modify**: `src/features/zero-truth/index.ts` - Export ZeroHero

## Technical Considerations

- **Sliding Animation**: Use framer-motion for smooth sliding transitions
- `motion.div` with `layout` prop for automatic layout animations
- `AnimatePresence` for enter/exit animations
- Transform "Labs" → "LABS" with text transform animation
- Slide LABS to left using absolute positioning or flexbox order
- **Logo Integration**: Logo area needs to dynamically show "MS: LABS:" when expanded
- Consider using conditional rendering or text content switching
- Maintain logo click functionality (home navigation)
- **Navigation Scrolling**: Use existing `handleSectionLinkClick` function with section IDs:
- "Zeroth Theory" → `#zero` (new ZeroHero section)
- "Crypto Fabric" → `#crypto-fabric` (existing CryptoFabricHero)
- "THTH Token" → `#thth` (existing ThthHero)
- **Background Component**: ZeroHero will need to import and use `NebulaStormBackground` (same as ZeroTruth page)
- **Styling**: Futuristic aesthetic:
- Uppercase text for "LABS"
- Colon separator for "MS: LABS:"
- Pipe separator (|) for lab items
- Consistent with existing cyan/tech color scheme
- **Mobile**: Ensure sliding animation works on mobile or falls back to simpler expand/collapse
- **Accessibility**: Ensure navigation is keyboard accessible and has proper ARIA attributes
- **State Management**: Track expanded state and handle click-outside to collapse

## Testing Checklist

- [ ] Labs button appears in desktop navigation
- [ ] Clicking Labs transforms "Labs" to "LABS" and slides left
- [ ] Logo area displays "MS: LABS:" when expanded
- [ ] Three lab items appear: "Zeroth Theory" | "Crypto Fabric" | "THTH Token"
- [ ] Items are pipe-separated and properly styled
- [ ] Clicking each item scrolls to correct hero section
- [ ] Navigation collapses when clicking outside or after navigation
- [ ] Sliding animation is smooth and futuristic-looking
- [ ] Mobile navigation works (may use simpler expand/collapse)
- [ ] ZeroHero component displays with NebulaStormBackground
- [ ] ZeroHero button navigates to `/zero` page
- [ ] All hero components have buttons to their full pages
- [ ] Navigation styling matches futuristic aesthetic