# Firebase Functions Test Suite

This directory contains the test suite for the Firebase Cloud Functions. Tests are written using Jest and TypeScript, focusing on unit testing individual function logic and input validation.

## Architecture Overview

The testing strategy emphasizes isolating function logic and thoroughly testing all paths, including successful execution and error conditions.

### Key Files:
- `setup.ts`: Contains global setup for the test environment, such as initializing Firebase Admin SDK (if needed for offline tests) and configuring mocks.
- `generateBlogImage.test.ts`: Unit tests for the `generateBlogImage` function. Focuses on testing input validation, interaction with mocked AI services (Genkit), and expected output/error handling.
- `menuSuggestionFlow.test.ts`: Unit tests for the `menuSuggestionFlow` Genkit flow. Tests validation, flow logic, and responses.
- `testRunner.ts`: (Purpose to be clarified - might be a custom runner or utility for specific test scenarios beyond standard Jest execution.)
- `testUtils.ts`: Utility functions and helpers for writing tests, such as mock data generators or common assertion patterns.
- `validation.ts`: (Likely contains shared Zod schemas or validation logic used by both functions and their tests; tests here would validate the validation logic itself.)
- `types.ts`: Shared TypeScript types and interfaces used within the tests.

## Implementation Guidelines

- **Jest Framework**: Utilize Jest for test structure (`describe`, `it`, `beforeEach`, `afterEach`, etc.) and assertions (`expect`).
- **TypeScript**: Write all tests in TypeScript for type safety.
- **Mocking**: Use Jest's mocking capabilities (`jest.mock`, `jest.fn()`) to isolate units under test and mock external dependencies (e.g., Firebase Admin SDK, Genkit AI client, third-party APIs).
- **Clear Descriptions**: Test cases should have clear, descriptive names indicating what they are testing.
- **Arrange-Act-Assert (AAA)**: Structure tests following the AAA pattern.
- **Test Coverage**: Strive for high test coverage for all function logic, especially error paths and validation.

## Performance Metrics (for tests)

- **Test Execution Time**: Keep test execution times fast to encourage frequent running. Long-running tests should be identified and optimized.
- **Resource Usage**: Ensure tests clean up resources properly and do not leak memory or other handles.

## Security Measures (for tests)

- **Mock Data**: Use realistic but non-sensitive mock data for tests.
- **No Live Services**: Tests should not interact with live external services or production Firebase resources. Utilize emulators or mocks.

## Testing Requirements (as per `.cursorrules`)

- **Structure**:
    - `setup`: Global test setup (`setup.ts`).
    - `teardown`: Global test teardown (in `setup.ts` or Jest config).
    - `mocks`: Extensive use of Jest mocks for dependencies.
    - `coverage`: Aim for 80% branch coverage.
- **Patterns**:
    - `describe`, `it` (or `test`): Standard Jest block structure.
    - `beforeEach`, `afterEach`: For setting up/tearing down context for tests within a suite.
- **Assertions**:
    - `expect`: Primary assertion function.
    - `toHaveBeenCalled`, `toEqual`, etc.: Common Jest matchers.

## Documentation Requirements

- **README**: This README should be kept current, outlining the testing strategy, key files, and guidelines.
- **Test Descriptions**: `describe` and `it` blocks should clearly state the purpose of the test suite and individual test case.
- **Complex Mocks**: If complex mock setups are used, they should be commented to explain their purpose. 