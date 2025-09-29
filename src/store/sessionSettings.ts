"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AudioSound = "snap" | "heartbit" | "gong" | "none";

type SessionSettingsState = {
    ballColor: string;
    bgColor: string;
    ballSpeed: number; // multiplier, e.g., 0.5–3
    audioSound: AudioSound;

    setBallColor: (color: string) => void;
    setBgColor: (color: string) => void;
    setBallSpeed: (speed: number) => void;
    setAudioSound: (sound: AudioSound) => void;

    setSettings: (partial: Partial<Pick<SessionSettingsState,
        "ballColor" | "bgColor" | "ballSpeed" | "audioSound"
    >>) => void;
    reset: () => void;
};

const DEFAULT_SETTINGS: Pick<SessionSettingsState, "ballColor" | "bgColor" | "ballSpeed" | "audioSound"> = {
    ballColor: "#22d3ee",
    bgColor: "#000000",
    ballSpeed: 1,
    audioSound: "none",
};

export const useSessionSettings = create<SessionSettingsState>()(
    persist(
        (set) => ({
            ...DEFAULT_SETTINGS,

            setBallColor: (color) => set({ ballColor: color }),
            setBgColor: (color) => set({ bgColor: color }),
            setBallSpeed: (speed) => set({ ballSpeed: speed }),
            setAudioSound: (sound) => set({ audioSound: sound }),

            setSettings: (partial) => set(partial),
            reset: () => set({ ...DEFAULT_SETTINGS }),
        }),
        { name: "session-settings" }
    )
);