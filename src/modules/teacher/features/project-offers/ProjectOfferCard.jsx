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
import { Briefcase, Calendar, Cpu, Users } from "lucide-react";
function ProjectOfferCard({ data }) {
  const {
    title,
    description,
    targetSpecialities,
    maxTeams,
    toolsRequired,
    year,
  } = data;

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
            {toolsRequired.map((tool, index) => (
              <Badge key={index} variant="outline">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold flex items-center gap-1">
            <Briefcase size={20} />
            <span>Tagret Specialities:</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {targetSpecialities.map((speciality, index) => (
              <Badge key={index}>{speciality}</Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold flex items-center gap-1">
            <Calendar size={20} />
            <span>Year :</span>
          </h4>
          <p className="text-sm font-semibold">{year}</p>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold flex items-center gap-1">
            <Users size={20} />
            <span>Max Teams :</span>
          </h4>
          <Badge variant="outline">{maxTeams} teams</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          View Details <span>•••</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProjectOfferCard;
