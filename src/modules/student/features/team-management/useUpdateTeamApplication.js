import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeamApplicationStatus } from "../../api/apiStudentApplication";
import toast from "react-hot-toast";

export function useUpdateTeamApplication(applicationId) {
  const queryClient = useQueryClient();
  const {
    mutate: updateTeamApplication,
    isPending: isUpdatingTeamApplication,
  } = useMutation({
    mutationFn: (status) => updateTeamApplicationStatus(status, applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries(["teamApplications"]);
      toast.success("Team Application status updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating team application status:", error);
      toast.error(
        "Failed to update team application status. Please try again later."
      );
    },
  });
  return {
    updateTeamApplication,
    isUpdatingTeamApplication,
  };
}
