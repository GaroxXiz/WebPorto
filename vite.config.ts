import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  if (command === "build") {
    return {
      plugins: [react(), tailwindcss()],
      base: "/Rizwandev/",
    };
  } else {
    return {
      plugins: [react(), tailwindcss()],
      base: "/",
    };
  }
});
