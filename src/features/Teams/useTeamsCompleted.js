import { useQuery } from "@tanstack/react-query";

import { getTeams } from "@/api/apiTeams";

export function useTeamsCompleted() {
  const {
    data: teamsCompleted,
    isLoading: isGettingTeamsCompleted,
    isError: isErrorGettingTeamsCompleted,
  } = useQuery({
    queryKey: ["allTeamsCompleted"],
    queryFn: () => getTeams(),
    onError: (error) => {
      console.error("Error fetching teams completed:", error);
    },
  });

  return {
    teamsCompleted,
    isGettingTeamsCompleted,
    isErrorGettingTeamsCompleted,
  };
}
