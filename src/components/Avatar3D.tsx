"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Float } from "@react-three/drei";
import * as THREE from "three";

const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const MODEL_PATH = getAssetPath("model/RizwanWaving.glb");

interface ModelProps {
  isMobile: boolean;
}

function Model({ isMobile }: ModelProps) {
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

  // Model position & scale scaled up slightly to fill canvas nicely
  const modelPosition: [number, number, number] = isMobile
    ? [0.12, -2.05, 0]
    : [0.25, -2.35, 0];

  const modelScale: [number, number, number] = isMobile
    ? [1.75, 1.75, 1.75]
    : [1.75, 1.75, 1.75];

  return (
    <group ref={group} position={modelPosition} scale={modelScale}>
      <primitive object={scene} />
    </group>
  );
}

// Preload GLTF model for faster rendering
useGLTF.preload(MODEL_PATH);

const Avatar3D = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cameraPosition: [number, number, number] = isMobile
    ? [0.3, 0.48, 2.4]
    : [0.3, 0.5, 2.6];

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#00d4ff" />
        <pointLight position={[0, 2, 2]} intensity={1.2} color="#0066ff" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
            <Model isMobile={isMobile} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Avatar3D;
