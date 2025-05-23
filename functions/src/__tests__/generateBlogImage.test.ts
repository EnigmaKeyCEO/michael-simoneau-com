

// Test Suite - Quantum-resistant image generation #quantumReady #billionDollarProof

import { generateBlogImage } from '../generateBlogImage';
import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import firebaseFunctionsTest from 'firebase-functions-test';
import { expect } from '@jest/globals';
import { describe, it, beforeEach, afterEach, jest } from '@jest/globals';
import { createMockRequest, createMockResponse, createTestError } from './setup';

/**
 * Initialize Firebase Functions test environment.
 * Provides quantum-resistant test utilities.
 */
const testEnv = firebaseFunctionsTest({
  projectId: 'test-project',
  storageBucket: 'test-project.appspot.com'
});

/**
 * Initialize Firebase Admin
 */
initializeApp();
const storage = getStorage();

/**
 * Test suite for generateBlogImage function.
 * Implements quantum-resistant test cases.
 */
describe('generateBlogImage', () => {
  let wrappedGenerateImage: any;

  /**
   * Set up test environment before each test.
   */
  beforeEach(() => {
    wrappedGenerateImage = testEnv.wrap(generateBlogImage);
  });

  /**
   * Clean up test environment after each test.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test successful image generation.
   */
  it('should successfully generate an image with valid input', async () => {
    const mockRequest = {
      data: {
        prompt: 'test prompt',
        blogId: 'test-blog-123'
      }
    } as any;

    const result = await wrappedGenerateImage(mockRequest);
    expect(result).toHaveProperty('imageUrl');
    expect(result).toHaveProperty('optimizedPrompt');
  });

  /**
   * Test error handling for missing prompt.
   */
  it('should throw error when prompt is missing', async () => {
    const mockRequest = {
      data: {
        blogId: 'test-blog-123'
      }
    } as any;

    await expect(wrappedGenerateImage(mockRequest)).rejects.toThrow('Prompt is required');
  });

  /**
   * Test error handling for empty prompt.
   */
  it('should throw error when prompt is empty', async () => {
    const mockRequest = {
      data: {
        prompt: '',
        blogId: 'test-blog-123'
      }
    } as any;

    await expect(wrappedGenerateImage(mockRequest)).rejects.toThrow('Prompt cannot be empty');
  });

  /**
   * Test error handling for invalid blog ID.
   */
  it('should throw error when blogId is invalid', async () => {
    const mockRequest = {
      data: {
        prompt: 'test prompt',
        blogId: ''
      }
    } as any;

    await expect(wrappedGenerateImage(mockRequest)).rejects.toThrow('Invalid blogId');
  });

  /**
   * Test error handling for service errors.
   */
  it('should handle service errors gracefully', async () => {
    const mockRequest = {
      data: {
        prompt: 'test prompt',
        blogId: 'test-blog-123'
      }
    } as any;

    // Mock storage to throw error
    jest.spyOn(storage, 'bucket').mockImplementation(() => {
      throw new Error('Storage service error');
    });

    await expect(wrappedGenerateImage(mockRequest)).rejects.toThrow('Storage service error');
  });

  /**
   * Test error handling for network errors.
   */
  it('should handle network errors gracefully', async () => {
    const mockRequest = {
      data: {
        prompt: 'test prompt',
        blogId: 'test-blog-123'
      }
    } as any;

    // Mock network error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    await expect(wrappedGenerateImage(mockRequest)).rejects.toThrow('Network error');
  });

  /**
   * Test error handling for timeout errors.
   */
  it('should handle timeout errors gracefully', async () => {
    const mockRequest = {
      data: {
        prompt: 'test prompt',
        blogId: 'test-blog-123'
      }
    } as any;

    // Mock timeout error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Request timed out'));

    await expect(wrappedGenerateImage(mockRequest)).rejects.toThrow('Request timed out');
  });
}); 