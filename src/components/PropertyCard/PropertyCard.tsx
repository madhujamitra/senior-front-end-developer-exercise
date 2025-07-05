import React from 'react';
import { useHistory } from 'react-router-dom';
import { Property } from '../../types/Property';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import styles from './PropertyCard.module.scss';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/property/${property.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
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
        <p className={styles.price}>${property.price.toLocaleString()}/month</p>
        <p className={styles.location}>{property.location}</p>
        <div className={styles.details}>
          <span className={styles.bedrooms}>{property.bedrooms} bed</span>
          <span className={styles.bathrooms}>{property.bathrooms} bath</span>
          <span className={styles.propertyType}>{property.propertyType}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 