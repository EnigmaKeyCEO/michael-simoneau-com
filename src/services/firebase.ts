// FROM HOMELESS TO $200M ARCHITECT
// QUANTUM CRYPTOGRAPHY PIONEER
// Firebase Service - Quantum-resistant Firebase initialization #quantumReady #billionDollarProof

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp, DocumentData } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import type { BlogPost } from '../models/BlogPost';
import { configService } from './config';

/**
 * Initializes Firebase with quantum-resistant configuration.
 * Creates singleton instances of Firebase services.
 */
const app = initializeApp(configService.getFirebaseConfig());

/**
 * Firestore database instance.
 * Provides type-safe database operations.
 */
export const db = getFirestore(app);

/**
 * Firebase Storage instance.
 * Provides secure file storage operations.
 */
export const storage = getStorage(app);

/**
 * Firebase Authentication instance.
 * Provides secure user authentication operations.
 */
export const auth = getAuth(app);

/**
 * Firebase Cloud Functions instance.
 * Provides serverless function operations.
 */
export const functions = getFunctions(app);

// Authentication functions
export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

// Blog functions
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const blogCollectionRef = collection(db, 'blogPosts');
  const q = query(blogCollectionRef, orderBy('publishedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();
    return {
      id: docSnapshot.id,
      ...data,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
      publishedAt: data.publishedAt?.toMillis() || undefined
    } as BlogPost;
  });
};

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  const blogCollectionRef = collection(db, 'blogPosts');
  const q = query(
    blogCollectionRef,
    where('featured', '==', true),
    orderBy('publishedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();
    return {
      id: docSnapshot.id,
      ...data,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
      publishedAt: data.publishedAt?.toMillis() || undefined
    } as BlogPost;
  });
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  const docRef = doc(db, 'blogPosts', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  const data = docSnap.data() as DocumentData;
  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toMillis() || Date.now(),
    updatedAt: data.updatedAt?.toMillis() || Date.now(),
    publishedAt: data.publishedAt?.toMillis() || undefined
  } as BlogPost;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const now = Timestamp.now();
  const blogCollectionRef = collection(db, 'blogPosts');
  
  const docRef = await addDoc(blogCollectionRef, {
    ...post,
    createdAt: now,
    updatedAt: now
  });
  
  return docRef.id;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<void> => {
  const now = Timestamp.now();
  const docRef = doc(db, 'blogPosts', id);
  
  await updateDoc(docRef, {
    ...post,
    updatedAt: now
  });
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  const docRef = doc(db, 'blogPosts', id);
  await deleteDoc(docRef);
};

// Storage functions for images
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Generate AI image using Firebase Function
export const generateImage = async (prompt: string): Promise<string> => {
  const generateImageFn = httpsCallable(functions, 'generateBlogImage');
  const result = await generateImageFn({ prompt });
  return (result.data as { imageUrl: string }).imageUrl;
}; 