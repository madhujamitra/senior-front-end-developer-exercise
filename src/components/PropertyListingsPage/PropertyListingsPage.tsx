import React, { useEffect, useState } from 'react';
import styles from './PropertyListingsPage.module.scss';
import PropertyCard from '../PropertyCard/PropertyCard';
import { Property } from '../../types/Property';
import propertiesData from '../../data/properties.json';
import BaseMap from '../BaseMap';
import { SearchState } from '../../App';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface PropertyListingsPageProps {
  search: SearchState;
}

const PropertyListingsPage: React.FC<PropertyListingsPageProps> = ({ search }) => {
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles['property-listings-flex']}>
      <div className={styles['property-listings-flex__list']}>
        <div className={styles['property-listings__grid']}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      <div className={styles['property-listings-flex__map']}>
        <BaseMap />
      </div>
    </div>
  );
};

export default PropertyListingsPage; 