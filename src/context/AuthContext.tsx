import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import userProfiles from '../data/userProfiles.json';

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
    // On mount, check for user session in localStorage
    const storedUser = localStorage.getItem(USER_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    // You can return a spinner or null
    return <div>Loading...</div>;
  }

  const login = (email: string, password: string) => {
    const found = (userProfiles as UserProfile[]).find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      // Check if user has favorites in localStorage from previous sessions
      const storedUserKey = `${USER_KEY}_${found.userProfileID}`;
      const storedUser = localStorage.getItem(storedUserKey);
      
      let userToSet = found;
      if (storedUser) {
        const parsedStoredUser = JSON.parse(storedUser);
        // Merge favorites from localStorage with JSON favorites
        const allFavorites = [...found.favorites, ...parsedStoredUser.favorites];
        const mergedFavorites = Array.from(new Set(allFavorites));
        userToSet = { ...found, favorites: mergedFavorites };
      }
      
      setUser(userToSet);
      // Generate a mock token (could be a random string)
      const token = `${found.userProfileID}-${Date.now()}`;
      localStorage.setItem(USER_KEY, JSON.stringify(userToSet));
      localStorage.setItem(storedUserKey, JSON.stringify(userToSet));
      localStorage.setItem(TOKEN_KEY, token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const updateUserFavorites = (favorites: string[]) => {
    if (user) {
      const updatedUser = { ...user, favorites };
      setUser(updatedUser);
      const storedUserKey = `${USER_KEY}_${user.userProfileID}`;
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      localStorage.setItem(storedUserKey, JSON.stringify(updatedUser));
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