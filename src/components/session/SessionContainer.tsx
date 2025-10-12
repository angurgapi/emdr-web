"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSessionSettings } from "@/store/sessionSettings";
import { useSession } from "@/store/session";
import { useFullScreen } from "@/hooks/useFullScreen";
import { Button } from "../ui/button";
import SessionControls from "./SessionControls";
import SessionBall from "./SessionBall";
import { Ball } from "../../app/session/utils/Ball";

const ONE_WAY_TIME_1X = 1.2;

const SessionBox = () => {
  const {
    ballColor,
    ballSize, // number | string
    bgColor,
    ballSpeed: mult, // 0.5 | 1 | 1.5 | 2
    ballDirection,
  } = useSessionSettings();

  const { isMovementActive, resetToken, pause, start } = useSession();
  const { isFullscreen, toggle } = useFullScreen<HTMLDivElement>();

  const boxRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const ballClassRef = useRef<Ball | null>(null);

  const toPx = (v: number | string) =>
    typeof v === "number" ? v : parseFloat(String(v)) || 0;

  // instantiate Ball once when DOM nodes are ready
  useLayoutEffect(() => {
    if (!boxRef.current || !moverRef.current) return;

    const ball = new Ball({
      container: boxRef.current,
      mover: moverRef.current,
      size: toPx(ballSize),
      oneWayTime: ONE_WAY_TIME_1X,
      mult,
      direction: ballDirection,
      listenFullscreenEvents: false,
    });

    ballClassRef.current = ball;
    return () => {
      ball.destroy();
      ballClassRef.current = null;
    };
  }, []); // instantiate once

  // start/stop animation
  useEffect(() => {
    const ball = ballClassRef.current;
    if (!ball) return;
    console.log("isMovementActive", isMovementActive);
    if (isMovementActive) ball.start();
    else ball.stop();
  }, [isMovementActive]);

  // settings changes
  useEffect(() => {
    ballClassRef.current?.setSize(toPx(ballSize));
  }, [ballSize]);

  useEffect(() => {
    ballClassRef.current?.setMult(mult);
  }, [mult]);

  useEffect(() => {
    ballClassRef.current?.setDirection(ballDirection);
  }, [ballDirection]);

  // external reset
  useEffect(() => {
    ballClassRef.current?.reset();
  }, [resetToken]);

  useEffect(() => {
    const ball = ballClassRef.current;
    if (!ball) return;

    const wasRunning = isMovementActive;
    ball.stop();

    // ensure the box resizes on fullscreen toggle
    let r1 = 0,
      r2 = 0;
    r1 = requestAnimationFrame(() => {
      ball.recompute({ preserveProgress: true, resetTime: true });
      r2 = requestAnimationFrame(() => {
        ball.recompute({ preserveProgress: true, resetTime: true });
        if (wasRunning) ball.start();
      });
    });

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [isFullscreen, isMovementActive]);

  useEffect(() => {
    const togglePause = () => {
      if (isMovementActive) pause();
      else start();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (t?.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(tag ?? ""))
        return;

      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        togglePause();
      }
    };

    // const onPointerDown = (e: PointerEvent) => {
    //   const target = e.target as HTMLElement;
    //   if (target.closest("[data-ignore-pause]")) return;
    //   togglePause();
    // };

    window.addEventListener("keydown", onKeyDown);
    // window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      //   window.removeEventListener("pointerdown", onPointerDown as any);
    };
  }, [isMovementActive, pause, start]);

  return (
    <div
      ref={boxRef}
      className="relative w-full h-full rounded-xl max-h-[80vh] overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div
        ref={moverRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <SessionBall ballColor={ballColor} ballSize={ballSize} />
      </div>

      <div className="absolute top-2 right-[50px] flex gap-2">
        <SessionControls />
        <Button onClick={() => toggle(boxRef.current)} data-ignore-pause>
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </Button>
      </div>
    </div>
  );
};

export default SessionBox;
