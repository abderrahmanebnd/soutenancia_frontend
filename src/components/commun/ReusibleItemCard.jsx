import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { getAllSkills, viewLessText } from "@/utils/helpers";
import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";
import MessageDialog from "@/modules/student/features/team-management/MessageDialog";
import { useCurrentLeaderTeamOffer } from "@/modules/student/features/team-offers/useCurrentLeaderTeamOffer";
import WarningDialog from "./WarningDialog";
import LeaderApplyDialog from "@/modules/student/features/team-management/LeaderApplyDialog";

import ButtonWithSpinner from "./ButtonWithSpinner";
import { Camera } from "lucide-react";

function ReusibleItemCard({ data }) {
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
      <CardHeader>
        <CardTitle className="text-2xl text-primary mb-1 text-center">
          {title}
        </CardTitle>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="team offer image"
            className="w-full max-h-36 object-cover rounded-lg"
          />
        ) : (
          <div className="relative">
            <img
              src="/assets/team-offer-image-not-found.webp"
              alt="team offer image"
              className="w-full max-h-36 object-cover rounded-lg brightness-50"
            />
            <Camera
              size={40}
              className="text-section absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            />
          </div>
        )}
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
