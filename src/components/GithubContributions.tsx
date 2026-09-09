"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useLanguage } from "../context/LanguageContext";
import { Github, ExternalLink, Star, GitFork, BookOpen, Code2 } from "lucide-react";

const customTheme = {
  dark: ["#161b22", "#003847", "#00708f", "#00a3cc", "#00d4ff"],
};

interface Repo {
  name: string;
  description: string;
  language: string;
  langColor: string;
  stars?: number;
  forks?: number;
  url: string;
}

const GithubContributions = () => {
  const { t } = useLanguage();

  const featuredRepos: Repo[] = [
    {
      name: "WebPorto",
      description: "Personal interactive portfolio website built with React, Vite, TypeScript, and Tailwind CSS.",
      language: "TypeScript",
      langColor: "#3178c6",
      url: "https://github.com/GaroxXiz/WebPorto",
    },
    {
      name: "Abyss-Walker",
      description: "2D Pixel Art RPG & Action Game created with Unity C# and custom Aseprite sprite animations.",
      language: "C#",
      langColor: "#178600",
      url: "https://github.com/GaroxXiz",
    },
    {
      name: "GarionX-AI",
      description: "Multi-agent AI chat platform featuring dynamic LLM routing and custom agent creation.",
      language: "TypeScript",
      langColor: "#3178c6",
      url: "https://github.com/GaroxXiz",
    },
    {
      name: "Everlasting-Love",
      description: "Interactive visual novel game with custom pixel character designs and Ren'Py Python scripting.",
      language: "Python",
      langColor: "#3572A5",
      url: "https://github.com/GaroxXiz",
    },
  ];

  return (
    <section id="github" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t("githubTitle")} <span className="text-[#00d4ff]">{t("githubSpan")}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            {t("githubSubtitle")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* GitHub Calendar Heatmap */}
          <div className="p-6 sm:p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 hover:border-[#00d4ff]/30 transition-all duration-300 shadow-xl flex flex-col items-center overflow-x-auto">
            <div className="w-full flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-[#00d4ff]">
                  <Github size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">@GaroxXiz</h3>
                  <p className="text-xs text-white/50">GitHub Activity Matrix</p>
                </div>
              </div>
              <a
                href="https://github.com/GaroxXiz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white/80 hover:text-[#00d4ff] bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300"
              >
                <span>View Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="w-full flex justify-center py-2 min-w-[650px] overflow-x-auto">
              <GitHubCalendar
                username="GaroxXiz"
                colorScheme="dark"
                theme={customTheme}
                blockSize={13}
                blockMargin={4}
                fontSize={14}
              />
            </div>
          </div>

          {/* Featured Repositories Grid */}
          <div>
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl sm:text-2xl justify-center sm:justify-start">
              <BookOpen className="text-[#00d4ff]" size={24} />
              <h3>{t("githubReposTitle")}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredRepos.map((repo, idx) => (
                <motion.a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#00d4ff]/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <Code2 size={18} className="text-[#00d4ff]" />
                        <h4 className="font-semibold text-lg text-white group-hover:text-[#00d4ff] transition-colors duration-300">
                          {repo.name}
                        </h4>
                      </div>
                      <ExternalLink size={16} className="text-white/40 group-hover:text-[#00d4ff] transition-colors duration-300" />
                    </div>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-white/60 font-mono">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full inline-block"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span>{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-4 text-white/50">
                      <div className="flex items-center gap-1 hover:text-white transition-colors">
                        <Star size={14} />
                        <span>Repo</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-white transition-colors">
                        <GitFork size={14} />
                        <span>Public</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubContributions;

