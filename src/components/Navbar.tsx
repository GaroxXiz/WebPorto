import React from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10 animate-slideDown">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white hover:scale-110 transition-transform duration-300 animate-fadeInLeft">
            <span className="text-[#00d4ff]">{"<"}</span>
            RizwanDev
            <span className="text-[#00d4ff]">{"/>"}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 animate-fadeInRight">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                className={`text-white/80 hover:text-[#00d4ff] transition-all duration-300 hover:glow-text hover:scale-110 hover:-translate-y-1 animate-fadeInUp animate-delay-${
                  (index + 1) * 100
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[#00d4ff] transition-all duration-300 hover:scale-110 hover:rotate-180"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 animate-slideDown">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                className={`block text-white/80 hover:text-[#00d4ff] transition-all duration-300 hover:translate-x-2 animate-fadeInLeft animate-delay-${
                  (index + 1) * 100
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
