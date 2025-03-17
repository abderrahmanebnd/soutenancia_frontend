import SessionHeader from "@/components/commun/SessionHeader";

import SessionSidebar from "@/components/commun/SessionSidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router";

function SessionLayout({ dashboardTitle, sessionSidebarLinks }) {
  return (
    <SidebarProvider>
      <SessionSidebar
        dashboardTitle={dashboardTitle}
        sessionSidebarLinks={sessionSidebarLinks}
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

export default SessionLayout;
