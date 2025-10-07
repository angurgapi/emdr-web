"use client";
import { useSessionSettings } from "@/store/sessionSettings";
import { forwardRef } from "react";

type BallProps = {
  ballColor: string;
  ballSize: number;
};

const SessionBall = forwardRef<HTMLDivElement, BallProps>(
  ({ ballColor, ballSize }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute top-0 left-0 rounded-full will-change-transform z-10"
        style={{
          backgroundColor: ballColor,
          width: ballSize,
          height: ballSize,
        }}
      />
    );
  }
);
SessionBall.displayName = "SessionBall";
export default SessionBall;
