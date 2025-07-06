import React from 'react';
import UserProfiles from '../../components/UserProfiles';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { Property } from '../../types/Property';
import propertiesData from '../../data/properties.json';
import styles from './Dashboard.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

// SVG Favorite Icon Component
const FavoriteIcon = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill={active ? '#e53935' : '#ccc'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
    onClick={onClick}
    onMouseOver={e => (e.currentTarget.style.fill = '#e57373')}
    onMouseOut={e => (e.currentTarget.style.fill = active ? '#e53935' : '#ccc')}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { favorites, favoritesCount, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const properties = propertiesData as Property[];

  // Mock saved search property IDs
  const mockSavedSearchIds = ['2', '4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];

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