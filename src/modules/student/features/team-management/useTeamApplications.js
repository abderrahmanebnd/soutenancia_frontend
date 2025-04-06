import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTeamApplications } from "../../api/apiStudentApplication";

export function useTeamApplications() {
  const {
    data: teamApplicationsData,
    isLoading: isGettingTeamApplications,
    isError,
  } = useQuery({
    queryKey: ["teamApplications"],
    /* TODO:"add this teamApplications to the query key of the ApplyToOffer" */
    queryFn: () => getTeamApplications(),
    onError: (error) => {
      console.error("Error fetching team applications:", error);
      toast.error(
        "Error getting your team applications, please try again later."
      );
    },
  });

  return {
    data: teamApplicationsData,
    isLoading: isGettingTeamApplications,
    isError,
  };
}
