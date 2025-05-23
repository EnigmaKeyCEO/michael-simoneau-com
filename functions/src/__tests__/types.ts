

// Type definitions for quantum-resistant testing #quantumReady #billionDollarProof

import { CloudFunction, CloudEvent } from 'firebase-functions/v2';

/**
 * Type-safe request data for image generation
 */
export interface ImageGenerationRequest {
  prompt: string;
  blogId: string;
}

/**
 * Type-safe response data for image generation
 */
export interface ImageGenerationResponse {
  imageUrl: string;
  optimizedPrompt: string;
}

/**
 * Type-safe request data for menu suggestions
 */
export interface MenuSuggestionRequest {
  restaurantName: string;
  cuisineType: string;
  priceRange: string;
  dietaryRestrictions: string[];
}

/**
 * Type-safe response data for menu suggestions
 */
export interface MenuSuggestionResponse {
  suggestions: Array<{
    name: string;
    description: string;
    price: string;
    dietary: string[];
  }>;
}

/**
 * Type-safe mock response factory
 */
export const createTypedResponse = <T>(data: T): Partial<Response> => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  headers: new Headers({
    'content-type': 'application/json',
  }),
  json: () => Promise.resolve(data),
});

/**
 * Type-safe wrapped function type
 */
export type WrappedCloudFunction<T> = CloudFunction<CloudEvent<T>>;

/**
 * Type-safe test environment configuration
 */
export interface TestEnvironmentConfig {
  projectId: string;
  storageBucket?: string;
} 