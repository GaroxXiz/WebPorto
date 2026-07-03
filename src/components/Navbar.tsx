import React from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t("navHome"), id: "Home" },
    { name: t("navAbout"), id: "About" },
    { name: t("navSkills"), id: "Skills" },
    { name: t("navProjects"), id: "Projects" },
    { name: t("navContact"), id: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <span className="text-[#00d4ff]">{"<"}</span>
            RizwanDev
            <span className="text-[#00d4ff]">{"/>"}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.id === "Home" ? "#" : `#${item.id.toLowerCase()}`}
                  className="text-white/80 hover:text-[#00d4ff] transition-all duration-300 hover:glow-text"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-full p-1 text-[10px] font-bold">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 ${
                  language === "en"
                    ? "bg-[#00d4ff] text-black shadow-md shadow-[#00d4ff]/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("id")}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 ${
                  language === "id"
                    ? "bg-[#00d4ff] text-black shadow-md shadow-[#00d4ff]/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                ID
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 border-t border-white/5 pt-4 flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.id === "Home" ? "#" : `#${item.id.toLowerCase()}`}
                className="block text-white/80 hover:text-[#00d4ff] transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-full p-1 text-[10px] font-bold w-fit mt-2">
              <button
                onClick={() => {
                  setLanguage("en");
                  setIsOpen(false);
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  language === "en"
                    ? "bg-[#00d4ff] text-black shadow-md shadow-[#00d4ff]/20"
                    : "text-white/60"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  setLanguage("id");
                  setIsOpen(false);
                }}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  language === "id"
                    ? "bg-[#00d4ff] text-black shadow-md shadow-[#00d4ff]/20"
                    : "text-white/60"
                }`}
              >
                ID
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
