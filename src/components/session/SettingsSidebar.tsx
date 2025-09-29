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

export function SettingsSidebar() {
  const {
    ballColor,
    setBallColor,
    ballSpeed,
    setBallSpeed,
    bgColor,
    setBgColor,
    setBallSize,
  } = useSessionSettings();
  return (
    <Sidebar
      className="z-50"
      style={{ "--sidebar-width": "400px" } as React.CSSProperties}
    >
      <SidebarContent className="pt-10">
        <SidebarHeader>Preferences</SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Visual</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2">
              <span>ball color</span>
              <Input
                type="color"
                value={ballColor}
                onChange={(e) => setBallColor(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>background color</span>
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="ballSpeed">ball speed: {ballSpeed}</label>
              <div className="flex gap-2 items-center">
                {[0.5, 1, 1.5, 2, 2.5, 3].map((speed) => (
                  <Button
                    size="sm"
                    key={speed}
                    onClick={() => setBallSpeed(speed)}
                    className={`${ballSpeed === speed ? "font-bold" : ""}`}
                  >
                    {speed}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="ballSpeed">ball size: {ballSpeed}</label>
              <div className="flex gap-2 items-center">
                {["s", "m", "l", "xl"].map((size) => (
                  <Button size="sm" key={size} onClick={() => setBallSize(48)}>
                    {size}
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
