import { useNavigate, useParams } from "react-router";
import { useProjectOfferDetails } from "../features/project-offers/useProjectOfferDetails";
import Spinner from "@/components/commun/Spinner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import TeacherAndCoSupervisorsCard from "../components/TeacherAndCoSupervisorsCard";

function ProjectOfferDetails() {
  const navigate = useNavigate();
  const { idProjectOfferDetails } = useParams();
  const {
    projectOfferDetails,
    isGettingProjectOfferDetails,
    isErrorGettingProjectOfferDetails,
  } = useProjectOfferDetails(idProjectOfferDetails);

  const handleClose = () => {
    navigate(-1);
  };

  if (isGettingProjectOfferDetails) return <Spinner />;
  if (isErrorGettingProjectOfferDetails) {
    return (
      <div className="text-red-500">Error loading project offer details</div>
    );
  }
  return (
    <div>
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-2 sticky top-0 z-10 bg-background border-b">
            <DialogTitle className="text-2xl font-semibold text-primary">
              {projectOfferDetails.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Project details and requirements
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1">
            <div className="px-6 pb-2">
              <h1 className="font-semibold text-primary">Description :</h1>
              <p className="text-muted-foreground">
                {projectOfferDetails.description}
              </p>
            </div>

            <div className="p-6 pt-0 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">
                    Basic Informations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm font-medium">Years:</div>
                    <div className="flex gap-2 flex-wrap items-center">
                      {projectOfferDetails?.specialities.map((speciality) => (
                        <Badge
                          className="w-fit"
                          variant="outline"
                          key={speciality.id}
                        >
                          {speciality.year} year
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm font-medium">Specialities:</div>
                    <div className="flex gap-2 flex-wrap items-center">
                      {projectOfferDetails?.specialities.map((speciality) => (
                        <Badge
                          className="w-fit"
                          variant="outline"
                          key={speciality.id}
                        >
                          {speciality.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm font-medium">Max Teams:</div>
                    <Badge className="w-fit" variant="outline">
                      {projectOfferDetails.maxTeamsNumber} students
                    </Badge>
                    <div className="text-sm font-medium">
                      Current Team Number :
                    </div>
                    <Badge className="w-fit" variant="outline">
                      {projectOfferDetails.assignedTeams.length} out of{" "}
                      {projectOfferDetails.maxTeamsNumber}
                    </Badge>
                    <div className="text-sm font-medium">Assignment:</div>
                    <Badge className="w-fit" variant="outline">
                      {projectOfferDetails.assignmentType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <TeacherAndCoSupervisorsCard
                teacherObject={projectOfferDetails?.teacher}
                coSupervisorsArray={projectOfferDetails?.coSupervisors}
              />
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">
                    Tools Required
                  </CardTitle>
                  <CardDescription>
                    Most essential tools and technologies required for this
                    project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {projectOfferDetails?.tools?.map((tool, index) => (
                      <Badge key={index}>{tool}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">
                    languages Required
                  </CardTitle>
                  <CardDescription>
                    Specific languages required for this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {projectOfferDetails?.languages?.map((language, index) => (
                      <Badge key={index}>{language}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {projectOfferDetails?.fileUrl && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">
                      Attachments
                    </CardTitle>
                    <CardDescription>
                      Additional files related to the project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <p className="text-sm p-2 bg-background rounded-md border border-muted-foreground flex-1 max-w-full truncate">
                      {projectOfferDetails?.fileUrl}
                    </p>
                    <Button
                      variant="outline"
                      className="text-xs "
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(projectOfferDetails?.fileUrl, "_blank");
                      }}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      Open
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            <DialogFooter className="p-4 sticky bottom-0 z-10 bg-background border-t">
              <Button className="w-full" onClick={handleClose}>
                Continue
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProjectOfferDetails;
