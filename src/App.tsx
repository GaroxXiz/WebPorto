import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GithubContributions from "./components/GithubContributions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#121225] to-[#0a0a0a] text-white relative">
          <ParticleBackground />
          <CustomCursor />
          <Header />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <GithubContributions />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
