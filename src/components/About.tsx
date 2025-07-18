import { Gamepad2, Layers, Paintbrush, Settings2 } from "lucide-react";

const About = () => {
  const services = [
    {
      icon: <Gamepad2 size={32} />,
      title: "Game Development",
      description:
        "Designing and developing 2D games with engaging mechanics and polished gameplay",
    },
    {
      icon: <Layers size={32} />,
      title: "Level Design",
      description:
        "Crafting immersive game environments and balanced level progression",
    },
    {
      icon: <Paintbrush size={32} />,
      title: "Pixel Art & Animation",
      description:
        "Creating original pixel-based assets and frame-by-frame character animations",
    },
    {
      icon: <Settings2 size={32} />,
      title: "Gameplay Programming",
      description:
        "Implementing core systems like movement, combat, and interaction using C# in Unity",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animate-delay-200">
            About <span className="text-[#00d4ff]">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fadeInLeft">
            <div className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fadeInUp animate-delay-300">
              <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
              <p className="text-white/80 leading-relaxed">
                I'm Maulana Rizwan Ahmad, a passionate game developer based in
                Bekasi, with 1 year of experience creating interactive and
                meaningful game experiences. I specialize in 2D game development
                using Unity, combining engaging gameplay mechanics, pixel art,
                and clean code to bring ideas to life. Whether it's an immersive
                RPG or an educational game, I love turning creative concepts
                into engaging digital worlds.
              </p>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fadeInUp animate-delay-500">
              <h3 className="text-2xl font-bold text-white mb-4">What I Do</h3>
              <p className="text-white/80 leading-relaxed">
                From concept to deployment, I craft engaging and scalable games
                across desktop, mobile, and web platforms. I collaborate with
                indie teams and studios to bring creative visions to life using
                modern game engines, pixel-perfect art, and industry best
                practices. Whether it's an immersive RPG or an educational
                experience, I build games that players remember.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeInRight">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-scaleIn animate-delay-${
                  (index + 1) * 150 + 600
                }`}
              >
                <div className="text-[#00d4ff] mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
