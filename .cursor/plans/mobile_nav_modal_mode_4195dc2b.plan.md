---
name: ""
overview: ""
todos: []
---

# Mobile Navigation Refinement: Inline Labs & Fix Overlay

## Overview

Fix the mobile navigation overlay not covering the page and inline the Labs items so they are "open by default" (always visible) in the main mobile menu list, removing the toggle/modal complexity on mobile.

## Implementation Plan

### 1. Fix Mobile Overlay Coverage

**File**: `src/layout/MainNav.tsx`

- Add `w-screen h-screen` to the mobile `motion.div` overlay to ensure it covers the viewport regardless of parent content sizing.
- Ensure `top-0 left-0` are explicit (already are via `inset-0`).

### 2. Inline Labs Items on Mobile

**File**: `src/layout/MainNav.tsx`

- **Remove Toggle**: Remove the "Labs" toggle button and the `{!isLabsExpanded ? ... : ...}` conditional logic for the *mobile* menu.
- **Single List**: Render a single list of items:
- Home, About, Expertise, Services, Consulting, Insights, Profile, Blog
- **Labs Header**: Add a visual separator or header "LABS" (optional, but good for grouping).
- **Labs Items**: Add buttons for "Zeroth Theory", "Crypto Fabric", "THTH Token" directly in the list.
- **Close Button**: Keep the "Close" button at the very bottom.
- This satisfies "Labs open by default" (items are immediately visible) and "Labs last in the list".

### 3. Verify Desktop Visibility on Mobile

**File**: `src/layout/MainNav.tsx`

- Double check the `hidden md:flex` class on the desktop `nav`.
- Ensure no inline styles are overriding it.

## Todos

- [ ] Fix Mobile Overlay (w-screen h-screen)
- [ ] Refactor Mobile Menu to Single List (Inline Labs items)
- [ ] Remove Mobile Toggle Logic (isLabsExpanded should not affect mobile view structure)
- [ ] Verify Desktop Nav hiding