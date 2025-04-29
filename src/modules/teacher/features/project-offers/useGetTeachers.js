import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../../api/apiTeachers";

export const useGetTeachers = () => {
  const {
    data: teachers,
    isLoading: isGettingTeachers,
    isError: isErrorGettingTeachers,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
    onError: (error) => {
      console.error("Error fetching teachers:", error);
    },
  });

  return { teachers, isGettingTeachers, isErrorGettingTeachers };
};
