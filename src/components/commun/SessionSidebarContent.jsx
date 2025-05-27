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
import { User, LogOut, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link, useLocation } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/features/auth/useLogout";

function SessionSidebarContent() {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();
  const { sessionSidebarLinks } = useSession();
  const { currentUser } = useAuth();
  const user = currentUser?.user;
  const { email, firstName, lastName, role } = user;
  const { logout, isPending } = useLogout();
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
                    <Link to={item.url} onClick={() => setOpenMobile(false)}>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-11/12 mx-auto py-5 rounded-xl ">
            {email}
            <ChevronUp />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none capitalize">
                {firstName} {lastName}{" "}
                <span className="text-muted-foreground">({role})</span>
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {role !== "admin" && (
            <div>
              <DropdownMenuItem onClick className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <Link
                  to={`/${role}/profile`}
                  onClick={() => setOpenMobile(false)}
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          )}
          <DropdownMenuItem
            onClick={() => {
              logout();
              setOpenMobile(false);
            }}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isPending ? "Loging out ..." : "logout"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarContent>
  );
}

export default SessionSidebarContent;
