// hooks/useGetSpecialities.ts
import { useQuery } from "@tanstack/react-query";
import { getSpecialities } from "../../api/apiSpecialities";

export const useGetSpecialities = () => {
  return useQuery({
    queryKey: ["specialities"],
    queryFn: getSpecialities,
    select: (data) => {
      return {
        specialities: data.data || [],
        count: data.results || 0,
      };
    },
    onError: (error) => {
      console.error("Specialities fetch error:", error.message);
    },

  });
};