import { useQuery } from "@tanstack/react-query";
import { getSpecialities } from "@/api/apiSpecialities";

export function useSpecialities() {
  const {
    data: specialities,
    isLoading: isGettingSpecialities,
    isError: isErrorGettingSpecialities,
  } = useQuery({
    queryKey: ["specialities"],
    queryFn: () => getSpecialities(),
    onError: (error) => {
      console.error("Error fetching specialities:", error);
    },
  });

  return {
    specialities,
    isGettingSpecialities,
    isErrorGettingSpecialities,
  };
}
