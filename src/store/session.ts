import { create } from "zustand";
import { SessionDuration, useSessionSettings } from "./sessionSettings";

type Session = {
    isMovementActive: boolean;
    resetToken: number;
    elapsedTime: number;
    start: () => void;
    pause: () => void;
    stop: () => void;
    syncDuration: (duration: SessionDuration) => void;
};

let intervalRef: NodeJS.Timeout | null = null;

function getDurationSeconds(duration: SessionDuration): number | null {
    switch (duration) {
        case "infinite": return null;
        case "20m": return 20 * 60;
        case "1h": return 60 * 60;
        case "2m": return 2 * 60;
        default: return duration * 60;
    }
}

export const useSession = create<Session>((set, get) => ({
    isMovementActive: false,
    resetToken: 0,
    elapsedTime: 0,

    start: () => {
        const { sessionDuration } = useSessionSettings.getState();
        const total = getDurationSeconds(sessionDuration);
        set({ isMovementActive: true });

        if (intervalRef) clearInterval(intervalRef);

        intervalRef = setInterval(() => {
            const elapsed = get().elapsedTime;
            const next = elapsed + 1;
            set({ elapsedTime: next });
            if (total !== null && next >= total) {
                clearInterval(intervalRef!);
                intervalRef = null;
                set({ isMovementActive: false });
            }
        }, 1000);
    },

    pause: () => {
        if (intervalRef) clearInterval(intervalRef);
        intervalRef = null;
        set({ isMovementActive: false });
    },

    stop: () => {
        if (intervalRef) clearInterval(intervalRef);
        intervalRef = null;
        set((s) => ({
            isMovementActive: false,
            elapsedTime: 0,
            resetToken: s.resetToken + 1,
        }));
    },

    syncDuration: (duration) => {
        const total = getDurationSeconds(duration);
        const elapsed = get().elapsedTime;

        if (total !== null && elapsed >= total) {
            if (intervalRef) clearInterval(intervalRef);
            intervalRef = null;
            set({ isMovementActive: false });
        }

        if (total === null && get().isMovementActive && !intervalRef) {
            intervalRef = setInterval(() => {
                set((s) => ({ elapsedTime: s.elapsedTime + 1 }));
            }, 1000);
        }
    },
}));
