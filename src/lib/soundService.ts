import { getSessionSettings } from "@/store/sessionSettings";

class SoundService {
    private cache: Record<string, HTMLAudioElement> = {};
    private lastPlay: Record<string, number> = {};

    private getAudio(trackName: string): HTMLAudioElement {
        const path = `/sounds/${trackName}.mp3`;

        if (!this.cache[path]) {
            const audio = new Audio(path);
            audio.preload = "auto";
            this.cache[path] = audio;
        }
        return this.cache[path];
    }

    play() {
        const { isSoundOn, audioSound, volume = 0.3 } = getSessionSettings();
        console.log("Playing sound:", { isSoundOn, audioSound, volume });
        if (!isSoundOn || !audioSound) return;

        const now = performance.now();
        const last = this.lastPlay[audioSound] || 0;
        if (now - last < 100) return;
        this.lastPlay[audioSound] = now;

        const audio = this.getAudio(audioSound);
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }

    preload(trackNames: string[]) {
        trackNames.forEach((name) => {
            const path = `/sounds/${name}.mp3`;
            const audio = this.getAudio(name);
            audio.load();
        });
    }
    clearCache() {
        Object.values(this.cache).forEach(a => a.pause());
        this.cache = {};
    }
}

export const soundService = new SoundService();
