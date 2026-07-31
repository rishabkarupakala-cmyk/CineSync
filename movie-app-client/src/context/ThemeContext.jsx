import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  // Accent Color
  const [accent, setAccent] = useState(
    localStorage.getItem("accent") || "blue"
  );

  // Poster Size
  const [posterSize, setPosterSize] = useState(
    localStorage.getItem("posterSize") || "comfortable"
  );

  // Auto-play Trailers
  const [autoplayTrailers, setAutoplayTrailers] = useState(
    JSON.parse(
      localStorage.getItem("autoplayTrailers")
    ) ?? true
  );

  // Reduce Animations
  const [reduceAnimations, setReduceAnimations] = useState(
    JSON.parse(
      localStorage.getItem("reduceAnimations")
    ) ?? false
  );

  // Theme
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark");

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (prefersDark) {
        root.classList.add("dark");
      }
    } else if (theme === "dark") {
      root.classList.add("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Accent Color
  useEffect(() => {
    const colors = {
      blue: "#2563eb",
      purple: "#7c3aed",
      red: "#dc2626",
      green: "#16a34a",
    };

    document.documentElement.style.setProperty(
      "--accent-color",
      colors[accent]
    );

    localStorage.setItem("accent", accent);
  }, [accent]);

  // Poster Size
  useEffect(() => {
    localStorage.setItem(
      "posterSize",
      posterSize
    );
  }, [posterSize]);

  // Auto-play
  useEffect(() => {
    localStorage.setItem(
      "autoplayTrailers",
      JSON.stringify(autoplayTrailers)
    );
  }, [autoplayTrailers]);

  // Reduce Animations
  useEffect(() => {
    localStorage.setItem(
      "reduceAnimations",
      JSON.stringify(reduceAnimations)
    );
  }, [reduceAnimations]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,

        accent,
        setAccent,

        posterSize,
        setPosterSize,

        autoplayTrailers,
        setAutoplayTrailers,

        reduceAnimations,
        setReduceAnimations,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}