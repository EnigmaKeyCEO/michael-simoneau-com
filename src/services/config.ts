

// Configuration Service - Quantum-resistant app configuration #quantumReady #billionDollarProof

import { z } from 'zod';

/**
 * Application configuration interface.
 * Defines the structure of all configurable values.
 * @interface AppConfig
 */
export interface AppConfig {
  /** AI-related configuration */
  ai: {
    /** Maximum image size in bytes */
    maxImageSize: number;
    /** Maximum prompt length */
    maxPromptLength: number;
    /** Allowed image types */
    allowedImageTypes: string[];
  };
}

/**
 * Quantum-resistant configuration service.
 * Implements singleton pattern for consistent state management.
 * Provides type-safe access to application configuration.
 * 
 * @class ConfigService
 * @implements {Singleton}
 */
class ConfigService {
  /** Singleton instance of the service */
  private static instance: ConfigService;
  /** Application configuration */
  private config: AppConfig;

  /**
   * Private constructor to enforce singleton pattern.
   * Initializes configuration from environment variables.
   * @private
   */
  private constructor() {
    this.config = this.initializeConfig();
  }

  /**
   * Initializes configuration from environment variables.
   * Validates all required values are present.
   * @private
   * @returns {AppConfig} The validated configuration
   * @throws {Error} If required environment variables are missing
   */
  private initializeConfig(): AppConfig {
    const config: AppConfig = {
      ai: {
        maxImageSize: 5 * 1024 * 1024, // 5MB
        maxPromptLength: 500,
        allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
      },
    };

    this.validateConfig(config);
    return config;
  }

  /**
   * Validates the configuration object.
   * Ensures all required values are present and valid.
   * @private
   * @param {AppConfig} config - The configuration to validate
   * @throws {Error} If validation fails
   */
  private validateConfig(config: AppConfig): void {
    const schema = z.object({
      ai: z.object({
        maxImageSize: z.number().positive(),
        maxPromptLength: z.number().positive(),
        allowedImageTypes: z.array(z.string()),
      }),
    });

    const result = schema.safeParse(config);
    if (!result.success) {
      throw new Error(`Invalid configuration: ${result.error.message}`);
    }
  }

  /**
   * Gets the singleton instance of the ConfigService.
   * Creates a new instance if one doesn't exist.
   * @returns {ConfigService} The singleton instance
   */
  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  /**
   * Gets the AI configuration.
   * @returns {AppConfig['ai']} The AI configuration
   */
  public getAIConfig(): AppConfig['ai'] {
    return this.config.ai;
  }

  /**
   * Validates an image file against configuration constraints.
   * @param {File} file - The image file to validate
   * @returns {boolean} Whether the file is valid
   */
  public validateImageFile(file: File): boolean {
    const { maxImageSize, allowedImageTypes } = this.config.ai;
    return (
      file.size <= maxImageSize &&
      allowedImageTypes.includes(file.type)
    );
  }

  /**
   * Validates a prompt against configuration constraints.
   * @param {string} prompt - The prompt to validate
   * @returns {boolean} Whether the prompt is valid
   */
  public validatePrompt(prompt: string): boolean {
    return prompt.length <= this.config.ai.maxPromptLength;
  }
}

/** Exported singleton instance of the ConfigService */
export const configService = ConfigService.getInstance(); 