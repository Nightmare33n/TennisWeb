'use client';

import { motion } from 'framer-motion';
import { ImageSelector } from '../landing/ImageSelector';
import { 
  contentVariants, 
  buttonVariants,
  springConfig 
} from '../landing/animations/transitions';

export default function CoverSection({ 
  title = "Conecta con jugadores de tennis en México", 
  subtitle = "La comunidad más activa para mejorar tu juego",
  buttonText = "Empezar",
  onButtonClick
}) {
  return (
    <section className="min-h-screen relative">
      <ImageSelector className="absolute inset-0">
        {/* Content Container */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-4xl mx-auto min-h-screen flex flex-col justify-center"
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
            onClick={onButtonClick}
            className="
              relative px-12 py-4 text-lg md:text-xl font-semibold
              bg-white text-gray-900
              transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
              cursor-pointer
            "
            style={{ willChange: 'transform' }}
            aria-label={`${buttonText} - Acceder a la plataforma de tennis`}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative z-10"
            >
              {buttonText}
            </motion.span>
          </motion.button>

        </motion.div>
      </ImageSelector>
    </section>
  );
}