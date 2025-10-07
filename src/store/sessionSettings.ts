"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AudioSound = "snap" | "heartbit" | "gong" | "none";
export type BallDirection = "leftToRight" | "topToBottom" | "diagLeftToRight" | "diagRightToLeft";

type SessionSettingsState = {
    ballColor: string;
    bgColor: string;
    ballSpeed: number; // multiplier, e.g., 0.5
    ballSize: number; // in px
    ballDirection: BallDirection;
    audioSound: AudioSound;

    setBallColor: (color: string) => void;
    setBgColor: (color: string) => void;
    setBallSpeed: (speed: number) => void;
    setBallSize: (size: number) => void;
    setBallDirection: (direction: BallDirection) => void;
    setAudioSound: (sound: AudioSound) => void;

    setSettings: (partial: Partial<Pick<SessionSettingsState,
        "ballColor" | "bgColor" | "ballSpeed" | "audioSound" | "ballSize" | "ballDirection"
    >>) => void;
    reset: () => void;
};

const DEFAULT_SETTINGS: Pick<SessionSettingsState, "ballColor" | "bgColor" | "ballSpeed" | "ballSize" | "audioSound" | "ballDirection"> = {
    ballColor: "#22d3ee",
    bgColor: "#000000",
    ballSpeed: 1,
    ballSize: 24,
    audioSound: "none",
    ballDirection: "leftToRight",
};

export const useSessionSettings = create<SessionSettingsState>()(
    persist(
        (set) => ({
            ...DEFAULT_SETTINGS,

            setBallColor: (color) => set({ ballColor: color }),
            setBgColor: (color) => set({ bgColor: color }),
            setBallSpeed: (speed) => set({ ballSpeed: speed }),
            setBallSize: (size) => set({ ballSize: size }),
            setAudioSound: (sound) => set({ audioSound: sound }),
            setBallDirection: (direction) => set({ ballDirection: direction }),

            setSettings: (partial) => set(partial),
            reset: () => set({ ...DEFAULT_SETTINGS }),
        }),
        { name: "session-settings" }
    )
);