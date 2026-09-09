"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useLanguage } from "../context/LanguageContext";
import { Github, ExternalLink } from "lucide-react";

const customTheme = {
  dark: ["#161b22", "#003847", "#00708f", "#00a3cc", "#00d4ff"],
};

const GithubContributions = () => {
  const { t } = useLanguage();

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
          className="max-w-5xl mx-auto space-y-8"
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
        </motion.div>
      </div>
    </section>
  );
};

export default GithubContributions;
