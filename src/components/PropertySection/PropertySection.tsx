import React from 'react';
import { Property } from '../../types/Property';
import PropertyCardWithFavorite from '../PropertyCardWithFavorite/PropertyCardWithFavorite';

interface PropertySectionProps {
  title: string;
  properties: Property[];
  emptyMessage: string;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  className?: string;
  cardClassName?: string;
  sectionClassName?: string;
  listClassName?: string;
}

const PropertySection: React.FC<PropertySectionProps> = ({
  title,
  properties,
  emptyMessage,
  isFavorite,
  onToggleFavorite,
  className = '',
  cardClassName = '',
  sectionClassName = '',
  listClassName = ''
}) => {
  return (
    <section className={`${sectionClassName} ${className}`}>
      <h2>{title}</h2>
      <div className={listClassName}>
        {properties.length === 0 ? (
          <p>{emptyMessage}</p>
        ) : (
          properties.map(property => (
            <PropertyCardWithFavorite
              key={property.id}
              property={property}
              isFavorite={isFavorite(property.id)}
              onToggleFavorite={onToggleFavorite}
              className={cardClassName}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default PropertySection; 