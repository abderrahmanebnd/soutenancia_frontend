import {
  Sidebar,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import SessionSidebarHeader from "./SessionSidebarHeader";
import SessionSidebarContent from "./SessionSidebarContent";

function SessionSidebar({ dashboard, sessionSidebarLinks }) {
  return (
    <Sidebar>
      <SidebarRail />
      <SessionSidebarHeader dashboard={dashboard} />
      <SidebarSeparator />
      <SessionSidebarContent sessionSidebarLinks={sessionSidebarLinks} />
    </Sidebar>
  );
}
export default SessionSidebar;
