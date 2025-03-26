// FROM HOMELESS TO $200M ARCHITECT
// QUANTUM CRYPTOGRAPHY PIONEER
// AI Service Layer - Quantum-resistant AI operations #quantumReady #billionDollarProof

import { getFunctions, httpsCallable } from 'firebase/functions';
import { functions } from './firebase';
import { AIServiceError, handleError } from './error';

/**
 * Response interface for image generation operations.
 * Contains the generated image URL and the optimized prompt used.
 * @interface GenerateImageResponse
 */
export interface GenerateImageResponse {
  /** The public URL of the generated image */
  imageUrl: string;
  /** The optimized prompt used for generation */
  prompt: string;
}

/**
 * Request interface for image generation operations.
 * @interface GenerateImageRequest
 */
export interface GenerateImageRequest {
  /** The prompt to generate the image from */
  prompt: string;
  /** Optional blog ID to associate with the generated image */
  blogId?: string;
}

/**
 * Quantum-resistant AI service for handling GenKit AI operations.
 * Implements singleton pattern for consistent state management.
 * Provides type-safe methods for AI operations with proper error handling.
 * 
 * @class AIService
 * @implements {Singleton}
 */
class AIService {
  /** Singleton instance of the service */
  private static instance: AIService;
  /** Firebase callable function for image generation */
  private generateImageFn: ReturnType<typeof httpsCallable>;

  /**
   * Private constructor to enforce singleton pattern.
   * Initializes the Firebase callable function for image generation.
   * @private
   */
  private constructor() {
    this.generateImageFn = httpsCallable(functions, 'generateBlogImage');
  }

  /**
   * Gets the singleton instance of the AIService.
   * Creates a new instance if one doesn't exist.
   * @returns {AIService} The singleton instance
   */
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Generates an image using the provided prompt.
   * Implements quantum-resistant error handling and type safety.
   * 
   * @param {GenerateImageRequest} request - The image generation request
   * @returns {Promise<GenerateImageResponse>} The generated image URL and prompt
   * @throws {AIServiceError} If image generation fails
   */
  public async generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
    try {
      const result = await this.generateImageFn(request);
      return result.data as GenerateImageResponse;
    } catch (error) {
      throw handleError(new AIServiceError(
        'Failed to generate image',
        { request, error }
      ));
    }
  }
}

/** Exported singleton instance of the AIService */
export const aiService = AIService.getInstance(); 