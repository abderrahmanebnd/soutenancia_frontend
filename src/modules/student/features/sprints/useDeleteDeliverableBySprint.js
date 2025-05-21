import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDeliverableById } from "../../api/apiDeliverables";
import toast from "react-hot-toast";

export function useDeleteDeliverablBySprint(sprintIdCacheKey) {
  const queryClient = useQueryClient();
  const { mutate: deleteDeliverable, isPending: isDeletingDeliverable } =
    useMutation({
      mutationFn: ({ sprintId, deliverableId }) =>
        deleteDeliverableById(sprintId, deliverableId),

      onSuccess: () => {
        queryClient.invalidateQueries([
          "allDeliverablesBySprint",
          sprintIdCacheKey,
        ]);
        toast.success("Deliverable delete successfully");
      },
      onError: (error) => {
        console.error("Error deleting deliverable:", error);
        toast.error("Failed to delete deliverable, please try again later");
      },
    });
  return {
    deleteDeliverable,
    isDeletingDeliverable,
  };
}
