import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const LeadPoints = ({ count = 500 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2;
      p[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      p[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      p[i * 3 + 2] = radius * Math.cos(phi);
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#2563eb"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

const GlobeCore = () => {
  return (
    <mesh>
      <sphereGeometry args={[1.9, 64, 64]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={1}
        roughness={0.2}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

const Globe3D = () => {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2563eb" />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <LeadPoints />
          <GlobeCore />
        </Float>
      </Canvas>
    </div>
  );
};

export default Globe3D;
