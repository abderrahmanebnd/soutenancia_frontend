// features/team-management/useUpdateTeamApplication.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeamApplicationStatus } from "../../api/apiStudentApplication";
import toast from "react-hot-toast";

export function useUpdateTeamApplication() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: ({ idApplication, status }) => {
      if (!idApplication || typeof idApplication !== 'string' && typeof idApplication !== 'number') {
        throw new Error("Invalid application ID");
      }
      return updateTeamApplicationStatus(idApplication, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teamApplications"]);
      queryClient.invalidateQueries(["myApplications"]);
      toast.success("Application status updated successfully");
    },
    onError: (error) => {
      console.error("Error updating application:", error);
      toast.error(error.message || "Failed to update application");
    }
  });

  return {
    updateTeamApplication: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}