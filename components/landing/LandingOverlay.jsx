'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ImageSelector } from './ImageSelector';
import { 
  landingOverlayVariants, 
  contentVariants, 
  buttonVariants,
  imageVariants,
  springConfig 
} from './animations/transitions';

export const LandingOverlay = ({ 
  isVisible, 
  onEnter, 
  title = "Conecta con jugadores de tennis", 
  subtitle = "La comunidad más activa de México",
  buttonText = "Empezar",
  isAnimating = false 
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="landing-overlay"
          variants={landingOverlayVariants}
          initial="visible"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ willChange: 'opacity, transform' }}
        >
          <ImageSelector className="absolute inset-0">
            <motion.div 
              variants={imageVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0"
              style={{ willChange: 'transform' }}
            />
          </ImageSelector>

          {/* Content Container */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
            style={{ willChange: 'opacity, transform' }}
          >
            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.3 }}
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.5 }}
            >
              {subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={onEnter}
              disabled={isAnimating}
              className={`
                relative px-12 py-4 text-lg md:text-xl font-semibold
                bg-white text-gray-900
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
                disabled:cursor-not-allowed disabled:opacity-70
                ${isAnimating ? 'pointer-events-none' : 'cursor-pointer'}
              `}
              style={{ willChange: 'transform' }}
              aria-label={`${buttonText} - Acceder a la plataforma de tennis`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="relative z-10"
              >
                {isAnimating ? 'Cargando...' : buttonText}
              </motion.span>

              {/* Button loading indicator */}
              {isAnimating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                </motion.div>
              )}
            </motion.button>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-white border-opacity-60 rounded-full p-1"
              >
                <div className="w-1 h-3 bg-white bg-opacity-60 rounded-full mx-auto" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Accessibility: Skip to main content for screen readers */}
          <button
            onClick={onEnter}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                     bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2"
            disabled={isAnimating}
          >
            Ir al contenido principal
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};