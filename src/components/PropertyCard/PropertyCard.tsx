import React from 'react';
import styles from './PropertyCard.module.scss';
import { Property } from '../../types/Property';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className={styles['property-card']}>
      <img className={styles['property-card__image']} src={property.image} alt={property.title} />
      <div className={styles['property-card__info']}>
        <h3 className={styles['property-card__title']}>{property.title}</h3>
        <p className={styles['property-card__location']}>{property.location}</p>
        <p className={styles['property-card__price']}>${property.price.toLocaleString()}</p>
        <p className={styles['property-card__details']}>
          {property.bedrooms} bed &bull; {property.bathrooms} bath
        </p>
      </div>
    </div>
  );
};

export default PropertyCard; 