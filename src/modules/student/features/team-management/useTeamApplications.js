import { useQuery } from "@tanstack/react-query";

import { getTeamApplications } from "../../api/apiStudentApplication";

export function useTeamApplications() {
  const {
    data: teamApplicationsData,
    isLoading: isGettingTeamApplications,
    isError: isErrorGettingTeamApplications,
    error,
  } = useQuery({
    queryKey: ["teamApplications"],
    queryFn: () => getTeamApplications(),
    onError: (error) => {
      console.error("Error fetching team applications:", error);
    },
  });

  return {
    teamApplicationsData,
    isGettingTeamApplications,
    isErrorGettingTeamApplications,
    error,
  };
}