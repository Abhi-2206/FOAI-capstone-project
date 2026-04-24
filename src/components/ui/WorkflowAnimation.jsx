import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Flowing data particles that move along a horizontal path
const FlowParticles = ({ count = 300, color = '#6366f1', speed = 1 }) => {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 8;     // x: spread wide
      p[i * 3 + 1] = (Math.random() - 0.5) * 3;  // y: narrow band
      p[i * 3 + 2] = (Math.random() - 0.5) * 2;  // z: slight depth
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * speed;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array;

    for (let i = 0; i < count; i++) {
      // Drift particles to the right
      pos[i * 3] += 0.008 * speed;
      // Gentle wave motion
      pos[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.002;

      // Reset particles that go off-screen to the left
      if (pos[i * 3] > 4) {
        pos[i * 3] = -4;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      }
    }
    geo.attributes.position.needsUpdate = true;

    // Subtle overall rotation
    pointsRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Connecting lines that pulse between nodes
const ConnectionLines = ({ color = '#6366f1' }) => {
  const linesRef = useRef();

  const geometry = useMemo(() => {
    const points = [];
    // Create several horizontal flowing lines at different heights
    for (let line = 0; line < 5; line++) {
      const y = (line - 2) * 0.8;
      for (let i = 0; i < 20; i++) {
        const x = (i / 19) * 8 - 4;
        points.push(new THREE.Vector3(x, y + Math.sin(x * 0.5 + line) * 0.3, 0));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    linesRef.current.material.opacity = 0.08 + Math.sin(time * 2) * 0.04;
  });

  return (
    <points ref={linesRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.02}
        transparent
        opacity={0.12}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

const WorkflowAnimation = ({ color = '#6366f1', style = {} }) => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
      ...style,
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <FlowParticles color={color} count={200} speed={0.8} />
        <ConnectionLines color={color} />
      </Canvas>
    </div>
  );
};

export default WorkflowAnimation;