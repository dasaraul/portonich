import { Suspense, lazy } from "react";

// Immediately load critical components
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";

// Lazy load non-critical sections
const Projects = lazy(() => import("./sections/Projects"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import('./sections/Footer'));

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* About Section */}
        <About />
        
        {/* Skills Section */}
        <Skills />
        
        {/* Lazy Loaded Sections */}
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default App;