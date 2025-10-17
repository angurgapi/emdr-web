import { useCallback } from "react";

const useSound = (path: string, volume = 1) => {
    const play = useCallback(() => {
        const audio = new Audio(path);
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }, [path, volume]);

    return play;
};

export default useSound;