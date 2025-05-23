# Frontend Source Directory - Modern React Application

## Architecture Overview

This directory contains the core frontend application code, built with React (Vite) and TypeScript. It follows a modular architecture emphasizing separation of concerns, reusability, and maintainability.

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
├── components/     # Reusable React UI components (e.g., NewHeroSection, BlogTeaser, portfolio items)
├── contexts/       # React context providers (e.g., SpeechContext)
├── data/           # Static data, like blogData.ts
├── models/         # TypeScript interfaces and type definitions (e.g., BlogPost.ts)
├── pages/          # Top-level page components (e.g., NewMainPage, FullProfile)
├── services/       # Client-side services (e.g., Firebase integration, error handling)
├── App.tsx         # Main application component, sets up routing
├── main.tsx        # Application entry point
└── index.css       # Global styles and Tailwind directives
```

## Implementation Guidelines

- **Modularity**: Components and services should be self-contained and reusable where possible.
- **Type Safety**: Leverage TypeScript to ensure robust code. Define clear interfaces for props, state, and service responses.
- **State Management**: Utilize React hooks (`useState`, `useEffect`, `useContext`) for local and shared state. For more complex global state, consider context or a lightweight state management library if needed.
- **Component Design**: Prefer functional components with hooks. Keep components focused on a single responsibility.
- **Styling**: Use Tailwind CSS for styling. Define custom styles or components in `index.css` or component-specific files sparingly.
- **Error Handling**: Implement consistent error handling for API calls and critical operations. Use the `errorHandler.ts` service where appropriate.
- **Accessibility**: Strive to follow accessibility best practices (ARIA attributes, semantic HTML).

## Performance Metrics

- **Goal**: Maintain a high Lighthouse performance score (target 80+ for key pages).
- **Optimization Strategies**:
    - Lazy loading for page components (implemented in `App.tsx`).
    - Code splitting via Vite.
    - Optimized images and assets.
    - Efficient component rendering (e.g., `React.memo`, proper dependency arrays in `useEffect`).
    - Minimized particle count and optimized animation logic in `AnimatedBackground.tsx`.
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
- **READMEs**: Maintain up-to-date README files in key directories (`src`, `src/services`, `functions`, `functions/src/__tests__`) as per `.cursorrules`, detailing their purpose, structure, and usage.
- **Architectural Decisions**: Document significant architectural choices and their rationale. 