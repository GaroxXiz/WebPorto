"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CS from "../../public/img/Csharp.png";
import PY from "../../public/img/Python.png";
import HTML from "../../public/img/HTML.png";
import CSS from "../../public/img/Css.png";
import JS from "../../public/img/Javascript.png";
import UNITY from "../../public/img/Unity.png";
import BLENDER from "../../public/img/Blender.png";
import ASEPRITE from "../../public/img/Aseprite.png";
import RENPY from "../../public/img/Renpy.png";
import GITHUB from "../../public/img/Github.png";
import VS from "../../public/img/VS.png";
import VSC from "../../public/img/VSCode.png";
import CR from "../../public/img/Creativity.png";
import CO from "../../public/img/Communication.png";
import TW from "../../public/img/Teamwork.png";
import PS from "../../public/img/Problem Solving.png";
import LS from "../../public/img/Leadership.png";
import DC from "../../public/img/Decision.png";

type Skill = {
  name: string;
  icon: string;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Technical Skills",
      skills: [
        { name: "C#", icon: CS },
        { name: "Python", icon: PY },
        { name: "HTML", icon: HTML },
        { name: "CSS", icon: CSS },
        { name: "JavaScript", icon: JS },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Unity", icon: UNITY },
        { name: "Blender", icon: BLENDER },
        { name: "Aseprite", icon: ASEPRITE },
        { name: "Renpy", icon: RENPY },
        { name: "GitHub", icon: GITHUB },
        { name: "Visual Studio", icon: VS },
        { name: "VS Code", icon: VSC },
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Creativity", icon: CR },
        { name: "Communication", icon: CO },
        { name: "Teamwork", icon: TW },
        { name: "Problem Solving", icon: PS },
        { name: "Leadership", icon: LS },
        { name: "Decision", icon: DC },
      ],
    },
  ];

  const [slideIndex, setSlideIndex] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState<Record<string, number>>({});

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      skillCategories.forEach((category) => {
        handleSlide(category.title, "right", false);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSlide = (
    categoryTitle: string,
    dir: "left" | "right",
    isManual = true
  ) => {
    setSlideIndex((prev) => {
      const current = prev[categoryTitle] || 0;
      const total =
        skillCategories.find((c) => c.title === categoryTitle)?.skills.length ||
        0;
      const next =
        dir === "left" ? (current - 1 + total) % total : (current + 1) % total;
      return { ...prev, [categoryTitle]: next };
    });

    if (isManual) {
      setDirection((prev) => ({
        ...prev,
        [categoryTitle]: dir === "left" ? -1 : 1,
      }));
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-[#00d4ff]">Skills</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
          className="p-8 rounded-2xl backdrop-blur-lg bg-white/0 border border-white/0 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const currentIndex = slideIndex[category.title] || 0;
              const currentSkill = category.skills[currentIndex];
              const slideDir = direction[category.title] || 1;

              return (
                <div
                  key={index}
                  className="p-6 rounded-xl h-full backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col items-center"
                >
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    {category.title}
                  </h3>

                  <div className="relative w-full">
                    {/* Arrow Buttons */}
                    <button
                      onClick={() => handleSlide(category.title, "left")}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 z-10"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={() => handleSlide(category.title, "right")}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 z-10"
                    >
                      <ChevronRight />
                    </button>

                    {/* Animated Skill Icon */}
                    <div className="flex justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSkill.name}
                          initial={{ x: slideDir * 100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -slideDir * 100, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center text-white text-sm"
                        >
                          <img
                            src={currentSkill.icon}
                            alt={currentSkill.name}
                            className="w-16 h-16 object-contain mb-2"
                          />
                          <span className="text-center">
                            {currentSkill.name}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
