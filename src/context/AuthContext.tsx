import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { initializeFavoritesStorage, getUserProfile, getAllUserProfiles, updateUserFavorites as updateFavoritesStorage, clearUserFavorites } from '../utils/favoritesStorage';
import { getItem, setItem, removeItem, getAllKeys } from '../utils/localStorage';
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
    
    // Check for existing session
    const checkSession = () => {
      const storedToken = getItem<string>(TOKEN_KEY);
      if (storedToken) {
        // Try to find user-specific key in localStorage
        const userKeys = getAllKeys().filter(key => key.startsWith(USER_KEY + '_'));
        if (userKeys.length > 0) {
          const storedUser = getItem<any>(userKeys[0]);
          if (storedUser) {
            // Load user profile from JSON (source of truth)
            const userProfile = getUserProfile(storedUser.userProfileID);
            if (userProfile) {
              setUser(userProfile);
            }
          }
        }
      } else {
        // No token found, ensure user is logged out
        setUser(null);
      }
    };

    // Check session on mount
    checkSession();
    setLoading(false);

    // Listen for storage changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      // If auth token was removed in another tab, logout this tab too
      if (e.key === TOKEN_KEY && e.newValue === null) {
        setUser(null);
      }
      // If auth token was added in another tab, check for login
      else if (e.key === TOKEN_KEY && e.newValue !== null) {
        checkSession();
      }
      // If any user key was removed, check session
      else if (e.key && e.key.startsWith(USER_KEY) && e.newValue === null) {
        checkSession();
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
        setItem(userSpecificKey, { 
          userProfileID: userProfile.userProfileID,
          email: userProfile.email,
          username: userProfile.username 
        });
      setItem(TOKEN_KEY, token);
      return true;
      }
    }
    return false;
  };

  const logout = () => {
    // Remove user-specific key if user exists
    if (user) {
      const userSpecificKey = `${USER_KEY}_${user.userProfileID}`;
      removeItem(userSpecificKey);
      
      // Clear user favorites from localStorage
      clearUserFavorites(user.userProfileID);
    }
    
    setUser(null);
    removeItem(TOKEN_KEY);
    
    // Clean up any remaining auth_user keys
    getAllKeys().forEach(key => {
      if (key.startsWith(USER_KEY)) {
        removeItem(key);
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
      
      // Favorites updated in localStorage
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