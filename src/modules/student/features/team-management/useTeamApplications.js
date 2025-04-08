import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTeamApplications } from "../../api/apiStudentApplication";

export function useTeamApplications() {
  const {
    data: teamApplicationsData,
    isLoading: isGettingTeamApplications,
    isError: isErrorGettingTeamApplications,
  } = useQuery({
    queryKey: ["teamApplications"],

    queryFn: () => getTeamApplications(),
    onError: (error) => {
      console.error("Error fetching team applications:", error);
      toast.error(
        "Error getting your team applications, please try again later."
      );
    },
  });

  return {
    teamApplicationsData,
    isGettingTeamApplications,
    isErrorGettingTeamApplications,
  };
}
