import { useQuery } from "@tanstack/react-query";
import { getTeacherApplicationsById } from "../../api/apiProjectApplications";

function useTeacherProjectApplications(idProjectOffer) {
  const {
    data: projectApplications,
    isLoading: isGettingProjectApplications,
    isError: isErrorGettingProjectApplications,
  } = useQuery({
    queryKey: ["projectApplications", idProjectOffer],
    queryFn: () => getTeacherApplicationsById(idProjectOffer),
    onError: (error) => {
      console.error("Error fetching my project applications:", error);
    },
  });

  return {
    projectApplications,
    isGettingProjectApplications,
    isErrorGettingProjectApplications,
  };
}

export default useTeacherProjectApplications;
