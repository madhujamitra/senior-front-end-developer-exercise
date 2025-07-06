import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import propertiesData from '../../data/properties.json';
import { Property } from '../../types/Property';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import styles from './PropertyDetail.module.scss';
import Button from '../../components/Button';
import redPrimary from '../../styles/variables.module.scss';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [property, setProperty] = useState<Property | undefined>();
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    return <div>Property not found.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setDialogOpen(false);
      setContact({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleContactClick = () => {
    setDialogOpen(true);
    setSubmitted(false);
  };

  return (
    <section className={styles['property-detail']}>
      <Button
        onClick={() => history.push('/')}
        text="←"
        //color="#888"
      />
      <main className={styles['property-detail__main']}>
        <div className={styles['property-detail__image-section']}>
          <ImageCarousel
            images={property.images.large}
            alt={property.title}
            variant="detail"
            className={styles['property-detail__carousel']}
          />
        </div>
        <article className={styles['property-detail__info']}>
          <header>
            <h1>{property.title}</h1>
          </header>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Type:</strong> {property.propertyType}</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
          <p>{property.description}</p>
          <div>
            <strong>Amenities:</strong>
            <ul>
              {property.amenities?.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </article>
      </main>
      <section className={styles['property-detail__contact']}>
        <Button
          onClick={handleContactClick}
          text="Contact Owner"
          className="btn--red"
        />
        {dialogOpen && (
          <div className={styles['property-detail__dialog']}>
            <div className={styles['property-detail__dialog-content']}>
              <button
                className={styles['property-detail__dialog-close']}
                onClick={() => setDialogOpen(false)}
                aria-label="Close dialog"
                type="button"
              >
                &times;
              </button>
              <h2>Contact Owner</h2>
              {submitted ? (
                <div className={styles['property-detail__notification']}>
                  Thank you for your inquiry! The owner has been notified.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contact.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contact.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={contact.message}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
            <div className={styles['property-detail__dialog-backdrop']} onClick={() => setDialogOpen(false)} />
          </div>
        )}
      </section>
    </section>
  );
};

export default PropertyDetail; 