import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Sphere, 
  MeshDistortMaterial,
  Float,
  Environment,
  Effects
} from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const InteractiveOrb = ({ position = [0, 0, 0], color = '#4f46e5' }) => {
  const orbRef = useRef();
  const materialRef = useRef();

  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        scale: Math.random() * 0.5 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Animate distortion based on mouse position
      if (materialRef.current) {
        materialRef.current.distort = 
          0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
        materialRef.current.speed = 
          1 + state.mouse.x * 0.5;
      }
    }

    // Animate particles
    particles.forEach((particle, i) => {
      const time = state.clock.elapsedTime + i * 0.1;
      particle.position[1] = Math.sin(time) * 2;
    });
  });

  return (
    <group position={position}>
      {/* Main orb */}
      <Float
        speed={1.4}
        rotationIntensity={0.6}
        floatIntensity={0.6}
      >
        <Sphere ref={orbRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            color={color}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Particle system */}
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial 
            color={color} 
            opacity={0.6} 
            transparent 
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene3D = () => {
  return (
    <>
      <Environment preset="studio" />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />

      {/* Interactive orbs */}
      <InteractiveOrb position={[-2, 0, 0]} color="#4f46e5" />
      <InteractiveOrb position={[2, 0, 0]} color="#06b6d4" />
      <InteractiveOrb position={[0, 2, -2]} color="#f59e0b" />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
};

export default Scene3D;