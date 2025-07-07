// Favorites storage utility
// Logic: Load initial favorites from userProfiles.json, persist updates in localStorage
// Clear localStorage on logout (JSON files cannot be modified in React bundles)

import userProfilesData from '../data/userProfiles.json';

interface UserProfile {
  userProfileID: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  profileImage: string;
  bio?: string;
  location?: string;
  joinDate?: string;
  preferences?: {
    propertyType: string;
    maxBudget: number;
    bedrooms: number;
    amenities: string[];
  };
  favorites: string[];
  password: string;
}

const FAVORITES_STORAGE_KEY = 'user_favorites';

// Get user profile from original JSON
export const getUserProfile = (userProfileID: string): UserProfile | null => {
  const users = userProfilesData as UserProfile[];
  return users.find(user => user.userProfileID === userProfileID) || null;
};

// Get all user profiles from original JSON
export const getAllUserProfiles = (): UserProfile[] => {
  return userProfilesData as UserProfile[];
};

// Get favorites for a user (localStorage first, then JSON fallback)
export const getUserFavorites = (userProfileID: string): string[] => {
  // Check localStorage first
  const storedFavorites = localStorage.getItem(`${FAVORITES_STORAGE_KEY}_${userProfileID}`);
  if (storedFavorites) {
    return JSON.parse(storedFavorites);
  }
  
  // Fallback to JSON file
  const user = getUserProfile(userProfileID);
  return user ? user.favorites : [];
};

// Update favorites for a user in localStorage
export const updateUserFavorites = (userProfileID: string, favorites: string[]): void => {
  localStorage.setItem(`${FAVORITES_STORAGE_KEY}_${userProfileID}`, JSON.stringify(favorites));
  console.log(`✅ Updated favorites for user ${userProfileID} in localStorage:`, favorites);
};

// Add a favorite for a user
export const addUserFavorite = (userProfileID: string, propertyId: string): void => {
  const currentFavorites = getUserFavorites(userProfileID);
  if (!currentFavorites.includes(propertyId)) {
    const newFavorites = [...currentFavorites, propertyId];
    updateUserFavorites(userProfileID, newFavorites);
  }
};

// Remove a favorite for a user
export const removeUserFavorite = (userProfileID: string, propertyId: string): void => {
  const currentFavorites = getUserFavorites(userProfileID);
  const newFavorites = currentFavorites.filter(id => id !== propertyId);
  updateUserFavorites(userProfileID, newFavorites);
};

// Clear favorites for a user (called on logout)
export const clearUserFavorites = (userProfileID: string): void => {
  localStorage.removeItem(`${FAVORITES_STORAGE_KEY}_${userProfileID}`);
  console.log(`🗑️ Cleared favorites for user ${userProfileID} from localStorage`);
};

// Initialize favorites storage
export const initializeFavoritesStorage = () => {
  console.log('📋 Favorites storage initialized - using localStorage with JSON fallback');
}; 