import type { Metadata } from "next";

import { SettingsSidebar } from "@/components/session/SettingsSidebar";
import { SettingsSidebarWrapper } from "@/components/session/SettingsSidebarWrapper";
import { SettingsSidebarTrigger } from "@/components/session/SettingsSidebarTrigger";
import SessionContainer from "@/components/session/SessionContainer";
import { EMDRCheckpointDialog } from "@/components/session/EMDRCheckpointDialog";
import { SessionEndDialog } from "@/components/session/SessionEndDialog";

export const metadata: Metadata = {
  title: "EMDR session | Bilateral stimulation | EMDR4U",
  robots: {
    index: false,
  },
};

const Session = () => {
  return (
    <>
      <EMDRCheckpointDialog />
      <SessionEndDialog />
      <div className="w-full p-4 pt-0 flex relative">
        <SettingsSidebarWrapper defaultOpen={false} className="min-h-0">
          <SettingsSidebar />
          <SettingsSidebarTrigger className="absolute top-2 left-6 z-10" />
          <div className="w-full">
            <SessionContainer />
          </div>
        </SettingsSidebarWrapper>
      </div>
    </>
  );
};
export default Session;
