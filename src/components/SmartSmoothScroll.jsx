import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmartSmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Smart loading of Lenis only on desktop
    const initSmoothScroll = async () => {
      if (window.innerWidth > 768) {
        try {
          const Lenis = await import('lenis');
          
          lenisRef.current = new Lenis.default({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            infinite: false,
            gestureOrientation: 'vertical',
            normalizeWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
          });

          // RAF loop for Lenis
          function raf(time) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);

          // Integrate with GSAP ScrollTrigger
          lenisRef.current.on('scroll', ScrollTrigger.update);
        } catch (error) {
          console.log('Lenis loading skipped for performance');
        }
      }
    };

    initSmoothScroll();

    // Smart scroll reveal animations
    const elements = document.querySelectorAll('[data-scroll-reveal]');
    elements.forEach((el, index) => {
      gsap.fromTo(el, 
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true, // Optimize: only play once
          },
          delay: index * 0.1 // Stagger effect
        }
      );
    });

    return () => {
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={scrollRef}>
      {children}
    </div>
  );
};

export default SmartSmoothScroll;