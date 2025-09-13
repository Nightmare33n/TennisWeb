'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const TENNIS_IMAGES = [
  {
    src: '/tennis-court-from-above.jpg',
    alt: 'Vista aérea de cancha de tenis',
    priority: true,
    breakpoint: 'desktop',
    quality: 90,
  },
  {
    src: '/tennis-court-racket.jpg',
    alt: 'Cancha de tenis con raqueta',
    priority: false,
    breakpoint: 'tablet',
    quality: 85,
  },
  {
    src: '/girl-playing-tennis.jpg',
    alt: 'Jugadora de tenis en acción',
    priority: false,
    breakpoint: 'mobile',
    quality: 80,
  },
];

export const ImageSelector = ({ className = '', children, onLoad }) => {
  const [selectedImage, setSelectedImage] = useState(TENNIS_IMAGES[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const selectBestImage = () => {
      const width = window.innerWidth;
      
      if (width >= 1024) {
        setSelectedImage(TENNIS_IMAGES[0]); // desktop - court from above
      } else if (width >= 768) {
        setSelectedImage(TENNIS_IMAGES[1]); // tablet - court with racket
      } else {
        setSelectedImage(TENNIS_IMAGES[2]); // mobile - girl playing
      }
    };

    selectBestImage();
    
    const handleResize = () => {
      selectBestImage();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    // Fallback to the first image if current fails
    if (selectedImage !== TENNIS_IMAGES[0]) {
      setSelectedImage(TENNIS_IMAGES[0]);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Background Image */}
      <Image
        src={selectedImage.src}
        alt={selectedImage.alt}
        fill
        priority={selectedImage.priority}
        quality={selectedImage.quality}
        className="object-cover"
        sizes="100vw"
        onLoad={handleImageLoad}
        onError={handleImageError}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 bg-gray-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};