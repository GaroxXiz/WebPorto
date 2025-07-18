import { Github, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 backdrop-blur-lg bg-white/5 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold text-white mb-2">
              <span className="text-[#00d4ff]">{"<"}</span>
              RizwanDev
              <span className="text-[#00d4ff]">{"/>"}</span>
            </div>
            <p className="text-white/60 text-sm">
              Crafting immersive game experiences with passion and precision.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/GaroxXiz"
              className="p-2 text-white/60 hover:text-[#00d4ff] transition-colors duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/maulana-rizwan-ahmad-8a831728b"
              className="p-2 text-white/60 hover:text-[#00d4ff] transition-colors duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=+6289530085684&text=Hello, Give me more information about you!"
              className="p-2 text-white/60 hover:text-[#00d4ff] transition-colors duration-300"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm flex items-center justify-center gap-2">
            &#169; Maulana Rizwan Ahmad. All rigths reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
