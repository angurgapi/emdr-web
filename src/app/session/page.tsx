import type { Metadata } from "next";

import { SettingsSidebar } from "@/components/session/SettingsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingsSidebarTrigger } from "@/components/session/SettingsSidebarTrigger";
import SessionContainer from "@/components/session/SessionContainer";

export const metadata: Metadata = {
  title: "BLS | Spoko",
  robots: {
    index: false,
  },
};

const Session = () => {
  return (
    <div className="w-full p-4 pt-0 flex relative">
      <SidebarProvider defaultOpen={false}>
        <SettingsSidebar />
        <SettingsSidebarTrigger className="absolute top-2 left-6 z-10" />
        <div className="w-full">
          <SessionContainer />
        </div>
      </SidebarProvider>
    </div>
  );
};
export default Session;
