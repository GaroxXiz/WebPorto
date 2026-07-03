import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations["en"]) => string;
}

const translations = {
  en: {
    // Navbar
    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",

    // Hero
    heroWelcome: "Welcome to my portfolio website",
    heroBtn: "See More Details",

    // About
    aboutTitle: "About",
    aboutMe: "Me",
    aboutJourneyTitle: "Hi, I'm",
    aboutJourneySubtitle: "Game Developer & Fullstack Developer",
    aboutJourneyDesc: "I’m Maulana Rizwan Ahmad, a highly motivated Informatics student at President University with a concentration in Game Development, based in Bekasi. I have around one year of experience building interactive and meaningful digital products, ranging from 2D games to web-based applications. I’m passionate about creating immersive experiences and scalable systems using technologies such as Unity, Blender, Aseprite, JavaScript, Node.js, and PostgreSQL. My core strength lies in 2D game development, where I combine engaging gameplay mechanics, pixel art, and clean, maintainable code. In addition, I have experience in full-stack web development, including designing responsive front-end interfaces, building back-end APIs, managing databases, and integrating systems into complete, production-ready applications. This combination allows me to approach projects holistically from gameplay and visual design to architecture and deployment. Whether developing an immersive RPG, an educational game, or a functional web platform, I focus on turning creative ideas into polished and impactful products. I’m currently seeking an opportunity where I can contribute both my game development expertise and full-stack engineering skills within a professional development environment.",
    aboutJourneyGPA: "GPA",
    aboutJourneyProjects: "Projects",
    aboutJourneyExp: "Experience (Years)",
    aboutBtnProjects: "View Projects",
    aboutBtnCV: "Download CV",
    aboutWhatIDo: "What I Do",
    aboutWhatIDoDesc: "From concept to deployment, I build engaging and scalable digital products across desktop, mobile, and web platforms ranging from interactive games to full-stack web applications. I collaborate with indie teams and small studios to bring creative ideas into production using modern game engines, structured back-end systems, and clean front-end architecture. My work spans gameplay programming, pixel-art implementation, API integration, and database design, allowing me to handle both the creative and technical sides of development. Whether it’s an immersive RPG, an educational experience, or a functional web platform, I focus on delivering products that are technically solid, maintainable, and meaningful for users.",
    aboutServiceGameDev: "Game Development",
    aboutServiceGameDevDesc: "Designing and developing 2D games with engaging mechanics and polished gameplay",
    aboutServiceLevelDesign: "Level Design",
    aboutServiceLevelDesignDesc: "Crafting immersive game environments and balanced level progression",
    aboutServicePixelArt: "Pixel Art & Animation",
    aboutServicePixelArtDesc: "Creating original pixel-based assets and frame-by-frame character animations",
    aboutServiceGameplayProg: "Gameplay Programming",
    aboutServiceGameplayProgDesc: "Implementing core systems like movement, combat, and interaction using C# in Unity",
    aboutExpTitle: "Experience",
    aboutWorkExpTitle: "Work Experience",

    // Skills
    skillsTitle: "My",
    skillsSpan: "Skills",
    skillsSubtitle: "Technologies and tools I use to bring ideas to life",
    skillsTech: "Technical Skills",
    skillsTools: "Tools",
    skillsSoft: "Soft Skills",

    // Projects
    projectsTitle: "My",
    projectsSpan: "Projects",
    projectsSubtitle: "Here are some of my recent projects that showcase my skills and creativity",
    projectsInDevelopment: "In Development",
    projectsComingSoon: "Coming Soon",
    projectsOpenWebsite: "Open Website",
    projectsDownload: "Download",
    projectAbyssWalkerDesc: "Full-stack created 2D Pixel Games with aseprite and unity using C#",
    projectAnomalyChaseDesc: "Created the Game Character, Game mechanics and Debugging the codes",
    projectRaturuDesc: "Created a 3D low poly design for the Game Environment, Game Icon, and thumbnail",
    projectMalwareDesc: "Created the Game mechanics for the last level(Malware Attack), Debugging the last level(Malware Attack) for the WebGL Games.",
    projectKahfDesc: "Create the front-end design and the logic of the website, Created the database, Integrated the website with the backend using API, Debugging the website for the final release",
    projectGarionxDesc: "Developed a multi-agent AI chat platform with custom agent creation, dynamic LLM routing, and AI-powered multimedia tools.",
    projectJapaneseDesc: "Designed the 2D Pixel Character, Animation, and Environment games",
    projectVnDesc: "Designed The 2D Pixel for Game Character and Environment, Created the Game Mechanics using python",

    // Contact
    contactTitle: "Contact",
    contactSpan: "Me",
    contactSubtitle: "Let's work together to bring your ideas to life",
    contactConnect: "Let's Connect",
    contactPhone: "Phone",
    contactLocation: "Location",
    contactBekasi: "Bekasi, Indonesia",
    contactNameLabel: "Name",
    contactNamePlaceholder: "Your name",
    contactEmailLabel: "Email",
    contactEmailPlaceholder: "Your Email",
    contactMessageLabel: "Message",
    contactMessagePlaceholder: "Your message...",
    contactBtnSend: "Send Message",
    contactBtnSending: "Sending...",
    contactBtnSuccess: "Message Sent!",
    contactBtnError: "Failed! Try Again",
    contactEmailError: "Please enter a valid email address (e.g., name@example.com).",

    // Footer
    footerCrafting: "Crafting immersive game experiences with passion and precision.",
    footerReserved: "Maulana Rizwan Ahmad. All rights reserved",
  },
  id: {
    // Navbar
    navHome: "Beranda",
    navAbout: "Tentang Saya",
    navSkills: "Keahlian",
    navProjects: "Proyek",
    navContact: "Kontak",

    // Hero
    heroWelcome: "Selamat datang di situs web portofolio saya",
    heroBtn: "Lihat Detail Selengkapnya",

    // About
    aboutTitle: "Tentang",
    aboutMe: "Saya",
    aboutJourneyTitle: "Halo, saya",
    aboutJourneySubtitle: "Developer Game & Developer Fullstack",
    aboutJourneyDesc: "Saya Maulana Rizwan Ahmad, seorang mahasiswa Informatika yang sangat termotivasi di President University dengan konsentrasi pada Pengembangan Game, berbasis di Bekasi. Saya memiliki sekitar satu tahun pengalaman dalam membangun produk digital yang interaktif dan bermakna, mulai dari game 2D hingga aplikasi berbasis web. Saya bersemangat untuk menciptakan pengalaman mendalam dan sistem yang terukur menggunakan teknologi seperti Unity, Blender, Aseprite, JavaScript, Node.js, dan PostgreSQL. Kekuatan utama saya terletak pada pengembangan game 2D, di mana saya menggabungkan mekanika gameplay yang menarik, seni piksel, serta kode yang bersih dan mudah dirawat. Selain itu, saya memiliki pengalaman dalam pengembangan web full-stack, termasuk merancang antarmuka front-end yang responsif, membangun API back-end, mengelola basis data, dan mengintegrasikan sistem menjadi aplikasi lengkap yang siap produksi. Kombinasi ini memungkinkan saya untuk mendekati proyek secara holistik mulai dari gameplay dan desain visual hingga arsitektur dan deployment. Baik dalam mengembangkan RPG yang imersif, game edukatif, atau platform web yang fungsional, saya fokus untuk mengubah ide kreatif menjadi produk yang terpoles dan berdampak. Saat ini saya sedang mencari peluang di mana saya dapat berkontribusi dengan keahlian pengembangan game dan keterampilan rekayasa full-stack saya di lingkungan pengembangan profesional.",
    aboutJourneyGPA: "IPK",
    aboutJourneyProjects: "Proyek",
    aboutJourneyExp: "Pengalaman (Tahun)",
    aboutBtnProjects: "Lihat Proyek",
    aboutBtnCV: "Unduh CV",
    aboutWhatIDo: "Apa Yang Saya Lakukan",
    aboutWhatIDoDesc: "Dari konsep hingga deployment, saya membangun produk digital yang menarik dan terukur di seluruh platform desktop, seluler, dan web mulai dari game interaktif hingga aplikasi web full-stack. Saya berkolaborasi dengan tim indie dan studio kecil untuk mewujudkan ide-ide kreatif ke dalam produksi menggunakan mesin game modern, sistem back-end terstruktur, dan arsitektur front-end yang bersih. Pekerjaan saya mencakup pemrograman gameplay, implementasi seni piksel, integrasi API, dan desain basis data, yang memungkinkan saya menangani sisi kreatif sekaligus teknis dari pengembangan. Baik itu RPG yang mendalam, pengalaman pendidikan, atau platform web fungsional, saya fokus untuk menghadirkan produk yang solid secara teknis, mudah dirawat, dan bermakna bagi pengguna.",
    aboutServiceGameDev: "Pengembangan Game",
    aboutServiceGameDevDesc: "Merancang dan mengembangkan game 2D dengan mekanika yang menarik dan gameplay yang terpoles",
    aboutServiceLevelDesign: "Desain Level",
    aboutServiceLevelDesignDesc: "Membuat lingkungan game yang imersif dan progresi level yang seimbang",
    aboutServicePixelArt: "Seni Piksel & Animasi",
    aboutServicePixelArtDesc: "Membuat aset berbasis piksel asli dan animasi karakter bingkai-demi-bingkai",
    aboutServiceGameplayProg: "Pemrograman Gameplay",
    aboutServiceGameplayProgDesc: "Mengimplementasikan sistem inti seperti pergerakan, pertempuran, dan interaksi menggunakan C# di Unity",
    aboutExpTitle: "Pengalaman Organisasi",
    aboutWorkExpTitle: "Pengalaman Kerja",

    // Skills
    skillsTitle: "Keahlian",
    skillsSpan: "Saya",
    skillsSubtitle: "Teknologi dan alat yang saya gunakan untuk mewujudkan ide menjadi nyata",
    skillsTech: "Keahlian Teknis",
    skillsTools: "Peralatan",
    skillsSoft: "Soft Skill",

    // Projects
    projectsTitle: "Proyek",
    projectsSpan: "Saya",
    projectsSubtitle: "Berikut adalah beberapa proyek terbaru saya yang menunjukkan keahlian dan kreativitas saya",
    projectsInDevelopment: "Dalam Pengembangan",
    projectsComingSoon: "Segera Hadir",
    projectsOpenWebsite: "Buka Situs Web",
    projectsDownload: "Unduh",
    projectAbyssWalkerDesc: "Membuat game piksel 2D full-stack dengan Aseprite dan Unity menggunakan C#",
    projectAnomalyChaseDesc: "Membuat karakter game, mekanika game, dan men-debug kode",
    projectRaturuDesc: "Membuat desain low poly 3D untuk lingkungan game, ikon game, dan thumbnail",
    projectMalwareDesc: "Membuat mekanika game untuk level terakhir (Malware Attack) serta men-debug level terakhir tersebut untuk WebGL Games.",
    projectKahfDesc: "Membuat desain front-end dan logika situs web, membuat basis data, mengintegrasikan situs web dengan back-end menggunakan API, serta men-debug situs web untuk rilis final",
    projectGarionxDesc: "Mengembangkan platform obrolan AI multi-agen dengan pembuatan agen kustom, perutean LLM dinamis, dan alat multimedia bertenaga AI.",
    projectJapaneseDesc: "Merancang karakter piksel 2D, animasi, dan game lingkungan",
    projectVnDesc: "Merancang piksel 2D untuk karakter dan lingkungan game, serta membuat mekanika game menggunakan Python",

    // Contact
    contactTitle: "Hubungi",
    contactSpan: "Saya",
    contactSubtitle: "Mari bekerja sama untuk mewujudkan ide-ide Anda menjadi nyata",
    contactConnect: "Mari Terhubung",
    contactPhone: "Telepon",
    contactLocation: "Lokasi",
    contactBekasi: "Bekasi, Indonesia",
    contactNameLabel: "Nama",
    contactNamePlaceholder: "Nama Anda",
    contactEmailLabel: "Email",
    contactEmailPlaceholder: "Email Anda",
    contactMessageLabel: "Pesan",
    contactMessagePlaceholder: "Pesan Anda...",
    contactBtnSend: "Kirim Pesan",
    contactBtnSending: "Mengirim...",
    contactBtnSuccess: "Pesan Terkirim!",
    contactBtnError: "Gagal! Coba Lagi",
    contactEmailError: "Silakan masukkan alamat email yang valid (contoh: nama@example.com).",

    // Footer
    footerCrafting: "Membuat pengalaman game yang imersif dengan dedikasi dan presisi.",
    footerReserved: "Maulana Rizwan Ahmad. Hak Cipta Dilindungi",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang === "en" || savedLang === "id") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  const t = (key: keyof typeof translations["en"]): string => {
    return translations[language][key] || translations["en"][key] || "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
