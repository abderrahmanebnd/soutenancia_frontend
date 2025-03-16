import SessionHeader from "@/components/commun/SessionHeader";

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
      <SidebarInset className="p-6">
        <SessionHeader />

        <main className=" mt-6 lg:mt-10">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default StudentLayout;
