export interface Property {
  id: string;
  title: string;
  image: string;
  thumbnail: string;
  images: {
    small: string[];
    large: string[];
  };
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  propertyType: string;
} 