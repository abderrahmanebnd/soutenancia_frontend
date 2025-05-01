import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { viewLessText } from "@/utils/helpers";
import { Briefcase, Calendar, Cpu, User, Users } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";
import ProjectMessageDialog from "@/modules/student/features/project-offers/ProjectMessageDialog";
function ProjectOfferCard({ data }) {
  const {
    title,
    description,
    maxTeamsNumber,
    tools,
    specialities,
    year,
    id: projectOfferId,
    assignmentType,
  } = data;
  const currentYear = new Date().getFullYear();
  const { currentUser } = useAuth();
  const userRole = currentUser?.user.role;
  const teamOfferId =
    currentUser?.user?.Student?.TeamMember?.at(0)?.teamOfferId;

  const isInTeam = currentUser?.user?.Student?.isInTeam;
  const isLeader = currentUser?.user?.Student?.isLeader;
  const isInProject =
    currentUser?.user?.Student?.TeamOffer?.at(0)?.assignedProjectId !== null;
  return (
    <Card className="w-full flex flex-col overflow-hidden transition-all  hover:shadow-md  duration-300">
      <CardHeader className="p-3">
        <CardTitle className="p-4 text-xl border-y-4 border-y-primary rounded-lg mb-1 text-center text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex-grow space-y-3">
        <div>
          <h4 className="text-sm font-semibold">Description:</h4>
          <p className=" text-sm text-muted-foreground">
            {viewLessText(description)}
          </p>
        </div>
        <div className="space-y-1 ">
          <h4 className="text-sm font-semibold flex items-center gap-1">
            <Cpu size={20} />
            <span>Tools Required:</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <Badge key={index}>{tool}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold flex items-center gap-1">
            <Briefcase size={20} />
            <span>Tagret Specialities:</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {specialities.map((speciality, index) => (
              <Badge key={index}>{speciality.name}</Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-12 gap-y-3 flex-wrap">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <User size={20} />
              <span>Grade :</span>
            </h4>
            <div className="flex flex-wrap gap-1">
              {specialities.map((speciality, index) => (
                <Badge key={index} variant="outline">
                  {speciality.year} year
                </Badge>
              ))}
            </div>
          </div>
          {year !== currentYear && (
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold flex items-center gap-1">
                <Calendar size={20} />
                <span>Year :</span>
              </h4>
              <Badge variant="outline">{year}</Badge>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold flex items-center gap-1">
            <Users size={20} />
            <span>Max Teams :</span>
          </h4>
          <Badge variant="outline">{maxTeamsNumber} teams</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-3 p-3 ">
        <Button variant="outline" className="w-1/2" asChild>
          <Link to={`/${userRole}/project-offers/${projectOfferId}`}>
            View Details <span>•••</span>
          </Link>
        </Button>
        {assignmentType === "teacherApproval" &&
          userRole === "student" &&
          isInTeam &&
          isLeader &&
          !isInProject && (
            <ProjectMessageDialog
              projectOfferId={projectOfferId}
              teamOfferId={teamOfferId}
            />
          )}
      </CardFooter>
    </Card>
  );
}

export default ProjectOfferCard;
