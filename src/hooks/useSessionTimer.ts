import { SessionDuration } from "@/store/sessionSettings";
import { useEffect, useState, useRef } from "react";

export function useSessionTimer(duration: SessionDuration, isActive: boolean) {
    function getDurationSeconds(duration: SessionDuration): number | null {
        switch (duration) {
            case "infinite":
                return null;
            case "20m":
                return 20 * 60;
            case "1h":
                return 60 * 60;
            case "2m":
                return 2 * 60;
            default:
                return typeof duration === "number" ? duration * 60 : null;
        }
    }

    const totalSeconds = getDurationSeconds(duration);
    const [remaining, setRemaining] = useState<number | null>(
        totalSeconds ?? null
    );

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // reset if duration changes
        setRemaining(totalSeconds ?? null);
    }, [duration]);

    useEffect(() => {
        if (!isActive || totalSeconds === null) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setRemaining((prev) => {
                if (prev === null) return null;
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current!);
    }, [isActive, totalSeconds]);

    const reset = () => setRemaining(totalSeconds ?? null);

    return { remaining, reset };
}
