import React, { useEffect, useRef } from "react";

type ParticleKind = "cyberpunk" | "arcade" | "minimalist";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  kind: ParticleKind;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Well-balanced particle count across mobile and desktop
    const particleCount = width < 768 ? 50 : 90;
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const cyberColors = ["#00d4ff", "#0066ff", "#38bdf8"];
      const arcadeColors = ["#00d4ff", "#38bdf8", "#60a5fa"];
      const minimalColors = ["#e0f2fe", "#ffffff", "#38bdf8"];

      for (let i = 0; i < particleCount; i++) {
        // Distribute particle types evenly: ~35% Cyberpunk, ~35% Arcade, ~30% Minimalist
        const rand = Math.random();
        let kind: ParticleKind = "cyberpunk";
        let color = cyberColors[Math.floor(Math.random() * cyberColors.length)];
        let size = Math.random() * 2.2 + 1.2;
        let vx = (Math.random() - 0.5) * 0.55;
        let vy = (Math.random() - 0.5) * 0.5;
        let alpha = Math.random() * 0.6 + 0.3;

        if (rand < 0.35) {
          kind = "cyberpunk";
          color = cyberColors[Math.floor(Math.random() * cyberColors.length)];
          size = Math.random() * 2.2 + 1.2;
        } else if (rand < 0.70) {
          kind = "arcade";
          color = arcadeColors[Math.floor(Math.random() * arcadeColors.length)];
          size = Math.random() * 3.5 + 2; // 8-bit pixel block
          vy = -(Math.random() * 0.65 + 0.25); // Retro arcade upward drift
          alpha = Math.random() * 0.7 + 0.25;
        } else {
          kind = "minimalist";
          color = minimalColors[Math.floor(Math.random() * minimalColors.length)];
          size = Math.random() * 1.6 + 0.8; // Tiny ambient stardust
          vx = (Math.random() - 0.5) * 0.3;
          vy = (Math.random() - 0.5) * 0.3;
          alpha = Math.random() * 0.45 + 0.2;
        }

        particles.push({ x: Math.random() * width, y: Math.random() * height, size, vx, vy, alpha, color, kind });
      }
    };

    initParticles();

    // Mouse interactive position across the entire viewport
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Cyberpunk constellation lines between nearby cyberpunk nodes
      const cyberNodes = particles.filter((p) => p.kind === "cyberpunk");
      for (let i = 0; i < cyberNodes.length; i++) {
        for (let j = i + 1; j < cyberNodes.length; j++) {
          const dx = cyberNodes[i].x - cyberNodes[j].x;
          const dy = cyberNodes[i].y - cyberNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(cyberNodes[i].x, cyberNodes[i].y);
            ctx.lineTo(cyberNodes[j].x, cyberNodes[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Render all particles with their distinct visual characteristics
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse proximity gentle interaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.kind === "arcade") {
          // Retro pixel square particle (8-bit cyan neon arcade glow)
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else if (p.kind === "minimalist") {
          // Soft minimal glowing stardust
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#38bdf8";
          ctx.fill();
        } else {
          // Cyberpunk glowing node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
