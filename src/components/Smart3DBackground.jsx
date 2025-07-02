import { Suspense, lazy, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import * as THREE from 'three';

// Minimal 3D Scene - Super Lightweight
const FloatingOrb = ({ position = [0, 0, 0], color = "#4f46e5" }) => {
  // Optimize geometry for performance
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);

  return (
    <Sphere ref={null} args={[1, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const Scene3D = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 5, 10]} intensity={0.8} />
      
      {/* Single optimized orb */}
      <FloatingOrb position={[0, 0, 0]} color="#4f46e5" />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

// Smart 3D Component with fallbacks
const Smart3DBackground = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isLowEndDevice = useMediaQuery({ maxWidth: 480 });
  
  // Skip 3D on very low-end devices
  if (isLowEndDevice) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
    );
  }

  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        performance={{ min: 0.5 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ 
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true
        }}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Smart3DBackground;