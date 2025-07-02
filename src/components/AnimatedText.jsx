import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

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
        // Create glitch effect with GSAP
        const timeline = gsap.timeline({ repeat: -1, yoyo: true });
        timeline.to(element, {
          duration: 0.1,
          skewX: 70,
          ease: "power4.inOut",
          delay
        }).to(element, {
          duration: 0.04,
          skewX: 0,
          ease: "power4.inOut"
        }).to(element, {
          duration: 0.04,
          opacity: 0
        }).to(element, {
          duration: 0.04,
          opacity: 1
        }).to(element, {
          duration: 0.04,
          x: -20
        }).to(element, {
          duration: 0.04,
          x: 0
        }).add(() => {
          // Add text shadow effect
          element.style.textShadow = `
            2px 0 #ff00ff,
            -2px 0 #00ffff
          `;
        }).to(element, {
          duration: 0.04,
          delay: 0.04,
          onComplete: () => {
            element.style.textShadow = 'none';
          }
        });
        break;

      case 'morphing':
        // Split text into characters using GSAP
        const chars = text.split('');
        element.innerHTML = chars.map(char => 
          `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
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
            delay: (i) => delay + i * stagger,
            ease: 'elastic.out(1, 0.8)',
            stagger: stagger
          }
        );
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