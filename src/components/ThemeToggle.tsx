import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // خواندن تم از localStorage یا سیستم
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative inline-flex items-center h-8 w-14 rounded-full bg-gray-200 dark:bg-slate-700 transition-colors"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute h-6 w-6 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center"
        animate={{ x: theme === "dark" ? 26 : 4 }}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
