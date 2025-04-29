import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getMyProjectApplications,
  cancelApplication, // Added import
  applyToProject     // Added import
} from "../../api/apimyprojectapplication";

export function useMyProjectApplications() {
  const queryClient = useQueryClient();

  const { data: applicationsData, isLoading, isError } = useQuery({
    queryKey: ["myProjectApplications"],
    queryFn: getMyProjectApplications,
    select: (data) => {
      const applications = data?.data || [];
      return {
        applications,
        hasPending: applications.some(app => app.status === "pending"),
        hasAccepted: applications.some(app => app.status === "accepted"),
        activeApplications: applications.filter(app => 
          ["pending", "accepted"].includes(app.status)
        ),
        completedApplications: applications.filter(app =>
          ["rejected", "canceled"].includes(app.status)
        )
      };
    }
  });

  const { mutate: cancelApplication, isLoading: isCanceling } = useMutation({
    mutationFn: cancelApplication, // Fixed function reference
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjectApplications"]);
    }
  });

  const { mutate: applyToProject, isLoading: isApplying } = useMutation({
    mutationFn: ({ projectOfferId, teamOfferId, message }) => 
      applyToProject(projectOfferId, teamOfferId, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjectApplications"]);
    }
  });

  return {
    applicationsData,
    isLoading,
    isError,
    cancelApplication,
    applyToProject,
    isCanceling,
    isApplying
  };
}