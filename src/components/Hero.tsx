"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type LanguageGreeting = {
  lang: string;
  greeting: string;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Hero = () => {
  const [greetings, setGreetings] = useState<LanguageGreeting[]>([]);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasFadedIn, setHasFadedIn] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasFadedIn(false);
      setHasAnimated(true);
    }

    if (!isInView && hasAnimated) {
      setHasAnimated(false);
      setDisplayText("");
      setCharIndex(0);
      setIndex(0);
      setIsDeleting(false);
    }
  }, [isInView]);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    const determineGreeting = (
      morning: string,
      afternoon: string,
      evening: string,
      night: string
    ): string => {
      if (hour >= 4 && hour < 10) return morning;
      else if (hour >= 10 && hour < 15) return afternoon;
      else if (hour >= 15 && hour < 18) return evening;
      else return night;
    };

    const greetingList: LanguageGreeting[] = [
      {
        lang: "Indonesia",
        greeting: determineGreeting(
          "Selamat Pagi",
          "Selamat Siang",
          "Selamat Sore",
          "Selamat Malam"
        ),
      },
      {
        lang: "Inggris",
        greeting: determineGreeting(
          "Good Morning",
          "Good Afternoon",
          "Good Evening",
          "Good Night"
        ),
      },
      {
        lang: "Jepang",
        greeting: determineGreeting(
          "おはようございます",
          "こんにちは",
          "こんばんは",
          "おやすみなさい"
        ),
      },
      {
        lang: "China(Mandarin)",
        greeting: determineGreeting("早上好", "中午好", "下午好", "晚上好"),
      },
      {
        lang: "Russia",
        greeting: determineGreeting(
          "Доброе утро",
          "Добрый день",
          "Добрый вечер",
          "Спокойной ночи"
        ),
      },
      {
        lang: "Francis",
        greeting: determineGreeting(
          "Bonjour",
          "Bon après-midi",
          "Bonsoir",
          "Bonne nuit"
        ),
      },
      {
        lang: "Spanyol",
        greeting: determineGreeting(
          "Buenos días",
          "Buenas tardes",
          "Buenas tardes",
          "Buenas noches"
        ),
      },
      {
        lang: "Jerman",
        greeting: determineGreeting(
          "Guten Morgen",
          "Guten Tag",
          "Guten Abend",
          "Gute Nacht"
        ),
      },
      {
        lang: "Portugal",
        greeting: determineGreeting(
          "Bom dia",
          "Boa tarde",
          "Boa tarde",
          "Boa noite"
        ),
      },
      {
        lang: "Korea",
        greeting: determineGreeting(
          "좋은 아침",
          "안녕하세요",
          "좋은 저녁",
          "안녕히 주무세요"
        ),
      },
      {
        lang: "Italia",
        greeting: determineGreeting(
          "Buongiorno",
          "Buon pomeriggio",
          "Buonasera",
          "Buonanotte"
        ),
      },
      {
        lang: "Arab",
        greeting: determineGreeting(
          "صباح الخير",
          "مساء الخير",
          "مساء الخير",
          "تصبح على خير"
        ),
      },
      {
        lang: "India",
        greeting: determineGreeting(
          "सुप्रभात",
          "नमस्ते",
          "शुभ संध्या",
          "शुभ रात्रि"
        ),
      },
      {
        lang: "Thailand",
        greeting: determineGreeting(
          "สวัสดีตอนเช้า",
          "สวัสดีตอนบ่าย",
          "สวัสดีตอนเย็น",
          "ราตรีสวัสดิ์"
        ),
      },
      {
        lang: "Turki",
        greeting: determineGreeting(
          "Günaydın",
          "Tünaydın",
          "İyi akşamlar",
          "İyi geceler"
        ),
      },
      {
        lang: "Bangladesh",
        greeting: determineGreeting(
          "সুপ্রভাত",
          "শুভ দুপুর",
          "শুভ সন্ধ্যা",
          "শুভ রাত্রি"
        ),
      },
      {
        lang: "Laos",
        greeting: determineGreeting(
          "ສະບາຍດີເຊົ້າ",
          "ສະບາຍດີຕອນແລງ",
          "ສະບາຍດີແລງ",
          "ນອນຫຼັບຝັນດີ"
        ),
      },
      {
        lang: "Belanda",
        greeting: determineGreeting(
          "Goedemorgen",
          "Goedemiddag",
          "Goedenavond",
          "Goedenacht"
        ),
      },
      {
        lang: "Polandia",
        greeting: determineGreeting(
          "Dzień dobry",
          "Dzień dobry",
          "Dobry wieczór",
          "Dobranoc"
        ),
      },
      {
        lang: "Yunani",
        greeting: determineGreeting(
          "Καλημέρα",
          "Καλό απόγευμα",
          "Καλησπέρα",
          "Καληνύχτα"
        ),
      },
      {
        lang: "Swedia",
        greeting: determineGreeting(
          "God morgon",
          "God dag",
          "God kväll",
          "God natt"
        ),
      },
      {
        lang: "Ukraina",
        greeting: determineGreeting(
          "Доброго ранку",
          "Доброго дня",
          "Доброго вечора",
          "На добраніч"
        ),
      },
      {
        lang: "Filipina",
        greeting: determineGreeting(
          "Magandang Umaga",
          "Magandang Tanghali",
          "Magandang Gabi",
          "Magandang Gabi"
        ),
      },
      {
        lang: "Myanmar",
        greeting: determineGreeting(
          "မင်္ဂလာနံနက်ခင်းပါ",
          "မင်္ဂလာနေ့လယ်ခင်းပါ",
          "မင်္ဂလာညနေခင်းပါ",
          "ကောင်းသောညပါ"
        ),
      },
      {
        lang: "Vietnam",
        greeting: determineGreeting(
          "Chào buổi sáng",
          "Chào buổi trưa",
          "Chào buổi chiều",
          "Chúc ngủ ngon"
        ),
      },
    ];

    const englishGreeting = greetingList.find((g) => g.lang === "Inggris")!;
    const otherGreetings = greetingList.filter((g) => g.lang !== "Inggris");

    setGreetings([englishGreeting, ...shuffleArray(otherGreetings)]);
  }, []);

  useEffect(() => {
    if (!isInView || greetings.length === 0) return;

    const currentGreeting = greetings[index].greeting + "!";

    const typingSpeed = isDeleting ? 60 : 120;
    const timeout = setTimeout(() => {
      setDisplayText(currentGreeting.slice(0, charIndex));

      if (!isDeleting) {
        if (charIndex < currentGreeting.length) {
          setCharIndex((prev) => prev + 1);
          if (charIndex === 1 && !hasFadedIn) {
            setHasFadedIn(true);
          }
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % greetings.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, greetings, index, hasFadedIn, isInView]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-16 sm:py-20"
    >
      {/* Background Blur */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-48 h-48 sm:w-72 sm:h-72 bg-[#00d4ff]/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-[60%] right-[10%] w-64 h-64 sm:w-96 sm:h-96 bg-[#0066ff]/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-52 h-52 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      {/* Konten Utama */}
      <motion.div
        key={isInView ? "visible" : "hidden"}
        className="z-10 text-center w-full max-w-xs sm:max-w-md md:max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 text-white">
          <span
            className={`inline-block ${
              !hasFadedIn && displayText !== ""
                ? "opacity-0 animate-fade-in"
                : ""
            }`}
          >
            {displayText}
          </span>
          <span className="animate-pulse">|</span>
        </h1>

        <p className="text-white/80 mb-10 text-base sm:text-lg md:text-xl">
          Welcome to my portfolio website
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="#about"
            className="w-full sm:w-auto text-center flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 2,
            }}
          >
            See More Details
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
