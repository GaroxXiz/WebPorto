"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type LanguageGreeting = {
  lang: string;
  greeting: string;
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
  const [hasAnimated, setHasAnimated] = useState(false); // 👈 track animasi

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasFadedIn(false); // reset fade saat masuk kembali ke view
      setHasAnimated(true); // animasi sudah diputar
    }

    if (!isInView && hasAnimated) {
      setHasAnimated(false); // reset status ketika keluar view
      setDisplayText(""); // reset teks saat keluar
      setCharIndex(0); // reset typing
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
        lang: "English",
        greeting: determineGreeting(
          "Good Morning",
          "Good Afternoon",
          "Good Evening",
          "Good Night"
        ),
      },
      {
        lang: "日本語",
        greeting: determineGreeting(
          "おはようございます",
          "こんにちは",
          "こんばんは",
          "おやすみなさい"
        ),
      },
      {
        lang: "中文",
        greeting: determineGreeting("早上好", "中午好", "下午好", "晚上好"),
      },
      {
        lang: "Русский",
        greeting: determineGreeting(
          "Доброе Утро",
          "Добрый День",
          "Добрый Вечер",
          "Спокойной Ночи"
        ),
      },
    ];

    setGreetings(greetingList);
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
            setHasFadedIn(true); // fade-in hanya sekali
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background Blur */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-[#0066ff]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Konten Utama */}
      <motion.div
        key={isInView ? "visible" : "hidden"} // 👉 memicu re-render tiap kali muncul
        className="z-10 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white">
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

        <p className="text-white/80 mb-15 text-lg md:text-xl">
          Welcome to my portfolio website
        </p>

        {/* Button untuk navigasi ke bagian About */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#about"
            className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            See More Details
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
