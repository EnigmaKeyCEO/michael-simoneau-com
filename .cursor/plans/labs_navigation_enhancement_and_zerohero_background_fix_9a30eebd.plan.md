---
name: Labs Navigation Enhancement and ZeroHero Background Fix
overview: Fix NebulaStormBackground to be scoped ONLY inside ZeroHero component, and enhance Labs navigation to hide all other nav items when expanded, show only "MS::LABS:" and lab items with a circular close button. Mobile should toggle/replace menu items without sliding animation.
todos: []
---

# Labs Navigation Enhancement and ZeroHero Background Fix

## Overview

Two main fixes:

1. **NebulaStormBackground Scope**: Ensure NebulaStormBackground is ONLY rendered inside ZeroHero component and properly scoped to that section only
2. **Labs Navigation Enhancement**: When Labs is expanded, hide ALL other navigation items (About, Expertise, Services, Consulting, Insights, Profile, Blog) and UniversalPlayer. Show only "MS::LABS:" followed by lab items with a circular close button. Mobile should toggle/replace menu items without sliding animation.

## Current State

- **ZeroHero**: Already has NebulaStormBackground inside the component, but may need verification of proper scoping
- **Navigation**: Current Labs implementation shows lab items but doesn't hide other navigation items
- **Mobile**: Current implementation may have sliding animation that should be removed

## Implementation Plan

### 1. Verify and Fix NebulaStormBackground Scope

**File**: `src/features/zero-truth/components/ZeroHero.tsx`

Verify that NebulaStormBackground is:

- Only imported and used in ZeroHero.tsx
- Positioned with `absolute inset-0 -z-10` inside the section
- Scoped to only the `#zero` section
- Not appearing on other sections or globally

**Current structure** (lines 24-26):

```tsx
<div className="absolute inset-0 -z-10">
  <NebulaStormBackground />
</div>
```

**Verification**:

- Check that NebulaStormBackground is not imported/used in MainPage.tsx
- Ensure the absolute positioning with `-z-10` keeps it behind content
- Verify the section has `relative` positioning to contain the background

### 2. Update Desktop Navigation - Hide All Items When Labs Expanded

**File**: `src/layout/MainNav.tsx`

**Changes needed**:

1. **Wrap UniversalPlayer in conditional rendering** (around line 106):
   ```tsx
   {!isLabsExpanded && <UniversalPlayer />}
   ```

2. **Wrap all navigation buttons in conditional rendering** (lines 109-111, 153-170):

   - About, Expertise, Services buttons: `{!isLabsExpanded && (...)}`
   - Consulting, Insights buttons: `{!isLabsExpanded && (...)}`
   - Profile button/link: `{!isLabsExpanded && (...)}`
   - Blog link: `{!isLabsExpanded && (...)}`

3. **Update logo area** (lines 84-103):

   - Change single colon to double colon: `: LABS:` → `:: LABS:`
   - Ensure smooth animation when showing/hiding

4. **Update close button** (lines 159-164):

   - Replace text "×" with circular button containing X icon
   - Use `X` icon from lucide-react
   - Style as circular button: `rounded-full`, `w-8 h-8`, `flex items-center justify-center`
   - Add hover effects

**Implementation pattern**:

```tsx
<AnimatePresence>
  {!isLabsExpanded && (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Navigation items */}
    </motion.div>
  )}
</AnimatePresence>
```

### 3. Update Mobile Navigation - Toggle/Replace Without Sliding

**File**: `src/layout/MainNav.tsx`

**Changes needed** (lines 188-234):

1. **Remove sliding animation** - Mobile should NOT slide "Labs" to left
2. **Hide all other menu items when Labs expanded**:

   - Wrap Home link: `{!isLabsExpanded && (...)}`
   - Wrap About, Expertise, Services buttons: `{!isLabsExpanded && (...)}`
   - Wrap Consulting, Insights buttons: `{!isLabsExpanded && (...)}`
   - Wrap Profile button/link: `{!isLabsExpanded && (...)}`
   - Wrap Blog link: `{!isLabsExpanded && (...)}`

3. **Update Labs mobile section** (lines 204-234):

   - When expanded, show "MS::LABS:" in logo area (no sliding)
   - Show vertical list of lab items
   - Add circular close button at the end
   - Use simple toggle/replace, not sliding animation

4. **Logo area update** (lines 189-197):

   - Show "MS::LABS:" when `isLabsExpanded` is true
   - No sliding animation, just conditional text replacement

**Mobile pattern**:

```tsx
{isLabsExpanded ? (
  <div>
    {/* Show MS::LABS: and lab items */}
  </div>
) : (
  <div>
    {/* Show regular menu items */}
  </div>
)}
```

### 4. Update Close Button Implementation

**File**: `src/layout/MainNav.tsx`

**Desktop close button** (replace lines 159-164):

```tsx
<button
  onClick={handleLabsClick}
  className="ml-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center transition-colors"
  aria-label="Close Labs"
>
  <X size={16} className="text-gray-300" />
</button>
```

**Mobile close button** (add to mobile Labs section):

```tsx
<button
  onClick={() => setIsLabsExpanded(false)}
  className="mt-4 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center transition-colors mx-auto"
  aria-label="Close Labs"
>
  <X size={18} className="text-gray-300" />
</button>
```

## Files to Modify

1. **Modify**: `src/features/zero-truth/components/ZeroHero.tsx` - Verify NebulaStormBackground scoping
2. **Modify**: `src/layout/MainNav.tsx` - Hide navigation items, add circular close button, fix mobile behavior

## Technical Considerations

- **NebulaStormBackground Scoping**: 
  - Must be inside ZeroHero section only
  - Use `absolute inset-0 -z-10` positioning
  - Section must have `relative` positioning
  - Verify no global rendering or z-index conflicts

- **Conditional Rendering Pattern**:
  - Use `AnimatePresence` for smooth fade animations
  - Wrap each group of navigation items separately
  - UniversalPlayer should fade out/in smoothly

- **Mobile Behavior**:
  - NO sliding animations
  - Simple conditional rendering: show Labs menu OR regular menu
  - Logo text changes: "MS" → "MS::LABS:" (no animation)
  - Maintain stacked vertical menu structure

- **Close Button**:
  - Circular design: `rounded-full`, fixed width/height
  - Centered X icon
  - Hover effects matching navigation style
  - Accessible with aria-label

- **Double Colon**: 
  - Use `::` (double colon) not `:` (single colon)
  - Display as "MS::LABS:" in logo area

## Testing Checklist

- [ ] NebulaStormBackground appears ONLY in ZeroHero section
- [ ] NebulaStormBackground does not appear on other sections
- [ ] Desktop: All navigation items hide when Labs expanded
- [ ] Desktop: UniversalPlayer hides when Labs expanded
- [ ] Desktop: Logo shows "MS::LABS:" (double colon) when expanded
- [ ] Desktop: Lab items appear with pipe separators
- [ ] Desktop: Circular close button appears at end of lab items
- [ ] Desktop: Close button closes Labs and restores full menu
- [ ] Mobile: NO sliding animation when Labs expanded
- [ ] Mobile: Logo shows "MS::LABS:" when Labs expanded (no animation)
- [ ] Mobile: All other menu items hide when Labs expanded
- [ ] Mobile: Vertical list of lab items appears
- [ ] Mobile: Circular close button appears
- [ ] Mobile: Close button restores full menu
- [ ] Clicking lab items scrolls to correct section and closes Labs
- [ ] Smooth fade animations for hiding/showing navigation items