"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/store/theme";
import type { Theme } from "@/lib/theme";
import { THEME_COOKIE } from "@/lib/theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved: "dark" | "light" = theme;
  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");
  document.cookie = `${THEME_COOKIE}=${resolved}; path=/; max-age=${
    60 * 60 * 24 * 7
  }`;
}

const ThemeProvider = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return null;
};
export default ThemeProvider;
