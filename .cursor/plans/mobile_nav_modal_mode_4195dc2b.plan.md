---
name: ""
overview: ""
todos: []
---

# Mobile Navigation Modal Mode & Reordering

## Overview

Update mobile navigation to be a full-screen modal masking the entire page. Replace toggle icons with explicit 'Close' menu items. Move "Labs" to the end of the navigation list on both Desktop and Mobile.

## Implementation Plan

### 1. Modify Mobile Overlay Styles

**File**: `src/layout/MainNav.tsx`

- Change `z-index` from `z-40` to `z-[60] `(to cover the `z-50` header).
- Change background from `bg-black/95` to `bg-black` (fully opaque).
- Remove `pt-20` padding to center content vertically in the modal.

### 2. Update Main Mobile Menu List

**File**: `src/layout/MainNav.tsx`

- **Reorder**: Move the Labs Trigger div to be the **last item** in the list (before the new Close button).
- **Add Close Button**: Add a "Close" button at the very bottom of the list.
- Style: `text-xl text-gray-300 hover:text-cyan-400 ...`
- Action: `onClick={() => setIsOpen(false)}`.

### 3. Update Labs Mobile Menu

**File**: `src/layout/MainNav.tsx`

- **Modify Trigger**: Remove the "▶" arrow from the Labs trigger text.
- **Remove X Button**: Remove the circular (X) close button from the expanded Labs menu.
- **Add Close Button**: Add a "Close" button at the bottom of the Labs list.
- Style: `text-xl text-gray-400 hover:text-cyan-400 ...` (matching other items).
- Action: `onClick={() => setIsOpen(false)}`.

### 4. Update Desktop Navigation

**File**: `src/layout/MainNav.tsx`

- **Reorder**: Move the entire Labs Navigation `motion.div` block to be the **last item** in the desktop `nav`.
- Consolidate the conditional rendering blocks `{!isLabsExpanded && ...}` so all regular links (About, Expertise, Services, Consulting, Insights, Profile, Blog) appear before Labs.

## Todos

- [ ] Update mobile overlay styles (z-index, opacity, padding)
- [ ] Reorder Desktop Navigation (Labs last)
- [ ] Reorder Mobile Navigation (Labs last)
- [ ] Add 'Close' item to Main Mobile Menu
- [ ] Update Labs Mobile Menu (remove arrow, remove X circle, add Close item)