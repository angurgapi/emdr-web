"use client";
import { useSessionSettings } from "@/store/sessionSettings";
import { useSession } from "@/store/session";
import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import SessionBall from "./SessionBall";
import { useFullScreen } from "@/hooks/useFullScreen";
import { Button } from "../ui/button";

const ONE_WAY_TIME_1X = 1.2;

const SessionBox = () => {
  const {
    ballColor,
    ballSize,
    bgColor,
    ballSpeed: mult,
  } = useSessionSettings(); // mult: 0.5, 1, 1.5, 2
  const { isMovementActive, resetToken } = useSession();
  const { isFullscreen, toggle, exit } = useFullScreen<HTMLDivElement>();

  const boxRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  const posRef = useRef(0);
  const dirRef = useRef<1 | -1>(1);
  const lastRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const speedRef = useRef(0); // px/s

  const recomputeSpeed = useCallback(() => {
    const box = boxRef.current;
    if (!box) return;
    const sizePx =
      typeof ballSize === "number" ? ballSize : parseFloat(String(ballSize));
    const maxX = Math.max(0, box.clientWidth - sizePx);
    speedRef.current = (maxX / ONE_WAY_TIME_1X) * mult;
  }, [mult, ballSize]);

  useLayoutEffect(recomputeSpeed, [recomputeSpeed]);
  useEffect(() => {
    if (!boxRef.current) return;
    const ro = new ResizeObserver(recomputeSpeed);
    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [recomputeSpeed]);

  const tick = (t: number) => {
    if (!ballRef.current || !boxRef.current) return;
    if (lastRef.current == null) lastRef.current = t;
    const dt = (t - lastRef.current) / 1000;
    lastRef.current = t;

    const sizePx =
      typeof ballSize === "number" ? ballSize : parseFloat(String(ballSize));
    const maxX = Math.max(0, boxRef.current.clientWidth - sizePx);

    posRef.current += dirRef.current * speedRef.current * dt;
    if (posRef.current <= 0) {
      posRef.current = 0;
      dirRef.current = 1;
    }
    if (posRef.current >= maxX) {
      posRef.current = maxX;
      dirRef.current = -1;
    }

    ballRef.current.style.transform = `translateX(${posRef.current}px)`;
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (isMovementActive) rafRef.current = requestAnimationFrame(tick);
    else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMovementActive]);

  useEffect(() => {
    posRef.current = 0;
    dirRef.current = 1;
    lastRef.current = null;
    if (ballRef.current) ballRef.current.style.transform = `translateX(0px)`;
  }, [resetToken]);

  return (
    <div
      ref={boxRef}
      className="relative w-full h-full rounded-xl max-h-[80vh] overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <SessionBall ref={ballRef} ballColor={ballColor} ballSize={ballSize} />
      <div className="mt-2 flex gap-2">
        <Button onClick={() => toggle(boxRef.current)}>
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </Button>
        {isFullscreen && (
          <Button variant="secondary" onClick={exit}>
            Exit
          </Button>
        )}
      </div>
    </div>
  );
};
export default SessionBox;
