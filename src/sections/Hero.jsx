import React, { Suspense, lazy, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import HeroText from "../components/HeroText";
import Loader from "../components/Loader";

// Lazy load heavy components
const ParallaxBackground = lazy(() => import("../components/ParallaxBackground"));
const Astronaut = lazy(() => import("../components/Astronaut").then(module => ({ 
  default: module.Astronaut 
})));

const Rig = memo(() => {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
});

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      
      <Suspense fallback={<div className="absolute inset-0 bg-black/40" />}>
        <ParallaxBackground />
      </Suspense>
      
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas 
          camera={{ position: [0, 1, 3] }}
          performance={{ min: 0.5 }}
          dpr={[1, 1.5]} // Limit pixel ratio for performance
          gl={{ 
            antialias: false, // Disable for better performance
            powerPreference: "high-performance"
          }}
        >
          <Suspense fallback={<Loader />}>
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
              <Suspense fallback={null}>
                <Astronaut
                  scale={isMobile ? 0.23 : 0.3}
                  position={isMobile ? [0, -1.5, 0] : [1.3, -1, 0]}
                />
              </Suspense>
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
