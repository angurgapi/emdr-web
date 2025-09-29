"use client";
import { useSessionSettings } from "@/store/sessionSettings";

const SessionBall = () => {
  const { ballColor, ballSize } = useSessionSettings();
  return (
    <div
      className={`w-4 h-4 rounded-full`}
      style={{
        backgroundColor: ballColor,
        width: ballSize,
        height: ballSize,
      }}
    />
  );
};

export default SessionBall;
