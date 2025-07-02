import { useEffect, useRef } from 'react';
import barba from '@barba/core';
import { gsap } from 'gsap';
import anime from 'animejs';

const PageTransition = ({ children }) => {
  const transitionRef = useRef(null);

  useEffect(() => {
    // Initialize Barba.js
    barba.init({
      transitions: [
        {
          name: 'fade-transition',
          leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        },
        {
          name: 'slide-transition',
          leave(data) {
            return new Promise((resolve) => {
              anime({
                targets: data.current.container,
                translateX: '-100%',
                opacity: 0,
                duration: 800,
                easing: 'easeInOutQuart',
                complete: resolve
              });
            });
          },
          enter(data) {
            return new Promise((resolve) => {
              anime({
                targets: data.next.container,
                translateX: ['100%', '0%'],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeInOutQuart',
                complete: resolve
              });
            });
          }
        }
      ]
    });

    // Cleanup on unmount
    return () => {
      barba.destroy();
    };
  }, []);

  return (
    <div ref={transitionRef} data-barba="wrapper">
      <div data-barba="container" data-barba-namespace="home">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;