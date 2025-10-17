"use client";
import { useCallback, useEffect, useState } from "react";

export function useFullScreen<T extends HTMLElement>() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const enter = useCallback(async (el: T | null) => {
        if (!el) return;
        try {
            const elWithFS = el as HTMLElement & {
                webkitRequestFullscreen?: () => Promise<void> | void;
            };
            if (el.requestFullscreen) {
                await el.requestFullscreen();
            } else if (elWithFS.webkitRequestFullscreen) {
                elWithFS.webkitRequestFullscreen();
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const exit = useCallback(async () => {
        try {
            const docWithFS = document as Document & {
                webkitExitFullscreen?: () => Promise<void> | void;
            };
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (docWithFS.webkitExitFullscreen) {
                docWithFS.webkitExitFullscreen();
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const toggle = useCallback(
        (el: T | null) => {
            const docWithFS = document as Document & {
                webkitFullscreenElement?: Element | null;
            };
            if (document.fullscreenElement || docWithFS.webkitFullscreenElement) {
                exit();
            } else {
                enter(el);
            }
        },
        [enter, exit]
    );

    useEffect(() => {
        const onChange = () => {
            const docWithFS = document as Document & {
                webkitFullscreenElement?: Element | null;
            };
            setIsFullscreen(
                Boolean(document.fullscreenElement || docWithFS.webkitFullscreenElement)
            );
        };

        document.addEventListener("fullscreenchange", onChange);
        document.addEventListener("webkitfullscreenchange", onChange as EventListener);

        return () => {
            document.removeEventListener("fullscreenchange", onChange);
            document.removeEventListener(
                "webkitfullscreenchange",
                onChange as EventListener
            );
        };
    }, []);

    return { isFullscreen, enter, exit, toggle };
}
