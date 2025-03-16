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
function SessionBreadcrumb() {
  const location = useLocation();
  const elements = splitRouteIntoElements(location.pathname);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {elements.map((pathElement, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage className="text-primary">
                    {pathElement}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {index < elements.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default SessionBreadcrumb;
