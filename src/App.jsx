import { Suspense, lazy } from "react";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";

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
    <PageTransition>
      <SmoothScroll>
        <div className="relative bg-black min-h-screen overflow-x-hidden">
          <Navbar />
          
          <main>
            <section id="home">
              <Hero />
            </section>
            
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[200px] bg-gray-900">
                <div className="text-neutral-400 text-lg">Loading...</div>
              </div>
            }>
              <section id="about" data-scroll-reveal>
                <About />
              </section>
              
              <section id="projects" data-scroll-reveal>
                <Projects />
              </section>
              
              <section id="experience" data-scroll-reveal>
                <Experiences />
              </section>
              
              <section id="testimonials" data-scroll-reveal>
                <Testimonial />
              </section>
              
              <section id="contact" data-scroll-reveal>
                <Contact />
              </section>
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </SmoothScroll>
    </PageTransition>
  );
};

export default App;