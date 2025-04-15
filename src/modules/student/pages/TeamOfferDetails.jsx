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
import { useNavigate, useParams } from "react-router";
import { useTeamOffer } from "../features/team-offers/useTeamOffer";
import Spinner from "@/components/commun/Spinner";
import LeaderAndMembersCard from "../components/LeaderAndMembersCard";

function TeamOfferDetails() {
  const navigate = useNavigate();
  const { idTeamOfferDetails } = useParams();
  const { teamOfferDetails, isLoading, isError } =
    useTeamOffer(idTeamOfferDetails);

  if (isLoading) return <Spinner />;
  if (isError) {
    return <div className="text-red-500">Error loading team offer details</div>;
  }

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div>
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-2 sticky top-0 z-10 bg-background border-b">
            <DialogTitle className="text-2xl font-semibold text-primary">
              {teamOfferDetails.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Team details and requirements
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1">
            <div className="px-6 pb-2">
              <h1 className="font-semibold text-primary">Description :</h1>
              <p className="text-muted-foreground">
                {teamOfferDetails.description}
              </p>
            </div>

            <div className="p-6 pt-0 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Year:</div>
                    <Badge className="w-fit" variant="outline">
                      {teamOfferDetails.year} year
                    </Badge>

                    <div className="text-sm font-medium">Speciality:</div>
                    <Badge className="w-fit" variant="outline">
                      {teamOfferDetails.speciality}
                    </Badge>

                    <div className="text-sm font-medium">Max Students:</div>
                    <Badge className="w-fit" variant="outline">
                      {teamOfferDetails.max_members} students
                    </Badge>
                    <div className="text-sm font-medium">
                      Current Team Members :
                    </div>
                    <Badge className="w-fit" variant="outline">
                      {teamOfferDetails._count.TeamMembers} out of{" "}
                      {teamOfferDetails.max_members}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <LeaderAndMembersCard
                leaderObject={teamOfferDetails?.leader}
                teamMembersArray={teamOfferDetails?.TeamMembers}
              />
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">
                    General Skills
                  </CardTitle>
                  <CardDescription>
                    Most essential skills and technologies required for this
                    team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {teamOfferDetails?.general_required_skills?.map(
                      (skill, index) => (
                        <Badge key={index}>{skill.name}</Badge>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">
                    Custom Skills
                  </CardTitle>
                  <CardDescription>
                    Specific skills and technologies required for this team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {teamOfferDetails.specific_required_skills.length > 0 ? (
                      teamOfferDetails?.specific_required_skills?.map(
                        (skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        )
                      )
                    ) : (
                      <p className="text-sm text-primary">
                        No specefic skills for this team
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
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

export default TeamOfferDetails;
