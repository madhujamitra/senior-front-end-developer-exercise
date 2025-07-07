import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import { Property } from '../../types/Property';

interface PropertyGridProps {
  properties: Property[];
  onCardClick: (id: string) => void;
  className?: string;
  cardClassName?: string;
  gridClassName?: string;
  propertyCardClassName?: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ 
  properties, 
  onCardClick, 
  className = '',
  cardClassName = '',
  gridClassName = '',
  propertyCardClassName = ''
}) => {
  return (
    <div className={`${gridClassName} ${className}`}>
      {properties.map((property) => (
        <div
          key={property.id}
          className={cardClassName}
          onClick={() => onCardClick(property.id)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onCardClick(property.id);
          }}
        >
          <PropertyCard property={property} className={propertyCardClassName} />
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid; 