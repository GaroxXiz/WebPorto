"use client";
import { useEffect, useState, useRef } from "react";
import {
  Gamepad2,
  Layers,
  Paintbrush,
  Settings2,
  Github,
  Linkedin,
  MessageCircle,
  Download,
} from "lucide-react";
import profileImg from "/img/Profile.png";
import CV from "/pdf/CV Rizwan.pdf";
import { motion, useInView } from "framer-motion";
import PUFA from "../../public/img/PUFA.png";
import CSGO2025 from "../../public/img/CSGO 2025.png";
import PUMA from "../../public/img/PUMA.png";
import CSGO2024 from "../../public/img/CSGO 2024.png";

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

const About = () => {
  const names = ["Maulana Rizwan Ahmad", "Known as Rizwan"];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [typedName, setTypedName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
  const services = [
    {
      icon: <Gamepad2 size={32} />,
      title: "Game Development",
      description:
        "Designing and developing 2D games with engaging mechanics and polished gameplay",
    },
    {
      icon: <Layers size={32} />,
      title: "Level Design",
      description:
        "Crafting immersive game environments and balanced level progression",
    },
    {
      icon: <Paintbrush size={32} />,
      title: "Pixel Art & Animation",
      description:
        "Creating original pixel-based assets and frame-by-frame character animations",
    },
    {
      icon: <Settings2 size={32} />,
      title: "Gameplay Programming",
      description:
        "Implementing core systems like movement, combat, and interaction using C# in Unity",
    },
  ];

  const organizationExperience = [
    {
      year: "2024 - Present",
      organization: "PUFA Computer Science",
      position: "Vice of Art and Sport Division",
      side: "left",
      image: PUFA,
    },
    {
      year: "February 2025",
      organization: "PUFA Art and Sport Division Event",
      position:
        "Project Manager at Computer Science Sport & Games Olympiad (CSGO) 2025",
      side: "right",
      image: CSGO2025,
    },
    {
      year: "2023 - 2024",
      organization: "PUMA Informatics",
      position: "Vice of Art and Sport Division",
      side: "left",
      image: PUMA,
    },
    {
      year: "February 2024",
      organization: "PUFA Art and Sport Division Event",
      position:
        "PIC Games (Stumble Guys) at Computer Science Sport & Games Olympiad (CSGO) 2024",
      side: "right",
      image: CSGO2024,
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            About <span className="text-[#00d4ff]">Me</span>
          </h2>
        </div>
        {/* Wrapper untuk semua konten awal */}
        <div className="max-w-6xl mx-auto px-8">
          {/* My Journey */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.4 }}
            className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 mb-8"
          >
            <div className="text-center">
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
                    I'm Maulana Rizwan Ahmad, a highly motivated Informatics
                    student at President University with a concentration in Game
                    Development, based in Bekasi. I have 1 year of experience
                    creating interactive and meaningful game experiences, and
                    I'm passionate about building immersive digital worlds using
                    tools like Unity, Blender, and Aseprite. I specialize in 2D
                    game development, combining engaging gameplay mechanics,
                    pixel art, and clean code to bring ideas to life. Whether
                    it’s an immersive RPG or an educational game, I love turning
                    creative concepts into impactful and enjoyable experiences.
                    I'm currently looking for an opportunity to apply my
                    technical and creative skills in a professional game
                    development environment.
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
          </motion.div>

          {/* What I Do */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.4 }}
            className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-2">What I Do</h3>
            <p className="text-white/80 leading-relaxed">
              From concept to deployment, I craft engaging and scalable games
              across desktop, mobile, and web platforms. I collaborate with
              indie teams and studios to bring creative visions to life using
              modern game engines, pixel-perfect art, and industry best
              practices. Whether it's an immersive RPG or an educational
              experience, I build games that players remember.
            </p>
          </motion.div>
        </div>
        {/* Services */}
        <div className="flex flex-wrap justify-center gap-6 mb-32">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: false, amount: 0.4 }}
              className="w-64 aspect-square p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group flex flex-col justify-start items-center text-center"
            >
              {/* Icon */}
              <div className="h-12 mb-4 flex items-center justify-center text-[#00d4ff] group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h4 className="text-lg-2x1 font-semibold text-white mb-6">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-white/60 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white">Experience</h3>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            {/* Garis vertikal tengah */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-[#00d4ff]/20"></div>

            <div className="space-y-20">
              {organizationExperience.map((exp, index) => {
                const isLeft = exp.side.toLowerCase() === "left";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.6 }}
                    className={`relative flex flex-col md:flex-row ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center md:items-start text-center md:text-left gap-6`}
                  >
                    {/* Konten pengalaman */}
                    <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center md:items-start gap-4">
                      <img
                        src={exp.image}
                        alt={`${exp.organization} logo`}
                        className="w-40 h-28 object-contain"
                      />
                      <div className="text-white">
                        <h4 className="text-lg font-semibold mb-2">
                          {exp.position}
                        </h4>
                        <p className="text-white/60 text-sm mb-1">
                          {exp.organization}
                        </p>
                        <p className="text-white/40 text-sm italic">
                          {exp.year}
                        </p>
                      </div>
                    </div>

                    {/* Titik timeline */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[#00d4ff] border-4 border-[#0a0a0a] rounded-full z-10"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
