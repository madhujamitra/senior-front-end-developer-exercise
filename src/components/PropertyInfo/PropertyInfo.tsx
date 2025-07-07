import React from 'react';
import { Property } from '../../types/Property';

interface PropertyInfoProps {
  property: Property;
  className?: string;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property, className = '' }) => {
  return (
    <div className={className}>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Type:</strong> {property.propertyType}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
      <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
    </div>
  );
};

export default PropertyInfo; 