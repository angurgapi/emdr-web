"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useThemeStore } from "./theme";

export type AudioSound = "snap" | "heartbeat" | "beep";
export type BallDirection = "leftToRight" | "topToBottom" | "diagLeftToRight" | "diagRightToLeft";
export type SessionDuration = "infinite" | "20m" | "1h" | "5m" | "2m" | number;

type SessionSettingsState = {
    ballColor: string;
    bgColor: string;
    ballSpeed: number; // multiplier, e.g., 0.5
    ballSize: number; // in px
    ballDirection: BallDirection;
    audioSound: AudioSound;
    isSoundOn: boolean;
    volume: number;
    sessionDuration: SessionDuration;

    setBallColor: (color: string) => void;
    setBgColor: (color: string) => void;
    setBallSpeed: (speed: number) => void;
    setBallSize: (size: number) => void;
    setBallDirection: (direction: BallDirection) => void;
    setAudioSound: (sound: AudioSound) => void;
    setSoundOn: (on: boolean) => void;
    setVolume: (volume: number) => void;
    setAudioSettings: (settings: Partial<Pick<SessionSettingsState, "audioSound" | "isSoundOn" | "volume">>) => void;
    setSessionDuration: (duration: SessionDuration) => void;
    setSettings: (partial: Partial<Pick<SessionSettingsState,
        "ballColor" | "bgColor" | "ballSpeed" | "audioSound" | "ballSize" | "ballDirection" | "isSoundOn"
    >>) => void;
    syncColorsWithTheme: () => void;
    reset: () => void;
};

const getDefaultColors = (isDark: boolean) => ({
    bgColor: isDark ? "#000000" : "#ffffff",
    ballColor: isDark ? "#ffffff" : "#000000",
});

const getDefaultSettings = () => {
    const isDark = useThemeStore.getState().theme === "dark";

    return {
        ...getDefaultColors(isDark),
        ballSpeed: 1,
        ballSize: 36,
        audioSound: "snap" as AudioSound,
        ballDirection: "leftToRight" as BallDirection,
        isSoundOn: true,
        volume: 0.3,
        sessionDuration: "infinite" as SessionDuration,
    };
};
export const useSessionSettings = create<SessionSettingsState>()(
    persist(
        (set, get) => ({
            ...getDefaultSettings(),

            setBallColor: (color) => set({ ballColor: color }),
            setBgColor: (color) => set({ bgColor: color }),
            setBallSpeed: (speed) => set({ ballSpeed: speed }),
            setBallSize: (size) => set({ ballSize: size }),
            setAudioSound: (sound) => set({ audioSound: sound }),
            setBallDirection: (direction) => set({ ballDirection: direction }),
            setSoundOn: (on) => set({ isSoundOn: on }),
            setVolume: (volume) => set({ volume }),
            setAudioSettings: (settings) => set(settings),
            setSessionDuration: (duration) => set({ sessionDuration: duration }),

            setSettings: (partial) => set(partial),

            syncColorsWithTheme: () => {
                const state = get();
                const currentTheme = useThemeStore.getState().theme;
                const isDark = currentTheme === "dark";

                // Get default colors for both themes
                const lightDefaults = getDefaultColors(false);
                const darkDefaults = getDefaultColors(true);

                // Check if current colors match either theme's defaults
                const matchesLightDefaults =
                    state.ballColor === lightDefaults.ballColor &&
                    state.bgColor === lightDefaults.bgColor;
                const matchesDarkDefaults =
                    state.ballColor === darkDefaults.ballColor &&
                    state.bgColor === darkDefaults.bgColor;

                // Only sync if colors match one of the default themes
                if (matchesLightDefaults || matchesDarkDefaults) {
                    set(getDefaultColors(isDark));
                }
            },

            reset: () => set({ ...getDefaultSettings() }),
        }),
        { name: "session-settings" }
    )
);

export const getSessionSettings = () => useSessionSettings.getState();

// Subscribe to theme changes and sync colors if they match defaults
if (typeof window !== "undefined") {
    useThemeStore.subscribe(() => {
        useSessionSettings.getState().syncColorsWithTheme();
    });
}