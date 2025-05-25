import { useQuery } from "@tanstack/react-query";
import { getAllTeachers } from "../../api/apiuser";

export function useAllTeachers(filterCriteria) {
  const {
    data: allTeachers,
    isLoading: isLoadingAllTeachers,
    isError: isErrorGettingAllTeachers,
  } = useQuery({
    queryKey: ["allTeachers", filterCriteria],
    queryFn: () => getAllTeachers(filterCriteria),
    onError: (error) => {
      console.error("Error fetching my project details:", error);
    },
  });
  return {
    allTeachers,
    isLoadingAllTeachers,
    isErrorGettingAllTeachers,
  };
}
