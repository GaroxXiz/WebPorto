import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

// List of inappropriate words (Indonesian & English)
const BAD_WORDS = [
  // Indonesian
  "anjing", "anjrit", "anjir", "babi", "bangsat", "kontol", "memek", "pantek", 
  "pukimak", "goblok", "tolol", "bajingan", "bego", "pepek", "ngentot", "itil", 
  "kampret", "asu", "jancok", "jembut", "titit", "peler", "lonte", "kimak", "bgst", "kntl",
  // English
  "fuck", "fucking", "shit", "bitch", "asshole", "cunt", "bastard", "dick", 
  "pussy", "nigger", "motherfucker", "whore", "slut", "cock", "prick", "retard"
];

// Helper to check if text contains bad words (including leetspeak evasions)
const hasProfanity = (text: string): boolean => {
  if (!text) return false;
  
  // Normalize leetspeak & special characters
  const normalized = text
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/@/g, "a")
    .replace(/\$/g, "s")
    .replace(/[^a-z0-9\s]/g, " ");

  const words = normalized.split(/\s+/);
  return BAD_WORDS.some((badWord) => {
    return words.some((word) => word === badWord) || normalized.includes(badWord);
  });
};

const Contact = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [botWebsite, setBotWebsite] = useState(""); // Honeypot field for anti-spam
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setFormError("");
    setEmailError("");

    // 1. Honeypot check (Anti-spam bot trap)
    if (botWebsite.trim() !== "") {
      // Fake successful submit for bots so they don't retry
      setSubmissionStatus("sending");
      setTimeout(() => {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmissionStatus("idle"), 4000);
      }, 1000);
      return;
    }

    // 2. Cooldown check (Anti-spam rate limit: max 1 email per 45s)
    const lastSubmitTime = localStorage.getItem("last_contact_submit");
    if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime, 10) < 45000) {
      setFormError(t("contactSpamCooldownError"));
      return;
    }

    // 3. Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError(t("contactEmailError"));
      return;
    }

    // 4. Message length check
    if (formData.message.trim().length < 10) {
      setFormError(t("contactMessageTooShort"));
      return;
    }

    // 5. Profanity filter check (Name & Message)
    if (hasProfanity(formData.name) || hasProfanity(formData.message)) {
      setFormError(t("contactProfanityError"));
      return;
    }

    setSubmissionStatus("sending");

    emailjs
      .sendForm(
        "service_7jny6tq",
        "template_u5odr7y",
        form.current,
        "s3M7TdqeFLQYzazeX"
      )
      .then(
        () => {
          localStorage.setItem("last_contact_submit", Date.now().toString());
          setSubmissionStatus("success");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setSubmissionStatus("idle"), 4000);
        },
        () => {
          setSubmissionStatus("error");
          setTimeout(() => setSubmissionStatus("idle"), 4000);
        }
      );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormError("");

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value === "" || emailRegex.test(value)) {
        setEmailError("");
      }
    }
  };

  const getButtonContent = () => {
    switch (submissionStatus) {
      case "sending":
        return (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            {t("contactBtnSending")}
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle size={20} />
            {t("contactBtnSuccess")}
          </>
        );
      case "error":
        return (
          <>
            <AlertCircle size={20} />
            {t("contactBtnError")}
          </>
        );
      default:
        return (
          <>
            <Send size={20} />
            {t("contactBtnSend")}
          </>
        );
    }
  };

  const getButtonClassName = () => {
    const baseClasses =
      "w-full px-8 py-3 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer";
    if (submissionStatus === "success") {
      return `${baseClasses} bg-green-500 hover:shadow-green-500/25`;
    }
    if (submissionStatus === "error") {
      return `${baseClasses} bg-red-500 hover:shadow-red-500/25`;
    }
    return `${baseClasses} bg-gradient-to-r from-[#00d4ff] to-[#0066ff] hover:shadow-[#00d4ff]/25 hover:scale-105`;
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("contactTitle")} <span className="text-[#00d4ff]">{t("contactSpan")}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t("contactSubtitle")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
          className="p-8 rounded-2xl backdrop-blur-lg bg-white/0 border border-white/0 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side: Contact Info */}
            <div className="space-y-8">
              <div className="max-w-lg ml-auto p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {t("contactConnect")}
                </h3>
                <div className="space-y-4">
                  {/* Email Item -> Open Gmail compose in new tab */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=maulanarizwan84@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="p-3 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00d4ff] group-hover:text-black">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t("contactEmailLabel")}</p>
                      <p className="text-white group-hover:text-[#00d4ff] transition-colors duration-300 font-medium">
                        maulanarizwan84@gmail.com
                      </p>
                    </div>
                  </a>

                  {/* Phone Item -> Open WhatsApp in new tab */}
                  <a
                    href="https://api.whatsapp.com/send?phone=+6289530085684&text=Hello%20Rizwan,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="p-3 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00d4ff] group-hover:text-black">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t("contactPhone")}</p>
                      <p className="text-white group-hover:text-[#00d4ff] transition-colors duration-300 font-medium">
                        +62 895-3008-5684
                      </p>
                    </div>
                  </a>

                  {/* Location Item -> Open Google Maps in new tab */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Bekasi,+Indonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="p-3 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00d4ff] group-hover:text-black">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t("contactLocation")}</p>
                      <p className="text-white group-hover:text-[#00d4ff] transition-colors duration-300 font-medium">
                        {t("contactBekasi")}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="max-w-lg p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot hidden input for anti-spam bots */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="bot_website"
                    tabIndex={-1}
                    value={botWebsite}
                    onChange={(e) => setBotWebsite(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-white/80 mb-2 text-sm"
                  >
                    {t("contactNameLabel")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/20 transition-all duration-300"
                    placeholder={t("contactNamePlaceholder")}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/80 mb-2 text-sm"
                  >
                    {t("contactEmailLabel")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      emailError
                        ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-white/20 focus:border-[#00d4ff]/50"
                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition-all duration-300`}
                    placeholder={t("contactEmailPlaceholder")}
                    required
                  />
                  {emailError && (
                    <p className="mt-2 text-xs text-red-400 font-medium flex items-center gap-1.5">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      {emailError}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white/80 mb-2 text-sm"
                  >
                    {t("contactMessageLabel")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/20 transition-all duration-300 resize-none"
                    placeholder={t("contactMessagePlaceholder")}
                    required
                  />
                </div>

                {/* Validation & Anti-Spam / Profanity Error Alert */}
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <ShieldAlert size={18} className="flex-shrink-0 text-red-400" />
                    <span>{formError}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className={getButtonClassName()}
                  disabled={submissionStatus === "sending"}
                >
                  {getButtonContent()}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
