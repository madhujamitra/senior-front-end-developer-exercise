export interface Property {
  id: string;
  title: string;
  image: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  description?: string;
  amenities?: string[];
  propertyType?: 'apartment' | 'house' | 'condo';
} 