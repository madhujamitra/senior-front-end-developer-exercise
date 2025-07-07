import { STORAGE_KEYS } from '../constants';

/**
 * Local Storage Utility
 * Provides a centralized way to interact with localStorage with error handling
 */

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    
    // Test localStorage functionality
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn('localStorage is not available:', error);
    return false;
  }
};

/**
 * Get an item from localStorage
 * @param key - The key to retrieve
 * @param defaultValue - Default value if key doesn't exist or parsing fails
 * @returns The parsed value or default value
 */
export const getItem = <T = any>(key: string, defaultValue: T | null = null): T | null => {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    
    // Try to parse as JSON, fallback to string
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error getting localStorage item "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Set an item in localStorage
 * @param key - The key to set
 * @param value - The value to store (will be JSON stringified)
 * @returns boolean indicating success
 */
export const setItem = (key: string, value: any): boolean => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.warn(`Error setting localStorage item "${key}":`, error);
    return false;
  }
};

/**
 * Remove an item from localStorage
 * @param key - The key to remove
 * @returns boolean indicating success
 */
export const removeItem = (key: string): boolean => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Error removing localStorage item "${key}":`, error);
    return false;
  }
};

/**
 * Clear all items from localStorage
 * @returns boolean indicating success
 */
export const clear = (): boolean => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.warn('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Get all keys from localStorage
 * @returns Array of all localStorage keys
 */
export const getAllKeys = (): string[] => {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  } catch (error) {
    console.warn('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * Check if a key exists in localStorage
 * @param key - The key to check
 * @returns boolean indicating if key exists
 */
export const hasItem = (key: string): boolean => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    return window.localStorage.getItem(key) !== null;
  } catch (error) {
    console.warn(`Error checking localStorage item "${key}":`, error);
    return false;
  }
};

/**
 * Get the size (in bytes) of localStorage usage
 * @returns number of bytes used
 */
export const getStorageSize = (): number => {
  if (!isLocalStorageAvailable()) {
    return 0;
  }

  try {
    let totalSize = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key) {
        const value = window.localStorage.getItem(key) || '';
        totalSize += key.length + value.length;
      }
    }
    return totalSize;
  } catch (error) {
    console.warn('Error calculating localStorage size:', error);
    return 0;
  }
};

// Convenience methods using predefined storage keys
export const storageUtils = {
  // Theme utilities
  getTheme: () => getItem<string>(STORAGE_KEYS.theme, 'light'),
  setTheme: (theme: string) => setItem(STORAGE_KEYS.theme, theme),
  
  // Favorites utilities
  getFavorites: () => getItem<string[]>(STORAGE_KEYS.favorites, []),
  setFavorites: (favorites: string[]) => setItem(STORAGE_KEYS.favorites, favorites),
  
  // Auth utilities
  getAuthToken: () => getItem<string>(STORAGE_KEYS.auth),
  setAuthToken: (token: string) => setItem(STORAGE_KEYS.auth, token),
  removeAuthToken: () => removeItem(STORAGE_KEYS.auth),
  
  // Preferences utilities
  getPreferences: () => getItem<object>(STORAGE_KEYS.preferences, {}),
  setPreferences: (preferences: object) => setItem(STORAGE_KEYS.preferences, preferences),
  
  // Saved searches utilities
  getSavedSearches: () => getItem<object[]>(STORAGE_KEYS.searches, []),
  setSavedSearches: (searches: object[]) => setItem(STORAGE_KEYS.searches, searches),
};

// Export everything as default object as well
const localStorageUtil = {
  getItem,
  setItem,
  removeItem,
  clear,
  getAllKeys,
  hasItem,
  getStorageSize,
  isAvailable: isLocalStorageAvailable,
  utils: storageUtils,
};

export default localStorageUtil; 