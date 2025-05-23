

// Test utilities for quantum-resistant testing #quantumReady #billionDollarProof

import { CloudFunction, CloudEvent } from 'firebase-functions/v2';
import { createTypedResponse, TestEnvironmentConfig } from './types';
import firebaseFunctionsTest from 'firebase-functions-test';

/**
 * Creates a type-safe test environment
 */
export const createTestEnvironment = (config: TestEnvironmentConfig) => {
  return firebaseFunctionsTest(config);
};

/**
 * Type-safe mock fetch factory
 */
export const createMockFetch = <T>(responseData: T, options: Partial<Response> = {}) => {
  const mockResponse = {
    ...createTypedResponse(responseData),
    ...options,
  };
  return jest.fn().mockResolvedValue(mockResponse);
};

/**
 * Type-safe error factory
 */
export const createTypedError = <T extends Error>(
  message: string,
  properties: Partial<T> = {}
): T => {
  const error = new Error(message) as T;
  Object.assign(error, properties);
  return error;
};

/**
 * Type-safe function wrapper
 */
export const wrapCloudFunction = <T>(
  testEnv: ReturnType<typeof firebaseFunctionsTest>,
  func: CloudFunction<any>
): CloudFunction<CloudEvent<T>> => {
  return testEnv.wrap(func) as unknown as CloudFunction<CloudEvent<T>>;
};

/**
 * Type-safe mock request factory
 */
export const createTypedRequest = <T>(data: T) => ({
  data,
});

/**
 * Validates test coverage requirements
 */
export const validateTestCoverage = (coverage: {
  functions: number;
  branches: number;
  lines: number;
  statements: number;
}) => {
  const requirements = {
    functions: 100,
    branches: 80,
    lines: 80,
    statements: 80,
  };

  Object.entries(requirements).forEach(([key, required]) => {
    const actual = coverage[key as keyof typeof coverage];
    if (actual < required) {
      throw new Error(
        `Test coverage for ${key} (${actual}%) does not meet minimum requirement (${required}%)`
      );
    }
  });
};

/**
 * Type-safe storage mock factory
 */
export const createMockStorage = (mockImplementation: jest.Mock) => {
  return {
    bucket: jest.fn().mockImplementation(mockImplementation),
  };
}; 