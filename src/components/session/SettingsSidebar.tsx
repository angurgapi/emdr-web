"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSessionSettings } from "@/store/sessionSettings";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SettingsSidebar() {
  const { ballColor, setBallColor, ballSpeed, setBallSpeed } =
    useSessionSettings();
  return (
    <Sidebar className="z-50">
      <SidebarContent className="pt-10">
        <SidebarHeader>Preferences</SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Visual</SidebarGroupLabel>
          <SidebarGroupContent>
            <div>
              <span>ball color</span>
              <Input
                type="color"
                value={ballColor}
                onChange={(e) => setBallColor(e.target.value)}
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
            {/* <div>
            <div>
              <span>ball size</span>
            </div>
            <div>
              <span>speed</span>
            </div>
            {/* <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
