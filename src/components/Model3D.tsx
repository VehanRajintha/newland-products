import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import * as THREE from 'three';
import type { Group } from 'three';

interface ModelProps {
  scrollProgress?: number;
}

const Model3D: React.FC<ModelProps> = ({ scrollProgress = 0 }) => {
  const meshRef = useRef<Group>(null);
  const model = useLoader(OBJLoader, '/model/base.obj');
  const [scale, setScale] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Entry animation
  useEffect(() => {
    // Animate scale from 0 to 2.5 (bigger size)
    const scaleAnimation = setTimeout(() => {
      setScale(2.5);
    }, 100);

    // Initial rotation animation
    const rotationInterval = setInterval(() => {
      setRotation(prev => prev + 0.1);
    }, 16);

    // Stop initial rotation after 2 seconds
    const stopRotation = setTimeout(() => {
      clearInterval(rotationInterval);
    }, 2000);

    return () => {
      clearTimeout(scaleAnimation);
      clearInterval(rotationInterval);
      clearTimeout(stopRotation);
    };
  }, []);

  useEffect(() => {
    if (model) {
      // Load materials
      const mtlLoader = new MTLLoader();
      mtlLoader.setPath('/model/');
      mtlLoader.load('base.mtl', (materials) => {
        materials.preload();

        // Load textures
        const textureLoader = new THREE.TextureLoader();
        const diffuseMap = textureLoader.load('/model/texture_diffuse.png');
        const normalMap = textureLoader.load('/model/texture_normal.png');
        const roughnessMap = textureLoader.load('/model/texture_roughness.png');
        const metalnessMap = textureLoader.load('/model/texture_metallic.png');

        // Apply materials and textures
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({
              map: diffuseMap,
              normalMap: normalMap,
              roughnessMap: roughnessMap,
              metalnessMap: metalnessMap,
              metalness: 0.5,
              roughness: 0.5,
            });
          }
        });
      });
    }
  }, [model]);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth transition between initial rotation and scroll-based rotation
      const targetRotation = scrollProgress * Math.PI * 2;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation + targetRotation,
        0.1
      );
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      
      // Move model left based on scroll progress
      const targetX = 2 - (scrollProgress * 4); // Start at x=2, move left as scroll increases
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX,
        0.1
      );
      
      // Scale animation
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, scale, 0.1);
    }
  });

  return (
    <group ref={meshRef} scale={[0, 0, 0]} position={[2, 0, 0]}>
      <primitive 
        object={model} 
        position={[0, 0, 0]} 
      />
    </group>
  );
};

export default Model3D; 