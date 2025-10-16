# Expo React Foundation Source Directory

This folder contains the Expo-driven React Native Web application for michael-simoneau.com.
It is organized around React Foundation primitives and feature-based modules.

## Architecture Snapshot

- **React Native + Expo Router** deliver a universal app surface that targets mobile and web from one codebase.
- **React Foundation** (see `src/foundation`) supplies runtime metadata, analytics, and feature flags.
- **Feature slices** live under `src/features`, each owning its screens, components, hooks, and optional data stores.
- **Global providers** reside in `src/providers/AppProviders.tsx` and wrap the entire router tree.

```
src/
├── foundation/     # Runtime + configuration kernel
├── providers/      # Provider composition (Foundation, Safe Area, etc.)
└── features/
    ├── blog/          # Blog data, hooks, list/detail screens
    ├── home/          # Landing dashboard experiences
    └── cryptoFabric/  # Product storytelling surface
```

## Implementation Guidance

- Author all UI with React Native primitives and `StyleSheet.create` for styles.
- Fetch or compute data inside hooks; screens should focus on presentation + analytics emission.
- Use the `useFoundation*` hooks instead of reaching directly into platform APIs.
- Keep navigation logic isolated to the `app/` directory and Expo Router conventions.

## Testing & Quality

- Add React Native Testing Library specs as features mature.
- Run `npm run typecheck` and `npm run lint` locally before sending pull requests.
- Ensure analytics events emitted from screens are type-safe and covered by tests when possible.

## Documentation

- Update `AGENTS.md` files when evolving conventions.
- Capture notable architectural changes in the repository `README.md` or dedicated ADR documents.
