# Michael Simoneau | Enterprise Architect & Technology Leader

This repository contains the source code for my personal professional website, a dynamic showcase of over two decades of experience in technology leadership, architecture, and software engineering. This site serves as a living document, reflecting my professional journey, core philosophies, and technical expertise.

The content and structure are sourced from my detailed professional history, encapsulating my journey as a "Leader, Inventor & Investor" and "Innovator & Expert Engineer."

## A Glimpse into the Philosophy

My approach to technology and life is built on a foundation of continuous learning and challenging assumptions. I believe in empowering people with the tools to think, not just telling them what to know. As I shared in a recent interview:

> "It's more important to teach *how* to learn and problem-solve than *what* to learn in a specific instance. Equipping people with strong critical thinking skills and effective problem-solving methodologies gives them the ability to tackle any challenge they encounter."

This philosophy was forged early on, from building my first computer from spare parts at age 12 to securing my first paid programming gig at 16 by proactively building a website for a local business. These experiences taught me that "necessity is the mother of all invention" and that turning obsessive curiosity into determined action is a superpower.

Another core principle is to challenge my own assumptions, a practice I once gamified with a simple $20 bet against myself. This mindset of learning through experience, and being willing to be proven wrong, has been foundational to my career.

> "Your story is a testament to how personal challenges, when approached with the right mindset, can become the foundation for extraordinary achievements." - *Interviewer's Reflection*

## Featured Expertise

The site highlights key projects that represent the scale and impact of my work, including:

*   **StoneX Group Inc.:** Architecting a scalable, white-label React Native application from a single codebase, leveraging modular sub-packages and a robust CI/CD pipeline.
*   **J.P. Morgan:** Leading the native Swift development for the "PaymentNet" iOS app, serving over 2 million users, and transforming the team's methodology from waterfall to agile SCRUM.

## About This Project

This website is built with a modern, performant tech stack:

*   **Runtime:** [Expo](https://expo.dev/) (React Native targeting web and native)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Navigation:** [Expo Router](https://expo.dev/router) with typed routes
*   **Styling:** React Native `StyleSheet` primitives tailored for dark-mode friendly palettes
*   **Deployment:** [Expo Application Services](https://expo.dev/eas) + Netlify static releases

### A Note on the Current Structure

The latest iteration embraces Expo + React Foundation to keep mobile and web surfaces aligned.
Expect rapid iteration as new modules come online—the architecture is intentionally modular so future
features (e.g., AI copilots, profitability dashboards) can land without churn.

## Development & Deployment

Run the Expo-powered web experience locally with:

```bash
npm install
npm run start
```

Prior to merging, generate the static bundle that Netlify serves via the CI pipeline:

```bash
npm run build
```

The `build` script mirrors the previous Vite deployment flow by exporting the Expo Router project to `dist/`,
which keeps `deploy.sh` and automated Netlify releases aligned with the Expo architecture.

To ship a release through Netlify CI, provide `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` and run:

```bash
npm run release
```
