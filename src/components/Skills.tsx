"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
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
  speed?: number;
};

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Technical Skills",
      speed: 0.05,
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
      speed: 0.05,
      skills: [
        { name: "Unity", icon: UNITY },
        { name: "Blender", icon: BLENDER },
        { name: "Aseprite", icon: ASEPRITE },
        { name: "Renpy", icon: RENPY },
        { name: "GitHub", icon: GITHUB },
        { name: "Visual Studio", icon: VS },
        { name: "Visual Studio Code", icon: VSC },
      ],
    },
    {
      title: "Soft Skills",
      speed: 0.05,
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

  return (
    <section id="skills" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-[#00d4ff]">Skills</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="p-4 sm:p-8 rounded-2xl backdrop-blur-lg bg-white/0 border border-white/0 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category, index) => (
              <MarqueeCategory key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MarqueeCategory = ({ category }: { category: SkillCategory }) => {
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const speed = category.speed ?? 0.05;

  useAnimationFrame((_, delta) => {
    if (!paused && contentRef.current && containerRef.current) {
      const contentWidth = contentRef.current.scrollWidth / 2;
      let currentX = x.get();
      let nextX = currentX - delta * speed;

      if (Math.abs(nextX) >= contentWidth) {
        nextX = 0;
      }

      x.set(nextX);
    }
  });

  const repeatedSkills = [...category.skills, ...category.skills];

  return (
    <div
      className="p-4 sm:p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-center">
        {category.title}
      </h3>

      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex gap-6 sm:gap-8 w-max will-change-transform"
          ref={contentRef}
          style={{ x }}
        >
          {repeatedSkills.map((skill, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-white text-xs sm:text-sm w-16 sm:w-20"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <span className="text-center mt-2">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
