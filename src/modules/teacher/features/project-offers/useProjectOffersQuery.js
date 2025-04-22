import { useQuery } from "@tanstack/react-query";
import { getProjectOffers } from "../../api/apiProjectOffers";

export function useProjectOffersQuery() {
  const {
    data: projectOffersData,
    isLoading: isGettingProjectOffers,
    isError: isErrorGettingProjectOffers,
  } = useQuery({
    queryKey: ["projectOffers"],
    queryFn: () => getProjectOffers(),
    onError: (error) => {
      console.error("Error fetching project offers:", error);
    },
  });

  return {
    projectOffersData,
    isGettingProjectOffers,
    isErrorGettingProjectOffers,
  };
}
