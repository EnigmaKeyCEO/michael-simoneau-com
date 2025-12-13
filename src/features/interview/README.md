# Interview Feature Module

## Purpose

Interactive interview experience presentation. This feature module provides an engaging interface for exploring interview content with Michael Simoneau.

## Components

### Interview
Main interview component that displays interview questions and answers in an interactive format.

**Location:** `components/Interview.tsx`

**Usage:**
```typescript
import { Interview } from './features/interview';

// In route configuration
{
  path: "interview",
  element: <Interview />
}
```

### InterviewButton
Button component that navigates to the interview page, used in hero sections and other locations.

**Location:** `components/InterviewButton.tsx`

**Usage:**
```typescript
import { InterviewButton } from './features/interview';

// In hero section or other components
<InterviewButton />
```

## Types

Types are defined in `types.ts`:
- `QAPair` - Question and answer pair structure
- `InterviewState` - Interview playback and navigation state

## Dependencies

- **Layout:** Uses `MainNav` from `../layout/`
- **Foundation:** Uses `Seo` from `../foundation/seo/`
- **Backgrounds:** Uses `AnimatedBackground` from `../backgrounds/`
- **UI Libraries:** Uses Lucide React for icons
- **Animation:** Uses Framer Motion for animations
- **Typewriter:** Uses react-simple-typewriter for typewriter effect

## Related Modules

- **Profile Feature:** InterviewButton is used in HeroSection (profile feature)
- **Layout:** Uses MainNav for navigation
- **Backgrounds:** Uses AnimatedBackground for visual effects

