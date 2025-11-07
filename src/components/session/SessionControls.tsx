"use client";
import { useSession } from "@/store/session";
import { Button } from "../ui/button";
import { CirclePause, CirclePlay, CircleStop } from "lucide-react";
const SessionControls = () => {
  const { start, pause, stop, isMovementActive } = useSession();

  return (
    <div className="flex gap-2 items-center">
      <div className="flex w-full gap-2">
        {isMovementActive ? (
          <Button onClick={pause} data-ignore-pause>
            <CirclePause />
          </Button>
        ) : (
          <Button onClick={start} data-ignore-pause>
            <CirclePlay />
          </Button>
        )}

        <Button onClick={stop} data-ignore-pause disabled={!isMovementActive}>
          <CircleStop />
        </Button>
      </div>
    </div>
  );
};

export default SessionControls;
