"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  AudioSound,
  BallDirection,
  SessionDuration,
  useSessionSettings,
} from "@/store/sessionSettings";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect } from "react";
import {
  MoveDiagonal,
  MoveDiagonal2,
  MoveHorizontal,
  MoveVertical,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { audio } from "framer-motion/client";

export function SettingsSidebar() {
  const {
    ballColor,
    setBallColor,
    ballSpeed,
    setBallSpeed,
    bgColor,
    setBgColor,
    setBallSize,
    ballSize,
    ballDirection,
    setBallDirection,
    isSoundOn,
    setSoundOn,
    audioSound,
    setAudioSound,
    sessionDuration,
    setSessionDuration,
  } = useSessionSettings();

  const sizemap: Record<string, number> = { s: 16, m: 24, l: 32, xl: 48 };
  const directionOptions = [
    {
      value: "leftToRight",
      icon: <MoveHorizontal />,
    },
    {
      value: "topToBottom",
      icon: <MoveVertical />,
    },
    {
      value: "diagLeftToRight",
      icon: <MoveDiagonal2 />,
    },
    {
      value: "diagRightToLeft",
      icon: <MoveDiagonal />,
    },
  ];
  const durationOptions = [
    { value: "infinite", label: "Infinite" },
    { value: "20m", label: "20 min" },
    { value: "1h", label: "1 h" },
    // {
    //   value: "2m",
    //   label: "2 min",
    // },
  ];
  // useEffect(() => {
  //   setBallSize(sizemap["m"]);
  // }, [setBallSize]);
  return (
    <Sidebar className="z-50 min-h-[200px]">
      <SidebarContent className="pt-1">
        <SidebarHeader className="font-bold">Preferences</SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <div>
              <span className="mb-2 block font-semibold">Colors</span>
              <div className="flex gap-2">
                <div className="flex w-full flex-col gap-2">
                  <span>BLS</span>
                  <Input
                    type="color"
                    value={ballColor}
                    onChange={(e) => setBallColor(e.target.value)}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <span>Background</span>
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <span className="font-semibold">BLS speed</span>
              <div className="flex gap-2 items-center">
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <Button
                    size="sm"
                    key={speed}
                    onClick={() => setBallSpeed(speed)}
                    variant={ballSpeed === speed ? "default" : "outline"}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="font-semibold">BLS size</span>
              <div className="flex gap-2 items-center">
                {["s", "m", "l", "xl"].map((size) => (
                  <Button
                    size="sm"
                    variant={sizemap[size] === ballSize ? "default" : "outline"}
                    key={size}
                    onClick={() => setBallSize(sizemap[size])}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="font-semibold">BLS direction</span>
              <div className="flex gap-2 items-center">
                {directionOptions.map((option) => (
                  <Button
                    size="sm"
                    variant={
                      ballDirection === option.value ? "default" : "outline"
                    }
                    key={option.value}
                    onClick={() =>
                      setBallDirection(option.value as BallDirection)
                    }
                  >
                    {option.icon}
                  </Button>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <span className="font-semibold">Sound on/off</span>
                <Switch checked={isSoundOn} onCheckedChange={setSoundOn} />
              </div>
              {isSoundOn && (
                <div className="flex flex-col gap-2 mt-4">
                  <span className="font-semibold">Sound type</span>
                  <div className="flex gap-2 items-center">
                    {["snap", "heartbeat", "beep"].map((sound) => (
                      <Button
                        size="sm"
                        variant={sound === audioSound ? "default" : "outline"}
                        key={sound}
                        onClick={() => setAudioSound(sound as AudioSound)}
                      >
                        {sound}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2 mt-4">
                <span className="font-semibold">Session duration</span>
                {durationOptions.map((option) => (
                  <Button
                    size="sm"
                    key={option.value}
                    variant={
                      sessionDuration === option.value ? "default" : "outline"
                    }
                    onClick={() => {
                      setSessionDuration(option.value as SessionDuration);
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
