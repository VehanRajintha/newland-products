import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

const TeaScene: React.FC<{ scrollProgress: number }> = React.memo(({ scrollProgress }) => {
  const teaRef = useRef<Mesh>(null);

  useFrame(() => {
    if (teaRef.current) {
      teaRef.current.rotation.y += 0.01;
      teaRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1 + scrollProgress * 2;
    }
  });

  return (
    <mesh ref={teaRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4CAF50" />
    </mesh>
  );
});

TeaScene.displayName = 'TeaScene';

export default TeaScene; 