import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "cyberpunk" | "arcade" | "minimalist";

export interface ThemeColors {
  name: string;
  primary: string; // #00d4ff
  secondary: string; // #0066ff
  accent: string; // #a855f7
  bgGlow1: string;
  bgGlow2: string;
  badgeBg: string;
  badgeText: string;
}

export const themePresets: Record<ThemeMode, ThemeColors> = {
  cyberpunk: {
    name: "Cyberpunk",
    primary: "#00d4ff",
    secondary: "#0066ff",
    accent: "#a855f7",
    bgGlow1: "rgba(0, 212, 255, 0.25)",
    bgGlow2: "rgba(0, 102, 255, 0.25)",
    badgeBg: "rgba(0, 212, 255, 0.15)",
    badgeText: "#00d4ff",
  },
  arcade: {
    name: "Retro Arcade",
    primary: "#00d4ff",
    secondary: "#0066ff",
    accent: "#a855f7",
    bgGlow1: "rgba(0, 212, 255, 0.25)",
    bgGlow2: "rgba(0, 102, 255, 0.25)",
    badgeBg: "rgba(0, 212, 255, 0.15)",
    badgeText: "#00d4ff",
  },
  minimalist: {
    name: "Minimalist Dark",
    primary: "#00d4ff",
    secondary: "#0066ff",
    accent: "#a855f7",
    bgGlow1: "rgba(0, 212, 255, 0.25)",
    bgGlow2: "rgba(0, 102, 255, 0.25)",
    badgeBg: "rgba(0, 212, 255, 0.15)",
    badgeText: "#00d4ff",
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("rizwandev_theme");
    return (saved as ThemeMode) || "cyberpunk";
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("rizwandev_theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const colors = themePresets[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
