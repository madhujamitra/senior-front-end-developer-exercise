import React from 'react';
import UserProfiles from '../../components/UserProfiles';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { Property } from '../../types/Property';
import propertiesData from '../../data/properties.json';
import styles from './Dashboard.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { MOCK_DATA } from '../../constants';
import { FavoriteIcon } from '../../components/icons';



const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { favorites, favoritesCount, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const properties = propertiesData as Property[];

  // Mock saved search property IDs
  const mockSavedSearchIds = MOCK_DATA.savedSearchIds;

  if (!user) return null;

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));
  const savedSearchProperties = properties.filter(p => mockSavedSearchIds.includes(p.id));

  const toggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  return (
    <div className={styles.dashboard}>
      <section className={styles['dashboard__profile']}>
        <h2>Profile Info</h2>
        <UserProfiles user={user} />
      </section>
      

      <section className={styles['dashboard__favorites']}>
        <h2>Favorite Properties ({favoritesCount})</h2>
        <div className={styles['dashboard__property-list']}>
          {favoriteProperties.length === 0 ? (
            <p>No favorite properties yet.</p>
          ) : (
            favoriteProperties.map(property => (
              <div key={property.id} style={{ position: 'relative', marginBottom: '1rem' }}>
                <PropertyCard property={property} className={styles['property-card--dashboard']} />
                <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
                  <FavoriteIcon
                    active={isFavorite(property.id)}
                    onClick={() => toggleFavorite(property.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <section className={styles['dashboard__saved-searches']}>
        <h2>Saved Searches</h2>
        <div className={styles['dashboard__property-list']}>
          {savedSearchProperties.length === 0 ? (
            <p>No saved searches yet.</p>
          ) : (
            savedSearchProperties.map(property => (
              <div key={property.id} style={{ position: 'relative', marginBottom: '1rem' }}>
                <PropertyCard property={property} className={styles['property-card--dashboard']} />
                <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
                  <FavoriteIcon
                    active={isFavorite(property.id)}
                    onClick={() => toggleFavorite(property.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 