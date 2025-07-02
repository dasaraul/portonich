import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Tama.dev
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-6 h-6 flex flex-col justify-center items-center transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <span className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-1' : ''
              }`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 mt-1 ${
                isOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`w-6 h-0.5 bg-current transform transition-all duration-300 mt-1 ${
                isOpen ? '-rotate-45 -translate-y-1' : ''
              }`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-6 py-4 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg mt-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
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