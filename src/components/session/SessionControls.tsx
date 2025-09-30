"use client";
import { useSession } from "@/store/session";
import { Button } from "../ui/button";

const SessionControls = () => {
  const { start, pause, stop, isMovementActive } = useSession();

  return (
    <div className="flex gap-2 items-center">
      {isMovementActive ? (
        <div className="flex w-full gap-2">
          <Button onClick={pause}>Pause</Button>
          <Button onClick={stop}>Stop</Button>
        </div>
      ) : (
        <Button onClick={start}>Start</Button>
      )}
    </div>
  );
};

export default SessionControls;
