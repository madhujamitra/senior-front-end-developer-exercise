import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUserFavorites } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from user profile when user changes
  useEffect(() => {
    if (user && user.favorites) {
      setFavorites(user.favorites);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addToFavorites = (propertyId: string) => {
    if (!user) return;
    
    setFavorites(prev => {
      if (!prev.includes(propertyId)) {
        const newFavorites = [...prev, propertyId];
        // Update the user profile with new favorites
        updateUserFavorites(newFavorites);
        console.log(`Added property ${propertyId} to favorites for user ${user.userProfileID}`);
        return newFavorites;
      }
      return prev;
    });
  };

  const removeFromFavorites = (propertyId: string) => {
    if (!user) return;
    
    setFavorites(prev => {
      const newFavorites = prev.filter(id => id !== propertyId);
      // Update the user profile with new favorites
      updateUserFavorites(newFavorites);
      console.log(`Removed property ${propertyId} from favorites for user ${user.userProfileID}`);
      return newFavorites;
    });
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite,
      favoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
}; 