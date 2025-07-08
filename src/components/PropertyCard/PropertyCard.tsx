import React from 'react';
import { useHistory } from 'react-router-dom';
import { Property } from '../../types/Property';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import PropertyDetails from '../PropertyDetails/PropertyDetails';
import { UI_TEXT } from '../../constants';
import styles from './PropertyCard.module.scss';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = '' }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/property/${property.id}`);
  };

  return (
    <div className={`${styles.card} ${className}`} onClick={handleClick}>
      <div className={styles.imageSection}>
        <ImageCarousel
          images={property.images.small}
          alt={property.title}
          variant="card"
          className={styles.carousel}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.price}>${property.price.toLocaleString()}{UI_TEXT.formatting.pricePerMonth}</p>
        <p className={styles.location}>{property.location}</p>
        <PropertyDetails 
          property={property} 
          className={styles.details}
          showLabels={true}
        />
      </div>
    </div>
  );
};

export default PropertyCard; 