import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAllSkills, viewLessText } from "@/utils/helpers";
import { Link } from "react-router";
import { useApplyToTeamOffer } from "@/modules/student/features/team-management/useApplyToTeamOffer";
import { useAuth } from "@/context/AuthContext";
import MessageDialog from "@/modules/student/features/team-management/MessageDialog";
import { useCurrentLeaderTeamOffer } from "@/modules/student/features/team-offers/useCurrentLeaderTeamOffer";
import WarningDialog from "./WarningDialog";
import LeaderApplyDialog from "@/modules/student/features/team-management/LeaderApplyDialog";

import ButtonWithSpinner from "./ButtonWithSpinner";

function ReusibleItemCard({ data }) {
  //fot the moment the reusibleItemCard is used only for the team offers and not so reusible but in the futur i will make it reusible depending on the cards that we would get

  const {
    id: teamOfferId,
    leader_id,
    title,
    description,
    general_required_skills,
    specific_required_skills,
    imageUrl,
    max_members,
  } = data;

  const { currentUser } = useAuth();
  const { dataTeamOffer, isLoadingCurrentLeaderTeamOffer, isError } =
    useCurrentLeaderTeamOffer();
  const countTeamMembers = dataTeamOffer?.TeamMembers?.length;
  const studentId = currentUser?.user.Student.id;
  const isLeader = currentUser?.user.Student.isLeader;
  const isInTeam = currentUser?.user.Student.isInTeam;

  const myTeamOffer = leader_id === studentId;
  const allSkills = getAllSkills(
    general_required_skills,
    specific_required_skills
  );

  return (
    <Card className="w-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-20 w-20 border-2 border-muted ">
          <AvatarImage src={imageUrl} alt="team logo" />
          <AvatarFallback className="text-lg">logo</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <h4 className="text-sm font-semibold">Description:</h4>
        <p className="mb-4 text-sm text-muted-foreground">
          {viewLessText(description)}
        </p>
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-semibold">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((technologie, index) => (
              <Badge key={index} className="rounded-full">
                {technologie}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold">Team Size : </h4>
          <Badge variant="outline">{max_members}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2 justify-between items-center flex-wrap">
        <Button variant="outline">
          <Link to={teamOfferId}>
            View Details <span>•••</span>
          </Link>
        </Button>
        {isLeader && isLoadingCurrentLeaderTeamOffer && (
          <ButtonWithSpinner
            variant="requestJoin"
            disabled={true}
            className="w-1/2"
          />
        )}
        {isLeader && isError && (
          <Button
            variant="requestJoin"
            disabled="true"
            className="text-destructive border-destructive"
          >
            Cannot apply for the moment
          </Button>
        )}
        {isLeader && countTeamMembers > 1 && !isError && <WarningDialog />}
        {isLeader && countTeamMembers === 1 && !isError && (
          <LeaderApplyDialog
            title={title}
            teamOfferId={teamOfferId}
            myTeamOffer={myTeamOffer}
            isLoadingData={isLoadingCurrentLeaderTeamOffer}
          />
        )}
        {!isLeader && !isInTeam && (
          <MessageDialog
            title={title}
            teamOfferId={teamOfferId}
            myTeamOffer={myTeamOffer}
          />
        )}
        {!isLeader && isInTeam && <WarningDialog />}
      </CardFooter>
    </Card>
  );
}

export default ReusibleItemCard;