import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import React from "react";
import { useLocation } from "react-router";
import { splitRouteIntoElements } from "@/utils/helpers";
import { useAuth } from "@/context/AuthContext";
function SessionHeader() {
  const location = useLocation();
  const elements = splitRouteIntoElements(location.pathname);
  const { currentUser } = useAuth();
  const name = currentUser?.user?.firstName;
  return (
    <header className="pt-4 flex flex-col gap-5  h-24 md:h-28 shrink-0   transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-[url('/assets/header-background2.jpg')]  bg-cover bg-no-repeat bg-center rounded-xl">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-secondary" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4 hidden md:block"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {elements.map((pathElement, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage className="text-secondary capitalize">
                    {pathElement}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {index < elements.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block text-secondary" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <p className="text-xl ml-5  text-secondary font-thin hidden md:block">
        Welcome to your dashboard{" "}
        <span className=" italic font-bold capitalize ">{name} !</span>
      </p>
    </header>
  );
}

export default SessionHeader;
