"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type SettingsSidebarTriggerProps = HTMLAttributes<HTMLButtonElement>;

export function SettingsSidebarTrigger({
  className,
  ...props
}: SettingsSidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      size="icon"
      onClick={toggleSidebar}
      className={cn(className)}
      {...props}
    >
      <SettingsIcon />
    </Button>
  );
}
