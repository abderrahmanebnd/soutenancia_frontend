import {
  Sidebar,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import SessionSidebarHeader from "./SessionSidebarHeader";
import SessionSidebarContent from "./SessionSidebarContent";

function SessionSidebar() {
  return (
    <Sidebar>
      <SidebarRail />
      <SessionSidebarHeader />
      <SidebarSeparator />
      <SessionSidebarContent />
    </Sidebar>
  );
}
export default SessionSidebar;
