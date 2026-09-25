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
  Award,
  ExternalLink,
  X,
  User,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import profileImg from "/img/Profile.png";
import CV from "/pdf/CV Rizwan.pdf";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PUFA from "../../public/img/PUFA.png";
import CSGO2025 from "../../public/img/CSGO 2025.png";
import PUMA from "../../public/img/PUMA.png";
import CSGO2024 from "../../public/img/CSGO 2024.png";
import PIXIELAB from "../../public/img/PIXIELAB.png";
import ENSEVAL from "../../public/img/ENSEVAL.png";

// Certificate Images from public/img/Organisation
import SertifPUFA from "../../public/img/Organisation/Sertif PUFA.png";
import SertifCSGO2025 from "../../public/img/Organisation/Sertif CSGO 2025.png";
import SertifPUMA from "../../public/img/Organisation/Sertif PUMA.png";
import SertifCSGO2024 from "../../public/img/Organisation/Sertif CSGO 2024.png";

// Member & Committee Reveal Images from public/img/Organisation
// import MemberRevealPUMA from "../../public/img/Organisation/Member Reveal PUMA.png";
// import CommitteRevealCSGO2024 from "../../public/img/Organisation/Committe Reveal CSGO 2024.png";

import { useLanguage } from "../context/LanguageContext";

type StatCounterProps = {
  label: string;
  target: number;
  decimal?: boolean;
};

const StatCounter = ({ label, target, decimal = false }: StatCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
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

interface OrgExperienceItem {
  year: string;
  period: string;
  organization: string;
  organizationFull: string;
  position: string;
  side: "left" | "right";
  image: string;
  certificateImage: string;
  certificateType: string;
  certificateRecipient: string;
  certificateDescription: string;
  certificateSigner: string;
  revealImage?: string;
  revealType?: string;
  revealDescription?: string;
}

const About = () => {
  const { language, t } = useLanguage();
  const [selectedOrg, setSelectedOrg] = useState<OrgExperienceItem | null>(null);
  const [activeTab, setActiveTab] = useState<"certificate" | "reveal">("certificate");

  const names = [
    "Maulana Rizwan Ahmad",
    language === "en" ? "Known as Rizwan" : "Dikenal sebagai Rizwan",
  ];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [typedName, setTypedName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedOrg(null);
      }
    };
    if (selectedOrg) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOrg]);

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

  const organizationExperience: OrgExperienceItem[] = [
    {
      year: "2024 - 2025",
      period: language === "en" ? "October 2024 – October 2025" : "Oktober 2024 – Oktober 2025",
      organization: "PUFA Computer Science",
      organizationFull: "President University Faculty Association of Computer Science",
      position: language === "en" ? "Vice of Art and Sport Division" : "Wakil Divisi Seni dan Olahraga",
      side: "left",
      image: PUFA,
      certificateImage: SertifPUFA,
      certificateType: language === "en" ? "Certificate of Appreciation" : "Sertifikat Penghargaan",
      certificateRecipient: "Maulana Rizwan Ahmad",
      certificateDescription: language === "en"
        ? "In recognition of his dedication and commitment, who has provided a significant contribution as Vice of Art and Sport Division of President University Faculty Association of Computer Science period October 2024 – October 2025."
        : "Sebagai pengakuan atas dedikasi dan komitmen, yang telah memberikan kontribusi signifikan sebagai Wakil Divisi Seni dan Olahraga President University Faculty Association of Computer Science periode Oktober 2024 – Oktober 2025.",
      certificateSigner: "Prof. Dr. Ir. Wiranto Herry Utomo, M.Kom. (Dean of the Faculty of Computer Science)",
    },
    {
      year: language === "en" ? "February 2025" : "Februari 2025",
      period: language === "en" ? "February 2025" : "Februari 2025",
      organization: "PUFA Art and Sport Division Event",
      organizationFull: "Computer Science Sport & Games Olympiad (CSGO) 2025",
      position: language === "en"
        ? "Project Manager at Computer Science Sport & Games Olympiad (CSGO) 2025"
        : "Manajer Proyek di Computer Science Sport & Games Olympiad (CSGO) 2025",
      side: "right",
      image: CSGO2025,
      certificateImage: SertifCSGO2025,
      certificateType: language === "en" ? "Certificate of Appreciation" : "Sertifikat Penghargaan",
      certificateRecipient: "Maulana Rizwan Ahmad",
      certificateDescription: language === "en"
        ? "This Certificate Is Proudly Presented to Maulana Rizwan Ahmad for significant contributions as Project Manager in Computer Science Sport & Games Olympiad (CSGO) 2025."
        : "Sertifikat ini dianugerahkan dengan bangga kepada Maulana Rizwan Ahmad atas kontribusi signifikan sebagai Manajer Proyek pada Computer Science Sport & Games Olympiad (CSGO) 2025.",
      certificateSigner: "Bimasena Yudha Prawira (Chairperson of PUFA Computer Science 2025) & Maulana Rizwan Ahmad",
    },
    {
      year: "2023 - 2024",
      period: language === "en" ? "November 2023 – September 2024" : "November 2023 – September 2024",
      organization: "PUMA Informatics",
      organizationFull: "President University Major Association of Informatics",
      position: language === "en" ? "Vice of Art and Sport Division" : "Wakil Divisi Seni dan Olahraga",
      side: "left",
      image: PUMA,
      certificateImage: SertifPUMA,
      certificateType: language === "en" ? "Certificate of Appreciation" : "Sertifikat Penghargaan",
      certificateRecipient: "Maulana Rizwan Ahmad",
      certificateDescription: language === "en"
        ? "In recognition of dedication and commitment, who has provided a significant contribution as Vice of Art and Sport Division of President University Major Association of Informatics period November 2023 - September 2024."
        : "Sebagai pengakuan atas dedikasi dan komitmen, yang telah memberikan kontribusi signifikan sebagai Wakil Divisi Seni dan Olahraga President University Major Association of Informatics periode November 2023 - September 2024.",
      certificateSigner: "Rosalind, S.Kom., M.Kom (Head of Informatics Study Program)",
      // revealImage: MemberRevealPUMA,
      // revealType: language === "en" ? "Member Reveal" : "Member Reveal",
      // revealDescription: language === "en"
      //   ? "Official Member Reveal of President University Major Association of Informatics (PUMA Informatics) as Vice of Art and Sport Division (VOD) - IT 23."
      //   : "Publikasi Resmi Member Reveal President University Major Association of Informatics (PUMA Informatics) sebagai Wakil Divisi Seni dan Olahraga (VOD) - IT 23.",
    },
    {
      year: language === "en" ? "February 2024" : "Februari 2024",
      period: language === "en" ? "February 2024" : "Februari 2024",
      organization: "PUFA Art and Sport Division Event",
      organizationFull: "Computer Science Sport & Games Olympiad (CSGO) 2024",
      position: language === "en"
        ? "PIC Games (Stumble Guys) at Computer Science Sport & Games Olympiad (CSGO) 2024"
        : "PIC Game (Stumble Guys) di Computer Science Sport & Games Olympiad (CSGO) 2024",
      side: "right",
      image: CSGO2024,
      certificateImage: SertifCSGO2024,
      certificateType: language === "en" ? "Certificate of Committee" : "Sertifikat Kepanitiaan",
      certificateRecipient: "Maulana Rizwan Ahmad",
      certificateDescription: language === "en"
        ? "Awarded to Committee in recognition for hard work and dedication in division Stumble Guys CSGO 2024 PUFA Computing."
        : "Dianugerahkan kepada Panitia sebagai pengakuan atas kerja keras dan dedikasinya pada divisi Stumble Guys CSGO 2024 PUFA Computing.",
      certificateSigner: "Marizky Arfi Legoarto (Project Manager), Aura Shafarina Salsabila (Chairperson), Genta Sahuri S.Kom., M.Kom. (Advisor)",
      // revealImage: CommitteRevealCSGO2024,
      // revealType: language === "en" ? "Committee Reveal" : "Committee Reveal",
      // revealDescription: language === "en"
      //   ? "Official Committee Reveal of Computer Science Sport & Games Olympiad (CSGO) 2024 in division Stumble Guys PUFA Computing - IT 2023."
      //   : "Publikasi Resmi Committee Reveal Computer Science Sport & Games Olympiad (CSGO) 2024 pada divisi Stumble Guys PUFA Computing - IT 2023.",
    },
  ];

  const workExperience = [
    {
      year: language === "en" ? "August 2025 - January 2026" : "Agustus 2025 - Januari 2026",
      company: "PIXIELAB",
      role: language === "en" ? "Fullstack Junior Developer" : "Developer Junior Fullstack",
      description: language === "en"
        ? "Developed a website, game application, tiktok filter, etc."
        : "Mengembangkan situs web, aplikasi game, filter tiktok, dll.",
      side: "left",
      image: PIXIELAB,
    },
    {
      year: language === "en" ? "April 2026 - Present" : "April 2026 - Sekarang",
      company: "ENSEVAL",
      role: language === "en" ? "Web Developer Intern" : "Magang Developer Web",
      description: language === "en"
        ? "Developed and maintained enterprise web applications, implemented REST APIs, optimized database queries, and collaborated with the development team to deliver business solutions."
        : "Mengembangkan dan memelihara aplikasi web korporat, mengimplementasikan API REST, mengoptimalkan kueri basis data, dan berkolaborasi dengan tim pengembangan untuk menghadirkan solusi bisnis.",
      side: "right",
      image: ENSEVAL,
    }
  ];

  const currentDisplayImage =
    activeTab === "reveal" && selectedOrg?.revealImage
      ? selectedOrg.revealImage
      : selectedOrg?.certificateImage;

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
            viewport={{ once: true, amount: 0.05 }}
            className="p-4 sm:p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 mb-8"
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

                  {/* Social Icons */}
                  <div className="flex space-x-6 mt-6 md:mt-8">
                    <a
                      href="https://github.com/GaroxXiz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
                    >
                      <Github size={24} className="text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/maulana-rizwan-ahmad-479bb8438"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
                    >
                      <Linkedin size={24} className="text-white" />
                    </a>
                    <a
                      href="https://api.whatsapp.com/send?phone=+6289530085684&text=Hello,%20Give%20me%20more%20information%20about%20you!"
                      target="_blank"
                      rel="noopener noreferrer"
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
                  <p className="text-white/60 mb-8 max-w-2xl whitespace-pre-line text-left md:text-justify">
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
                      target="_blank"
                      rel="noopener noreferrer"
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
            viewport={{ once: true, amount: 0.05 }}
            className="p-4 sm:p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-2">{t("aboutWhatIDo")}</h3>
            <p className="text-white/80 leading-relaxed text-left md:text-justify">
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
              viewport={{ once: true, amount: 0.05 }}
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
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00d4ff]/0 via-[#00d4ff]/30 to-[#00d4ff]/0 -translate-x-1/2"></div>

            <div className="space-y-12">
              {organizationExperience.map((exp, index) => {
                const isLeft = exp.side.toLowerCase() === "left";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.05 }}
                    className={`relative flex flex-col md:flex-row ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    } items-start w-full group`}
                  >
                    {/* Card container with interactive click to view certificate & reveal photo */}
                    <div className="w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0">
                      <div
                        onClick={() => {
                          setSelectedOrg(exp);
                          setActiveTab("certificate");
                        }}
                        className="p-4 sm:p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#00d4ff]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.22)] flex flex-col sm:flex-row gap-5 items-start cursor-pointer hover:scale-[1.02] active:scale-[0.99] group/card"
                      >
                        {/* Logo container matching reference design */}
                        <div className="flex-shrink-0 w-24 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover/card:scale-105 group-hover/card:border-[#00d4ff]/40 transition-all duration-300">
                          <img
                            src={exp.image}
                            alt={`${exp.organization} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Text */}
                        <div className="flex-grow space-y-2 text-left w-full">
                          <h4 className="text-lg font-bold text-white group-hover/card:text-[#00d4ff] transition-colors duration-300 leading-snug">
                            {exp.position}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-white/75 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                              {exp.organization}
                            </span>
                            <span className="text-white/40 text-xs font-mono">
                              {exp.year}
                            </span>
                          </div>
                          {/* Visual hint for Certificate / Reveal preview */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <div className="flex items-center gap-1.5 text-xs text-[#00d4ff] font-medium opacity-80 group-hover/card:opacity-100 transition-opacity">
                              <Award size={14} className="text-[#00d4ff]" />
                              <span>{t("aboutClickToViewCert")}</span>
                            </div>
                            {exp.revealImage && (
                              <span className="text-white/40 text-xs font-mono">
                                • {exp.revealType}
                              </span>
                            )}
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
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00d4ff]/0 via-[#00d4ff]/30 to-[#00d4ff]/0 -translate-x-1/2"></div>

            <div className="space-y-12">
              {workExperience.map((exp, index) => {
                const isLeft = exp.side === "left";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.05 }}
                    className={`relative flex flex-col md:flex-row ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    } items-start w-full group`}
                  >
                    {/* Card container */}
                    <div className="w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0">
                      <div className="p-4 sm:p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#00d4ff]/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] flex flex-col sm:flex-row gap-5 items-start">
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

      {/* CERTIFICATE & REVEAL DETAIL MODAL */}
      <AnimatePresence>
        {selectedOrg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedOrg(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-3xl bg-[#0b101b] border border-[#00d4ff]/30 rounded-2xl shadow-[0_0_60px_rgba(0,212,255,0.25)] overflow-hidden flex flex-col my-auto max-h-[90vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER: Exactly matched with the card reference design */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-transparent border-b border-white/10 flex items-start justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 flex-grow">
                  {/* Organization Logo */}
                  <div className="flex-shrink-0 w-16 h-14 sm:w-20 sm:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
                    <img
                      src={selectedOrg.image}
                      alt={`${selectedOrg.organization} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Position & Badges */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {selectedOrg.position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-white/80 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                        {selectedOrg.organization}
                      </span>
                      <span className="text-white/50 text-xs font-mono">
                        {selectedOrg.year}
                      </span>
                      <span className="text-[#00d4ff] text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center gap-1">
                        <Award size={12} />
                        {selectedOrg.certificateType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedOrg(null)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* TAB SWITCHER: Available if reveal image is present */}
              {selectedOrg.revealImage && (
                <div className="flex items-center gap-2 p-2 bg-white/[0.03] border-b border-white/10 px-4 sm:px-6">
                  <button
                    onClick={() => setActiveTab("certificate")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      activeTab === "certificate"
                        ? "bg-[#00d4ff] text-black shadow-md shadow-[#00d4ff]/25 font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Award size={15} />
                    <span>{t("aboutModalTabCert")}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("reveal")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      activeTab === "reveal"
                        ? "bg-[#00d4ff] text-black shadow-md shadow-[#00d4ff]/25 font-bold"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Sparkles size={15} />
                    <span>{selectedOrg.revealType || t("aboutModalTabReveal")}</span>
                  </button>
                </div>
              )}

              {/* MODAL BODY */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar">
                {/* Image Preview (Certificate or Reveal) */}
                <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-inner flex items-center justify-center min-h-[220px]">
                  <img
                    src={currentDisplayImage}
                    alt={
                      activeTab === "reveal"
                        ? `${selectedOrg.position} Reveal Photo`
                        : `${selectedOrg.position} Certificate`
                    }
                    className="w-full h-auto max-h-[52vh] object-contain mx-auto transition-all duration-300"
                  />
                </div>

                {/* Meta Details according to active tab */}
                {activeTab === "certificate" ? (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 text-left">
                    {/* Recipient & Period */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                        <User size={16} className="text-[#00d4ff] flex-shrink-0" />
                        <div>
                          <span className="text-white/40 block text-[11px]">{t("aboutModalRecipient")}</span>
                          <span className="font-semibold text-white">{selectedOrg.certificateRecipient}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                        <Calendar size={16} className="text-[#00d4ff] flex-shrink-0" />
                        <div>
                          <span className="text-white/40 block text-[11px]">{t("aboutModalPeriod")}</span>
                          <span className="font-semibold text-white">{selectedOrg.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Description */}
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed italic">
                      "{selectedOrg.certificateDescription}"
                    </p>

                    {/* Certificate Signer / Authority */}
                    <div className="pt-2 flex items-start gap-2 text-xs text-white/50">
                      <CheckCircle2 size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white/70 font-medium">{t("aboutModalSigner")}:</strong> {selectedOrg.certificateSigner}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 text-left">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                        <Sparkles size={16} className="text-[#00d4ff] flex-shrink-0" />
                        <div>
                          <span className="text-white/40 block text-[11px]">Type</span>
                          <span className="font-semibold text-white">{selectedOrg.revealType}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                        <Calendar size={16} className="text-[#00d4ff] flex-shrink-0" />
                        <div>
                          <span className="text-white/40 block text-[11px]">{t("aboutModalPeriod")}</span>
                          <span className="font-semibold text-white">{selectedOrg.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reveal Description */}
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                      {selectedOrg.revealDescription}
                    </p>
                  </div>
                )}
              </div>

              {/* MODAL FOOTER - Single prominent CTA button */}
              <div className="p-4 sm:p-5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href={currentDisplayImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]"
                >
                  <ExternalLink size={16} />
                  <span>
                    {activeTab === "reveal"
                      ? t("aboutModalViewReveal")
                      : t("aboutModalViewOriginal")}
                  </span>
                </a>

                <button
                  onClick={() => setSelectedOrg(null)}
                  className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all duration-300"
                >
                  {t("aboutModalClose")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
