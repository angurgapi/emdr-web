"use client";

import { SettingsSidebar } from "@/components/session/SettingsSidebar";
import { SettingsSidebarWrapper } from "@/components/session/SettingsSidebarWrapper";
import { SettingsSidebarTrigger } from "@/components/session/SettingsSidebarTrigger";
import SessionContainer from "@/components/session/SessionContainer";
import { EMDRCheckpointDialog } from "@/components/session/EMDRCheckpointDialog";
import { SessionEndDialog } from "@/components/session/SessionEndDialog";
import { useSidebar } from "@/components/ui/sidebar";

function SessionContent() {
  const { open, setOpen } = useSidebar();

  const handleContentClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <>
      <SettingsSidebar />
      <SettingsSidebarTrigger className="absolute top-2 left-4 z-10" />
      <div className="w-full" onClick={handleContentClick}>
        <SessionContainer />
      </div>
    </>
  );
}

const Session = () => {
  return (
    <>
      <EMDRCheckpointDialog />
      <SessionEndDialog />
      <div className="w-full p-4 pt-0 flex relative">
        <SettingsSidebarWrapper defaultOpen={false} className="min-h-0">
          <SessionContent />
        </SettingsSidebarWrapper>
      </div>
    </>
  );
};
export default Session;
