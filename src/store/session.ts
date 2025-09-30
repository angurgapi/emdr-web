import { create } from "zustand";

type Session = {
    isMovementActive: boolean;
    resetToken: number;    // bump to hard reset ball
    start: () => void;
    pause: () => void;
    stop: () => void;      // pause + reset
};

export const useSession = create<Session>((set) => ({
    isMovementActive: false,
    speed: 200,
    resetToken: 0,
    start: () => set({ isMovementActive: true }),
    pause: () => set({ isMovementActive: false }),
    stop: () => set((s) => ({ isMovementActive: false, resetToken: s.resetToken + 1 })),
}));