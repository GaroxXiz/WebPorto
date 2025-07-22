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

  const organizationExperience = [
    {
      year: "2024 - Present",
      organization: "PUFA Computer Science",
      position: "Vice of Art and Sport Division",
      description:
        "Assisted the Division Head in managing and organizing creative and sports-related activities that encourage students to explore their talents in visual arts and athletics. Responsible for coordinating team members, supporting event execution, and ensuring smooth internal communication. Contributed to idea development, activity planning, and post-event evaluations to enhance student engagement in both artistic and athletic fields.",
    },
    {
      year: "February 2025",
      organization: "PUFA Art and Sport Division Event",
      position:
        "Project Manager at Computer Science Sport & Games Olympiad (CSGO) 2025",
      description:
        "Led the end-to-end planning and execution of a major department-wide event combining physical sports and e-sports competitions. Oversaw cross-functional teams, managed timelines and budgets, and ensured smooth coordination across all divisions. Successfully delivered an engaging and inclusive experience that fostered teamwork, competitive spirit, and community among Computer Science students",
    },
    {
      year: "2023 - 2024",
      organization: "PUMA Informatics",
      position: "Vice of Art and Sport Division",
      description:
        "Supported the Division Head in planning and executing arts and sports programs aimed at nurturing non-academic talents among Informatics students. Coordinated internal teams, assisted in managing events, and ensured smooth communication and collaboration. Contributed to creating a dynamic and inclusive environment for students to express their creativity and athletic interests",
    },
    {
      year: "February 2024",
      organization: "PUFA Art and Sport Division Event",
      position:
        "PIC Games (Stumble Guys) at Computer Science Sport & Games Olympiad (CSGO) 2024",
      description:
        "Acted as the PIC for the Stumble Guys competition at CSGO 2024, overseeing end-to-end tournament management including player registration, technical setup, match supervision, real-time coordination with the event team, enforcement of game rules, and ensuring a fair and enjoyable experience for all participants.",
    },
  ];
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-[#00d4ff]">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
              <p className="text-white/80 leading-relaxed">
                I'm Maulana Rizwan Ahmad, a passionate game developer based in
                Bekasi, with 1 year of experience creating interactive and
                meaningful game experiences. I specialize in 2D game development
                using Unity, combining engaging gameplay mechanics, pixel art,
                and clean code to bring ideas to life. Whether it's an immersive
                RPG or an educational game,I love turning creative concepts into
                engaging digital worlds.
              </p>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-[#00d4ff] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h4>
                <p className="text-white/60 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-1 sm:mb-0">
                Experience
              </h3>
            </div>

            <div className="space-y-6">
              {organizationExperience.map((exp, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {exp.position} - {exp.organization}
                    </h4>
                    <span className="text-white/50 text-sm whitespace-nowrap">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
