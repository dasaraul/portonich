import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { animate } from 'animejs';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Animate navbar on mount
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    });

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate mobile menu
    if (menuRef.current) {
      if (isOpen) {
        gsap.to(menuRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });

        // Stagger animation for menu items
        gsap.from(menuRef.current.querySelectorAll('a'), {
          x: -50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.1
        });
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  }, [isOpen]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    
    // Smooth scroll with anime.js
    const target = document.querySelector(href);
    if (target) {
      animate({
        targets: 'html, body',
        scrollTop: target.offsetTop - 80,
        duration: 1000,
        easing: 'easeInOutQuart'
      });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    // Animate hamburger menu
    const lines = document.querySelectorAll('.hamburger-line');
    if (!isOpen) {
      animate({
        targets: lines[0],
        rotate: 45,
        translateY: 8,
        duration: 300
      });
      animate({
        targets: lines[1],
        opacity: 0,
        duration: 200
      });
      animate({
        targets: lines[2],
        rotate: -45,
        translateY: -8,
        duration: 300
      });
    } else {
      animate({
        targets: lines,
        rotate: 0,
        translateY: 0,
        opacity: 1,
        duration: 300
      });
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tama.dev
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="relative text-white hover:text-blue-400 transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="relative w-6 h-6 flex flex-col justify-center items-center"
            >
              <span className="hamburger-line w-6 h-0.5 bg-white mb-1 transition-all origin-center"></span>
              <span className="hamburger-line w-6 h-0.5 bg-white mb-1 transition-all"></span>
              <span className="hamburger-line w-6 h-0.5 bg-white transition-all origin-center"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          className={`lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md shadow-xl transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="block text-white hover:text-blue-400 transition-colors duration-300 text-lg font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;