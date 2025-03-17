import {
  Sidebar,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import SessionSidebarHeader from "./SessionSidebarHeader";
import SessionSidebarContent from "./SessionSidebarContent";

function SessionSidebar({ dashboardTitle, sessionSidebarLinks }) {
  return (
    <Sidebar>
      <SidebarRail />
      <SessionSidebarHeader dashboardTitle={dashboardTitle} />
      <SidebarSeparator />
      <SessionSidebarContent sessionSidebarLinks={sessionSidebarLinks} />
    </Sidebar>
  );
}
export default SessionSidebar;
