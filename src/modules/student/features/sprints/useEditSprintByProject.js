import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSprintByProject } from "../../api/apiStudentSprints";
import toast from "react-hot-toast";

export function useEditSprintByProject(sprintId, projectId) {
  const queryClient = useQueryClient();
  const {
    mutate: editSprint,
    isPending: isEditingSprint,
    isSuccess: isSuccessEditSprint,
  } = useMutation({
    mutationFn: (data) => editSprintByProject(projectId, sprintId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["allSprintsByProject"]);
      queryClient.invalidateQueries(["sprint", sprintId]);
      toast.success("Sprint updated successfully");
    },
    onError: (error) => {
      console.error("Error updating sprint:", error);
      toast.error("Failed to update sprint, please try again later");
    },
  });
  return {
    editSprint,
    isEditingSprint,
    isSuccessEditSprint,
  };
}
