import { getTimeRemaining } from "@/utils/helpers";
import Spinner from "@/components/commun/Spinner";
import { Navigate } from "react-router";
import { useProjectCompositionCountdown } from "./useProjectCompositionCountdown";

function ProjectCompositionProtectedRoute({ children }) {
  const {
    projectComposition,
    isLoadingProjectComposition,
    isErrorGettingProjectCompositionCountdown,
  } = useProjectCompositionCountdown();

  const endDate = projectComposition?.at(0)?.endDate;

  const timeRemaining = getTimeRemaining(endDate);

  if (isLoadingProjectComposition) return <Spinner />;

  if (isErrorGettingProjectCompositionCountdown) {
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

export default ProjectCompositionProtectedRoute;
