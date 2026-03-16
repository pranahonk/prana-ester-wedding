"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  scrollProgress: number;
  currentSection: number;
}

/* ── Two Rings that merge into one ──────────────── */
function MergingRings({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const mergedRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    // Gentle rotation
    groupRef.current.rotation.y = t * 0.06 + scroll * 1.5;
    groupRef.current.position.y = Math.sin(t * 0.25) * 0.06;

    // Distance: start far apart (2.0), merge to 0 at scroll=1
    const separation = Math.max(0, 2.0 * (1 - scroll * 1.3));
    // Tilt: start tilted, straighten as they merge
    const tilt = 0.4 * (1 - scroll * 1.2);
    // Merged ring opacity: invisible at start, fully visible at end
    const mergeProgress = Math.max(0, Math.min((scroll - 0.7) / 0.3, 1));
    // Individual ring opacity: visible at start, fade out as they merge
    const ringOpacity = 1 - mergeProgress;

    if (ring1Ref.current) {
      ring1Ref.current.position.x = -separation;
      ring1Ref.current.rotation.set(Math.PI / 2, 0, Math.max(0, tilt));
      ring1Ref.current.visible = ringOpacity > 0.01;
      const mat = ring1Ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = ringOpacity;
      mat.transparent = true;
    }
    if (ring2Ref.current) {
      ring2Ref.current.position.x = separation;
      ring2Ref.current.rotation.set(Math.PI / 2, 0, Math.min(0, -tilt));
      ring2Ref.current.visible = ringOpacity > 0.01;
      const mat = ring2Ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = ringOpacity;
      mat.transparent = true;
    }
    if (mergedRef.current) {
      mergedRef.current.visible = mergeProgress > 0.01;
      // Scale up from small to full
      const s = 0.5 + mergeProgress * 0.5;
      mergedRef.current.scale.setScalar(s);
      mergedRef.current.rotation.set(Math.PI / 2 + Math.sin(t * 0.2) * 0.05, 0, 0);
      const mat = mergedRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = mergeProgress;
      mat.transparent = true;
      // Glow at merge moment
      mat.emissiveIntensity = mergeProgress > 0.5 ? (mergeProgress - 0.5) * 2 * 0.4 : 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ring 1 — left, gold */}
      <mesh ref={ring1Ref} position={[-2, 0, 0]} rotation={[Math.PI / 2, 0, 0.4]}>
        <torusGeometry args={[0.6, 0.07, 48, 100]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.05} envMapIntensity={2} />
      </mesh>

      {/* Ring 2 — right, lighter gold */}
      <mesh ref={ring2Ref} position={[2, 0, 0]} rotation={[Math.PI / 2, 0, -0.4]}>
        <torusGeometry args={[0.6, 0.07, 48, 100]} />
        <meshStandardMaterial color="#e8c547" metalness={1} roughness={0.05} envMapIntensity={2} />
      </mesh>

      {/* Merged ring — appears when they come together */}
      <mesh ref={mergedRef} visible={false} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.09, 48, 100]} />
        <meshStandardMaterial color="#f0d060" metalness={1} roughness={0.03} emissive="#D4AF37" emissiveIntensity={0} envMapIntensity={3} />
      </mesh>
    </group>
  );
}

/* ── Trail particles between the rings ──────────── */
function RingTrail({ scroll }: { scroll: number }) {
  const count = 40;
  const ref = useRef<THREE.InstancedMesh>(null);
  const d = useMemo(() => new THREE.Object3D(), []);

  const pts = useMemo(() => Array.from({ length: count }, (_, i) => ({
    t: i / count,
    offset: Math.random() * Math.PI * 2,
    radius: 0.15 + Math.random() * 0.3,
    speed: 0.15 + Math.random() * 0.1,
    s: 0.008 + Math.random() * 0.01,
  })), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const separation = Math.max(0, 2.0 * (1 - scroll * 1.3));

    pts.forEach((p, i) => {
      // Particles arc between the two ring positions
      const progress = p.t;
      const x = -separation + progress * separation * 2;
      const arcHeight = Math.sin(progress * Math.PI) * 0.8 * (separation / 2);
      const orbitAngle = p.offset + t * p.speed;

      d.position.set(
        x + Math.cos(orbitAngle) * p.radius * 0.3,
        arcHeight + Math.sin(orbitAngle) * p.radius,
        Math.cos(orbitAngle) * p.radius
      );

      // Brighter when rings are close
      const brightness = 1 - separation / 2;
      const flicker = 0.3 + Math.sin(t * 4 + i * 2.5) * 0.7;
      d.scale.setScalar(p.s * flicker * (0.5 + brightness * 0.5));
      d.updateMatrix();
      ref.current!.setMatrixAt(i, d.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#f5e7a3" emissive="#D4AF37" emissiveIntensity={1.2} transparent opacity={0.6} />
    </instancedMesh>
  );
}

/* ── Merge burst (when rings fully combine) ─────── */
function MergeBurst({ scroll }: { scroll: number }) {
  const count = 50;
  const ref = useRef<THREE.InstancedMesh>(null);
  const d = useMemo(() => new THREE.Object3D(), []);

  const pts = useMemo(() => Array.from({ length: count }, () => ({
    dir: new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ).normalize(),
    speed: 0.08 + Math.random() * 0.12,
    s: 0.006 + Math.random() * 0.01,
  })), []);

  useFrame((state) => {
    if (!ref.current) return;
    const burstProgress = Math.max(0, Math.min((scroll - 0.65) / 0.2, 1));

    if (burstProgress <= 0 || burstProgress >= 1) {
      // Hide all
      pts.forEach((_, i) => {
        d.scale.setScalar(0);
        d.updateMatrix();
        ref.current!.setMatrixAt(i, d.matrix);
      });
    } else {
      const t = state.clock.elapsedTime;
      pts.forEach((p, i) => {
        const expand = burstProgress * p.speed * 8;
        d.position.set(p.dir.x * expand, p.dir.y * expand, p.dir.z * expand);
        const fadeOut = 1 - burstProgress;
        d.scale.setScalar(p.s * fadeOut * (0.5 + Math.sin(t * 6 + i) * 0.5));
        d.updateMatrix();
        ref.current!.setMatrixAt(i, d.matrix);
      });
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#f5e7a3" emissive="#D4AF37" emissiveIntensity={2} transparent opacity={0.8} />
    </instancedMesh>
  );
}

/* ── Orbiting sparkles ──────────────────────────── */
function SparkleOrbit({ scroll }: { scroll: number }) {
  const count = 30;
  const ref = useRef<THREE.InstancedMesh>(null);
  const d = useMemo(() => new THREE.Object3D(), []);
  const pts = useMemo(() => Array.from({ length: count }, (_, i) => ({
    a: (i / count) * Math.PI * 2, r: 1.8 + Math.random() * 0.5, speed: 0.02 + Math.random() * 0.02,
    yOff: (Math.random() - 0.5) * 1.2, s: Math.random() * 0.01 + 0.004,
  })), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    pts.forEach((p, i) => {
      const a = p.a + t * p.speed + scroll * 1.2;
      d.position.set(Math.cos(a) * p.r, p.yOff, Math.sin(a) * p.r);
      d.scale.setScalar(p.s * Math.max(0, 0.3 + Math.sin(t * 5 + i * 3) * 0.7));
      d.updateMatrix();
      ref.current!.setMatrixAt(i, d.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  const merged = scroll > 0.75;
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color={merged ? "#f5e7a3" : "#D4AF37"} emissive={merged ? "#f0d060" : "#D4AF37"} emissiveIntensity={merged ? 1.5 : 0.8} transparent opacity={0.5} />
    </instancedMesh>
  );
}

/* ── Gold dust ──────────────────────────────────── */
function GoldDust({ scroll }: { scroll: number }) {
  const count = 50;
  const ref = useRef<THREE.InstancedMesh>(null);
  const d = useMemo(() => new THREE.Object3D(), []);
  const pts = useMemo(() => Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 14, y: Math.random() * 22 - 5, z: (Math.random() - 0.5) * 8 - 3,
    vy: Math.random() * 0.02 + 0.005, drift: Math.random() * Math.PI * 2, s: Math.random() * 0.012 + 0.003,
  })), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    pts.forEach((p, i) => {
      const y = ((p.y - t * p.vy - scroll * 14) % 27) + 13;
      d.position.set(p.x + Math.sin(t * 0.12 + p.drift) * 0.7, y, p.z);
      d.scale.setScalar(p.s * (0.4 + Math.sin(t * 3 + i * 2) * 0.6));
      d.updateMatrix();
      ref.current!.setMatrixAt(i, d.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial color="#e8c547" emissive="#D4AF37" emissiveIntensity={0.6} transparent opacity={0.3} />
    </instancedMesh>
  );
}

/* ── Cross for verse ────────────────────────────── */
function GoldCross({ visible }: { visible: boolean }) {
  return (
    <Float speed={0.5} floatIntensity={0.1}>
      <group scale={visible ? 0.4 : 0}>
        <mesh><boxGeometry args={[0.03, 0.4, 0.012]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.06} transparent opacity={visible ? 0.4 : 0} />
        </mesh>
        <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.22, 0.03, 0.012]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.06} transparent opacity={visible ? 0.4 : 0} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Camera ─────────────────────────────────────── */
function CameraRig({ scroll }: { scroll: number }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = scroll * Math.PI * 0.6;
    const radius = 5 - scroll * 1;
    const camX = Math.sin(angle + t * 0.02) * radius * 0.3;
    const camY = Math.cos(t * 0.05) * 0.1 + Math.sin(scroll * Math.PI * 0.8) * 0.4;
    const camZ = Math.cos(angle + t * 0.02) * radius;
    state.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.025);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── MAIN ───────────────────────────────────────── */
export function Scene3D({ scrollProgress, currentSection }: Props) {
  const merged = scrollProgress > 0.75;

  return (
    <>
      <color attach="background" args={["#050a14"]} />
      <fog attach="fog" args={["#050a14", 4, 16]} />

      {/* Lighting — warms up as rings merge */}
      <ambientLight intensity={0.12 + scrollProgress * 0.08} color="#0F1D33" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#FFF8F0" />
      <directionalLight position={[-3, 3, -2]} intensity={0.2} color="#e8c547" />
      <pointLight position={[-2, 2, 3]} intensity={0.4} color="#D4AF37" distance={10} />
      <pointLight position={[2, -1, 2]} intensity={0.25} color="#e8c547" distance={8} />
      {/* Golden glow intensifies at merge */}
      <pointLight position={[0, 0, 2]} intensity={merged ? 0.8 : 0.2} color="#f0d060" distance={8} />
      <pointLight position={[0, 0, -1]} intensity={0.3} color="#f5e7a3" distance={5} />

      <CameraRig scroll={scrollProgress} />

      {/* Two rings merging into one */}
      <MergingRings scroll={scrollProgress} />

      {/* Particle trail between rings */}
      <RingTrail scroll={scrollProgress} />

      {/* Burst at merge moment */}
      <MergeBurst scroll={scrollProgress} />

      {/* Orbiting sparkles */}
      <SparkleOrbit scroll={scrollProgress} />

      {/* Gold dust */}
      <GoldDust scroll={scrollProgress} />

      {/* Cross for verse */}
      <group position={[0, -0.5, -2]}>
        <GoldCross visible={currentSection === 3} />
      </group>

      {/* Stars at end */}
      <group visible={currentSection >= 7}>
        <Stars radius={12} depth={30} count={1500} factor={2} saturation={0.2} fade speed={0.4} />
      </group>
    </>
  );
}
