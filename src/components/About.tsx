"use client";

import { Gamepad2, Layers, Paintbrush, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import PUFA from "../../public/img/PUFA.png";
import CSGO2025 from "../../public/img/CSGO 2025.png";
import PUMA from "../../public/img/PUMA.png";
import CSGO2024 from "../../public/img/CSGO 2024.png";

const About = () => {
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
            <h3 className="text-2xl font-bold text-white mb-2">My Journey</h3>
            <p className="text-white/80 leading-relaxed">
              I'm Maulana Rizwan Ahmad, a passionate game developer based in
              Bekasi, with 1 year of experience creating interactive and
              meaningful game experiences. I specialize in 2D game development
              using Unity, combining engaging gameplay mechanics, pixel art, and
              clean code to bring ideas to life. Whether it's an immersive RPG
              or an educational game, I love turning creative concepts into
              engaging digital worlds.
            </p>
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
