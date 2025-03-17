import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";

function SessionSidebarHeader({ dashboardTitle }) {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-center">
          <img src="/assets/Soutenancia.png" alt="Logo" width={170} />
        </SidebarMenuItem>

        <SidebarMenuItem className="flex items-center gap-2 bg-background py-3 px-4 rounded-xl">
          <div className="p-2 rounded-xl bg-primary text-background">
            <Home className="h-5 w-5" />
          </div>
          <span className="text-primary ">{dashboardTitle}</span>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export default SessionSidebarHeader;
