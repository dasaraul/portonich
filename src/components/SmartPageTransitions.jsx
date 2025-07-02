import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// Smart Page Transitions - Lightweight but Beautiful
const SmartPageTransitions = ({ children, currentRoute = 'home' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize smooth page transitions
    const initBarba = async () => {
      try {
        const barba = await import('@barba/core');
        
        barba.default.init({
          transitions: [{
            name: 'smart-fade',
            async leave(data) {
              // GSAP exit animation
              return gsap.to(data.current.container, {
                opacity: 0,
                y: -50,
                duration: 0.4,
                ease: 'power2.inOut'
              });
            },
            async enter(data) {
              // GSAP enter animation
              return gsap.fromTo(data.next.container, 
                {
                  opacity: 0,
                  y: 50
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: 'power2.out'
                }
              );
            }
          }]
        });
      } catch (error) {
        console.log('Barba.js loading skipped for performance');
      }
    };

    // Only load Barba.js on desktop for performance
    if (window.innerWidth > 768) {
      initBarba();
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Framer Motion page transitions as fallback
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.05
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div ref={containerRef} data-barba="wrapper">
      <div data-barba="container" data-barba-namespace={currentRoute}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartPageTransitions;