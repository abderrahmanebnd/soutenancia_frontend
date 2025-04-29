import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link } from "react-router";

function TeacherMyProjectCard({ projectData }) {
  const {
    title,
    description,
    id: projectOfferId,
    assignmentType,
  } = projectData;
  return (
    <div className="min-h-64 bg-[url('/assets/header-background2.jpg')]  bg-cover bg-no-repeat bg-center rounded-xl shadow-sm p-5 flex flex-col">
      <div className="flex-1">
        <h1 className="text-section text-xl font-semibold">{title}</h1>
        <h2 className="text-section font-light">{description}</h2>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full bg-transparent border hover:bg-section hover:text-primary font-semibold">
              View Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-primary">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem asChild className="text-primary">
              <Link to={`/teacher/project-offers/${projectOfferId}`}>
                View Details
              </Link>
            </DropdownMenuItem>

            {assignmentType === "teacherApproval" && (
              <DropdownMenuItem asChild className="text-primary">
                <Link to={`project-applications/${projectOfferId}`}>
                  Manage Application
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild className="text-primary">
              <Link to={`edit/${projectOfferId}`}>Edit Project Offer</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TeacherMyProjectCard;
