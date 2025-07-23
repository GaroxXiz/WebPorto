import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const form = useRef<HTMLFormElement>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getButtonContent = () => {
    switch (submissionStatus) {
      case "sending":
        return (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            Sending...
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle size={20} />
            Message Sent!
          </>
        );
      case "error":
        return (
          <>
            <AlertCircle size={20} />
            Failed! Try Again
          </>
        );
      default:
        return (
          <>
            <Send size={20} />
            Send Message
          </>
        );
    }
  };

  const getButtonClassName = () => {
    let baseClasses =
      "w-full px-8 py-3 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2";
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
            Contact <span className="text-[#00d4ff]">Me</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life
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
                  Let's Connect
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] transition-all duration-300 hover:scale-110">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="text-white">maulanarizwan84@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] transition-all duration-300 hover:scale-110">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Phone</p>
                      <p className="text-white">+62 895-3008-5684</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] transition-all duration-300 hover:scale-110">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Location</p>
                      <p className="text-white">Bekasi, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Side: Contact Form */}
            <div className="max-w-lg p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white/80 mb-2 text-sm"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/20 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/80 mb-2 text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/20 transition-all duration-300"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white/80 mb-2 text-sm"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/20 transition-all duration-300 resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

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
