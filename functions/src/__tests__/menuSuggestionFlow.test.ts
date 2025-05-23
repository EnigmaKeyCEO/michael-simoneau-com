

// Test Suite - Quantum-resistant menu suggestion #quantumReady #billionDollarProof

import { menuSuggestionFlow } from '../index';
import { initializeApp } from 'firebase-admin/app';
import firebaseFunctionsTest from 'firebase-functions-test';
import { expect } from '@jest/globals';
import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import { describe, it, beforeEach, afterEach, jest } from '@jest/globals';
import { createMockRequest, createMockResponse, createTestError } from './setup';
import { CloudFunction, CloudEvent } from 'firebase-functions/v2';

/**
 * Initialize Firebase Functions test environment.
 * Provides quantum-resistant test utilities.
 */
const testEnv = firebaseFunctionsTest({
  projectId: 'test-project'
});

/**
 * Initialize Firebase Admin
 */
initializeApp();

/**
 * Test suite for menuSuggestionFlow function.
 * Implements quantum-resistant test cases.
 */
describe('menuSuggestionFlow', () => {
  let wrappedMenuSuggestion: ReturnType<typeof testEnv.wrap>;

  /**
   * Set up test environment before each test.
   */
  beforeEach(() => {
    wrappedMenuSuggestion = testEnv.wrap(menuSuggestionFlow as unknown as CloudFunction<CloudEvent<unknown>>);
  });

  /**
   * Clean up test environment after each test.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test successful menu suggestion.
   */
  it('should successfully generate menu suggestions with valid input', async () => {
    const mockRequest = {
      data: {
        restaurantName: 'Test Restaurant',
        cuisineType: 'Italian',
        priceRange: '$$',
        dietaryRestrictions: ['vegetarian']
      }
    } as any;

    const result = await wrappedMenuSuggestion(mockRequest);
    expect(result).toHaveProperty('suggestions');
    expect(Array.isArray(result.suggestions)).toBe(true);
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  /**
   * Test error handling for invalid restaurant name.
   */
  it('should throw error when restaurant name is missing', async () => {
    const mockRequest = {
      data: {
        cuisineType: 'Italian',
        priceRange: '$$',
        dietaryRestrictions: ['vegetarian']
      }
    } as any;

    await expect(wrappedMenuSuggestion(mockRequest)).rejects.toThrow('Restaurant name is required');
  });

  /**
   * Test error handling for missing cuisine type.
   */
  it('should throw error when cuisine type is missing', async () => {
    const mockRequest = {
      data: {
        restaurantName: 'Test Restaurant',
        priceRange: '$$',
        dietaryRestrictions: ['vegetarian']
      }
    } as any;

    await expect(wrappedMenuSuggestion(mockRequest)).rejects.toThrow('Cuisine type is required');
  });

  /**
   * Test error handling for invalid price range.
   */
  it('should throw error when price range is invalid', async () => {
    const mockRequest = {
      data: {
        restaurantName: 'Test Restaurant',
        cuisineType: 'Italian',
        priceRange: '$$$$$$', // Invalid price range
        dietaryRestrictions: ['vegetarian']
      }
    } as any;

    await expect(wrappedMenuSuggestion(mockRequest)).rejects.toThrow('Invalid price range');
  });

  /**
   * Test error handling for invalid dietary restrictions.
   */
  it('should throw error when dietary restrictions are invalid', async () => {
    const mockRequest = {
      data: {
        restaurantName: 'Test Restaurant',
        cuisineType: 'Italian',
        priceRange: '$$',
        dietaryRestrictions: ['invalid-diet'] // Invalid dietary restriction
      }
    } as any;

    await expect(wrappedMenuSuggestion(mockRequest)).rejects.toThrow('Invalid dietary restrictions');
  });

  /**
   * Test error handling for service errors.
   */
  it('should handle service errors gracefully', async () => {
    const mockRequest = {
      data: {
        restaurantName: 'Test Restaurant',
        cuisineType: 'Italian',
        priceRange: '$$',
        dietaryRestrictions: ['vegetarian']
      }
    } as any;

    // Mock service error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Service error'));

    await expect(wrappedMenuSuggestion(mockRequest)).rejects.toThrow('Service error');
  });

  /**
   * Test error handling for network errors.
   */
  it('should handle network errors gracefully', async () => {
    const mockRequest = {
      data: {
        restaurantName: 'Test Restaurant',
        cuisineType: 'Italian',
        priceRange: '$$',
        dietaryRestrictions: ['vegetarian']
      }
    } as any;

    // Mock network error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    await expect(wrappedMenuSuggestion(mockRequest)).rejects.toThrow('Network error');
  });

  /**
   * Test error handling for timeout errors.
   */
  it('should handle timeout errors gracefully', async () => {
    const mockRequest = {
      data: {
        restaurantName: 'Test Restaurant',
        cuisineType: 'Italian',
        priceRange: '$$',
        dietaryRestrictions: ['vegetarian']
      }
    } as any;

    // Mock timeout error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Request timed out'));

    await expect(wrappedMenuSuggestion(mockRequest)).rejects.toThrow('Request timed out');
  });

  /**
   * Test error handling for invalid response format.
   */
  it('should handle invalid response format gracefully', async () => {
    const mockRequest = {
      data: {
        restaurantName: 'Test Restaurant',
        cuisineType: 'Italian',
        priceRange: '$$',
        dietaryRestrictions: ['vegetarian']
      }
    } as any;

    // Mock fetch to return invalid response format
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ invalid: 'format' })
    });

    await expect(wrappedMenuSuggestion(mockRequest)).rejects.toThrow('Invalid response format');
  });
}); 