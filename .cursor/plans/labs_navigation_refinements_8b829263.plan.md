---
name: Labs Navigation Refinements
overview: "Refine the Labs navigation animation and styling. Specifically: fix the text wrapping issue during animation, improve the \"Labs\" to \"MS :: LABS:\" transition using layout animations, and refine the close button to have a smaller visual circle but larger hit area."
todos: []
---

# Labs Navigation Refinements

## Overview

Address user feedback regarding the Labs navigation animation and UI details.

1.  **Fix Text Wrapping**: Ensure "MS :: LABS:" doesn't wrap momentarily during animation.
2.  **Improve Animation**: Make "Labs" appear to slide left to join "MS", showing "::" and transforming to "LABS:". Use `layoutId` for shared element transition if possible, or refined motion settings.
3.  **Refine Close Button**: Make the visual circle smaller but keep the click area accessible (using a wrapper).

## Implementation Plan

### 1. Fix Text Wrapping

**File**: `src/layout/MainNav.tsx`

- Add `whitespace-nowrap` to the container of the logo text to prevent line breaks during layout shifts.
- Verify container width constraints.

### 2. Improve "Labs" Slide Animation

**File**: `src/layout/MainNav.tsx`

- Use Framer Motion's `layoutId` to connect the "Labs" button text with the "LABS" text in the logo area.
- Structure:
    - **Labs Button**: Add `layoutId="labs-logo-text"` to the "Labs" text span inside the button.
    - **Logo Area**:
        - Split ":: LABS:" into ":: " and "LABS:".
        - ":: " animates in (opacity/x).
        - "LABS:" has `layoutId="labs-logo-text"`.
- This should create a morphing/sliding effect from the button position to the logo position.

### 3. Refine Close Button

**File**: `src/layout/MainNav.tsx`

- Change the close button structure to have a transparent wrapper for the hit area and a smaller inner circle for visuals.
- **Current**: `<button className="w-8 h-8 ...">`
- **New**:
  ```tsx
  <button className="p-2 ...">
    <div className="w-6 h-6 rounded-full border ... flex items-center justify-center">
      <X size={14} ... />
    </div>
  </button>
  ```

- Apply this to both Desktop and Mobile close buttons if applicable (Mobile close button was also added).

### 4. Code Structure Changes

**Desktop Navigation**:

- Update the `Link` content for the logo.
- Update the `Labs` button content.
- Update the Close button in the Labs menu.

**Mobile Navigation**:

- Check if similar changes are needed (User mentioned "the text wraps" which sounds like Desktop behavior where the logo expands horizontally). Mobile logo behavior was set to *not* animate ":: LABS:" in the top bar, so this is likely desktop-specific.

## Files to Modify

1.  `src/layout/MainNav.tsx`

## Step-by-Step

1.  **Read** `src/layout/MainNav.tsx` to locate the components.
2.  **Modify** the Logo section:

    - Add `whitespace-nowrap`.
    - Split ":: LABS:" text.
    - Apply `layoutId` to "LABS:".

3.  **Modify** the Labs Button:

    - Wrap "Labs" text in a motion component with `layoutId`.

4.  **Modify** the Close Button(s):

    - Implement the wrapper pattern for larger hit area/smaller visual.

5.  **Verify** styles and animations.