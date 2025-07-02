import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const SmartAnimatedText = ({ 
  text, 
  className = '',
  animation = 'typewriter',
  delay = 0,
  children
}) => {
  const textRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!textRef.current || !text) return;

    const element = textRef.current;
    
    switch (animation) {
      case 'typewriter':
        // GSAP typewriter effect
        gsap.set(element, { text: '' });
        gsap.to(element, {
          text: text,
          duration: text.length * 0.03,
          delay,
          ease: 'none',
          onComplete: () => setIsLoaded(true)
        });
        break;

      case 'fadeInUp':
        // GSAP fade in up
        gsap.fromTo(element, 
          { 
            opacity: 0, 
            y: 50 
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            delay, 
            ease: 'power3.out',
            onComplete: () => setIsLoaded(true)
          }
        );
        break;

      case 'morphing':
        // GSAP morphing effect (anime.js alternative)
        const chars = text.split('');
        element.innerHTML = chars.map(char => 
          `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

        gsap.fromTo(element.querySelectorAll('span'), 
          {
            scale: 0,
            rotation: 180,
            opacity: 0
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            delay: (i) => delay + i * 0.05,
            ease: 'elastic.out(1, 0.8)',
            stagger: 0.05,
            onComplete: () => setIsLoaded(true)
          }
        );
        break;

      case 'stagger':
        // GSAP stagger effect
        const words = text.split(' ');
        element.innerHTML = words.map(word => 
          `<span style="display: inline-block; margin-right: 8px;">${word}</span>`
        ).join('');

        gsap.fromTo(element.querySelectorAll('span'),
          {
            y: -30,
            opacity: 0,
            rotationX: -90
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            delay: delay,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            onComplete: () => setIsLoaded(true)
          }
        );
        break;

      case 'glitch':
        // GSAP glitch effect
        const glitchTimeline = gsap.timeline({ repeat: 2, delay });
        
        glitchTimeline
          .to(element, {
            duration: 0.1,
            skewX: 70,
            ease: "power4.inOut"
          })
          .to(element, {
            duration: 0.04,
            skewX: 0,
            ease: "power4.inOut"
          })
          .to(element, {
            duration: 0.04,
            opacity: 0
          })
          .to(element, {
            duration: 0.04,
            opacity: 1,
            x: -20
          })
          .to(element, {
            duration: 0.04,
            x: 0
          })
          .call(() => {
            element.style.textShadow = `2px 0 #ff00ff, -2px 0 #00ffff`;
          })
          .to(element, {
            duration: 0.04,
            delay: 0.04,
            onComplete: () => {
              element.style.textShadow = 'none';
              setIsLoaded(true);
            }
          });
        break;

      case 'wave':
        // GSAP wave effect
        const waveChars = text.split('');
        element.innerHTML = waveChars.map(char => 
          `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

        gsap.fromTo(element.querySelectorAll('span'),
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: (i) => delay + i * 0.03,
            ease: 'power2.out',
            stagger: {
              each: 0.03,
              from: "start"
            },
            onComplete: () => setIsLoaded(true)
          }
        );
        break;

      default:
        gsap.fromTo(element,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            delay,
            ease: 'power2.out',
            onComplete: () => setIsLoaded(true)
          }
        );
    }
  }, [text, animation, delay]);

  // Framer Motion wrapper for micro-interactions
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span ref={textRef} className={className}>
        {children || text}
      </span>
    </motion.div>
  );
};

export default SmartAnimatedText;