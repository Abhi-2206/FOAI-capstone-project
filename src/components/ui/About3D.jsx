import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Icosahedron, Environment } from '@react-three/drei';

const CrystalCore = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1, 15]} scale={1.5}>
        <MeshWobbleMaterial
          color="#2563eb"
          speed={1}
          factor={0.4}
          metalness={1}
          roughness={0}
          emissive="#000000"
          transparent
          opacity={0.2}
        />
      </Icosahedron>

    </Float>
  );
};

const About3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={1} color="#2563eb" />
        <CrystalCore />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default About3D;
