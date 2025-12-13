# Backgrounds Directory

## Purpose

This directory contains background and animation components that provide visual effects and animated backgrounds for pages and sections.

## Components

### AnimatedBackground
Main animated background component providing particle effects and visual ambiance.

### NebulaStormBackground
Nebula storm background with lightning effects, used for dramatic visual presentations (e.g., Zero Truth page).

### QuantumBackground
Quantum-themed background with particle effects and quantum-inspired visualizations.

## Usage Patterns

### In Page Components
```typescript
import { AnimatedBackground } from '../backgrounds';

export const Page = () => {
  return (
    <>
      <AnimatedBackground />
      <div className="content">
        {/* Page content */}
      </div>
    </>
  );
};
```

### Multiple Backgrounds
Different pages may use different backgrounds:
```typescript
import { NebulaStormBackground } from '../backgrounds';
import { QuantumBackground } from '../backgrounds';
```

## Technical Considerations

### Three.js Integration
Some background components use Three.js for 3D graphics and WebGL rendering:
- `NebulaStormBackground` - Uses Three.js for lightning effects
- `QuantumBackground` - Uses Three.js for particle systems

### Performance
Background components should:
- Optimize particle counts for performance
- Use efficient rendering techniques
- Consider device capabilities (mobile vs desktop)
- Implement performance monitoring

### Animation Libraries
Components may use:
- **Framer Motion** - For React-based animations
- **Three.js** - For 3D graphics and WebGL
- **GSAP** - For advanced animations (if needed)
- **@react-three/fiber** - React renderer for Three.js

## Dependencies

Background components may import from:
- `three` - Three.js library
- `@react-three/fiber` - React Three Fiber
- `@react-three/drei` - Useful helpers for React Three Fiber
- `framer-motion` - Animation library
- External animation libraries

## When to Add Components Here

Add components to `backgrounds/` when they:
- Provide visual background effects
- Use Three.js or WebGL
- Create particle systems or animations
- Are used for visual ambiance rather than UI functionality

Do NOT add:
- UI components (use `ui/`)
- Feature-specific backgrounds (use `features/{feature}/components/`)
- Layout components (use `layout/`)

