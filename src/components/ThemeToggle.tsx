"use client";
import { useThemeStore } from "@/store/theme";
import type { Theme } from "@/lib/theme";
import { FC } from "react";
import { Button } from "./ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

const ThemeToggle: FC = () => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const set = (t: Theme) => () => setTheme(t);

  return (
    <div className="inline-flex items-center gap-2 rounded-lg">
      {theme && theme === "dark" ? (
        <Button
          size="icon"
          onClick={set("light")}
          className="px-2 py-1 rounded hover:bg-white/90"
          aria-label="Switch to light theme"
        >
          <SunIcon className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          size="icon"
          onClick={set("dark")}
          className="px-2 py-1 rounded hover:bg-black/80"
          aria-label="Switch to dark theme"
        >
          <MoonIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
export default ThemeToggle;
