import { Suspense, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas, useFrame, useThree } from '@react-three/fiber/native';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import type {
  ThoughtOrbitSectionDynamic,
  ThoughtOrbitSubsectionDynamic,
} from './ThoughtOrbitTypes';

const styles = StyleSheet.create({
  canvasContainer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
});

const damp = (value: number, target: number, smoothing: number, delta: number) => {
  if (smoothing <= 0) {
    return target;
  }

  const factor = 1 - Math.exp(-smoothing * delta);
  return value + (target - value) * factor;
};

export type ThoughtOrbitFieldProps = {
  dynamics: ThoughtOrbitSectionDynamic[];
};

export const ThoughtOrbitField = ({ dynamics }: ThoughtOrbitFieldProps) => {
  const focusAverage = useMemo(() => {
    if (dynamics.length === 0) {
      return 0;
    }

    const sectionContribution = dynamics.reduce((total, current) => total + current.focus, 0);
    const subsectionContribution = dynamics.reduce(
      (total, current) =>
        total +
        current.subsections.reduce((subTotal, subsection) => subTotal + subsection.focus, 0),
      0,
    );

    const denominator =
      dynamics.length + dynamics.reduce((total, section) => total + section.subsections.length, 0);
    if (denominator === 0) {
      return 0;
    }

    return (sectionContribution * 0.6 + subsectionContribution * 0.4) / denominator;
  }, [dynamics]);

  return (
    <View style={styles.canvasContainer}>
      <Canvas
        style={StyleSheet.absoluteFillObject}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.18} color="#0f172a" />
          <pointLight position={[0, 0, 18]} intensity={1.8} color="#38bdf8" distance={60} />
          <pointLight position={[-6, -4, -12]} intensity={0.7} color="#f0abfc" distance={40} />
          <StarField />
          <NebulaMist focus={focusAverage} />
          <OrbitSections sections={dynamics} />
          <CameraRig sections={dynamics} />
        </Suspense>
      </Canvas>
    </View>
  );
};

const CameraRig = ({ sections }: { sections: ThoughtOrbitSectionDynamic[] }) => {
  const { camera } = useThree();
  const sectionsRef = useRef(sections);

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  useFrame((state, delta) => {
    const currentSections = sectionsRef.current;
    const activeSection = currentSections.reduce<ThoughtOrbitSectionDynamic | null>(
      (previous, candidate) => {
        if (!previous || candidate.focus > previous.focus) {
          return candidate;
        }

        return previous;
      },
      null,
    );

    const activeSubsection = activeSection
      ? activeSection.subsections.reduce<ThoughtOrbitSubsectionDynamic | null>(
          (previous, candidate) => {
            if (!previous || candidate.focus > previous.focus) {
              return candidate;
            }

            return previous;
          },
          null,
        )
      : null;

    const sectionFocus = activeSection?.focus ?? 0;
    const subsectionFocus = activeSubsection?.focus ?? 0;
    const alignment = activeSection?.alignment ?? 'center';

    const lateralBias = alignment === 'left' ? -1 : alignment === 'right' ? 1 : 0;
    const verticalBias = alignment === 'center' ? 0 : alignment === 'left' ? 0.45 : -0.45;

    const targetZ =
      24 - sectionFocus * 5.8 - subsectionFocus * 2.6 + (activeSection?.distance ?? 0.5) * 2.3;
    const targetX = lateralBias * (sectionFocus * 4.6 + subsectionFocus * 1.8);
    const targetY = verticalBias * (sectionFocus * 3.4 + subsectionFocus * 0.8);

    camera.position.z = damp(camera.position.z, targetZ, 2.6, delta);
    camera.position.x = damp(camera.position.x, targetX, 3.1, delta);
    camera.position.y = damp(camera.position.y, targetY, 2.4, delta);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
};

const StarField = () => {
  const pointGroup = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const count = 720;
    const positionArray = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 22 + Math.random() * 42;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const sinPhi = Math.sin(phi);

      positionArray[index * 3] = radius * Math.cos(theta) * sinPhi;
      positionArray[index * 3 + 1] = radius * Math.sin(theta) * sinPhi;
      positionArray[index * 3 + 2] = radius * Math.cos(phi);
    }

    return positionArray;
  }, []);

  useFrame((state, delta) => {
    if (!pointGroup.current) {
      return;
    }

    pointGroup.current.rotation.y += delta * 0.02;
    pointGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.08;
  });

  return (
    <group ref={pointGroup}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={new THREE.Color('#0f1a2b')}
          size={0.45}
          sizeAttenuation
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const NebulaMist = ({ focus }: { focus: number }) => {
  const mistRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const focusRef = useRef(focus);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useFrame((state, delta) => {
    if (mistRef.current) {
      mistRef.current.rotation.y += delta * 0.06;
      mistRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.22;
    }

    if (materialRef.current) {
      const targetOpacity = 0.12 + focusRef.current * 0.28;
      const targetEmissive = 0.35 + focusRef.current * 0.9;

      materialRef.current.opacity = damp(materialRef.current.opacity, targetOpacity, 1.6, delta);
      materialRef.current.emissiveIntensity = damp(
        materialRef.current.emissiveIntensity,
        targetEmissive,
        1.8,
        delta,
      );
    }
  });

  return (
    <group ref={mistRef} position={[0, -1.2, -8]}>
      <Float speed={0.6} rotationIntensity={0.22} floatIntensity={0.38}>
        <mesh>
          <sphereGeometry args={[7.6, 48, 48]} />
          <meshStandardMaterial
            ref={materialRef}
            color="#0b1120"
            emissive="#0ea5e9"
            transparent
            opacity={0.18 + focus * 0.22}
            emissiveIntensity={0.48 + focus * 0.7}
            roughness={0.8}
            metalness={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Float>
    </group>
  );
};

const OrbitSections = ({ sections }: { sections: ThoughtOrbitSectionDynamic[] }) => {
  return (
    <group>
      {sections.map((section, index) => (
        <OrbitSection key={section.id} section={section} index={index} total={sections.length} />
      ))}
    </group>
  );
};

type OrbitSectionProps = {
  section: ThoughtOrbitSectionDynamic;
  index: number;
  total: number;
};

const OrbitSection = ({ section, index, total }: OrbitSectionProps) => {
  const clusterRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);
  const ringMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const coreMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const haloMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const focusRef = useRef(section.focus);

  useEffect(() => {
    focusRef.current = section.focus;
  }, [section.focus]);

  const baseRadius = 4.8 + index * 2.2;
  const depth = -index * 3.4 - 2.6;
  const verticalOffset = (index - (total - 1) / 2) * 1.6;
  const baseColor = section.tone === 'hero' ? '#60a5fa' : '#38bdf8';
  const emissiveColor = section.tone === 'hero' ? '#1d4ed8' : '#0369a1';
  const accentColor = section.tone === 'hero' ? '#bfdbfe' : '#7dd3fc';

  useFrame((state, delta) => {
    const focusValue = focusRef.current;

    if (clusterRef.current) {
      const currentScale = clusterRef.current.scale.x;
      const targetScale = 0.7 + focusValue * 0.35;
      const nextScale = damp(currentScale, targetScale, 3.1, delta);
      clusterRef.current.scale.setScalar(nextScale);
      clusterRef.current.rotation.y += delta * (0.12 + index * 0.025);
    }

    if (satellitesRef.current) {
      satellitesRef.current.rotation.y -= delta * (0.2 + focusValue * 0.35);
    }

    if (ringMaterialRef.current) {
      const nextOpacity = 0.18 + focusValue * 0.42;
      const nextEmissive = 0.32 + focusValue * 0.9;
      ringMaterialRef.current.opacity = damp(
        ringMaterialRef.current.opacity,
        nextOpacity,
        2.2,
        delta,
      );
      ringMaterialRef.current.emissiveIntensity = damp(
        ringMaterialRef.current.emissiveIntensity,
        nextEmissive,
        2.1,
        delta,
      );
    }

    if (coreMaterialRef.current) {
      const nextEmissive = 0.66 + focusValue * 1.1;
      coreMaterialRef.current.emissiveIntensity = damp(
        coreMaterialRef.current.emissiveIntensity,
        nextEmissive,
        2.4,
        delta,
      );
    }

    if (haloMaterialRef.current) {
      const nextOpacity = 0.16 + focusValue * 0.32;
      haloMaterialRef.current.opacity = damp(
        haloMaterialRef.current.opacity,
        nextOpacity,
        2.6,
        delta,
      );
    }
  });

  return (
    <group ref={clusterRef} position={[0, verticalOffset, depth]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[baseRadius, 0.12, 48, 260]} />
        <meshStandardMaterial
          ref={ringMaterialRef}
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={0.4 + section.focus * 0.8}
          transparent
          opacity={0.24 + section.focus * 0.4}
          metalness={0.35}
          roughness={0.42}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[Math.max(0.34, baseRadius * 0.12), 48, 48]} />
        <meshStandardMaterial
          ref={coreMaterialRef}
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={0.72 + section.focus * 1.2}
          transparent
          opacity={0.58}
          metalness={0.12}
          roughness={0.28}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[baseRadius * 1.12, 0.05, 24, 200]} />
        <meshBasicMaterial
          ref={haloMaterialRef}
          color={accentColor}
          transparent
          opacity={0.18 + section.focus * 0.28}
        />
      </mesh>
      <group ref={satellitesRef}>
        {section.subsections.map((subsection, subsectionIndex) => (
          <OrbitSatellite
            key={subsection.id}
            radius={baseRadius}
            subsection={subsection}
            tone={section.tone}
            index={subsectionIndex}
            count={section.subsections.length}
          />
        ))}
      </group>
    </group>
  );
};

type OrbitSatelliteProps = {
  radius: number;
  subsection: ThoughtOrbitSubsectionDynamic;
  tone: ThoughtOrbitSectionDynamic['tone'];
  index: number;
  count: number;
};

const OrbitSatellite = ({ radius, subsection, tone, index, count }: OrbitSatelliteProps) => {
  const containerRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const ringMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const focusRef = useRef(subsection.focus);
  const offsetRef = useRef(subsection.offset);
  const spreadRef = useRef(subsection.spread);

  useEffect(() => {
    focusRef.current = subsection.focus;
    offsetRef.current = subsection.offset;
    spreadRef.current = subsection.spread;
  }, [subsection.focus, subsection.offset, subsection.spread]);

  const baseColor = tone === 'hero' ? '#bae6fd' : '#7dd3fc';
  const emissiveColor = tone === 'hero' ? '#1d4ed8' : '#0e7490';

  useFrame((state, delta) => {
    const focusValue = focusRef.current;
    const offsetValue = offsetRef.current;
    const spreadValue = spreadRef.current;

    if (containerRef.current) {
      const baseAngle = (index / Math.max(count, 1)) * Math.PI * 2;
      const targetAngle = baseAngle + offsetValue * 1.1;
      const targetTilt = (index % 2 === 0 ? 1 : -1) * (0.16 + spreadValue * 0.24);
      containerRef.current.rotation.y = damp(
        containerRef.current.rotation.y,
        targetAngle,
        5.6,
        delta,
      );
      containerRef.current.rotation.x = damp(
        containerRef.current.rotation.x,
        targetTilt,
        3.4,
        delta,
      );
    }

    if (meshRef.current) {
      const nextScale = 0.6 + focusValue * 0.85;
      const currentScale = meshRef.current.scale.x;
      const dampedScale = damp(currentScale, nextScale, 4.5, delta);
      meshRef.current.scale.setScalar(dampedScale);
    }

    if (materialRef.current) {
      const targetOpacity = 0.42 + focusValue * 0.4;
      const targetEmissive = 0.52 + focusValue * 1.4;
      materialRef.current.opacity = damp(materialRef.current.opacity, targetOpacity, 3.2, delta);
      materialRef.current.emissiveIntensity = damp(
        materialRef.current.emissiveIntensity,
        targetEmissive,
        2.8,
        delta,
      );
    }

    if (ringMaterialRef.current) {
      const targetOpacity = focusValue > 0.6 ? 0.38 + focusValue * 0.4 : 0.08 + focusValue * 0.2;
      ringMaterialRef.current.opacity = damp(
        ringMaterialRef.current.opacity,
        targetOpacity,
        3,
        delta,
      );
    }
  });

  return (
    <group ref={containerRef}>
      <mesh ref={meshRef} position={[radius, 0, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          ref={materialRef}
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={0.6 + subsection.focus * 1.2}
          transparent
          opacity={0.48 + subsection.focus * 0.3}
          metalness={0.2}
          roughness={0.35}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[radius, 0, 0]}>
        <torusGeometry args={[0.3, 0.015, 16, 48]} />
        <meshBasicMaterial
          ref={ringMaterialRef}
          color={baseColor}
          transparent
          opacity={0.12 + subsection.focus * 0.16}
        />
      </mesh>
    </group>
  );
};
