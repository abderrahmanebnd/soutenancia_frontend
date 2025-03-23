import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "@/context/SessionContext";

import { Link, useLocation } from "react-router";

function SessionSidebarContent() {
  const location = useLocation();
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const { sessionSidebarLinks } = useSession();
  function handleCloseSidebar() {
    if (isMobile) {
      setOpenMobile(false);
    }
    setOpen(false);
  }
  return (
    <SidebarContent>
      {sessionSidebarLinks.navMain.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    size="lg"
                  >
                    <Link to={item.url} onClick={handleCloseSidebar}>
                      <item.icon />

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}

export default SessionSidebarContent;
