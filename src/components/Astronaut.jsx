import React, { useEffect, useRef, useState, memo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useMotionValue, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";

const AstronautComponent = memo(function Astronaut(props) {
  const group = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  let nodes, materials, animations;
  
  try {
    const gltf = useGLTF("/models/tenhun_falling_spaceman_fanart.glb");
    nodes = gltf.nodes;
    materials = gltf.materials;
    animations = gltf.animations;
    
    if (!isLoaded) setIsLoaded(true);
  } catch (err) {
    if (!error) setError(err);
    console.error("Failed to load 3D model:", err);
  }

  const { actions } = useAnimations(animations || [], group);

  useEffect(() => {
    if (animations && animations.length > 0 && actions) {
      const action = actions[animations[0].name];
      if (action) {
        action.play();
      }
    }
  }, [actions, animations]);

  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30, mass: 0.5 });
  
  useEffect(() => {
    ySpring.set(-1);
  }, [ySpring]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = ySpring.get();
    }
  });

  if (error) {
    return null; // Fallback: don't render anything if model fails
  }

  if (!isLoaded || !nodes || !materials) {
    return null; // Show nothing while loading
  }

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[-Math.PI / 2, -0.2, 2.2]}
      scale={props.scale || 0.3}
      position={props.position || [1.3, -1, 0]}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model">
          <group name="Root">
            <group name="metarig">
              <primitive object={nodes.metarig_rootJoint} />
              {/* Reduced number of meshes for better performance */}
              <skinnedMesh
                name="Cube001_0"
                geometry={nodes.Cube001_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube001_0.skeleton}
              />
              <skinnedMesh
                name="Cube005_0"
                geometry={nodes.Cube005_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube005_0.skeleton}
              />
              <skinnedMesh
                name="Cube002_0"
                geometry={nodes.Cube002_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube002_0.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});

// Preload with error handling
useGLTF.preload("/models/tenhun_falling_spaceman_fanart.glb");

export { AstronautComponent as Astronaut };