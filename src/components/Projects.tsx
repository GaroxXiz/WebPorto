"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import AbyssWalkerImg from "../../public/img/Abyss-Walker.png";
import AbyssWalkerVid from "../../public/video/Demo-Abyss-Walker.mp4";
import AnomalyImg from "../../public/img/Anomaly.jpg";
import AnomalyVid from "../../public/video/Demo-Anomaly.mp4";
import RaturuImg from "../../public/img/Raturu.jpg";
import RaturuVid from "../../public/video/Demo-Raturu.mp4";
import MalwareImg from "../../public/img/Cyber.png";
import MalwareVid from "../../public/video/Demo-Cyber.mp4";
import JapaneseImg from "../../public/img/Japanese.png";
import VNImg from "../../public/img/VN.png";

const Projects = () => {
  const projects = [
    {
      title: "Abyss Walker",
      description:
        "Full-stack created 2D Pixel Games with aseprite and unity using C#",
      tech: ["Aseprite", "Unity", "C#"],
      image: AbyssWalkerImg,
      demo: AbyssWalkerVid,
      download:
        "https://drive.google.com/drive/folders/1FKSyG56EY9pZadOPE-2npYCThdWzyX-q?usp=sharing",
    },
    {
      title: "Anomaly Chase",
      description:
        "Created the Game Character, Game mechanics and Debugging the codes",
      tech: ["Blender", "Unity", "C#"],
      image: AnomalyImg,
      demo: AnomalyVid,
      download:
        "https://drive.google.com/drive/folders/1UB4JwxtIXJ0uAskvVuYqfE6oUMoKOJWq?usp=sharing",
    },
    {
      title: "RATURU : Home Fever",
      description:
        "Created a 3D low poly design for the Game Environment, Game Icon, and thumbnail",
      tech: ["Blender", "Unity"],
      image: RaturuImg,
      demo: RaturuVid,
      download:
        "https://drive.google.com/drive/folders/1tVfJwvPPmfe2QeAdjtUlrre100QB2GNN?usp=sharing",
    },
    {
      title: "Cyber Educational Games(Level 4: Malware Attack)",
      description:
        "Created the Game mechanics for the last level(Malware Attack), Debugging the last level(Malware Attack) for the WebGL Games.",
      tech: ["Unity", "C#"],
      image: MalwareImg,
      demo: MalwareVid,
      download:
        "https://drive.google.com/drive/folders/1tl5Ma4flqQRTwkkx8YfGy7_xrSJwlvN7?usp=sharing",
    },
    {
      title: "Japanese Learning Language",
      description:
        "Designed the 2D Pixel Character, Animation, and Environment games",
      tech: ["Aseprite"],
      image: JapaneseImg,
      github: "#",
      demo: "#",
      status: "development",
    },
    {
      title: "The Everlasting Love",
      description:
        "Designed The 2D Pixel for Game Character and Environment, Created the Game Mechanics using python",
      tech: ["Aseprite", "Renpy", "Python"],
      image: VNImg,
      github: "#",
      demo: "#",
      status: "development",
    },
  ];

  return (
    <section id="projects" className="py-10 sm:py-14 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-[#00d4ff]">Projects</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            Here are some of my recent projects that showcase my skills and
            creativity
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
          className="p-3 sm:p-5 md:p-8 rounded-2xl backdrop-blur-lg bg-white/0 border border-white/0 mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group w-full rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden h-44 sm:h-48 md:h-52">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      project.status !== "development"
                        ? "group-hover:opacity-0"
                        : ""
                    }`}
                  />

                  {project.status !== "development" && project.demo !== "#" && (
                    <video
                      src={project.demo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                  {project.status === "development" && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-2 py-1 text-[10px] sm:text-xs bg-yellow-500/90 text-black rounded-full font-semibold backdrop-blur-sm">
                        In Development
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0px 0px 8px rgba(0, 212, 255, 0.5)",
                        }}
                        key={techIndex}
                        className="px-2.5 py-1 text-[10px] sm:text-xs bg-[#00d4ff]/20 text-[#00d4ff] rounded-full border border-[#00d4ff]/30 transition-all duration-300 hover:bg-[#00d4ff]/40 hover:scale-105"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.status === "development" ? (
                      <span className="flex items-center gap-1 px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-lg text-xs sm:text-sm cursor-not-allowed">
                        <ExternalLink size={14} />
                        Coming Soon
                      </span>
                    ) : (
                      <motion.a
                        whileHover={{
                          scale: 1.05,
                          rotate: -1.5,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        href={project.download}
                        download
                        className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black rounded-lg transition-all duration-300 text-xs sm:text-sm hover:scale-105 hover:shadow-md hover:shadow-[#00d4ff]/50"
                      >
                        <ExternalLink size={14} />
                        Download
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
