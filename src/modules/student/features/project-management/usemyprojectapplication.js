import { useQuery } from "@tanstack/react-query";
import { getMyProjectApplications } from "../../api/apiMyProjectApplications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelApplication, joinTeam } from "../../api/apiTeamApplications"

export function useMyProjectApplications() {
  return useQuery({
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
    },
    retry: (failureCount, error) => {
      if (error.message.includes("don't have permission")) return false;
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching applications:", error);
    }
  });
}
export function useUpdateApplication() {
    const queryClient = useQueryClient();
  
    const cancelMutation = useMutation({
      mutationFn: cancelApplication,
      onSuccess: () => {
        queryClient.invalidateQueries(["myProjectApplications"]);
      },
    });
  
    const joinMutation = useMutation({
      mutationFn: ({ projectId, teamOfferId, message }) => 
        joinTeam(projectId, teamOfferId, message),
      onSuccess: () => {
        queryClient.invalidateQueries(["myProjectApplications"]);
      },
    });
  
    return {
      updateTeamApplication: cancelMutation.mutateAsync,
      joinTeamApplication: joinMutation.mutateAsync,
      isUpdating: cancelMutation.isLoading || joinMutation.isLoading,
    };
  }