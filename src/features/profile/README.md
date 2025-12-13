# Profile Feature Module

## Purpose

Professional profile and service offerings presentation. This feature module contains components for displaying Michael Simoneau's professional profile, services, expertise, and interactive tools.

## Components

### HeroSection
Main hero section component displayed at the top of the main page, introducing Michael Simoneau and providing primary navigation.

**Location:** `components/HeroSection.tsx`

**Usage:**
```typescript
import { HeroSection } from './features/profile';

// In main page
<HeroSection />
```

### AboutMeSection
About me section component providing personal and professional background information.

**Location:** `components/AboutMeSection.tsx`

**Usage:**
```typescript
import { AboutMeSection } from './features/profile';

// In main page
<AboutMeSection />
```

### ServiceOffering
Service offerings display component showing available services and expertise areas.

**Location:** `components/ServiceOffering.tsx`

**Usage:**
```typescript
import { ServiceOffering } from './features/profile';

// In main page
<ServiceOffering />
```

### CTOTriage
Interactive CTO triage tool component that helps visitors identify their needs and navigate to appropriate resources.

**Location:** `components/CTOTriage.tsx`

**Usage:**
```typescript
import { CTOTriage } from './features/profile';

// In main page
<CTOTriage />
```

### SearchOptimizedSummary
SEO-optimized summary section component providing structured content for search engines.

**Location:** `components/SearchOptimizedSummary.tsx`

**Usage:**
```typescript
import { SearchOptimizedSummary } from './features/profile';

// In main page
<SearchOptimizedSummary />
```

## Types

Types are defined in `types.ts`:
- `Service` - Service offering structure (icon, title, description)
- `CTOTriageOption` - CTO triage option structure
- `ProfileSection` - Profile section structure

## Dependencies

- **UI:** Uses `InteractiveButton` from `../ui/buttons/`
- **Interview Feature:** Uses `InterviewButton` from `../features/interview/components/`
- **UI Libraries:** Uses Lucide React for icons
- **Animation:** Uses Framer Motion for animations

## Component Relationships

All profile components are used together in the main page (`MainPage.tsx`) to create a comprehensive professional profile presentation.

## Related Modules

- **Interview Feature:** Uses InterviewButton in HeroSection
- **UI:** Uses InteractiveButton for interactive elements
- **Blog Feature:** BlogTeaser is displayed alongside profile content

