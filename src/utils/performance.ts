// Performance optimization utilities
export const preloadRoute = (routeImport: () => Promise<any>) => {
  // Preload route component on hover or focus
  const link = document.createElement('link');
  link.rel = 'prefetch';
  routeImport();
};

export const preloadCriticalRoutes = () => {
  // Preload most commonly accessed routes
  setTimeout(() => {
    import('../pages/PropertyListing/PropertyListing');
    import('../pages/PropertyDetail/PropertyDetail');
  }, 2000); // Preload after 2 seconds
};

// Image optimization
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

// Memory optimization
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

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}; 