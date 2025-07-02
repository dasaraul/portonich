import { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import SmartAnimatedText from '../components/SmartAnimatedText';

// Lazy load 3D background only when needed
const Smart3DBackground = lazy(() => import('../components/Smart3DBackground'));

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isLowEndDevice = useMediaQuery({ maxWidth: 480 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Hero content animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Smart 3D Background - Only on capable devices */}
      {!isLowEndDevice && (
        <Suspense fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        }>
          <Smart3DBackground />
        </Suspense>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 backdrop-blur-sm" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <SmartAnimatedText
              text="Hi, I'm"
              animation="fadeInUp"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 block mb-2"
              delay={0}
            />
            <SmartAnimatedText
              text="Tama"
              animation="morphing"
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block"
              delay={0.5}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-8">
            <SmartAnimatedText
              text="Full Stack Developer & Computer Science Student"
              animation="typewriter"
              className="text-xl md:text-2xl text-gray-600 leading-relaxed"
              delay={1.5}
            />
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-12">
            <SmartAnimatedText
              text="I create modern web applications with clean code and exceptional user experiences. Specialized in React, Laravel, Flutter, and cutting-edge technologies."
              animation="stagger"
              className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
              delay={2.5}
            />
          </motion.div>

          {/* CTA Buttons with Framer Motion */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgb(37, 99, 235)",
                color: "white"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Scroll Indicator with Animation */}
          <motion.div 
            variants={itemVariants}
            className="mt-16"
          >
            <motion.div 
              className="flex flex-col items-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <motion.div 
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;