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
import { useSidebar } from "@/components/ui/sidebar";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router";
import { useApplyToTeamOffer } from "@/modules/student/features/team-management/useApplyToTeamOffer";
import { useAuth } from "@/context/AuthContext";

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
  const { open } = useSidebar();
  const { currentUser } = useAuth();
  const studentId = currentUser?.user.Student.id;
  const myTeamOffer = leader_id === studentId;
  const { requestJoin, isApplying } = useApplyToTeamOffer(title);
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
      <CardFooter
        className={`flex ${
          open
            ? "flex-col xl:flex-row items-start justify-end xl:items-end xl:justify-between"
            : "flex-col items-start sm:flex-row sm:justify-between sm:items-end "
        } gap-2 pt-2`}
      >
        <Button variant="outline">
          <Link to={teamOfferId}>
            View Details <span>•••</span>
          </Link>
        </Button>
        <Button
          variant="requestJoin"
          onClick={() => requestJoin({ teamOfferId: teamOfferId })}
          disabled={isApplying || myTeamOffer}
        >
          Request To Join
          <CirclePlus className="text-green-600" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ReusibleItemCard;