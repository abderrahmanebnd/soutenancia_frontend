import { getAssignmentTypes } from "@/api/apiAssignmentType";
import { useQuery } from "@tanstack/react-query";

export function useAssignmentTypes() {
  const {
    data: assignmentTypes,
    isLoading: isGettingAssignmentTypes,
    isError: isErrorGettingAssignmentTypes,
  } = useQuery({
    queryKey: ["assignmentTypes"],
    queryFn: () => getAssignmentTypes(),

    onError: (error) => {
      console.error("Error fetching assignment types:", error);
    },
  });

  return {
    assignmentTypes,
    isGettingAssignmentTypes,
    isErrorGettingAssignmentTypes,
  };
}
