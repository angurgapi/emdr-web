"use client";
import { useEffect } from "react";
import { useSessionSettings } from "@/store/sessionSettings";
import SessionBall from "./SessionBall";

const SessionBox: React.FC = () => {
  const { bgColor } = useSessionSettings();
  return (
    <div
      className={`w-full h-full mt-5 max-h-[80vh] p-4 rounded-lg items-center justify-center flex `}
      style={{ backgroundColor: bgColor }}
    >
      <SessionBall />
    </div>
  );
};

export default SessionBox;
