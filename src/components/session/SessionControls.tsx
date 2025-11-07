"use client";
import { useSession } from "@/store/session";
import { Button } from "../ui/button";
import { CirclePause, CirclePlay, CircleStop } from "lucide-react";
const SessionControls = () => {
  const { start, pause, stop, isMovementActive, elapsedTime } = useSession();

  return (
    <div className="flex gap-2 items-center">
      <div className="flex w-full gap-2">
        {isMovementActive ? (
          <Button
            onClick={pause}
            data-ignore-pause
            variant="soft"
            size="icon"
            aria-label="Pause session"
          >
            <CirclePause />
          </Button>
        ) : (
          <Button
            onClick={start}
            data-ignore-pause
            variant="soft"
            size="icon"
            aria-label="Start session"
          >
            <CirclePlay />
          </Button>
        )}

        <Button
          onClick={stop}
          data-ignore-pause
          disabled={elapsedTime === 0}
          variant="soft"
          size="icon"
          aria-label="Stop session"
        >
          <CircleStop />
        </Button>
      </div>
    </div>
  );
};

export default SessionControls;
