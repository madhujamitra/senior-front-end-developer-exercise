import { 
  getUserFavorites, 
  updateUserFavorites, 
  addUserFavorite, 
  removeUserFavorite, 
  clearUserFavorites,
  getUserProfile 
} from '../utils/favoritesStorage';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Favorites Functionality', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Initial State Tests', () => {
    test('should load initial favorites from userProfiles.json for user 1', () => {
      const favorites = getUserFavorites('1');
      expect(favorites).toEqual(['1', '3']);
    });

    test('should load initial favorites from userProfiles.json for user 2', () => {
      const favorites = getUserFavorites('2');
      expect(favorites).toEqual(['2', '4', '5']);
    });

    test('should return empty array for non-existent user', () => {
      const favorites = getUserFavorites('999');
      expect(favorites).toEqual([]);
    });
  });

  describe('Add Favorite Tests', () => {
    test('should add new favorite to user 1', () => {
      // Add favorite
      addUserFavorite('1', '5');
      
      // Check localStorage was updated
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_1',
        JSON.stringify(['1', '3', '5'])
      );
    });

    test('should not add duplicate favorite', () => {
      // Try to add existing favorite
      addUserFavorite('1', '1');
      
      // Should not call setItem (no change)
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    test('should add multiple favorites one by one', () => {
      // Mock localStorage to return updated favorites after each add
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'user_favorites_1') {
          // Return progressively updated favorites
          const callCount = localStorageMock.setItem.mock.calls.length;
          if (callCount === 0) return null; // Initial state
          if (callCount === 1) return JSON.stringify(['1', '3', '5']);
          if (callCount === 2) return JSON.stringify(['1', '3', '5', '7']);
          return JSON.stringify(['1', '3', '5', '7', '9']);
        }
        return null;
      });

      addUserFavorite('1', '5');
      addUserFavorite('1', '7');
      addUserFavorite('1', '9');
      
      // Check that setItem was called 3 times
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(3);
      expect(localStorageMock.setItem).toHaveBeenNthCalledWith(1, 'user_favorites_1', JSON.stringify(['1', '3', '5']));
      expect(localStorageMock.setItem).toHaveBeenNthCalledWith(2, 'user_favorites_1', JSON.stringify(['1', '3', '5', '7']));
      expect(localStorageMock.setItem).toHaveBeenNthCalledWith(3, 'user_favorites_1', JSON.stringify(['1', '3', '5', '7', '9']));
    });
  });

  describe('Remove Favorite Tests', () => {
    test('should remove existing favorite from user 1', () => {
      // Setup: Mock localStorage with existing favorites
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['1', '3', '5']));
      
      // Remove favorite
      removeUserFavorite('1', '5');
      
      // Check localStorage was updated
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_1',
        JSON.stringify(['1', '3'])
      );
    });

    test('should remove favorite from middle of array', () => {
      // Setup: Mock localStorage with multiple favorites
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['1', '3', '5', '7', '9']));
      
      // Remove from middle
      removeUserFavorite('1', '7');
      
      // Check final state
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_1',
        JSON.stringify(['1', '3', '5', '9'])
      );
    });

    test('should handle removing non-existent favorite gracefully', () => {
      // Mock localStorage with existing favorites
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['1', '3']));
      
      // Try to remove non-existent favorite
      removeUserFavorite('1', '999');
      
      // Should still update localStorage with same array
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_1',
        JSON.stringify(['1', '3'])
      );
    });
  });

  describe('Persistence Tests', () => {
    test('should load favorites from localStorage when available', () => {
      // Mock localStorage with existing favorites
      localStorageMock.getItem.mockReturnValue(JSON.stringify(['1', '3', '5', '7']));
      
      const favorites = getUserFavorites('1');
      expect(favorites).toEqual(['1', '3', '5', '7']);
    });

    test('should fallback to JSON when localStorage is empty', () => {
      // Mock empty localStorage
      localStorageMock.getItem.mockReturnValue(null);
      
      const favorites = getUserFavorites('1');
      expect(favorites).toEqual(['1', '3']);
    });
  });

  describe('User Isolation Tests', () => {
    test('should maintain separate favorites for different users', () => {
      // User 1 favorites
      addUserFavorite('1', '5');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_1',
        JSON.stringify(['1', '3', '5'])
      );
      
      // User 2 favorites (should be separate)
      addUserFavorite('2', '8');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_2',
        JSON.stringify(['2', '4', '5', '8'])
      );
    });

    test('should not affect other users when removing favorites', () => {
      // Setup: Mock separate localStorage for each user
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'user_favorites_1') return JSON.stringify(['1', '3', '5']);
        if (key === 'user_favorites_2') return JSON.stringify(['2', '4', '5', '8']);
        return null;
      });
      
      // Remove from user 1 only
      removeUserFavorite('1', '5');
      
      // Check user 1 was updated
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_1',
        JSON.stringify(['1', '3'])
      );
    });
  });

  describe('Clear Favorites Tests', () => {
    test('should clear user favorites on logout', () => {
      // Clear favorites
      clearUserFavorites('1');
      
      // Check localStorage was cleared
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user_favorites_1');
    });

    test('should handle clearing non-existent user favorites', () => {
      // Clear for non-existent user
      clearUserFavorites('999');
      
      // Should still call removeItem
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user_favorites_999');
    });
  });

  describe('Integration Tests', () => {
    test('should handle complete user workflow', () => {
      // Mock localStorage to simulate state changes
      let currentFavorites = ['1', '3'];
      localStorageMock.getItem.mockImplementation(() => JSON.stringify(currentFavorites));
      localStorageMock.setItem.mockImplementation((key, value) => {
        currentFavorites = JSON.parse(value);
      });
      
      // 1. Initial state
      expect(getUserFavorites('1')).toEqual(['1', '3']);
      
      // 2. Add favorites
      addUserFavorite('1', '5');
      expect(currentFavorites).toEqual(['1', '3', '5']);
      
      addUserFavorite('1', '7');
      expect(currentFavorites).toEqual(['1', '3', '5', '7']);
      
      // 3. Remove one favorite
      removeUserFavorite('1', '5');
      expect(currentFavorites).toEqual(['1', '3', '7']);
      
      // 4. Clear on logout
      clearUserFavorites('1');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user_favorites_1');
    });

    test('should handle multiple users with different favorites', () => {
      // Mock localStorage for multiple users
      const userFavorites = {
        'user_favorites_1': ['1', '3'],
        'user_favorites_2': ['2', '4', '5']
      };
      
      localStorageMock.getItem.mockImplementation((key) => {
        return userFavorites[key] ? JSON.stringify(userFavorites[key]) : null;
      });
      
      localStorageMock.setItem.mockImplementation((key, value) => {
        userFavorites[key] = JSON.parse(value);
      });
      
      // User 1 workflow
      addUserFavorite('1', '5');
      expect(userFavorites['user_favorites_1']).toEqual(['1', '3', '5']);
      
      removeUserFavorite('1', '1');
      expect(userFavorites['user_favorites_1']).toEqual(['3', '5']);
      
      // User 2 workflow
      addUserFavorite('2', '8');
      expect(userFavorites['user_favorites_2']).toEqual(['2', '4', '5', '8']);
      
      addUserFavorite('2', '9');
      expect(userFavorites['user_favorites_2']).toEqual(['2', '4', '5', '8', '9']);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty favorites array', () => {
      // Clear all favorites
      updateUserFavorites('1', []);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_1',
        JSON.stringify([])
      );
    });

    test('should handle large number of favorites', () => {
      const manyFavorites = Array.from({ length: 100 }, (_, i) => i.toString());
      updateUserFavorites('1', manyFavorites);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user_favorites_1',
        JSON.stringify(manyFavorites)
      );
    });

    test('should handle special characters in property IDs', () => {
      // Mock localStorage to simulate state changes
      let currentFavorites = ['1', '3'];
      localStorageMock.getItem.mockImplementation(() => JSON.stringify(currentFavorites));
      localStorageMock.setItem.mockImplementation((key, value) => {
        currentFavorites = JSON.parse(value);
      });
      
      addUserFavorite('1', 'property-123');
      expect(currentFavorites).toEqual(['1', '3', 'property-123']);
      
      addUserFavorite('1', 'property_456');
      expect(currentFavorites).toEqual(['1', '3', 'property-123', 'property_456']);
    });
  });

  describe('User Profile Tests', () => {
    test('should get user profile for existing user', () => {
      const user = getUserProfile('1');
      expect(user).toBeTruthy();
      expect(user.userProfileID).toBe('1');
      expect(user.email).toBe('johndoe1@example.com');
      expect(user.favorites).toEqual(['1', '3']);
    });

    test('should return null for non-existent user', () => {
      const user = getUserProfile('999');
      expect(user).toBeNull();
    });
  });
});
