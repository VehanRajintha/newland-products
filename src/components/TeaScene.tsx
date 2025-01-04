import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

// Custom Tea Leaf Geometry
const createLeafGeometry = () => {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const t = i / 9;
    const x = Math.sin(t * Math.PI) * 0.5;
    const y = t * 0.8;
    const z = Math.cos(t * Math.PI * 0.5) * 0.2;
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 20, 0.08, 8, false);
  return geometry;
};

const TeaLeaf = React.memo(() => {
  const geometry = useMemo(() => createLeafGeometry(), []);
  
  return (
    <motion.mesh
      animate={{
        rotateX: 360,
        rotateY: 360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <primitive object={geometry} attach="geometry" />
      <meshPhongMaterial
        color="#2EA043"
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
        shininess={50}
      />
    </motion.mesh>
  );
});

const TeaScene: React.FC<{ scrollProgress: number }> = React.memo(({ scrollProgress }) => {
  const group = useRef<THREE.Group>(null);

  // Rotation based on scroll with smoother animation
  useFrame(() => {
    if (group.current) {
      const targetRotationY = scrollProgress * Math.PI * 2;
      group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.1;
    }
  });

  // Create a spiral arrangement of leaves
  const leaves = useMemo(() => {
    const totalLeaves = 12;
    return [...Array(totalLeaves)].map((_, i) => {
      const angle = (i / totalLeaves) * Math.PI * 4; // 2 full spirals
      const radius = 1.5 + (i / totalLeaves) * 1; // Increasing radius
      const height = 3 - (i / totalLeaves) * 4; // Descending height
      return {
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        scale: 0.8 + Math.random() * 0.4,
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        speed: 1 + Math.random(),
        rotationIntensity: 0.5 + Math.random() * 0.5,
        floatIntensity: 1 + Math.random()
      };
    });
  }, []);

  return (
    <group ref={group}>
      {leaves.map((leaf, i) => (
        <Float
          key={i}
          speed={leaf.speed}
          rotationIntensity={leaf.rotationIntensity}
          floatIntensity={leaf.floatIntensity}
          position={leaf.position}
        >
          <group scale={leaf.scale} rotation={leaf.rotation}>
            <TeaLeaf />
          </group>
        </Float>
      ))}
    </group>
  );
}); 