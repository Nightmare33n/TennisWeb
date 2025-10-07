'use client';

import { useState, useEffect, useCallback } from 'react';

export const useLandingState = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const enterSite = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Smooth scroll to top before starting animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Start exit animation after a brief delay
    setTimeout(() => {
      setShowLanding(false);
      setHasEntered(true);
    }, 300);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, [isAnimating]);

  // Prevent scroll when landing is shown
  useEffect(() => {
    if (showLanding) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLanding]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showLanding && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        enterSite();
      }
    };

    if (showLanding) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showLanding, enterSite]);

  return {
    showLanding,
    isAnimating,
    hasEntered,
    enterSite,
  };
};