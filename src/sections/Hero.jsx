import { Suspense, lazy, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import AnimatedText from "../components/AnimatedText";
import Scene3D from "../components/Scene3D";
import Loader from "../components/Loader";

// Lazy load heavy components
const ParallaxBackground = lazy(() => import("../components/ParallaxBackground"));

const HeroContent = memo(() => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-6 md:px-12">
      <div className="max-w-4xl" data-scroll-reveal>
        <AnimatedText
          text="Creative"
          animation="morphing"
          className="text-4xl md:text-7xl font-bold text-white mb-2 leading-tight"
          delay={0.2}
        />
        <AnimatedText
          text="Full Stack Developer"
          animation="fadeInUp"
          className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4 leading-tight"
          delay={0.8}
          stagger={0.1}
        />
        <AnimatedText
          text="Building immersive digital experiences with cutting-edge technology"
          animation="typewriter"
          className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          delay={2}
        />
      </div>

      {/* Interactive CTA Button */}
      <div className="mt-8" data-scroll-reveal>
        <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
          <span className="relative z-10">Explore My Work</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Background Effects */}
      <Suspense fallback={<div className="absolute inset-0 bg-black/40" />}>
        <ParallaxBackground />
      </Suspense>

      {/* 3D Scene */}
      <div className="absolute inset-0 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          performance={{ min: 0.5 }}
          dpr={[1, 1.5]}
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: true
          }}
        >
          <Suspense fallback={<Loader />}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <HeroContent />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;