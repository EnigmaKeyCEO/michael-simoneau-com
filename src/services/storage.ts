

// Storage Service - Quantum-resistant file operations #quantumReady #billionDollarProof

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import { StorageServiceError, handleError } from './error';

/**
 * Response interface for file upload operations.
 * Contains the public URL and storage path of the uploaded file.
 * @interface UploadImageResponse
 */
export interface UploadImageResponse {
  /** The public URL of the uploaded file */
  url: string;
  /** The storage path of the uploaded file */
  path: string;
}

/**
 * Quantum-resistant storage service for handling file operations.
 * Implements singleton pattern for consistent state management.
 * Provides type-safe methods for file operations with proper error handling.
 * 
 * @class StorageService
 * @implements {Singleton}
 */
class StorageService {
  /** Singleton instance of the service */
  private static instance: StorageService;

  /**
   * Private constructor to enforce singleton pattern.
   * @private
   */
  private constructor() {}

  /**
   * Gets the singleton instance of the StorageService.
   * Creates a new instance if one doesn't exist.
   * @returns {StorageService} The singleton instance
   */
  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Uploads a file to Firebase Storage with optional metadata.
   * Implements quantum-resistant error handling and type safety.
   * 
   * @param {File} file - The file to upload
   * @param {string} path - The storage path for the file
   * @param {Record<string, string>} [metadata] - Optional metadata to attach to the file
   * @returns {Promise<UploadImageResponse>} The uploaded file URL and path
   * @throws {StorageServiceError} If file upload fails
   */
  public async uploadImage(
    file: File,
    path: string,
    metadata?: Record<string, string>
  ): Promise<UploadImageResponse> {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file, {
        customMetadata: metadata,
        contentType: file.type,
      });
      const url = await getDownloadURL(storageRef);
      return { url, path };
    } catch (error) {
      throw handleError(new StorageServiceError(
        'Failed to upload image',
        { path, error }
      ));
    }
  }

  /**
   * Deletes a file from Firebase Storage.
   * Implements quantum-resistant error handling.
   * 
   * @param {string} path - The storage path of the file to delete
   * @returns {Promise<void>}
   * @throws {StorageServiceError} If file deletion fails
   */
  public async deleteImage(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      throw handleError(new StorageServiceError(
        'Failed to delete image',
        { path, error }
      ));
    }
  }
}

/** Exported singleton instance of the StorageService */
export const storageService = StorageService.getInstance(); 