import { getSessionSettings } from "@/store/sessionSettings";

class SoundService {
    private cache: Record<string, HTMLAudioElement> = {};
    private lastPlay: Record<string, number> = {};
    private audioContext: AudioContext | null = null;
    private panners: Record<string, StereoPannerNode> = {};

    private getAudioContext(): AudioContext {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.audioContext;
    }

    private getAudio(trackName: string): HTMLAudioElement {
        const path = `/sounds/${trackName}.mp3`;

        if (!this.cache[path]) {
            const audio = new Audio(path);
            audio.preload = "auto";
            this.cache[path] = audio;
        }
        return this.cache[path];
    }

    private getPanner(trackName: string): StereoPannerNode {
        if (!this.panners[trackName]) {
            const ctx = this.getAudioContext();
            const panner = ctx.createStereoPanner();
            panner.connect(ctx.destination);
            this.panners[trackName] = panner;
        }
        return this.panners[trackName];
    }

    play(side: "left" | "right" = "left") {
        const { isSoundOn, audioSound, volume = 0.3 } = getSessionSettings();
        // console.log("Playing sound:", { isSoundOn, audioSound, volume, side });
        if (!isSoundOn || !audioSound) return;

        const now = performance.now();
        const last = this.lastPlay[audioSound] || 0;
        if (now - last < 100) return;
        this.lastPlay[audioSound] = now;

        const audio = this.getAudio(audioSound);
        const ctx = this.getAudioContext();
        const panner = this.getPanner(audioSound);
        const panValue = side === "left" ? -1 : 1;
        panner.pan.value = panValue;

        // Create source if needed
        if (!(audio as any).__source) {
            const source = ctx.createMediaElementSource(audio);
            source.connect(panner);
            (audio as any).__source = source;
        }

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
        this.panners = {};
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }
}

export const soundService = new SoundService();
