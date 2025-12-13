# Portfolio Feature Module

## Purpose

Enterprise project showcases and case studies. This feature module displays major projects and achievements, including detailed project information, metrics, and technologies used.

## Components

### JPMorganProject
Showcase component for the JPMorgan PaymentNet iOS application project, displaying project metrics, achievements, and technologies.

**Location:** `components/JPMorganProject.tsx`

**Usage:**
```typescript
import { JPMorganProject } from './features/portfolio';

// In main page or portfolio page
<JPMorganProject />
```

### StoneXProject
Showcase component for the StoneX white-label React Native application project, displaying project metrics, achievements, and technologies.

**Location:** `components/StoneXProject.tsx`

**Usage:**
```typescript
import { StoneXProject } from './features/portfolio';

// In main page or portfolio page
<StoneXProject />
```

## Types

Types are defined in `types.ts`:
- `ProjectMetric` - Individual metric display (label, value, description, icon)
- `ProjectShowcase` - Complete project showcase structure

## Dependencies

- **UI Libraries:** Uses Lucide React for icons
- **Animation:** Uses Framer Motion for animations

## Related Modules

- **Profile Feature:** Portfolio components are used in the main page (profile feature)

