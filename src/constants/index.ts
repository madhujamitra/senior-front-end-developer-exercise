// Application Constants
export const APP_CONFIG = {
  name: 'Property Listings App',
  version: '0.1.0',
  environment: process.env.NODE_ENV || 'development',
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  timeout: 10000,
  endpoints: {
    uploadImage: '/api/v1/user-profile',
    properties: '/api/properties',
    users: '/api/users',
    auth: '/api/auth',
  },
} as const;

// Network and Performance
export const NETWORK_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  requestTimeout: 10000,
} as const;

// UI Timing Constants
export const TIMING = {
  debounceDelay: 500,
  animationDuration: 300,
  tooltipDelay: 1000,
  errorMessageDuration: 2000,
  successMessageDuration: 2000,
  carouselTransition: 300,
  preloadDelay: 2000,
} as const;

// UI Dimensions and Limits
export const UI_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFavorites: 100,
  itemsPerPage: 12,
  searchMinLength: 2,
  passwordMinLength: 8,
  maxSearchResults: 50,
} as const;

// Map Configuration
export const MAP_CONFIG = {
  defaultCenter: [49.2827, -123.1207] as [number, number], // Vancouver
  defaultZoom: 13,
  minZoom: 1,
  maxZoom: 19,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  markerIconUrl: 'https://rentitfurnished.com/vancouver/wp-content/themes/rentitfurnished/img/RIF-icon.svg',
} as const;

// External URLs
export const EXTERNAL_URLS = {
  rentItFurnished: {
    baseUrl: 'https://rentitfurnished.com/vancouver',
    sampleImage: 'https://rentitfurnished.com/vancouver/wp-content/uploads/sites/2/2020/07/7-13-350x245.jpg',
    sampleProperty: 'https://rentitfurnished.com/vancouver/property/vancouver-furnished-condo-rental-3vc/',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  validation: {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    password: 'Password must be at least 8 characters long.',
    passwordMatch: 'Passwords do not match.',
  },
  upload: {
    fileSize: 'File size must be less than 5MB.',
    fileType: 'Only image files are allowed.',
    failed: 'File upload failed. Please try again.',
  },
  auth: {
    loginFailed: 'Invalid username or password.',
    sessionExpired: 'Your session has expired. Please login again.',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  generic: 'Operation completed successfully.',
  saved: 'Changes saved successfully.',
  uploaded: 'File uploaded successfully.',
  deleted: 'Item deleted successfully.',
  auth: {
    loginSuccess: 'Welcome back!',
    logoutSuccess: 'You have been logged out.',
    registrationSuccess: 'Account created successfully.',
  },
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
  default: 'Loading...',
  properties: 'Loading properties...',
  profile: 'Loading profile...',
  dashboard: 'Loading dashboard...',
  auth: 'Authenticating...',
  uploading: 'Uploading file...',
  saving: 'Saving changes...',
} as const;

// Property Types
export const PROPERTY_TYPES = {
  apartment: 'apartment',
  house: 'house',
  condo: 'condo',
  townhouse: 'townhouse',
  studio: 'studio',
} as const;

// Filter Options
export const FILTER_OPTIONS = {
  priceRanges: [
    { min: 0, max: 1500, label: 'Under $1,500' },
    { min: 1500, max: 2500, label: '$1,500 - $2,500' },
    { min: 2500, max: 3500, label: '$2,500 - $3,500' },
    { min: 3500, max: 5000, label: '$3,500 - $5,000' },
    { min: 5000, max: Infinity, label: 'Over $5,000' },
  ],
  bedrooms: [1, 2, 3, 4, 5],
  bathrooms: [1, 1.5, 2, 2.5, 3, 3.5, 4],
} as const;

// Theme Constants
export const THEME_CONFIG = {
  defaultTheme: 'light',
  storageKey: 'app-theme',
  transitionDuration: '0.3s',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'app-theme',
  favorites: 'user-favorites',
  auth: 'auth-token',
  preferences: 'user-preferences',
  searches: 'saved-searches',
} as const;

// Breakpoints (matching SCSS variables)
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1200,
} as const;

// Mock Data Constants
export const MOCK_DATA = {
  samplePrice: '3,400',
  defaultAvatar: '/images/avatar-default.png',
  savedSearchIds: ['2', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'] as string[],
} as const;

// Popular Cities for Search
export const POPULAR_CITIES = [
  'Vancouver',
  'Toronto',
  'Montreal',
  'Calgary',
  'Ottawa',
  'Edmonton',
  'Mississauga',
  'Winnipeg',
] as const;

// SVG Icons (for common icons used in the app)
export const ICONS = {
  search: {
    viewBox: '0 0 24 24',
    path: 'M11 19c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm6.3-2.8l4.4 4.4',
  },
  heart: {
    viewBox: '0 0 24 24',
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  },
  location: {
    viewBox: '0 0 24 24',
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
    circle: 'M12 9m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0',
  },
} as const;

// Export all constants as a single object for convenience
export const CONSTANTS = {
  APP_CONFIG,
  API_CONFIG,
  NETWORK_CONFIG,
  TIMING,
  UI_CONFIG,
  MAP_CONFIG,
  EXTERNAL_URLS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_MESSAGES,
  PROPERTY_TYPES,
  FILTER_OPTIONS,
  THEME_CONFIG,
  STORAGE_KEYS,
  BREAKPOINTS,
  MOCK_DATA,
  POPULAR_CITIES,
  ICONS,
} as const; 