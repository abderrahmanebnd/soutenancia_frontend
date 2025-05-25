import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSprintByProject } from "../../api/apiStudentSprints";
import toast from "react-hot-toast";

export function useCreateSprintByProject() {
  const queryClient = useQueryClient();
  const {
    mutate: createSprint,
    isPending: isCreatingSprint,
    isSuccess: isSuccessCreatingSprint,
  } = useMutation({
    mutationFn: ({ projectId, data }) => createSprintByProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["allSprintsByProject"]);
      toast.success("Sprint created successfully");
    },
    onError: (error) => {
      console.error("Error creating sprint:", error);
      toast.error("Failed to create sprint, please try again later");
    },
  });
  return {
    createSprint,
    isCreatingSprint,
    isSuccessCreatingSprint,
  };
}
