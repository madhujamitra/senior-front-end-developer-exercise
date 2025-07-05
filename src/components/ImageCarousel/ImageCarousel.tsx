import React, { useState, useCallback } from 'react';
import styles from './ImageCarousel.module.scss';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  variant?: 'card' | 'detail';
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  alt, 
  variant = 'card',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className={`${styles.carousel} ${styles[variant]} ${className}`}>
        <div className={styles.placeholder}>No images available</div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`${styles.carousel} ${styles[variant]} ${className}`}>
        <img 
          src={images[0]} 
          alt={alt}
          className={styles.image}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.carousel} ${styles[variant]} ${className}`}>
      <div className={styles.imageContainer}>
        <img 
          src={images[currentIndex]} 
          alt={`${alt} - Image ${currentIndex + 1}`}
          className={styles.image}
          loading="lazy"
        />
        
        {/* Navigation arrows */}
        <button 
          className={`${styles.arrow} ${styles.prev}`}
          onClick={prevImage}
          aria-label="Previous image"
          type="button"
        >
          &#8249;
        </button>
        
        <button 
          className={`${styles.arrow} ${styles.next}`}
          onClick={nextImage}
          aria-label="Next image"
          type="button"
        >
          &#8250;
        </button>
      </div>

      {/* Dots indicator for detail view */}
      {variant === 'detail' && images.length > 1 && (
        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}

      {/* Counter for card view */}
      {variant === 'card' && images.length > 1 && (
        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel; 