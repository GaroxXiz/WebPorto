"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);

  // Smooth spring physics for outer ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  useEffect(() => {
    // Check if device is touch/mobile
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    let lastParticleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!isVisible) setIsVisible(true);

      setMousePosition({ x, y });
      ringX.set(x);
      ringY.set(y);

      // Spawn trail particle every 30ms
      const now = Date.now();
      if (now - lastParticleTime > 30) {
        lastParticleTime = now;
        particleIdRef.current += 1;
        const newParticle: TrailParticle = {
          id: particleIdRef.current,
          x,
          y,
          size: Math.random() * 4 + 3,
        };

        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Event listener to detect hover on interactive elements
    const handleOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest(
          "a, button, input, textarea, select, [role='button'], .cursor-pointer"
        )
      );

      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOverInteractive);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOverInteractive);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, isMobile, ringX, ringY]);

  // Clean up particles after fade out
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [particles]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Particle Trail */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff] z-[9999]"
        />
      ))}

      {/* Main Inner Dot */}
      <motion.div
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isMouseDown ? 0.7 : isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#00d4ff] rounded-full shadow-[0_0_10px_#00d4ff] z-[9999]"
      />

      {/* Outer Glowing Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isMouseDown ? 0.8 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? "#00d4ff" : "rgba(0, 212, 255, 0.5)",
          boxShadow: isHovered
            ? "0 0 20px rgba(0, 212, 255, 0.8), inset 0 0 10px rgba(0, 212, 255, 0.4)"
            : "0 0 10px rgba(0, 212, 255, 0.3)",
        }}
        transition={{ duration: 0.15 }}
        className="fixed -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#00d4ff]/50 backdrop-blur-[1px] pointer-events-none z-[9999]"
      />
    </div>
  );
};

export default CustomCursor;
