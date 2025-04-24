import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getProjectOfferbyId } from "../../api/apiProjectOffers";

export function useProjectOfferDetails(idProjectOffer) {
  const {
    data: projectOfferDetails,
    isLoading: isGettingProjectOfferDetails,
    isError: isErrorGettingProjectOfferDetails,
  } = useQuery({
    queryKey: ["projectOffer", idProjectOffer],
    queryFn: () => getProjectOfferbyId(idProjectOffer),
    onError: (error) => {
      console.error("Error fetching project offer details:", error);
      toast.error(
        "Failed to get project offer details. Please try again later."
      );
    },
  });
  return {
    projectOfferDetails,
    isGettingProjectOfferDetails,
    isErrorGettingProjectOfferDetails,
  };
}
