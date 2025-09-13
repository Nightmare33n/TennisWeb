// Animation configurations for Framer Motion
// Following modern animation principles for 60fps performance

export const landingOverlayVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
    }
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

export const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

export const buttonVariants = {
  initial: {
    scale: 1,
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
    }
  }
};

export const imageVariants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0,
    }
  }
};

// Spring configurations for smooth animations
export const springConfig = {
  type: 'spring',
  damping: 25,
  stiffness: 300,
};

export const fastSpringConfig = {
  type: 'spring',
  damping: 30,
  stiffness: 400,
};