# Foundation Directory

## Purpose

This directory contains core infrastructure components that provide cross-cutting concerns and foundational functionality used throughout the application.

## Structure

Foundation components are organized by concern:

```
foundation/
├── seo/              # SEO and metadata components
└── README.md         # This file
```

## Components

### SEO (`foundation/seo/`)

**Seo Component**
Core SEO component that manages meta tags, structured data, Open Graph tags, and other SEO-related functionality.

**Usage:**
```typescript
import { Seo } from '../foundation/seo';

export const Page = () => {
  return (
    <>
      <Seo
        title="Page Title"
        description="Page description"
        canonicalUrl="https://example.com/page"
        keywords={['keyword1', 'keyword2']}
        structuredData={[...]}
      />
      {/* Page content */}
    </>
  );
};
```

## Cross-Cutting Concerns

Foundation components handle concerns that:
- Apply across multiple features
- Provide core infrastructure functionality
- Are not specific to any business domain
- Are essential for application operation

## Foundation vs Feature Distinction

### Foundation Components
- Used across multiple features
- Provide core infrastructure
- Handle cross-cutting concerns
- Examples: SEO, analytics, error boundaries

### Feature Components
- Specific to a business domain
- Contain domain logic
- Used within one feature primarily
- Examples: Blog post display, portfolio showcase

## Adding New Foundation Components

1. **Create subdirectory** - Create a new subdirectory under `foundation/` (e.g., `foundation/analytics/`)
2. **Add component** - Place component files in the subdirectory
3. **Create barrel export** - Add `index.ts` for clean imports
4. **Document** - Update this README with new component information

## Dependencies

Foundation components may import from:
- `../../services/` - Shared services
- `../../contexts/` - React contexts
- `../../utils/` - Utilities
- External libraries

Foundation components should generally NOT import from feature modules.

## Future Considerations

Potential foundation components:
- Analytics tracking
- Error boundaries
- Performance monitoring
- Feature flags
- Internationalization (i18n)

