"use client";
import { useSession } from "@/store/session";
import { Button } from "../ui/button";
import { CirclePause, CirclePlay, CircleStop } from "lucide-react";
const SessionControls = () => {
  const { start, pause, stop, isMovementActive } = useSession();

  return (
    <div className="flex gap-2 items-center">
      {isMovementActive ? (
        <div className="flex w-full gap-2">
          <Button onClick={pause} data-ignore-pause>
            <CirclePause />
          </Button>
          <Button onClick={stop} data-ignore-pause>
            <CircleStop />
          </Button>
        </div>
      ) : (
        <Button onClick={start} data-ignore-pause>
          <CirclePlay />
        </Button>
      )}
    </div>
  );
};

export default SessionControls;
