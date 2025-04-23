import { useQuery } from "@tanstack/react-query";
import { getMyProjectOffers } from "../../api/apiProjectOffers";

export function useMyProjectOffers() {
  const {
    data: myProjectOffers,
    isLoading: isGettingMyProjectOffers,
    isError: isErrorGettingMyProjectOffers,
  } = useQuery({
    queryKey: ["myProjectOffers"],
    queryFn: () => getMyProjectOffers(),
    onError: (error) => {
      console.error("Error fetching my project offers:", error);
    },
  });

  return {
    myProjectOffers,
    isGettingMyProjectOffers,
    isErrorGettingMyProjectOffers,
  };
}
