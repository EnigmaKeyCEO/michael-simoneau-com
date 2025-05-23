import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

const ANIMATION_FACTOR = 0.0015;
const ENTANGLEMENT_DISTANCE = 2; // Renamed from QUANTUM_ENTANGLEMENT_DISTANCE
const TUNNELING_PROBABILITY = 0.01; // Renamed from QUANTUM_TUNNELING_PROBABILITY

function AnimatedParticleField() { // Renamed from QuantumParticleField
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = React.useState(() => {
    const positions = new Float32Array(4000 * 3);
    const validPositions = random.inSphere(positions, { radius: 20 }) as Float32Array;
    
    for (let i = 0; i < validPositions.length; i++) {
      if (isNaN(validPositions[i])) {
        validPositions[i] = 0;
      }
    }
    
    return validPositions;
  });

  // Entanglement connections (formerly Quantum entanglement)
  const [entangledPairs] = React.useState(() => {
    const pairs: number[][] = [];
    for (let i = 0; i < sphere.length / 3; i++) {
      for (let j = i + 1; j < sphere.length / 3; j++) {
        const distance = Math.sqrt(
          Math.pow(sphere[i * 3] - sphere[j * 3], 2) +
          Math.pow(sphere[i * 3 + 1] - sphere[j * 3 + 1], 2) +
          Math.pow(sphere[i * 3 + 2] - sphere[j * 3 + 2], 2)
        );
        if (distance < ENTANGLEMENT_DISTANCE) {
          pairs.push([i, j]);
        }
      }
    }
    return pairs;
  });

  // Tunneling effect (formerly Quantum tunneling)
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * ANIMATION_FACTOR;
      ref.current.rotation.y -= delta * ANIMATION_FACTOR;

      // Optimized tunneling effect: process a fraction of particles per frame
      const particlesToProcess = Math.ceil(sphere.length / 3 / 10); 
      const offset = Math.floor((_state.clock.getElapsedTime() * particlesToProcess) % (sphere.length / 3));

      for (let i = 0; i < particlesToProcess; i++) {
        const index = (offset + i) % (sphere.length / 3);
        if (Math.random() < TUNNELING_PROBABILITY) {
          sphere[index * 3] += (Math.random() - 0.5) * 0.1;
          sphere[index * 3 + 1] += (Math.random() - 0.5) * 0.1;
          sphere[index * 3 + 2] += (Math.random() - 0.5) * 0.1;
        }
      }
      
      if (ref.current.geometry.attributes.position) {
        (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#00ff88"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Entanglement lines (formerly Quantum entanglement) */}
      {entangledPairs.map(([i, j], index) => (
        <Line
          key={index}
          points={[
            [sphere[i * 3], sphere[i * 3 + 1], sphere[i * 3 + 2]],
            [sphere[j * 3], sphere[j * 3 + 1], sphere[j * 3 + 2]]
          ]}
          color="#00ff88"
          lineWidth={0.01}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  );
}

function AnimatedHexGrid() { // Renamed from QuantumHexGrid
  const ref = useRef<THREE.Mesh>(null!);
  const [time, setTime] = React.useState(0);
  
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * ANIMATION_FACTOR;
    setTime(state.clock.getElapsedTime());
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50, 20, 20]} />
      <meshBasicMaterial
        color="#00ff88"
        wireframe
        transparent
        opacity={0.1 + Math.sin(time) * 0.05}
      />
    </mesh>
  );
}

export const AnimatedBackground: React.FC = () => { // Renamed from QuantumBackground
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{
          background: 'linear-gradient(to bottom, #000510 0%, #001233 50%, #000510 100%)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -50
        }}
      >
        <fog attach="fog" args={['#001233', 20, 50]} />
        <AnimatedParticleField /> {/* Renamed from QuantumParticleField */}
        <AnimatedHexGrid /> {/* Renamed from QuantumHexGrid */}
        <ambientLight intensity={0.5} />
        {/* Wave effect (formerly Quantum wave) */}
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[100, 100, 100, 100]} />
          <meshBasicMaterial
            color="#00ff88"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
    </div>
  );
}; 