import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import { FavoriteIcon } from '../icons';
import { Property } from '../../types/Property';

interface PropertyCardWithFavoriteProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  className?: string;
}

const PropertyCardWithFavorite: React.FC<PropertyCardWithFavoriteProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  className = ''
}) => {
  return (
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      <PropertyCard property={property} className={className} />
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
        <FavoriteIcon
          active={isFavorite}
          onClick={() => onToggleFavorite(property.id)}
        />
      </div>
    </div>
  );
};

export default PropertyCardWithFavorite; 