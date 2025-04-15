import { useQuery } from "@tanstack/react-query";
import { getTeamOfferById } from "../../api/apiStudentOffer";
import toast from "react-hot-toast";

export function useTeamOffer(idTeamOffer) {
  const {
    data: teamOfferDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["team", idTeamOffer],
    queryFn: () => getTeamOfferById(idTeamOffer),
    onError: (error) => {
      console.error("Error fetching team offer details:", error);
      toast.error("Failed to get team offer details. Please try again later.");
    },
  });
  return {
    teamOfferDetails,
    isLoading,
    isError,
  };
}
