const Skills = () => {
  const skillCategories = [
    {
      title: "Technical Skills",
      skills: [
        { name: "C#", level: 95 },
        { name: "Python", level: 80 },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Unity", level: 95 },
        { name: "Blender", level: 90 },
        { name: "Aseprite", level: 90 },
        { name: "Renpy", level: 80 },
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Creativity", level: 95 },
        { name: "Communication", level: 90 },
        { name: "Teamwork", level: 90 },
        { name: "Problem Solving", level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animate-delay-200">
            My <span className="text-[#00d4ff]">Skills</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto animate-fadeInUp animate-delay-300">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fadeInUp animate-delay-${
                (index + 1) * 200 + 400
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center hover:text-[#00d4ff] transition-colors duration-300">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`space-y-2 animate-fadeInLeft animate-delay-${
                      (skillIndex + 1) * 100 + (index + 1) * 200 + 600
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-[#00d4ff] text-sm font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#00d4ff] to-[#0066ff] h-2 rounded-full transition-all duration-1000 ease-out hover:shadow-lg hover:shadow-[#00d4ff]/50"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
