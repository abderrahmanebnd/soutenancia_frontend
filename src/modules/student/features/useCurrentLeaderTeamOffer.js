import { useQuery } from "@tanstack/react-query";
import { getCurrentLeaderTeamOffer } from "../api/apiStudent";
import toast from "react-hot-toast";

export function useCurrentLeaderTeamOffer() {
  const {
    data: dataTeamOffer,
    isLoading: isLoadingCurrentLeaderTeamOffer,
    isError,
  } = useQuery({
    queryKey: ["myTeamOffer"],
    queryFn: () => getCurrentLeaderTeamOffer(),
    onError: (error) => {
      console.error("Error fetching team leader offer:", error);
      toast.error("Failed to get your team offer . Please try again later.");
    },
  });
  return {
    dataTeamOffer,
    isLoadingCurrentLeaderTeamOffer,
    isError,
  };
}
