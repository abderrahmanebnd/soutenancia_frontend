import { useQuery } from "@tanstack/react-query";
import { getAllStudents } from "../../api/apiuser";

export function useAllStudents(filterCriteria) {
  const {
    data: allStudents,
    isLoading: isLoadingAllStudents,
    isError: isErrorGettingAllStudents,
  } = useQuery({
    queryKey: ["allStudents", filterCriteria],
    queryFn: () => getAllStudents(filterCriteria),
    onError: (error) => {
      console.error("Error fetching all students:", error);
    },
  });
  return {
    allStudents,
    isLoadingAllStudents,
    isErrorGettingAllStudents,
  };
}
