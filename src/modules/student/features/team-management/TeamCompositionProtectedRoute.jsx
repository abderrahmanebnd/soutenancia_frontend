import { getTimeRemaining } from "@/utils/helpers";
import { useTeamCompositionCountdown } from "./useTeamCompositionCountdown";
import Spinner from "@/components/commun/Spinner";
import { Navigate } from "react-router";

function TeamCompositionProtectedRoute({ children }) {
  const {
    teamComposition,
    isLoadingTeamComposition,
    isErrorGettingTeamCompositionCountdown,
  } = useTeamCompositionCountdown();

  const endDate = teamComposition?.at(0)?.endDate;

  const timeRemaining = getTimeRemaining(endDate);

  if (isLoadingTeamComposition) return <Spinner />;

  if (isErrorGettingTeamCompositionCountdown) {
    return <div>error getting team composition countdown</div>;
  }

  if (
    timeRemaining.daysRemaining === 0 &&
    timeRemaining.hoursRemaining === 0 &&
    timeRemaining.minutesRemaining === 0
  ) {
    return <Navigate replace to="/student/team-composition-unauthorized" />;
  }
  // if the timeRemaining > 0, then the user can access the route
  return children;
}

export default TeamCompositionProtectedRoute;
