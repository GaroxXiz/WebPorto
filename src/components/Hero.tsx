import { Github, Linkedin, MessageCircle, Download } from "lucide-react";
import profileImg from "/img/Profile.png";
import CV from "/pdf/CV Rizwan.pdf";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#00d4ff]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0066ff]/20 rounded-full blur-3xl animate-float animate-delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-rotate-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center animate-fadeInUp">
          <div className="inline-block p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl animate-scaleIn animate-delay-200">
            {/* Profile Photo */}
            <div className="mb-8 flex justify-center animate-fadeInUp animate-delay-300">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#00d4ff]/30 shadow-lg shadow-[#00d4ff]/25 hover:scale-110 transition-transform duration-300">
                  <img
                    src={profileImg}
                    alt="Maulana Rizwan Ahmad"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center animate-bounce-slow">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Hi, I'm{" "}
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-[#00d4ff] glow-text">
              Maulana Rizwan Ahmad
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-6">
              Game Developer
            </p>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              A highly motivated Informatics student at President University
              with a concentration in Game Development. Passionate about
              creating immersive games using Unity, Blender, Aseprite. Looking
              for an opportunity to apply my technical and creative skills in a
              professional game development environment.
            </p>

            <div className="flex justify-center space-x-6 mb-8 animate-fadeInUp animate-delay-700">
              <a
                href="https://github.com/GaroxXiz"
                className="p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <Github size={24} className="text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/maulana-rizwan-ahmad-8a831728b"
                className="p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:rotate-12 animate-delay-100"
              >
                <Linkedin size={24} className="text-white" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=+6289530085684&text=Hello, Give me more information about you!"
                className="p-3 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:rotate-12 animate-delay-200"
              >
                <MessageCircle size={24} className="text-white" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animate-delay-800">
              <a
                href="#projects"
                className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                View Projects
              </a>
              <a
                href={CV}
                className="px-8 py-3 backdrop-blur-lg bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
              >
                <Download size={20} className="animate-bounce-slow" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
