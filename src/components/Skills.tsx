"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  level: number;
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
        { name: "C#", level: 95 },
        { name: "Python", level: 80 },
        { name: "HTML", level: 90 },
        { name: "CSS", level: 80 },
        { name: "Javascript", level: 80 },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Unity", level: 95 },
        { name: "Blender", level: 90 },
        { name: "Aseprite", level: 90 },
        { name: "Renpy", level: 75 },
        { name: "Github", level: 80 },
        { name: "Dockerfile", level: 75 },
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Creativity", level: 95 },
        { name: "Communication", level: 90 },
        { name: "Teamwork", level: 90 },
        { name: "Problem Solving", level: 85 },
        { name: "Critical Thinking", level: 80 },
      ],
    },
  ];

  const [ref, inView] = useInView({ triggerOnce: false });
  const [filledBars, setFilledBars] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (inView) {
      const timeouts: number[] = [];
      skillCategories.forEach((category) => {
        category.skills.forEach((skill, skillIndex) => {
          const key = `${category.title}-${skill.name}`;
          const timeout = setTimeout(() => {
            setFilledBars((prev) => ({
              ...prev,
              [key]: true,
            }));
          }, skillIndex * 100); // Delay per skill dalam satu kategori
          timeouts.push(timeout);
        });
      });

      return () => timeouts.forEach(clearTimeout);
    } else {
      setFilledBars({});
    }
  }, [inView]);

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
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
          className="p-8 rounded-2xl backdrop-blur-lg bg-white/0 border border-white/0 mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="h-full">
                <div className="p-6 rounded-xl h-full backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    {category.title}
                  </h3>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => {
                      const barKey = `${category.title}-${skill.name}`;
                      const isFilled = filledBars[barKey];

                      return (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm">
                              {skill.name}
                            </span>
                            <span className="text-[#00d4ff] text-sm">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#00d4ff] to-[#0066ff] h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: isFilled ? `${skill.level}%` : "0%",
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
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

export default Skills;
