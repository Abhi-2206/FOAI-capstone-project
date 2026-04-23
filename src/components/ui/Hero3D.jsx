import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, TorusKnot, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const GlassKnot = () => {
  const knotRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    knotRef.current.rotation.x = time * 0.2;
    knotRef.current.rotation.y = time * 0.3;
    knotRef.current.position.y = Math.sin(time) * 0.2;
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <TorusKnot ref={knotRef} args={[1, 0.4, 128, 32]} scale={2}>
        <MeshDistortMaterial
          color="#2563eb"
          speed={2}
          distort={0.3}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          emissive="#1a1a1a"
          transparent
          opacity={0.8}
        />
      </TorusKnot>
    </Float>
  );
};

const BackgroundParticles = ({ count = 200 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();
  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#2563eb"
        size={0.05}
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#2563eb" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        
        <GlassKnot />
        <BackgroundParticles />
        
        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Hero3D;
