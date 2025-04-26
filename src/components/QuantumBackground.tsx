import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

const ANIMATION_FACTOR = 0.0005; // 20x slower

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = React.useState(() => {
    // Create a larger array to ensure we have enough valid points
    const positions = new Float32Array(5000 * 3);
    const validPositions = random.inSphere(positions, { radius: 20 }) as Float32Array;
    
    // Validate positions to ensure no NaN values
    for (let i = 0; i < validPositions.length; i++) {
      if (isNaN(validPositions[i])) {
        validPositions[i] = 0; // Replace NaN with 0
      }
    }
    
    return validPositions;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * ANIMATION_FACTOR;
      ref.current.rotation.y -= delta * ANIMATION_FACTOR;
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
    </group>
  );
}

function HexGrid() {
  const ref = useRef<THREE.Mesh>(null!);
  
  
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * ANIMATION_FACTOR;
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50, 20, 20]} />
      <meshBasicMaterial
        color="#00ff88"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

export const QuantumBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ 
          background: 'linear-gradient(to bottom, #000510 0%, #001233 100%)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <fog attach="fog" args={['#001233', 20, 50]} />
        <ParticleField />
        <HexGrid />
        <ambientLight intensity={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />
    </div>
  );
};