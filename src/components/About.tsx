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
import PIXIELAB from "../../public/img/PIXIELAB.png";
import ENSEVAL from "../../public/img/ENSEVAL.png";
import { useLanguage } from "../context/LanguageContext";

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
  const { language, t } = useLanguage();
  const names = [
    "Maulana Rizwan Ahmad",
    language === "en" ? "Known as Rizwan" : "Dikenal sebagai Rizwan",
  ];
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
          : fullText.substring(0, prev.length + 1),
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
  }, [typedName, isDeleting, currentNameIndex, names]);

  const services = [
    {
      icon: <Gamepad2 size={32} />,
      title: t("aboutServiceGameDev"),
      description: t("aboutServiceGameDevDesc"),
    },
    {
      icon: <Layers size={32} />,
      title: t("aboutServiceLevelDesign"),
      description: t("aboutServiceLevelDesignDesc"),
    },
    {
      icon: <Paintbrush size={32} />,
      title: t("aboutServicePixelArt"),
      description: t("aboutServicePixelArtDesc"),
    },
    {
      icon: <Settings2 size={32} />,
      title: t("aboutServiceGameplayProg"),
      description: t("aboutServiceGameplayProgDesc"),
    },
  ];

  const organizationExperience = [
    {
      year: "2024 - 2025",
      organization: "PUFA Computer Science",
      position: language === "en" ? "Vice of Art and Sport Division" : "Wakil Divisi Seni dan Olahraga",
      side: "left",
      image: PUFA,
    },
    {
      year: "February 2025",
      organization: "PUFA Art and Sport Division Event",
      position: language === "en"
        ? "Project Manager at Computer Science Sport & Games Olympiad (CSGO) 2025"
        : "Manajer Proyek di Computer Science Sport & Games Olympiad (CSGO) 2025",
      side: "right",
      image: CSGO2025,
    },
    {
      year: "2023 - 2024",
      organization: "PUMA Informatics",
      position: language === "en" ? "Vice of Art and Sport Division" : "Wakil Divisi Seni dan Olahraga",
      side: "left",
      image: PUMA,
    },
    {
      year: "February 2024",
      organization: "PUFA Art and Sport Division Event",
      position: language === "en"
        ? "PIC Games (Stumble Guys) at Computer Science Sport & Games Olympiad (CSGO) 2024"
        : "PIC Game (Stumble Guys) di Computer Science Sport & Games Olympiad (CSGO) 2024",
      side: "right",
      image: CSGO2024,
    },
  ];

  const workExperience = [
    {
      year: "August 2025 - January 2026",
      company: "PIXIELAB",
      role: language === "en" ? "Fullstack Junior Developer" : "Developer Junior Fullstack",
      description: language === "en"
        ? "Developed a website, game application, tiktok filter, etc."
        : "Mengembangkan situs web, aplikasi game, filter tiktok, dll.",
      side: "left",
      image: PIXIELAB,
    },
    {
      year: "April 2026 - Present",
      company: "ENSEVAL",
      role: language === "en" ? "Web Developer Intern" : "Magang Developer Web",
      description: language === "en"
        ? "Developed and maintained enterprise web applications, implemented REST APIs, optimized database queries, and collaborated with the development team to deliver business solutions."
        : "Mengembangkan dan memelihara aplikasi web korporat, mengimplementasikan API REST, mengoptimalkan kueri basis data, dan berkolaborasi dengan tim pengembangan untuk menghadirkan solusi bisnis.",
      side: "right",
      image: ENSEVAL,
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {t("aboutTitle")} <span className="text-[#00d4ff]">{t("aboutMe")}</span>
          </h2>
        </div>
        {/* Wrapper untuk semua konten awal */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      <div className="w-44-4 bg-green-400 rounded-full animate-pulse"></div>
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
                    {t("aboutJourneyTitle")}
                  </h1>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-mono">
                    {typedName}
                    <span className="animate-pulse">|</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 mb-6">
                    {t("aboutJourneySubtitle")}
                  </p>
                  <p className="text-white/60 mb-8 max-w-2xl whitespace-pre-line text-justify">
                    {t("aboutJourneyDesc")}
                  </p>

                  {/* Stats Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-white text-center">
                    <StatCounter label={t("aboutJourneyGPA")} target={3.51} decimal />
                    <StatCounter label={t("aboutJourneyProjects")} target={13} />
                    <StatCounter label={t("aboutJourneyExp")} target={1} />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                    <a
                      href="#projects"
                      className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    >
                      {t("aboutBtnProjects")}
                    </a>
                    <a
                      href={CV}
                      className="flex items-center justify-center px-8 py-3 backdrop-blur-lg bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 gap-2"
                    >
                      <Download size={20} />
                      <span>{t("aboutBtnCV")}</span>
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
            <h3 className="text-2xl font-bold text-white mb-2">{t("aboutWhatIDo")}</h3>
            <p className="text-white/80 leading-relaxed text-justify">
              {t("aboutWhatIDoDesc")}
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
              <h4 className="text-lg font-semibold text-white mb-6">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-white/60 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white">{t("aboutExpTitle")}</h3>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            {/* Garis vertikal tengah */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00d4ff]/0 via-[#00d4ff]/30 to-[#00d4ff]/0 -translate-x-1/2"></div>

            <div className="space-y-12">
              {organizationExperience.map((exp, index) => {
                const isLeft = exp.side.toLowerCase() === "left";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className={`relative flex flex-col md:flex-row ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    } items-start w-full group`}
                  >
                    {/* Card container */}
                    <div className="w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0">
                      <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#00d4ff]/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] flex flex-col sm:flex-row gap-5 items-start">
                        {/* Logo container */}
                        <div className="flex-shrink-0 w-24 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={exp.image}
                            alt={`${exp.organization} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Text */}
                        <div className="flex-grow space-y-2 text-left">
                          <h4 className="text-lg font-bold text-white group-hover:text-[#00d4ff] transition-colors duration-300 leading-snug">
                            {exp.position}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-white/60 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                              {exp.organization}
                            </span>
                            <span className="text-white/40 text-xs font-mono">
                              {exp.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Titik timeline */}
                    <div className="absolute left-4 md:left-1/2 top-10 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#00d4ff] border-4 border-[#0a0a0a] rounded-full z-10 shadow-[0_0_10px_#00d4ff] group-hover:scale-125 group-hover:bg-[#00e5ff] group-hover:shadow-[0_0_15px_#00d4ff] transition-all duration-300"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white">{t("aboutWorkExpTitle")}</h3>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            {/* Garis vertikal tengah */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00d4ff]/0 via-[#00d4ff]/30 to-[#00d4ff]/0 -translate-x-1/2"></div>

            <div className="space-y-12">
              {workExperience.map((exp, index) => {
                const isLeft = exp.side === "left";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className={`relative flex flex-col md:flex-row ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    } items-start w-full group`}
                  >
                    {/* Card container */}
                    <div className="w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0">
                      <div className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#00d4ff]/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] flex flex-col sm:flex-row gap-5 items-start">
                        {/* Logo container */}
                        <div className="flex-shrink-0 w-24 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={exp.image}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Text */}
                        <div className="flex-grow space-y-2 text-left w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h4 className="text-lg font-bold text-white group-hover:text-[#00d4ff] transition-colors duration-300 leading-snug">
                              {exp.role}
                            </h4>
                            <span className="text-[#00d4ff] text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 w-fit">
                              {exp.company}
                            </span>
                          </div>
                          <p className="text-white/40 text-xs font-mono">
                            {exp.year}
                          </p>
                          <p className="text-white/70 text-sm leading-relaxed pt-2 border-t border-white/5">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Titik timeline */}
                    <div className="absolute left-4 md:left-1/2 top-10 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#00d4ff] border-4 border-[#0a0a0a] rounded-full z-10 shadow-[0_0_10px_#00d4ff] group-hover:scale-125 group-hover:bg-[#00e5ff] group-hover:shadow-[0_0_15px_#00d4ff] transition-all duration-300"></div>
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
