# Frontend Services Directory

This directory houses client-side services responsible for encapsulating business logic, interacting with external APIs, and managing application-wide concerns.

## Architecture Overview

Services here are designed to be modular and injectable, promoting separation of concerns and testability. They handle tasks such as:
- Application configuration management.
- Error handling and reporting.
- Cookie management.

### Key Files:
- `config.ts`: Provides access to application configuration and environment variables with appropriate typing.
- `errorHandler.ts`: Centralized client-side error handling and reporting mechanisms.
- `cookieService.ts`: Utilities for managing browser cookies, particularly for user consent and preferences.
- `ai.ts`: (Currently seems to contain placeholder/example Genkit AI logic, may need review based on actual AI feature implementation for blog post generation or other features).

## Implementation Guidelines

- **Single Responsibility**: Each service should focus on a specific domain or concern.
- **Type Safety**: Utilize TypeScript for all service definitions, method signatures, and return types.
- **Error Handling**: Services should implement robust error handling, utilizing custom error types defined in `errors.ts` or `error.ts` and propagating them appropriately for the UI to handle.
- **Asynchronous Operations**: Use `async/await` for managing asynchronous operations (e.g., API calls).
- **Configuration**: Services requiring configuration should fetch it via `config.ts` rather than hardcoding values.
- **Immutability**: Prefer immutable data structures when passing data to and from services.

## Performance Metrics

- **API Response Times**: Monitor the performance of external API interactions.
- **Initialization Time**: Ensure services initialize efficiently and do not block the main thread.
- **Resource Usage**: Be mindful of resource consumption, especially for services that might handle large data or run continuously.

## Security Measures

- **API Keys & Credentials**: Securely manage API keys and credentials. All service keys should be managed via environment variables and not exposed directly in the codebase.
- **Data Sanitization**: While primary sanitization should occur server-side, client-side services should not inadvertently introduce vulnerabilities when handling data.
- **Error Handling**: Avoid leaking sensitive information in error messages passed to the UI.
- **Authentication**: Ensure `auth.ts` correctly handles token management and secure communication with authentication endpoints.

## Testing Requirements

- **Unit Tests**: Each public method of a service should have corresponding unit tests (e.g., using Jest/Vitest with mocking for external dependencies).
- **Integration Tests**: Test the interaction between services where applicable.
- **Coverage**: Aim for high test coverage for all services due to their critical role.

## Documentation Requirements

- **JSDoc/TSDoc**: Document all public service methods, their parameters, return types, and any thrown errors.
- **README**: This README should be kept up-to-date with an overview of the services, their responsibilities, and guidelines for adding new services.
- **Service Interaction Diagrams**: For complex interactions between services, consider a simple diagram to illustrate data flow. 