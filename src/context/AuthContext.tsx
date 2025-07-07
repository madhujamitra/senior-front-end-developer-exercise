import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { initializeFavoritesStorage, getUserProfile, getAllUserProfiles, updateUserFavorites as updateFavoritesStorage, clearUserFavorites } from '../utils/favoritesStorage';
import { checkForDuplicateKeys } from '../utils/cleanup';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

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

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUserFavorites: (favorites: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize favorites storage system
    initializeFavoritesStorage();
    
    // Check for duplicate keys and warn user
    checkForDuplicateKeys();
    
    // On mount, check for user session in localStorage
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      // Try to find user-specific key in localStorage
      const userKeys = Object.keys(localStorage).filter(key => key.startsWith(USER_KEY + '_'));
      if (userKeys.length > 0) {
        const storedUser = localStorage.getItem(userKeys[0]);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Load user profile from JSON (source of truth)
          const userProfile = getUserProfile(parsedUser.userProfileID);
          if (userProfile) {
            setUser(userProfile);
          }
        }
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingSpinner type="auth" message="Initializing application..." />;
  }

  const login = (email: string, password: string) => {
    const allUsers = getAllUserProfiles();
    const found = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      // Get user profile from JSON (source of truth)
      const userProfile = getUserProfile(found.userProfileID);
      
      if (userProfile) {
        setUser(userProfile);
      // Generate a mock token (could be a random string)
      const token = `${found.userProfileID}-${Date.now()}`;
        // Only store user session (not favorites) in localStorage
        const userSpecificKey = `${USER_KEY}_${found.userProfileID}`;
        localStorage.setItem(userSpecificKey, JSON.stringify({ 
          userProfileID: userProfile.userProfileID,
          email: userProfile.email,
          username: userProfile.username 
        }));
      localStorage.setItem(TOKEN_KEY, token);
      return true;
      }
    }
    return false;
  };

  const logout = () => {
    // Remove user-specific key if user exists
    if (user) {
      const userSpecificKey = `${USER_KEY}_${user.userProfileID}`;
      localStorage.removeItem(userSpecificKey);
      
      // Clear user favorites from localStorage
      clearUserFavorites(user.userProfileID);
    }
    
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    
    // Clean up any remaining auth_user keys
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(USER_KEY)) {
        localStorage.removeItem(key);
      }
    });
  };

  const updateUserFavorites = (favorites: string[]) => {
    if (user) {
      // Update favorites in localStorage
      updateFavoritesStorage(user.userProfileID, favorites);
      
      // Update local state to reflect the change
      const updatedUser = { ...user, favorites };
      setUser(updatedUser);
      
      console.log(`🔄 Updated favorites for user ${user.userProfileID} in localStorage`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}; 