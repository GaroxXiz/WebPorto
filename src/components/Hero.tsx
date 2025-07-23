"use client";

import { useEffect, useState, useRef } from "react";
import { Github, Linkedin, MessageCircle, Download } from "lucide-react";
import profileImg from "/img/Profile.png";
import CV from "/pdf/CV Rizwan.pdf";
import { motion, useInView } from "framer-motion";

type StatCounterProps = {
  label: string;
  target: number;
  decimal?: boolean;
};

const StatCounter = ({ label, target, decimal = false }: StatCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // animasi bisa berjalan berulang
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const duration = 2000;
    const frameRate = 30;
    const totalFrames = Math.round(duration / frameRate);

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = decimal
        ? Number((target * progress).toFixed(2))
        : Math.round(target * progress);
      setCount(current);

      if (frame === totalFrames) clearInterval(counter);
    }, frameRate);

    return () => clearInterval(counter);
  }, [isInView, target]);

  return (
    <div ref={ref}>
      <div className="text-2xl md:text-3xl font-bold">{count}</div>
      <div className="text-sm md:text-base text-white/60">{label}</div>
    </div>
  );
};

const Hero = () => {
  const names = ["Maulana Rizwan Ahmad", "Known as Rizwan"];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [typedName, setTypedName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    const fullText = names[currentNameIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      setTypedName((prev) =>
        isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && typedName === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedName === "") {
        setIsDeleting(false);
        setCurrentNameIndex((prev) => (prev + 1) % names.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedName, isDeleting]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0066ff]/20 rounded-full blur-3xl animate-float animate-delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-rotate-slow"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4 py-20 relative z-10"
      >
        <div className="text-center">
          <div className="inline-block p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Right Side */}
              <div className="flex flex-col items-center md:items-end justify-center md:justify-end mt-6 md:mt-12 space-y-6">
                {/* Foto */}
                <div className="relative group transition-transform duration-500">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#00d4ff]/30 shadow-lg shadow-[#00d4ff]/25 transform scale-100 group-hover:scale-110 transition-transform duration-500 ease-in-out">
                    <img
                      src={profileImg}
                      alt="Maulana Rizwan Ahmad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-green-500 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center transition-all duration-600 animate-bounce">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Social Icons - DIPINDAHKAN */}
                <div className="flex space-x-6 mt-6 md:mt-8">
                  <a
                    href="https://github.com/GaroxXiz"
                    className="p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <Github size={24} className="text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/maulana-rizwan-ahmad-8a831728b"
                    className="p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <Linkedin size={24} className="text-white" />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=+6289530085684&text=Hello, Give me more information about you!"
                    className="p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <MessageCircle size={24} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Left Side */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                  Hi, I'm
                </h1>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-mono">
                  {typedName}
                  <span className="animate-pulse">|</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-6">
                  Game Developer
                </p>
                <p className="text-white/60 mb-8 max-w-2xl whitespace-pre-line">
                  A highly motivated Informatics student at President University
                  with a concentration in Game Development. Passionate about
                  creating immersive games using Unity, Blender, Aseprite.
                  Looking for an opportunity to apply my technical and creative
                  skills in a professional game development environment.
                </p>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-white text-center">
                  <StatCounter label="GPA" target={3.51} decimal />
                  <StatCounter label="Projects" target={10} />
                  <StatCounter label="Experience (Years)" target={1} />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a
                    href="#projects"
                    className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    View Projects
                  </a>
                  <a
                    href={CV}
                    className="flex items-center justify-center px-8 py-3 backdrop-blur-lg bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 gap-2"
                  >
                    <Download size={20} />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
