"use client";
import { useSessionSettings } from "@/store/sessionSettings";
import { useSession } from "@/store/session";
import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import SessionBall from "./SessionBall";
import { useFullScreen } from "@/hooks/useFullScreen";
import { Button } from "../ui/button";
import SessionControls from "./SessionControls";

const ONE_WAY_TIME_1X = 1.2;

const SessionBox = () => {
  const {
    ballColor,
    ballSize, // number | string (px)
    bgColor,
    ballSpeed: mult, // 0.5 | 1 | 1.5 | 2
    ballDirection, // "leftToRight" | "topToBottom" | "diagLeftToRight" | "diagRightToLeft"
  } = useSessionSettings();

  const { isMovementActive, resetToken } = useSession();
  const { isFullscreen, toggle } = useFullScreen<HTMLDivElement>();

  const boxRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  const lastRef = useRef<number | null>(null);

  const posXRef = useRef(0);
  const posYRef = useRef(0);

  const dirXRef = useRef<1 | -1>(1);
  const dirYRef = useRef<1 | -1>(1);

  const speedXRef = useRef(0); // px/s (one-way across X in ONE_WAY_TIME_1X / mult)
  const speedYRef = useRef(0); // px/s (one-way across Y in ONE_WAY_TIME_1X / mult)

  const rafRef = useRef<number | null>(null);

  const getBallPx = () =>
    typeof ballSize === "number"
      ? ballSize
      : parseFloat(String(ballSize || 0)) || 0;

  const recomputeSpeeds = useCallback(() => {
    const box = boxRef.current;
    if (!box) return;
    const sizePx = getBallPx();
    const maxX = Math.max(0, box.clientWidth - sizePx);
    const maxY = Math.max(0, box.clientHeight - sizePx);

    speedXRef.current = (maxX / ONE_WAY_TIME_1X) * mult;
    speedYRef.current = (maxY / ONE_WAY_TIME_1X) * mult;

    // clamp positions if the box shrank
    posXRef.current = Math.min(posXRef.current, maxX);
    posYRef.current = Math.min(posYRef.current, maxY);

    if (ballRef.current) {
      ballRef.current.style.transform = `translate3d(${posXRef.current}px, ${posYRef.current}px, 0)`;
    }
  }, [mult, ballSize]);

  useLayoutEffect(recomputeSpeeds, [recomputeSpeeds]);

  useEffect(() => {
    if (!boxRef.current) return;
    const ro = new ResizeObserver(() => {
      recomputeSpeeds();
    });
    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [recomputeSpeeds]);

  const setInitialByDirection = useCallback(() => {
    console.log("setInitialByDirection", ballDirection);
    const box = boxRef.current;
    if (!box || !ballRef.current) return;

    const sizePx = getBallPx();
    const maxX = Math.max(0, box.clientWidth - sizePx);
    const maxY = Math.max(0, box.clientHeight - sizePx);

    // defaults: start top-left, moving to +X/+Y
    posXRef.current = 0;
    posYRef.current = 0;
    dirXRef.current = 1;
    dirYRef.current = 1;

    if (ballDirection === "leftToRight") {
      posXRef.current = 0;
      debugger;
      posYRef.current = maxY / 2;
      dirXRef.current = 1;
      dirYRef.current = 1; // Y unused
    } else if (ballDirection === "topToBottom") {
      posXRef.current = maxX / 2; // center horizontally
      posYRef.current = 0;
      dirXRef.current = 1; // X unused
      dirYRef.current = 1;
    } else if (ballDirection === "diagLeftToRight") {
      posXRef.current = 0;
      posYRef.current = 0;
      dirXRef.current = 1;
      dirYRef.current = 1;
    } else if (ballDirection === "diagRightToLeft") {
      posXRef.current = maxX;
      posYRef.current = 0;
      dirXRef.current = -1;
      dirYRef.current = 1;
    }

    ballRef.current.style.transform = `translate3d(${posXRef.current}px, ${posYRef.current}px, 0)`;
    lastRef.current = null;
  }, [ballDirection, ballSize]);

  useEffect(() => {
    if (!boxRef.current) return;
    const ro = new ResizeObserver(() => {
      setInitialByDirection();
    });
    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [setInitialByDirection]);

  const step = (t: number, moveX: boolean, moveY: boolean) => {
    const box = boxRef.current;
    const el = ballRef.current;
    if (!box || !el) return;

    if (lastRef.current == null) lastRef.current = t;
    const dt = (t - lastRef.current) / 1000;
    lastRef.current = t;

    const sizePx = getBallPx();
    const maxX = Math.max(0, box.clientWidth - sizePx);
    const maxY = Math.max(0, box.clientHeight - sizePx);

    // keep overall speed consistent when moving diagonally
    const isDiagonal =
      moveX &&
      moveY &&
      (ballDirection === "diagLeftToRight" ||
        ballDirection === "diagRightToLeft");
    const norm = isDiagonal ? 1 / Math.SQRT2 : 1;

    if (moveX) {
      posXRef.current += dirXRef.current * (speedXRef.current * norm) * dt;
      if (posXRef.current <= 0) {
        posXRef.current = 0;
        dirXRef.current = 1;
      } else if (posXRef.current >= maxX) {
        posXRef.current = maxX;
        dirXRef.current = -1;
      }
    }

    if (moveY) {
      posYRef.current += dirYRef.current * (speedYRef.current * norm) * dt;
      if (posYRef.current <= 0) {
        posYRef.current = 0;
        dirYRef.current = 1;
      } else if (posYRef.current >= maxY) {
        posYRef.current = maxY;
        dirYRef.current = -1;
      }
    }

    el.style.transform = `translate3d(${posXRef.current}px, ${posYRef.current}px, 0)`;
  };

  const tick = (t: number) => {
    if (ballDirection === "leftToRight") {
      step(t, true, false);
    } else if (ballDirection === "topToBottom") {
      step(t, false, true);
    } else if (ballDirection === "diagLeftToRight") {
      step(t, true, true);
    } else if (ballDirection === "diagRightToLeft") {
      step(t, true, true);
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (isMovementActive) {
      rafRef.current = requestAnimationFrame(tick);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isMovementActive, ballDirection]);

  useEffect(() => {
    // reset positions on external reset
    setInitialByDirection();
  }, [resetToken, setInitialByDirection]);

  useEffect(() => {
    // when direction changes, re-initialize starting point and dirs
    setInitialByDirection();
  }, [ballDirection, setInitialByDirection]);

  return (
    <div
      ref={boxRef}
      className="relative w-full h-full rounded-xl max-h-[80vh] overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <SessionBall ref={ballRef} ballColor={ballColor} ballSize={ballSize} />

      <div className="absolute top-2 right-2 flex gap-2">
        <SessionControls />
        <Button onClick={() => toggle(boxRef.current)}>
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </Button>
      </div>
    </div>
  );
};

export default SessionBox;
