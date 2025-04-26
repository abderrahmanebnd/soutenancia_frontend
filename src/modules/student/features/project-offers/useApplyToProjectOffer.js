import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyToProjectOffer } from "../../api/apiStudentApplication";
import toast from "react-hot-toast";

export function useApplyToProjectOffer() {
  const queryClient = useQueryClient();
  const {
    mutate: applyToProject,
    isPending: isApplyingToProject,
    isSuccess: isSuccessApplyToProject,
  } = useMutation({
    mutationFn: ({ projectOfferId, offerIdAndMessage }) =>
      applyToProjectOffer(projectOfferId, offerIdAndMessage),
    onSuccess: () => {
      queryClient.invalidateQueries(["projectOffers"]);
      toast.success("Application sent successfully");
    },
    onError: (error) => {
      console.error("Error applying to project offer:", error);
      toast.error("Failed to apply to team ,Please try again later.");
    },
  });
  return {
    applyToProject,
    isApplyingToProject,
    isSuccessApplyToProject,
  };
}
