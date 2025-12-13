# UI Primitives Directory

## Purpose

This directory contains reusable UI primitives and components that are not specific to any feature domain. These are foundational building blocks used across multiple features.

## Organization

UI primitives are organized by category:

- **buttons/** - Button components (`InteractiveButton`)
- **icons/** - Icon components (`XIcon`)
- **players/** - Media player components (`SpeechPlayer`, `UniversalPlayer`)

## When to Add Components Here vs Features

### Add to `ui/` when:
- Component is reusable across multiple features
- Component is a generic UI building block
- Component has no business logic or domain-specific behavior
- Component is a pure presentational component

### Add to `features/` when:
- Component is specific to a business domain
- Component contains domain logic
- Component is only used within one feature
- Component represents a feature-specific concept

## Usage Guidelines

### Import Pattern
```typescript
import { InteractiveButton } from './ui/buttons';
import { XIcon } from './ui/icons';
import { SpeechPlayer, UniversalPlayer } from './ui/players';
```

### Component Structure
Each UI category has its own subdirectory with:
- Component files (e.g., `InteractiveButton.tsx`)
- `index.ts` barrel export file

## Categories

### Buttons (`ui/buttons/`)
Reusable button components with consistent styling and behavior.

**Components:**
- `InteractiveButton` - Interactive button with animations

### Icons (`ui/icons/`)
Icon components for consistent iconography across the application.

**Components:**
- `XIcon` - X/close icon component

### Players (`ui/players/`)
Media player components for audio, video, and other media playback.

**Components:**
- `SpeechPlayer` - Speech/audio player component
- `UniversalPlayer` - Universal media player component

## Adding New UI Primitives

1. **Determine category** - Choose appropriate category or create new one if needed
2. **Create component** - Add component file to appropriate category directory
3. **Update barrel export** - Add export to category's `index.ts`
4. **Document** - Update this README with new component information

## Dependencies

UI primitives may import from:
- `../../contexts/` - React contexts (if needed)
- `../../services/` - Shared services (if needed)
- External libraries (React, Framer Motion, etc.)

UI primitives should NOT import from feature modules.

