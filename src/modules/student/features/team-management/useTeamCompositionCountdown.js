import { useQuery } from "@tanstack/react-query";
import { getTeamCompositionCountdown } from "../../api/apiStudentTeam";

export function useTeamCompositionCountdown() {
  const {
    data: teamComposition,
    isLoading: isLoadingTeamComposition,
    isError: isErrorGettingTeamCompositionCountdown,
  } = useQuery({
    queryKey: ["teamCompositionCountdown"],
    queryFn: () => getTeamCompositionCountdown(),
    onError: (error) => {
      console.error("Error fetching team composition countdown:", error);
    },
  });
  return {
    teamComposition,
    isLoadingTeamComposition,
    isErrorGettingTeamCompositionCountdown,
  };
}
