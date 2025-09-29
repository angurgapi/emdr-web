import { SettingsSidebar } from "@/components/session/SettingsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingsSidebarTrigger } from "@/components/session/SettingsSidebarTrigger";
import SessionBox from "@/components/session/SessionBox";

const Session = () => {
  return (
    <div className="w-full p-4 flex relative">
      <SidebarProvider defaultOpen={false}>
        <SettingsSidebar />
        <SettingsSidebarTrigger className="absolute top-6 left-6 z-10" />
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center">session page</h2>
          <SessionBox />
        </div>
      </SidebarProvider>
    </div>
  );
};
export default Session;
