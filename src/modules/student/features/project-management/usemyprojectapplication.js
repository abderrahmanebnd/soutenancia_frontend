import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyProjectApplications,
  cancelApplication,
  applyToProject,
} from "../../api/apimyprojectapplication";
import toast from "react-hot-toast";

export function useMyProjectApplications() {
  const queryClient = useQueryClient();

  const applicationsQuery = useQuery({
    queryKey: ["myProjectApplications"],
    queryFn: getMyProjectApplications,
    onError: (error) => {
      console.error("Error fetching project applications:", error);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: ({ projectOfferId, teamOfferId }) =>
      cancelApplication(projectOfferId, teamOfferId),
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjectApplications"]);
      toast.success("Application canceled successfully");
    },
  });

  const applyMutation = useMutation({
    mutationFn: ({ projectOfferId, teamOfferId, message }) =>
      applyToProject(projectOfferId, teamOfferId, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjectApplications"]);
      toast.success("Application sent successfully");
    },
  });

  return {
    ...applicationsQuery,
    cancelApplication: cancelMutation.mutateAsync,
    applyToProject: applyMutation.mutateAsync,
    isCanceling: cancelMutation.isPending,
    isApplying: applyMutation.isPending,
  };
}
