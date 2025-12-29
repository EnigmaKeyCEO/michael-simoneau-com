# THTH Feature Module

## Purpose

THTH (The First Token with Intrinsic Value) presentation. This feature module introduces and explains THTH, a token built on Zeroth, a living cryptographic economy where value emerges from positional truth, not speculation.

## Components

### ThthHero
Hero section component introducing the THTH concept, displayed on the main page.

**Location:** `components/ThthHero.tsx`

**Usage:**
```typescript
import { ThthHero } from './features/thth';

// In main page
<ThthHero />
```

## Types

Types are defined in `types.ts`:
- `ThthSection` - Section structure for THTH content
- `ThthConfig` - Configuration for THTH sections

## Dependencies

- **UI Libraries:** Uses Lucide React for icons
- **Animation:** Uses Framer Motion for animations
- **Routing:** Uses React Router for navigation

## Related Modules

- **Profile Feature:** ThthHero is used in the main page (profile feature)
