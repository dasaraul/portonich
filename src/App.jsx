import React, { Suspense, lazy } from "react";

// Immediately load critical components
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

// Lazy load non-critical sections
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Testimonial = lazy(() => import("./sections/Testimonial"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import('./sections/Footer'));

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-neutral-400">Loading...</div>
        </div>
      }>
        <About />
        <Projects />
        <Experiences />
        <Testimonial />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;