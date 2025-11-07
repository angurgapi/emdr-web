import type { Metadata } from "next";

import { SettingsSidebar } from "@/components/session/SettingsSidebar";
import { SettingsSidebarWrapper } from "@/components/session/SettingsSidebarWrapper";
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
      <SettingsSidebarWrapper defaultOpen={false} className="min-h-0">
        <SettingsSidebar />
        <SettingsSidebarTrigger className="absolute top-2 left-6 z-10" />
        <div className="w-full">
          <SessionContainer />
        </div>
      </SettingsSidebarWrapper>
    </div>
  );
};
export default Session;
