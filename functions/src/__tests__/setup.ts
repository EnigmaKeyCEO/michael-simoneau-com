// FROM HOMELESS TO $200M ARCHITECT
// QUANTUM CRYPTOGRAPHY PIONEER
// Test Setup - Quantum-resistant test environment #quantumReady #billionDollarProof

import * as admin from 'firebase-admin';
import functionsTest from 'firebase-functions-test';
import { beforeAll, afterAll, beforeEach, afterEach, jest } from '@jest/globals';
import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';

/**
 * Initialize Firebase Admin SDK for testing.
 * Uses emulator configuration for isolated testing.
 */
admin.initializeApp({
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
});

/**
 * Initialize Firebase Functions test environment.
 * Provides quantum-resistant test utilities.
 */
const testEnv = functionsTest({
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
});

/**
 * Global test environment setup.
 * Configures test environment before each test suite.
 */
beforeAll(() => {
  // Set up test environment variables
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FUNCTIONS_EMULATOR = 'true';
  process.env.GENKIT_API_KEY = 'test-api-key';
  process.env.GENKIT_API_URL = 'https://api.genkit.ai/v1';
});

/**
 * Global test environment cleanup.
 * Cleans up test environment after each test suite.
 */
afterAll(() => {
  // Clean up test environment
  testEnv.cleanup();
});

/**
 * Test case setup.
 * Resets mocks and test environment before each test.
 */
beforeEach(() => {
  // Reset all mocks
  jest.clearAllMocks();
  
  // Reset test environment variables
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FUNCTIONS_EMULATOR = 'true';
  process.env.GENKIT_API_KEY = 'test-api-key';
  process.env.GENKIT_API_URL = 'https://api.genkit.ai/v1';
});

/**
 * Test case cleanup.
 * Performs cleanup after each test.
 */
afterEach(() => {
  // Clean up any test data
  jest.clearAllMocks();
});

/**
 * Mock request factory for testing.
 * Creates a consistent mock request object.
 * 
 * @param {Record<string, unknown>} body - Request body
 * @returns {Request} Mock request object
 */
export const createMockRequest = (body: Record<string, unknown>) => ({
  body,
  rawBody: Buffer.from(JSON.stringify(body)),
  headers: {
    'content-type': 'application/json',
  },
});

/**
 * Mock response factory for testing.
 * Creates a consistent mock response object.
 * 
 * @returns {Response} Mock response object
 */
export const createMockResponse = () => ({
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
  set: jest.fn(),
});

/**
 * Error factory for testing.
 * Creates consistent error objects.
 * 
 * @param {string} message - Error message
 * @param {Record<string, unknown>} [context] - Error context
 * @returns {Error} Error object
 */
export const createTestError = (message: string, context?: Record<string, unknown>) => {
  const error = new Error(message);
  if (context) {
    Object.assign(error, context);
  }
  return error;
}; 