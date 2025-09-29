"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "@/lib/theme";

type ThemeState = {
    theme: Theme;
    setTheme: (t: Theme) => void;
};

export const useThemeStore = create<ThemeState>()(
    persist<ThemeState>(
        (set) => ({
            theme: "light",
            setTheme: (t) => set({ theme: t }),
        }),
        { name: "theme" }
    )
);