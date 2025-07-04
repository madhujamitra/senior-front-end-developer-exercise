import React, { useEffect, useState } from 'react';
import styles from './PropertyListing.module.scss';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { Property } from '../../types/Property';
import propertiesData from '../../data/properties.json';
import BaseMap from '../../components/BaseMap';
import { SearchState } from '../../App';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

interface PropertyListingProps {
  search: SearchState;
}

const PropertyListing: React.FC<PropertyListingProps> = ({ search }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate async data loading
    setTimeout(() => {
      try {
        setProperties(propertiesData as Property[]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load properties.');
        setLoading(false);
      }
    }, 500);
  }, []);

  const filteredProperties = properties.filter((property) => {
    return search.location === '' || property.location.toLowerCase().includes(search.location.toLowerCase());
  });

  const handleCardClick = (id: string) => {
    window.open(`/property/${id}`, '_blank');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles['property-listings-flex']}>
      <div className={styles['property-listings-flex__list']}>
        <div className={styles['property-listings__grid']}>
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={styles.cardWrapper}
              onClick={() => handleCardClick(property.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleCardClick(property.id);
              }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['property-listings-flex__map']}>
        <BaseMap />
      </div>
    </div>
  );
};

export default PropertyListing; 