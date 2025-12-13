# Layout Directory

## Purpose

This directory contains layout and navigation components that affect the overall page structure and provide site-wide navigation and structure.

## Components

### MainNav
Main navigation component providing site-wide navigation links and menu functionality.

### ContactFooter
Footer component with contact information and site-wide footer content.

### NotFound
404 Not Found page component displayed when routes don't match.

### CookieNotice
Cookie consent notice component for GDPR/privacy compliance.

## Usage Patterns

### In Page Components
```typescript
import { MainNav, ContactFooter } from '../layout';

export const Page = () => {
  return (
    <>
      <MainNav />
      <main>Page Content</main>
      <ContactFooter />
    </>
  );
};
```

### In Route Configuration
```typescript
import { NotFound } from './layout/NotFound';

// In router configuration
{
  path: "*",
  element: <NotFound />
}
```

## Characteristics

Layout components typically:
- Appear on multiple pages or site-wide
- Provide structural elements (navigation, footer)
- Handle routing and navigation
- Manage site-wide state (cookie preferences, etc.)

## Dependencies

Layout components may import from:
- `../ui/` - UI primitives (e.g., icons, buttons)
- `../contexts/` - React contexts (e.g., scroll context)
- `../services/` - Services (e.g., cookie service)
- `../foundation/seo/` - SEO components (if needed)

## When to Add Components Here

Add components to `layout/` when they:
- Provide site-wide structure or navigation
- Appear on most or all pages
- Handle routing or navigation concerns
- Manage site-wide preferences or state

Do NOT add feature-specific components here - those belong in `features/`.

