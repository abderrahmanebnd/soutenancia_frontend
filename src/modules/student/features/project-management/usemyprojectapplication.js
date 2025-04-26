import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getMyProjectApplications, 
  cancelApplication, 
  applyToProject
} from "../../api/apimyprojectapplication";

export function useMyProjectApplications() {
  const queryClient = useQueryClient();

  const applicationsQuery = useQuery({
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

  const cancelMutation = useMutation({
    mutationFn: cancelApplication,
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjectApplications"]);
    }
  });

  const applyMutation = useMutation({
    mutationFn: ({ projectOfferId, teamOfferId, message }) => 
      applyToProject(projectOfferId, teamOfferId, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjectApplications"]);
    }
  });

  return {
    ...applicationsQuery,
    cancelApplication: cancelMutation.mutateAsync,
    applyToProject: applyMutation.mutateAsync,
    isCanceling: cancelMutation.isLoading,  
    isApplying: applyMutation.isLoading    
  };
}