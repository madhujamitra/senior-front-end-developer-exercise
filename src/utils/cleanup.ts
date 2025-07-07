// Cleanup utility to fix localStorage issues
export const cleanupDuplicateAuthKeys = () => {
  const keysToRemove: string[] = [];
  
  // Find all auth-related keys
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('auth_user')) {
      keysToRemove.push(key);
    }
  });
  
  // Remove all auth keys
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`Removed duplicate key: ${key}`);
  });
  
  // Also remove auth token to force re-login
  localStorage.removeItem('auth_token');
  
  console.log('Cleanup completed. Please log in again.');
};

// Check for duplicate keys and warn user
export const checkForDuplicateKeys = () => {
  const authKeys = Object.keys(localStorage).filter(key => key.startsWith('auth_user'));
  
  if (authKeys.length > 1) {
    console.warn('⚠️ Multiple auth keys detected:', authKeys);
    console.warn('Run cleanupDuplicateAuthKeys() to fix this issue');
    return true;
  }
  
  return false;
};

// Export localStorage data for debugging
export const exportLocalStorageData = () => {
  const data: { [key: string]: any } = {};
  
  Object.keys(localStorage).forEach(key => {
    try {
      data[key] = JSON.parse(localStorage.getItem(key) || '');
    } catch {
      data[key] = localStorage.getItem(key);
    }
  });
  
  return JSON.stringify(data, null, 2);
}; 