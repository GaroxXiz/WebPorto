"use client";

import { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = `${import.meta.env.BASE_URL}model/RizwanWaving.glb`;

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first available animation (usually 'mixamo.com')
    if (actions && Object.keys(actions).length > 0) {
      const firstActionName = Object.keys(actions)[0];
      const action = actions[firstActionName];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    }
  }, [actions]);

  // Subtle mouse follow / rotation effect
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.3,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.1,
      0.05
    );
  });

  return (
    <group ref={group} position={[0, -1.5, 0]} scale={[1.8, 1.8, 1.8]}>
      <primitive object={scene} />
    </group>
  );
}

// Preload GLTF model for faster rendering
useGLTF.preload(MODEL_PATH);

const Avatar3D = () => {
  return (
    <div className="w-full h-full relative group">
      {/* Speech Bubble / Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md border border-[#00d4ff]/40 text-[#00d4ff] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-transform duration-300 group-hover:scale-110 pointer-events-none">
        Say Hi! 👋
      </div>

      <Canvas
        camera={{ position: [0, 0.5, 3.2], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lights */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[0, 2, 2]} intensity={1.0} color="#0066ff" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <Model />
          </Float>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
