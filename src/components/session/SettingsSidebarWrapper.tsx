"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SettingsSidebarWrapperProps = React.ComponentProps<typeof SidebarProvider>;

export function SettingsSidebarWrapper({
  className,
  children,
  ...props
}: SettingsSidebarWrapperProps) {
  return (
    <SidebarProvider
      {...props}
      className={cn("min-h-0 h-full w-full", className)}
    >
      {children}
    </SidebarProvider>
  );
}

