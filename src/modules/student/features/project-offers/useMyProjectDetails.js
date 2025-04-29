import { useQuery } from "@tanstack/react-query";
import { getMyProjectDetails } from "../../api/apiStudentProject";

export function useMyProjectDetails() {
  const {
    data: projectDetails,
    isLoading: isLoadingProjectDetails,
    isError: isErrorGettingProjectDetails,
    error,
  } = useQuery({
    queryKey: ["myProjectDetails"],
    queryFn: () => getMyProjectDetails(),
    onError: (error) => {
      console.error("Error fetching my project details:", error);
    },
  });
  return {
    projectDetails,
    isLoadingProjectDetails,
    isErrorGettingProjectDetails,
    error,
  };
}
