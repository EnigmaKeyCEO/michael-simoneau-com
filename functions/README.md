# Firebase Cloud Functions

This directory contains the backend logic implemented as Firebase Cloud Functions. These functions handle tasks requiring server-side processing, such as interacting with third-party APIs (e.g., Genkit AI), and performing operations that need elevated privileges or direct database access beyond client-side capabilities.

## Architecture Overview

Functions are written in TypeScript and deployed to the Firebase environment. They are designed to be stateless and event-driven or callable via HTTPS requests.

### Key Functions (Illustrative - based on current files):
- **`generateBlogImage.ts`**: Likely responsible for generating or fetching images for blog posts, possibly using an AI service (e.g., Genkit) based on prompts.
- **`menuSuggestionFlow.ts`**: Appears to be a Genkit flow for suggesting menu items based on inputs like restaurant details, cuisine, etc. This might be an example or a feature for a different project/part of the application.
- **`genkit-sample.ts`**: Contains sample Genkit flow, likely for testing or demonstration of Genkit capabilities.
- **`index.ts`**: The main entry point for deploying Firebase Functions, exporting all callable functions.

### Design Principles:
- **Single Responsibility**: Each function should aim to perform a specific, well-defined task.
- **Scalability**: Leverage Firebase's auto-scaling capabilities.
- **Security**: Implement appropriate authentication and authorization checks for callable functions.

## Implementation Guidelines

- **TypeScript**: All functions must be written in TypeScript for type safety and maintainability.
- **Error Handling**: Implement robust error handling using try/catch blocks and Firebase's structured error reporting (e.g., `functions.https.HttpsError`). Log errors effectively using `functions.logger`.
- **Input Validation**: Validate all incoming data for HTTPS callable functions, preferably using a library like Zod (as indicated in `package.json`).
- **Environment Configuration**: Use Firebase environment configuration for API keys, service account details, and other sensitive or environment-specific settings.
- **Idempotency**: Design functions to be idempotent where possible, especially for operations that might be retried.
- **Testing**: Write unit tests for individual function logic and integration tests for flows involving multiple services or Firebase features.

## Performance Metrics

- **Execution Time**: Monitor function execution time in the Firebase console. Aim for short execution times to reduce costs and improve user experience.
- **Cold Starts**: Be mindful of cold start implications. Optimize dependencies and function initialization.
- **Resource Allocation**: Choose appropriate memory allocation for functions based on their needs.

## Security Measures

- **Authentication/Authorization**: Secure HTTPS callable functions by verifying user authentication (`context.auth`) and implementing any necessary authorization logic.
- **Input Validation**: Prevent injection attacks and invalid data processing by rigorously validating inputs (e.g., using Zod).
- **Principle of Least Privilege**: Ensure functions have only the necessary permissions to perform their tasks.
- **Secrets Management**: Store API keys and sensitive credentials in Firebase environment configuration, not in code.
- **Logging**: Log relevant security events, but avoid logging sensitive user data.

## Testing Requirements

- **Unit Tests**: Use frameworks like Jest (as configured in `jest.config.js`) to test individual helper functions and business logic within cloud functions. Mock external dependencies (e.g., Firebase Admin SDK, third-party APIs).
- **Integration Tests**: Test functions by invoking them locally using the Firebase Emulator Suite or by deploying to a test environment.
- **Validation Logic**: Specifically test input validation (e.g., Zod schemas).
- **Coverage**: Aim for high test coverage, especially for business-critical functions.

## Documentation Requirements

- **JSDoc/TSDoc**: Document all exported functions, their parameters, expected input/output, and any important logic or side effects.
- **README**: This README should provide an overview of the functions, their purpose, and development guidelines.
- **Flow Diagrams**: For complex flows involving multiple functions or services, consider a simple diagram. 