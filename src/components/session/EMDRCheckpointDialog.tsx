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

const STORAGE_KEY = "emdr-checkpoint-dialog-dismissed";

export function EMDRCheckpointDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setOpen(true);
    }
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="sm:max-w-[500px] rounded-md">
        <DialogHeader>
          <DialogTitle>Before you begin</DialogTitle>
          <DialogDescription>
            Important checkpoints for self-administered bilateral stimulation
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">✓ Get comfortable</h4>
            <p className="text-sm text-muted-foreground">
              Find a quiet, comfortable space where you won't be disturbed.
              Sit or lie down in a relaxed position.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">✓ Safety first</h4>
            <p className="text-sm text-muted-foreground">
              This tool is not a substitute for professional therapy. If you're
              dealing with trauma, severe anxiety, or mental health concerns,
              please consult with a licensed therapist trained in EMDR or other
              evidence-based therapies.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">✓ Listen to your body</h4>
            <p className="text-sm text-muted-foreground">
              If you experience any discomfort, distress, or overwhelming
              emotions during the session, stop immediately and consider
              reaching out to a mental health professional.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">✓ Take your time</h4>
            <p className="text-sm text-muted-foreground">
              There's no rush. Use the session duration settings to find what
              works best for you. You can pause or stop at any time.
            </p>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleDontShowAgain}
            className="w-full sm:w-auto"
          >
            Don't show again
          </Button>
          <Button onClick={handleClose} className="w-full sm:w-auto">
            I understand, let's begin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

