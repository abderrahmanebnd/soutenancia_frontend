import SessionBreadcrumb from "@/components/commun/SessionBreadcrumb";
import SessionSidebar from "@/components/commun/SessionSidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSessionSidebarData } from "@/utils/getSessionSidebarData";

import { Outlet } from "react-router";

function StudentLayout() {
  const data = getSessionSidebarData("student");

  return (
    <SidebarProvider>
      <SessionSidebar
        dashboard="Student Dashboard"
        sessionSidebarLinks={data}
      />
      <SidebarInset>
        <SessionBreadcrumb />
        <main className="bg-red-500 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default StudentLayout;
