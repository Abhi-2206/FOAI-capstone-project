import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const StreamParticles = ({ count = 1000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 50; // Long vertical stream
      p[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Scroll vertical position
    pointsRef.current.position.y = (time % 10) - 5;
    pointsRef.current.rotation.y = time * 0.1;
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#2563eb"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.2}
      />
    </Points>
  );
};

const DataStream3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <StreamParticles />
      </Canvas>
    </div>
  );
};

export default DataStream3D;
