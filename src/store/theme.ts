"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "@/lib/theme";

type ThemeState = {
    theme: Theme;                // user selection
    setTheme: (t: Theme) => void;
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: "dark",
            setTheme: (t) => set({ theme: t }),
        }),
        { name: "theme" }
    )
);