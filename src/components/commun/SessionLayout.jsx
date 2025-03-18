import SessionHeader from "@/components/commun/SessionHeader";

import SessionSidebar from "@/components/commun/SessionSidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router";

function SessionLayout() {
  return (
    <SidebarProvider>
      <SessionSidebar />
      <SidebarInset className="p-6">
        <SessionHeader />

        <main className=" mt-6 md:mt-10">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default SessionLayout;
