"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "@/store/session";

export function SessionEndDialog() {
  const [open, setOpen] = useState(false);
  const { sessionEndedByTimer, start, stop, clearSessionEndedFlag } =
    useSession();

  useEffect(() => {
    if (sessionEndedByTimer) {
      setOpen(true);
    }
  }, [sessionEndedByTimer]);

  const handleStartAnother = () => {
    stop(); // Reset the timer
    clearSessionEndedFlag();
    setOpen(false);
    // Small delay to ensure reset completes before starting
    setTimeout(() => {
      start();
    }, 100);
  };

  const handleClose = () => {
    clearSessionEndedFlag();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px] rounded-md">
        <DialogHeader>
          <DialogTitle>Time's up</DialogTitle>
          <DialogDescription>
            Your session has ended. Would you like to start another session with
            the same settings?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button onClick={handleStartAnother} className="w-full sm:w-auto">
            Start another session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

