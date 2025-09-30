"use client";
import { SettingsSidebar } from "@/components/session/SettingsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingsSidebarTrigger } from "@/components/session/SettingsSidebarTrigger";
import SessionBox from "@/components/session/SessionBox";
import SessionControls from "@/components/session/SessionControls";

const Session = () => {
  return (
    <div className="w-full p-4 flex relative">
      <SidebarProvider defaultOpen={false}>
        <SettingsSidebar />
        <SettingsSidebarTrigger className="absolute top-6 left-6 z-10" />
        <div className="w-full">
          <div className="flex w-full items-center justify-center gap-2 mb-4">
            <SessionControls />
          </div>
          <SessionBox />
        </div>
      </SidebarProvider>
    </div>
  );
};
export default Session;
