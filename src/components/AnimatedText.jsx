import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { animate } from 'animejs';

gsap.registerPlugin(TextPlugin);

const AnimatedText = ({ 
  text, 
  className = '',
  animation = 'typewriter',
  delay = 0,
  stagger = 0.05,
  ...props 
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current || !text) return;

    const element = textRef.current;
    
    switch (animation) {
      case 'typewriter':
        gsap.set(element, { text: '' });
        gsap.to(element, {
          text: text,
          duration: text.length * 0.05,
          delay,
          ease: 'none'
        });
        break;

      case 'fadeInUp':
        // Split text into words
        const words = text.split(' ');
        element.innerHTML = words.map(word => 
          `<span class="inline-block overflow-hidden">
            <span class="inline-block transform translate-y-full">${word}</span>
          </span>`
        ).join(' ');

        gsap.to(element.querySelectorAll('span span'), {
          y: 0,
          duration: 0.8,
          stagger,
          delay,
          ease: 'power3.out'
        });
        break;

      case 'glitch':
        animate({
          targets: element,
          duration: 3000,
          delay,
          loop: true,
          direction: 'alternate',
          easing: 'linear',
          update: function(anim) {
            if (anim.progress > 90) {
              element.style.transform = `
                translateX(${Math.random() * 2 - 1}px) 
                translateY(${Math.random() * 2 - 1}px)
              `;
              element.style.textShadow = `
                ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 #ff00ff,
                ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 #00ffff
              `;
            } else {
              element.style.transform = 'translateX(0) translateY(0)';
              element.style.textShadow = 'none';
            }
          }
        });
        break;

      case 'morphing':
        // Split text into characters
        const chars = text.split('');
        element.innerHTML = chars.map(char => 
          `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

        animate({
          targets: element.querySelectorAll('span'),
          scale: [0, 1],
          rotate: [180, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: (el, i) => delay * 1000 + i * stagger * 1000,
          easing: 'easeOutElastic(1, .8)'
        });
        break;

      default:
        gsap.from(element, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay,
          ease: 'power3.out'
        });
    }
  }, [text, animation, delay, stagger]);

  return (
    <span ref={textRef} className={className} {...props}>
      {text}
    </span>
  );
};

export default AnimatedText;