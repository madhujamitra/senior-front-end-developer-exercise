import React from 'react';
import UserProfiles from '../../components/UserProfiles';
import { Property } from '../../types/Property';
import propertiesData from '../../data/properties.json';
import styles from './Dashboard.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { MOCK_DATA, UI_TEXT } from '../../constants';
import PropertySection from '../../components/PropertySection/PropertySection';



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
        <h2>{UI_TEXT.headings.profileInfo}</h2>
        <UserProfiles user={user} />
      </section>
      

      <PropertySection
        title={`${UI_TEXT.headings.favoriteProperties} (${favoritesCount})`}
        properties={favoriteProperties}
        emptyMessage={UI_TEXT.emptyStates.noFavorites}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        sectionClassName={styles['dashboard__favorites']}
        cardClassName={styles['property-card--dashboard']}
        listClassName={styles['dashboard__property-list']}
      />
      <PropertySection
        title={UI_TEXT.headings.savedSearches}
        properties={savedSearchProperties}
        emptyMessage={UI_TEXT.emptyStates.noSavedSearches}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        sectionClassName={styles['dashboard__saved-searches']}
        cardClassName={styles['property-card--dashboard']}
        listClassName={styles['dashboard__property-list']}
      />
    </div>
  );
};

export default Dashboard; 