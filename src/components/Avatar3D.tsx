"use client";

import { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const MODEL_PATH = getAssetPath("model/RizwanWaving.glb");

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstActionName = Object.keys(actions)[0];
      const action = actions[firstActionName];
      if (action) {
        action.reset().fadeIn(0.2).play();
      }
    }
  }, [actions]);

  // Subtle mouse follow / rotation effect
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.25,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.08,
      0.05
    );
  });

  return (
    <group ref={group} position={[0, -1.35, 0]} scale={[2.4, 2.4, 2.4]}>
      <primitive object={scene} />
    </group>
  );
}

// Preload GLTF model for faster rendering
useGLTF.preload(MODEL_PATH);

const Avatar3D = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0.2, 1.8], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#00d4ff" />
        <pointLight position={[0, 2, 2]} intensity={1.2} color="#0066ff" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
            <Model />
          </Float>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
