# Frontend Source Directory - Feature-Based Architecture

## Architecture Overview

This directory contains the core frontend application code, built with React (Vite) and TypeScript. The codebase follows a **feature-based, domain-driven architecture** that organizes code by business domain rather than technical layer. This structure reflects the sophisticated, thought-provoking nature of the site's content and enables clear separation of concerns, improved maintainability, and scalable organization.

### Key Technologies:
- **React 18+ & TypeScript 5+**: For a modern, type-safe component-based UI.
- **Vite**: For fast development and optimized builds.
- **Tailwind CSS**: For utility-first styling.
- **Framer Motion**: For declarative animations.
- **React Router**: For client-side routing.
- **Firebase**: Used for backend services (though blog content will move to Firestore).

### Directory Structure:
```
src/
├── features/                    # Feature-based modules organized by domain
│   ├── blog/                    # Blog content management
│   ├── portfolio/              # Portfolio showcases
│   ├── zero-truth/             # Zero Truth philosophical content
│   ├── crypto-fabric/          # Crypto Fabric concept
│   ├── interview/               # Interview experience
│   └── profile/                # Professional profile sections
├── ui/                          # Reusable UI primitives
│   ├── buttons/                # Button components
│   ├── icons/                  # Icon components
│   └── players/                # Media player components
├── layout/                      # Layout and navigation components
├── backgrounds/                 # Background and animation components
├── foundation/                  # Core infrastructure
│   └── seo/                    # SEO components
├── pages/                       # Page-level components
├── contexts/                    # React context providers
├── hooks/                       # Shared React hooks
├── services/                    # Client-side services
├── models/                      # TypeScript type definitions
├── data/                        # Static data
└── utils/                       # Utility functions
```

## Feature Module Pattern

Each feature module follows a consistent structure:

```
features/{feature-name}/
├── components/          # Feature-specific React components
├── hooks/              # Feature-specific React hooks (optional)
├── types.ts           # Feature-specific TypeScript types
├── index.ts           # Barrel exports for clean imports
└── README.md          # Feature-specific documentation
```

### Import Patterns

**Using Barrel Exports (Recommended):**
```typescript
import { Blog, BlogPost } from './features/blog';
import { HeroSection, AboutMeSection } from './features/profile';
import { InteractiveButton } from './ui/buttons';
import { MainNav, ContactFooter } from './layout';
import { AnimatedBackground } from './backgrounds';
import { Seo } from './foundation/seo';
```

**Direct Imports (When Needed):**
```typescript
import { Blog } from './features/blog/components/Blog';
import { HeroSection } from './features/profile/components/HeroSection';
```

## Implementation Guidelines

- **Modularity**: Components and services should be self-contained and reusable where possible.
- **Type Safety**: Leverage TypeScript to ensure robust code. Define clear interfaces for props, state, and service responses.
- **State Management**: Utilize React hooks (`useState`, `useEffect`, `useContext`) for local and shared state. For more complex global state, consider context or a lightweight state management library if needed.
- **Component Design**: Prefer functional components with hooks. Keep components focused on a single responsibility.
- **Feature Boundaries**: Keep feature modules independent. Cross-feature dependencies should be minimal and explicit.
- **Styling**: Use Tailwind CSS for styling. Define custom styles or components in `index.css` or component-specific files sparingly.
- **Error Handling**: Implement consistent error handling for API calls and critical operations. Use the `errorHandler.ts` service where appropriate.
- **Accessibility**: Strive to follow accessibility best practices (ARIA attributes, semantic HTML).

## Performance Metrics

- **Goal**: Maintain a high Lighthouse performance score (target 80+ for key pages).
- **Optimization Strategies**:
    - Lazy loading for page components (implemented in `main.tsx`).
    - Code splitting via Vite.
    - Optimized images and assets.
    - Efficient component rendering (e.g., `React.memo`, proper dependency arrays in `useEffect`).
    - Minimized particle count and optimized animation logic in background components.
- **Monitoring**: Regularly profile application performance during development.

## Security Measures

- **Input Validation**: Validate user inputs on the client-side where appropriate, with primary validation on the backend.
- **Dependency Management**: Regularly update dependencies to patch known vulnerabilities (e.g., using `npm audit`).
- **Firebase Security Rules**: Ensure Firestore and Storage rules are correctly configured for proper data access control (managed server-side).
- **Cross-Site Scripting (XSS)**: Mitigate XSS risks by properly sanitizing and encoding data, especially when rendering user-generated content (though current blog content is static from `blogData.ts`).
- **API Communication**: Use HTTPS for all API calls.

## Testing Requirements

- **Unit Tests**: For critical utility functions, services, and complex component logic. (Targeting Jest/Vitest)
- **Component Tests**: Verify UI component rendering and interaction. (Targeting React Testing Library)
- **End-to-End (E2E) Tests**: For critical user flows (e.g., navigation, blog post viewing). (Consider Playwright or Cypress if not already in use)
- **Coverage**: Aim for at least 80% test coverage for critical modules as specified in `.cursorrules`.

## Documentation Requirements

- **JSDoc/TSDoc**: For all public functions, component props, and service methods.
- **READMEs**: Maintain up-to-date README files in key directories (`src`, `src/services`, `src/features/*`, `functions`, `functions/src/__tests__`) as per `.cursorrules`, detailing their purpose, structure, and usage.
- **Architectural Decisions**: Document significant architectural choices and their rationale.

## Feature Modules

### Blog (`features/blog/`)
Blog content management and display system. Includes blog listing, individual post views, and blog teasers.

### Portfolio (`features/portfolio/`)
Enterprise project showcases and case studies. Displays major projects like StoneX and JPMorgan.

### Zero Truth (`features/zero-truth/`)
Philosophical treatise presentation system. Complex navigation for chapters and principles.

### Crypto Fabric (`features/crypto-fabric/`)
Crypto Fabric conceptual framework presentation. Introduces the Crypto Fabric concept.

### Interview (`features/interview/`)
Interactive interview experience presentation. Interview content and navigation.

### Profile (`features/profile/`)
Professional profile and service offerings. Hero section, about me, services, CTO triage, and SEO-optimized summaries.

## UI Primitives (`ui/`)

Reusable UI components organized by category:
- **buttons/** - Interactive button components
- **icons/** - Icon components
- **players/** - Media player components

## Layout Components (`layout/`)

Site-wide layout and navigation components:
- `MainNav` - Main navigation
- `ContactFooter` - Footer with contact information
- `NotFound` - 404 page
- `CookieNotice` - Cookie consent notice

## Backgrounds (`backgrounds/`)

Background and animation components:
- `AnimatedBackground` - Main animated background
- `NebulaStormBackground` - Nebula storm effects
- `QuantumBackground` - Quantum-themed background

## Foundation (`foundation/`)

Core infrastructure components:
- **seo/** - SEO and metadata management
