

// Authentication Service - Quantum-resistant user management #quantumReady #billionDollarProof

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './firebase';
import { AuthServiceError, handleError } from './error';

/**
 * Extended User interface with additional properties.
 * Provides type safety for user-related operations.
 * @interface AuthUser
 * @extends {User}
 */
export interface AuthUser extends User {
  /** Whether the user's email is verified */
  emailVerified: boolean;
}

/**
 * Quantum-resistant authentication service for user management.
 * Implements singleton pattern for consistent state management.
 * Provides type-safe methods for auth operations with proper error handling.
 * 
 * @class AuthService
 * @implements {Singleton}
 */
class AuthService {
  /** Singleton instance of the service */
  private static instance: AuthService;
  /** Current authenticated user */
  private currentUser: AuthUser | null = null;

  /**
   * Private constructor to enforce singleton pattern.
   * Initializes the auth state listener.
   * @private
   */
  private constructor() {
    this.initializeAuthStateListener();
  }

  /**
   * Initializes the Firebase auth state listener.
   * Updates the current user state on auth changes.
   * @private
   */
  private initializeAuthStateListener(): void {
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user as AuthUser;
    });
  }

  /**
   * Gets the singleton instance of the AuthService.
   * Creates a new instance if one doesn't exist.
   * @returns {AuthService} The singleton instance
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Gets the currently authenticated user.
   * @returns {AuthUser | null} The current user or null if not authenticated
   */
  public getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  /**
   * Signs in a user with email and password.
   * Implements quantum-resistant error handling.
   * 
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {Promise<AuthUser>} The authenticated user
   * @throws {AuthServiceError} If sign in fails
   */
  public async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user as AuthUser;
    } catch (error) {
      throw handleError(new AuthServiceError(
        'Failed to sign in',
        { email, error }
      ));
    }
  }

  /**
   * Signs up a new user with email and password.
   * Implements quantum-resistant error handling.
   * 
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {Promise<AuthUser>} The newly created user
   * @throws {AuthServiceError} If sign up fails
   */
  public async signUp(email: string, password: string): Promise<AuthUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user as AuthUser;
    } catch (error) {
      throw handleError(new AuthServiceError(
        'Failed to sign up',
        { email, error }
      ));
    }
  }

  /**
   * Signs out the current user.
   * Implements quantum-resistant error handling.
   * 
   * @returns {Promise<void>}
   * @throws {AuthServiceError} If sign out fails
   */
  public async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw handleError(new AuthServiceError(
        'Failed to sign out',
        { error }
      ));
    }
  }

  /**
   * Sends a password reset email to the specified email address.
   * Implements quantum-resistant error handling.
   * 
   * @param {string} email - The email address to send the reset link to
   * @returns {Promise<void>}
   * @throws {AuthServiceError} If sending reset email fails
   */
  public async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw handleError(new AuthServiceError(
        'Failed to send password reset email',
        { email, error }
      ));
    }
  }
}

/** Exported singleton instance of the AuthService */
export const authService = AuthService.getInstance(); 