import { getProjectCompositionCountdown } from "@/modules/teacher/api/apiTeacherProjects";
import { useQuery } from "@tanstack/react-query";

export function useProjectCompositionCountdown() {
  const {
    data: projectComposition,
    isLoading: isLoadingProjectComposition,
    isError: isErrorGettingProjectCompositionCountdown,
  } = useQuery({
    queryKey: ["projectCompositionCountdown"],
    queryFn: () => getProjectCompositionCountdown(),
    onError: (error) => {
      console.error("Error fetching project composition countdown:", error);
    },
  });
  return {
    projectComposition,
    isLoadingProjectComposition,
    isErrorGettingProjectCompositionCountdown,
  };
}
