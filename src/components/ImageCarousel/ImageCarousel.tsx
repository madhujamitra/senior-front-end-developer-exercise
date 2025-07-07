import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TIMING } from '../../constants';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    const preloadAdjacent = () => {
      const toLoad = new Set(loadedImages);
      
      // Always load current image
      toLoad.add(currentIndex);
      
      // Load previous and next images
      if (currentIndex > 0) toLoad.add(currentIndex - 1);
      if (currentIndex < images.length - 1) toLoad.add(currentIndex + 1);
      
      setLoadedImages(toLoad);
    };

    preloadAdjacent();
  }, [currentIndex, images.length, loadedImages]);

  const nextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    
    setTimeout(() => setIsTransitioning(false), TIMING.carouselTransition);
  }, [images.length, isTransitioning]);

  const prevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    
    setTimeout(() => setIsTransitioning(false), TIMING.carouselTransition);
  }, [images.length, isTransitioning]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set([...Array.from(prev), index]));
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
        <div 
          className={styles.imageSlider}
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none'
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.slide}>
              {loadedImages.has(index) ? (
                <img 
                  ref={el => imageRefs.current[index] = el}
                  src={image} 
                  alt={`${alt} ${index + 1} of ${images.length}`}
                  className={styles.image}
                  loading={index === 0 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(index)}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <div className={styles.loadingSpinner}></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          className={`${styles.arrow} ${styles.prev}`}
          onClick={prevImage}
          aria-label="Previous image"
          type="button"
          disabled={isTransitioning}
        >
          &#8249;
        </button>
        
        <button 
          className={`${styles.arrow} ${styles.next}`}
          onClick={nextImage}
          aria-label="Next image"
          type="button"
          disabled={isTransitioning}
        >
          &#8250;
        </button>
      </div>

      {/* Counter for both variants */}
      {images.length > 1 && (
        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel; 