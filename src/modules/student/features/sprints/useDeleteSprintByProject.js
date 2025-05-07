import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSprintByProject } from "../../api/apiStudentSprints";
import toast from "react-hot-toast";

export function useDeleteSprintByProject() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteSprint,
    isPending: isDeletingSprint,
    isSuccess: isSuccessDeletingSprint,
  } = useMutation({
    mutationFn: ({ projectId, sprintId }) =>
      deleteSprintByProject(projectId, sprintId),
    onSuccess: () => {
      queryClient.invalidateQueries(["allSprintsByProject"]);
      toast.success("Sprint deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting sprint:", error);
      toast.error("Failed to delete sprint, please try again later");
    },
  });
  return {
    deleteSprint,
    isDeletingSprint,
    isSuccessDeletingSprint,
  };
}
