import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import SmartSmoothScroll from "./components/SmartSmoothScroll";
import SmartPageTransitions from "./components/SmartPageTransitions";

// Immediately load critical components
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";

// Lazy load non-critical sections for performance
const Projects = lazy(() => import("./sections/Projects"));
const Skills = lazy(() => import("./sections/Skills"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import('./sections/Footer'));

// Smart Loading Component with Framer Motion
const SmartLoader = () => (
  <motion.div 
    className="flex items-center justify-center min-h-[200px]"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div 
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
      <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </motion.div>
  </motion.div>
);

const App = () => {
  return (
    <SmartPageTransitions currentRoute="portfolio">
      <SmartSmoothScroll>
        <div className="min-h-screen bg-white">
          {/* Navigation */}
          <Navbar />
          
          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <Hero />
            
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <About />
            </motion.div>
            
            {/* Lazy Loaded Sections with Smart Loading */}
            <Suspense fallback={<SmartLoader />}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Projects />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Skills />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Contact />
              </motion.div>
              
              <Footer />
            </Suspense>
          </motion.main>
        </div>
      </SmartSmoothScroll>
    </SmartPageTransitions>
  );
};

export default App;