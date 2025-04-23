import { useQuery } from "@tanstack/react-query";
import { getProjectOffersHistory } from "../../api/apiProjectOffers";

export function useProjectOffersHistory() {
  const {
    data: previousProjectOffers,
    isLoading: isGettingPreviousProjectOffers,
    isError: isErrorGettingPreviousProjectOffers,
  } = useQuery({
    queryKey: ["projectOffersHistory"],
    queryFn: () => getProjectOffersHistory(),
    onError: (error) => {
      console.error("Error fetching project offers history:", error);
    },
  });

  return {
    previousProjectOffers,
    isGettingPreviousProjectOffers,
    isErrorGettingPreviousProjectOffers,
  };
}
