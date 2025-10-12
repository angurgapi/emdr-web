"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSessionSettings } from "@/store/sessionSettings";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect } from "react";
import {
  MoveDiagonal,
  MoveDiagonal2,
  MoveHorizontal,
  MoveVertical,
} from "lucide-react";

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
  } = useSessionSettings();

  const sizemap: Record<string, number> = { s: 16, m: 24, l: 32, xl: 48 };

  // useEffect(() => {
  //   setBallSize(sizemap["m"]);
  // }, [setBallSize]);
  return (
    <Sidebar className="z-50">
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
              <label htmlFor="ballSpeed" className="font-semibold">
                BLS speed
              </label>
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
              <label htmlFor="ballSpeed" className="font-semibold">
                BLS size
              </label>
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
              <label htmlFor="ballSpeed" className="font-semibold">
                BLS direction
              </label>
              <div className="flex gap-2 items-center">
                <Button
                  size="sm"
                  variant={
                    ballDirection === "leftToRight" ? "default" : "outline"
                  }
                  onClick={() => setBallDirection("leftToRight")}
                >
                  <MoveHorizontal />
                </Button>
                <Button
                  size="sm"
                  variant={
                    ballDirection === "topToBottom" ? "default" : "outline"
                  }
                  onClick={() => setBallDirection("topToBottom")}
                >
                  <MoveVertical />
                </Button>
                <Button
                  size="sm"
                  variant={
                    ballDirection === "diagLeftToRight" ? "default" : "outline"
                  }
                  onClick={() => setBallDirection("diagLeftToRight")}
                >
                  <MoveDiagonal2 />
                </Button>
                <Button
                  size="sm"
                  variant={
                    ballDirection === "diagRightToLeft" ? "default" : "outline"
                  }
                  onClick={() => setBallDirection("diagRightToLeft")}
                >
                  <MoveDiagonal />
                </Button>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
