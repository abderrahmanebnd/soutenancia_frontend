// features/team-management/useUpdateTeamApplication.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/api/axios";
import toast from "react-hot-toast";

export function useUpdateApplication() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async ({ idApplication, status }) => {
      if (!idApplication) {
        throw new Error("Application ID is required");
      }
      const response = await axiosPrivate.patch(`/teamApplications/${idApplication}`, { status });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries(["teamApplications"]);
      queryClient.invalidateQueries(["myApplications"]);
      
      // Optimistically update the specific application
      queryClient.setQueryData(["myApplications"], (old) => {
        if (!old) return old;
        return {
          ...old,
          applications: old.applications.map(app => 
            app.id === variables.idApplication 
              ? { ...app, status: variables.status }
              : app
          )
        };
      });
      
      toast.success(`Application ${variables.status} successfully`);
    },
    onError: (error, variables) => {
      console.error("Error updating application:", error);
      toast.error(error.message || "Failed to update application");
      
      // Revert optimistic update if error occurs
      queryClient.invalidateQueries(["myApplications"]);
    },
    retry: 1,
    retryDelay: 1000
  });

  return {
    updateTeamApplication: mutation.mutateAsync, // Using mutateAsync for better error handling
    isUpdating: mutation.isPending,
  };
}