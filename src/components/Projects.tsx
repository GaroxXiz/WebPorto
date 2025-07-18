import { ExternalLink } from "lucide-react";
import AbyssWalkerImg from "../../public/img/Abyss-Walker.png";
import AbyssWalkerVid from "../../public/video/Demo-Abyss-Walker.mp4";

const Projects = () => {
  const projects = [
    {
      title: "Abyss Walker",
      description:
        "Full-stack created 2D Pixel Games with aseprite and unity using C#",
      tech: ["Aseprite", "Unity", "C#"],
      image: AbyssWalkerImg,
      demo: AbyssWalkerVid,
      download:
        "https://drive.google.com/drive/folders/1FKSyG56EY9pZadOPE-2npYCThdWzyX-q?usp=sharing",
    },
    {
      title: "Anomaly Chase",
      description:
        "Created the Game Character, Game mechanics and Debugging the codes",
      tech: ["Blender", "Unity", "C#"],
      image: "/img/Anomaly.jpg",
      demo: "/video/Demo-Anomaly.mp4",
      download:
        "https://drive.google.com/drive/folders/1UB4JwxtIXJ0uAskvVuYqfE6oUMoKOJWq?usp=sharing",
    },
    {
      title: "RATURU : Home Fever",
      description:
        "Created a 3D low poly design for the Game Environment, Game Icon, and thumbnail",
      tech: ["Blender", "Unity"],
      image: "/img/Raturu.jpg",
      demo: "/video/Demo-Raturu.mp4",
      download:
        "https://drive.google.com/drive/folders/1tVfJwvPPmfe2QeAdjtUlrre100QB2GNN?usp=sharing",
    },
    {
      title: "Cyber Educational Games(Level 4: Malware Attack)",
      description:
        "Created the Game mechanics for the last level(Malware Attack), Debugging the last level(Malware Attack) for the WebGL Games.",
      tech: ["Unity", "C#"],
      image: "/img/Cyber-Edu-Games.png",
      demo: "/video/Demo-Cyber.mp4",
      download:
        "https://drive.google.com/drive/folders/1tl5Ma4flqQRTwkkx8YfGy7_xrSJwlvN7?usp=sharing",
    },
    {
      title: "Japanese Learning Language",
      description:
        "Designed the 2D Pixel Character, Animation, and Environment games",
      tech: ["Aseprite"],
      image: "/img/Japanese.png",
      github: "#",
      demo: "#",
      status: "development",
    },
    {
      title: "The Everlasting Love",
      description:
        "Designed The 2D Pixel for Game Character and Environment, Created the Game Mechanics using python",
      tech: ["Aseprite", "Renpy", "Python"],
      image: "/img/VN.png",
      github: "#",
      demo: "#",
      status: "development",
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-[#00d4ff]">Projects</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            creativity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden h-48">
                {/* Gambar selalu ditampilkan */}
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    project.status !== "development"
                      ? "group-hover:opacity-0"
                      : ""
                  }`}
                />

                {/* Video hanya muncul jika bukan development */}
                {project.status !== "development" && project.demo !== "#" && (
                  <video
                    src={project.demo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

                {/* Status badge */}
                {project.status === "development" && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-3 py-1 text-xs bg-yellow-500/90 text-black rounded-full font-semibold backdrop-blur-sm">
                      In Development
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-white/80 mb-4 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-[#00d4ff]/20 text-[#00d4ff] rounded-full border border-[#00d4ff]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.status === "development" ? (
                    <span className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-lg text-sm cursor-not-allowed">
                      <ExternalLink size={16} />
                      Coming Soon
                    </span>
                  ) : (
                    <a
                      href={project.download}
                      download
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-black rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 text-sm"
                    >
                      <ExternalLink size={16} />
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
