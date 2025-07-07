import { TIMING } from '../constants';

// Route preloading utilities
export const preloadCriticalRoutes = () => {
  // Preload most commonly accessed routes
  setTimeout(() => {
    import('../pages/PropertyListing/PropertyListing');
    import('../pages/PropertyDetail/PropertyDetail');
  }, TIMING.preloadDelay);
};

// Image optimization utilities
export const optimizeImage = (src: string, width?: number): string => {
  // Return WebP version if available and supported
  if (supportsWebP()) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return src;
};

export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Input optimization utilities
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}; 