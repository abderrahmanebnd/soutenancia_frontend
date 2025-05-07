import { useQuery } from "@tanstack/react-query";
import { getSingleSprintByProject } from "../../api/apiStudentSprints";

export function useSingleSprintByProject(projectId, sprintId) {
  const {
    data: sprintData,
    isLoading: isGettingSprint,
    isError: isErrorGettingSprint,
  } = useQuery({
    queryKey: ["sprint", sprintId],
    queryFn: () => getSingleSprintByProject(projectId, sprintId),
    onError: (error) => {
      console.error("Error fetching the sprint :", error);
    },
  });

  return {
    sprintData,
    isGettingSprint,
    isErrorGettingSprint,
  };
}
