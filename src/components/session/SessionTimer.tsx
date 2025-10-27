"use client";

import { useEffect } from "react";
import { useSession } from "@/store/session";
import { useSessionSettings } from "@/store/sessionSettings";

export default function SessionTimer() {
  const { sessionDuration } = useSessionSettings();
  const { elapsedTime, syncDuration } = useSession();

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    syncDuration(sessionDuration);
  }, [sessionDuration, syncDuration]);

  return (
    <div>
      <div className="border border-white/20 rounded-md px-2 py-1 text-sm bg-primary h-[36px] flex items-center justify-center text-white w-[80px]">
        {<span>{formatElapsedTime(elapsedTime)}</span>}
      </div>
    </div>
  );
}
