import { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className={`transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tama
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Full Stack Developer & Computer Science Student from Jakarta, Indonesia
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              I create modern web applications with clean code and exceptional user experiences. 
              Specialized in React, Laravel, Flutter, and cloud technologies.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                View My Work
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className={`mt-16 transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;