"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import greetingsData from "../../src/data/greetings.json";

type LanguageGreeting = {
  lang: string;
  greeting: string;
};

type GreetingData = {
  lang: string;
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
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
    const hour = new Date().getHours();

    const determineGreeting = (g: GreetingData): string => {
      if (hour >= 4 && hour < 10) return g.morning;
      if (hour >= 10 && hour < 15) return g.afternoon;
      if (hour >= 15 && hour < 18) return g.evening;
      return g.night;
    };

    const greetingList: LanguageGreeting[] = greetingsData.map(
      (g: GreetingData) => ({
        lang: g.lang,
        greeting: determineGreeting(g),
      }),
    );

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
      {/* VIDEO BACKGROUND */}
      <video
        src="/WebPorto/video/Background.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full z-[-1]"
      ></video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 z-[-1]" />

      {/* Background Blur */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-[#0066ff]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        key={isInView ? "visible" : "hidden"}
        className="z-10 text-center w-full max-w-xl"
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

        <p className="text-white/80 mb-10 text-lg md:text-xl">
          Welcome to my portfolio website
        </p>

        <div className="flex justify-center">
          <motion.a
            href="#about"
            className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
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
