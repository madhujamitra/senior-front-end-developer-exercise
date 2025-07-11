import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import propertiesData from '../../data/properties.json';
import { Property } from '../../types/Property';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import styles from './PropertyDetail.module.scss';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { TIMING, UI_TEXT, ICONS } from '../../constants';
import PropertyInfo from '../../components/PropertyInfo/PropertyInfo';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const location = useLocation();
  const { user } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [property, setProperty] = useState<Property | undefined>();
  const [inquirySent, setInquirySent] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState('');

  useEffect(() => {
    if (id) {
      const found = (propertiesData as Property[]).find((p) => p.id === id);
      setProperty(found);
      if (found) {
        document.title = `${found.title} | Property Details`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
          meta.setAttribute('content', found.description || 'Property details and amenities.');
        } else {
          const metaTag = document.createElement('meta');
          metaTag.name = 'description';
          metaTag.content = found.description || 'Property details and amenities.';
          document.head.appendChild(metaTag);
        }
      }
    }
  }, [id]);

  if (!property) {
    return <div>{UI_TEXT.emptyStates.propertyNotFound}</div>;
  }

  const handleSendInquiry = () => {
    if (!user) {
      // Redirect to login with current page as redirect parameter
      history.push(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    setInquirySent(true);
    
    // Show message then navigate back
    setTimeout(() => {
      history.push('/');
    }, TIMING.successMessageDuration);
  };

  const handleFavoriteToggle = () => {
    if (!user) {
      // Redirect to login with current page as redirect parameter
      history.push(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    if (!property) return;

    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
      setFavoriteMessage(UI_TEXT.favoriteMessages.removed);
    } else {
      addToFavorites(property.id);
      setFavoriteMessage(UI_TEXT.favoriteMessages.added);
    }

    // Clear message after configured duration
    setTimeout(() => {
      setFavoriteMessage('');
    }, TIMING.successMessageDuration);
  };

  return (
    <section className={styles['property-detail']}>
      <Button
        onClick={() => history.push('/')}
        text={UI_TEXT.buttons.back}
      />
      <main className={styles['property-detail__main']}>
        <div className={styles['property-detail__image-section']}>
          <ImageCarousel
            images={property.images.large}
            alt={property.title}
            variant="detail"
            className={styles['property-detail__carousel']}
          />
          <button
            className={styles['property-detail__favorite-btn']}
            onClick={handleFavoriteToggle}
            aria-label={isFavorite(property.id) ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite(property.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(property.id) ? ICONS.emoji.heartFilled : ICONS.emoji.heartEmpty}
          </button>
        </div>
        <article className={styles['property-detail__info']}>
          <header>
            <h1>{property.title}</h1>
          </header>
          <PropertyInfo property={property} />
          <p>{property.description}</p>
          <div>
            <strong>{UI_TEXT.propertyLabels.amenities}:</strong>
            <ul>
              {property.amenities?.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </article>
      </main>
      <section className={styles['property-detail__contact']}>
        {favoriteMessage && (
          <div className={styles['property-detail__favorite-message']}>
            {favoriteMessage}
          </div>
        )}
        {inquirySent ? (
          <div className={styles['property-detail__notification']}>
            {UI_TEXT.inquirySuccess}
          </div>
        ) : (
          <Button
            onClick={handleSendInquiry}
            text={UI_TEXT.buttons.sendInquiry}
            className="btn--red"
          />
        )}
      </section>
    </section>
  );
};

export default PropertyDetail; 