"use client";
import { useCallback, useEffect, useState } from "react";

export function useFullScreen<T extends HTMLElement>() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const enter = useCallback(async (el: T | null) => {
        if (!el) return;
        try {
            if (el.requestFullscreen) await el.requestFullscreen();
            else (el as any).webkitRequestFullscreen?.(); // Safari
        } catch (e) { console.error(e); }
    }, []);

    const exit = useCallback(async () => {
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else (document as any).webkitExitFullscreen?.(); // Safari
        } catch (e) { console.error(e); }
    }, []);

    const toggle = useCallback((el: T | null) => {
        if (document.fullscreenElement || (document as any).webkitFullscreenElement) exit();
        else enter(el);
    }, [enter, exit]);

    useEffect(() => {
        const onChange = () =>
            setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
        document.addEventListener("fullscreenchange", onChange);
        document.addEventListener("webkitfullscreenchange", onChange as any);
        return () => {
            document.removeEventListener("fullscreenchange", onChange);
            document.removeEventListener("webkitfullscreenchange", onChange as any);
        };
    }, []);

    return { isFullscreen, enter, exit, toggle };
}
