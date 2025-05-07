import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliverablesPerSprint } from "../../api/apiDeliverables";
import toast from "react-hot-toast";

export function useCreateDeliverablePerSprint() {
  const queryClient = useQueryClient();
  const {
    mutate: deliverable,
    isPending: isCreatingDeliverable,
    isSuccess: isSuccessCreatingDeliverable,
  } = useMutation({
    mutationFn: ({ sprintId, data }) =>
      createDeliverablesPerSprint(sprintId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["allDeliverablesBySprint"]);
      toast.success("Deliverable created successfully");
    },
    onError: (error) => {
      console.error("Error creating deliverable:", error);
      toast.error("Failed to create deliverable, please try again later");
    },
  });
  return {
    deliverable,
    isCreatingDeliverable,
    isSuccessCreatingDeliverable,
  };
}
