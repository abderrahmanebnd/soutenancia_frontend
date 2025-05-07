import { useQuery } from "@tanstack/react-query";
import { getAllSprintsByProject } from "../../api/apiStudentSprints";

export function useAllSprintsByProject(projectId) {
  const {
    data: allSprintsData,
    isLoading: isGettingAllSprints,
    isError: isErrorGettingAllSprints,
  } = useQuery({
    queryKey: ["allSprintsByProject"],
    queryFn: () => getAllSprintsByProject(projectId),
    onError: (error) => {
      console.error("Error fetching all sprints by project:", error);
    },
  });

  return {
    allSprintsData,
    isGettingAllSprints,
    isErrorGettingAllSprints,
  };
}
