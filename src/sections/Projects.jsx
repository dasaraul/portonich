import React, { useState, memo, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { myProjects } from "../constants";

// Lazy load project component
const Project = memo(React.lazy(() => import("../components/Project")));

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 100 });
  const springY = useSpring(y, { damping: 15, stiffness: 100 });
  
  const [preview, setPreview] = useState(null);

  // Throttle mouse movement for better performance
  const handleMouseMove = useMemo(() => {
    let rafId;
    return (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        x.set(e.clientX + 20);
        y.set(e.clientY + 20);
        rafId = null;
      });
    };
  }, [x, y]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
      id="work"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      
      <React.Suspense fallback={
        <div className="py-10">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      }>
        {myProjects.map((project) => (
          <Project key={project.id} {...project} setPreview={setPreview} />
        ))}
      </React.Suspense>

      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          loading="lazy"
          decoding="async"
        />
      )}
    </section>
  );
};

export default Projects;