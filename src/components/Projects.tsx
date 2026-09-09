import { useState } from "react";
import { ExternalLink, Gamepad2, Globe, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
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
import KAHFImg from "../../public/img/KAHF-HAIR.png";
import GARIONXImg from "../../public/img/GarionX.png";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    image: string;
    demo?: string;
    download?: string;
    website?: string;
    status?: string;
    category: "game" | "web";
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group w-full rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:border-[#00d4ff]/30 shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="relative overflow-hidden h-44 sm:h-48 md:h-52">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              project.status !== "development" && !project.website
                ? "group-hover:opacity-0"
                : ""
            }`}
          />

          {project.status !== "development" &&
            project.demo &&
            !project.website && (
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
                {t("projectsInDevelopment")}
              </span>
            </div>
          )}

          <div className="absolute top-2 left-2 z-10">
            <span className="px-2.5 py-1 text-[10px] sm:text-xs bg-black/60 text-[#00d4ff] rounded-full border border-[#00d4ff]/30 font-medium backdrop-blur-md flex items-center gap-1">
              {project.category === "game" ? <Gamepad2 size={12} /> : <Globe size={12} />}
              {project.category === "game" ? "Game Dev" : "Web Dev"}
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-5">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-[#00d4ff] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 min-h-[4.5rem]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.map((tech: string, techIndex: number) => (
              <motion.span
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 8px rgba(0, 212, 255, 0.5)",
                }}
                key={techIndex}
                className="px-2.5 py-1 text-[10px] sm:text-xs bg-[#00d4ff]/20 text-[#00d4ff] rounded-full border border-[#00d4ff]/30"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-5 pt-0">
        <div className="flex gap-3">
          {project.status === "development" ? (
            <span className="flex items-center gap-1 px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-lg text-xs sm:text-sm cursor-not-allowed">
              <ExternalLink size={14} />
              {t("projectsComingSoon")}
            </span>
          ) : project.website ? (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold rounded-lg text-xs sm:text-sm shadow-md hover:shadow-[#00d4ff]/20"
            >
              <ExternalLink size={14} />
              {t("projectsOpenWebsite")}
            </motion.a>
          ) : (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.download}
              download
              className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold rounded-lg text-xs sm:text-sm shadow-md hover:shadow-[#00d4ff]/20"
            >
              <ExternalLink size={14} />
              {t("projectsDownload")}
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<"all" | "game" | "web">("all");

  const projects = [
    {
      title: "Abyss Walker",
      description: t("projectAbyssWalkerDesc"),
      tech: ["Aseprite", "Unity", "C#"],
      image: AbyssWalkerImg,
      demo: AbyssWalkerVid,
      download:
        "https://drive.google.com/drive/folders/1FKSyG56EY9pZadOPE-2npYCThdWzyX-q?usp=sharing",
      category: "game" as const,
    },
    {
      title: "Anomaly Chase",
      description: t("projectAnomalyChaseDesc"),
      tech: ["Blender", "Unity", "C#"],
      image: AnomalyImg,
      demo: AnomalyVid,
      download:
        "https://drive.google.com/drive/folders/1UB4JwxtIXJ0uAskvVuYqfE6oUMoKOJWq?usp=sharing",
      category: "game" as const,
    },
    {
      title: "RATURU : Home Fever",
      description: t("projectRaturuDesc"),
      tech: ["Blender", "Unity"],
      image: RaturuImg,
      demo: RaturuVid,
      download:
        "https://drive.google.com/drive/folders/1tVfJwvPPmfe2QeAdjtUlrre100QB2GNN?usp=sharing",
      category: "game" as const,
    },
    {
      title: "Cyber Educational Games(Level 4: Malware Attack)",
      description: t("projectMalwareDesc"),
      tech: ["Unity", "C#"],
      image: MalwareImg,
      demo: MalwareVid,
      download:
        "https://drive.google.com/drive/folders/1tl5Ma4flqQRTwkkx8YfGy7_xrSJwlvN7?usp=sharing",
      category: "game" as const,
    },
    {
      title: "KAHF DECODE HAIR ANALYZER",
      description: t("projectKahfDesc"),
      tech: ["HTML", "CSS", "JavaScript", "PostgreSQL", "NodeJS", "ExpressJS"],
      image: KAHFImg,
      demo: "#",
      website: "https://hair-analyzer.kahfeveryday.com/",
      category: "web" as const,
    },
    {
      title: "GARIONX AI",
      description: t("projectGarionxDesc"),
      tech: ["Next.js", "React", "TypeScript" , "Tailwind CSS" , "ASP.NET Core" , "PostgreSQL" , "Firebase Auth" , "Docker" , "Groq API" , "AI APIs"],
      image: GARIONXImg,
      demo: "#",
      website: "https://garionx.vercel.app/",
      category: "web" as const,
    },
    {
      title: "Japanese Learning Language",
      description: t("projectJapaneseDesc"),
      tech: ["Aseprite"],
      image: JapaneseImg,
      github: "#",
      demo: "#",
      status: "development",
      category: "game" as const,
    },
    {
      title: "The Everlasting Love",
      description: t("projectVnDesc"),
      tech: ["Aseprite", "Renpy", "Python"],
      image: VNImg,
      github: "#",
      demo: "#",
      status: "development",
      category: "game" as const,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "game") return project.category === "game";
    if (activeFilter === "web") return project.category === "web";
    return true;
  });

  const filterTabs = [
    { id: "all", label: t("projectsFilterAll"), icon: Sparkles },
    { id: "game", label: t("projectsFilterGame"), icon: Gamepad2 },
    { id: "web", label: t("projectsFilterWeb"), icon: Globe },
  ];

  return (
    <section id="projects" className="py-10 sm:py-14 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
            {t("projectsTitle")} <span className="text-[#00d4ff]">{t("projectsSpan")}</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            {t("projectsSubtitle")}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as "all" | "game" | "web")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black shadow-lg shadow-[#00d4ff]/25 scale-105"
                      : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 sm:p-5 md:p-8 rounded-2xl backdrop-blur-lg bg-white/0 border border-white/0 mb-12">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

