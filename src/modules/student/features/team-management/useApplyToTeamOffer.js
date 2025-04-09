import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyToTeamOffer } from "../../api/apiStudentApplication";
import toast from "react-hot-toast";

export function useApplyToTeamOffer(teamName) {
  const queryClient = useQueryClient();
  const {
    mutate: requestJoin,
    isPending: isApplying,
    isSuccess,
  } = useMutation({
    mutationFn: (teamOfferIdAndMessage) =>
      applyToTeamOffer(teamOfferIdAndMessage),
    onSuccess: () => {
      queryClient.invalidateQueries(["teamApplications"]);
      queryClient.invalidateQueries(["teams"]);
      toast.success(`Request sent successfully to ${teamName}`);
    },
    onError: (error) => {
      console.error("Error applying to team offer:", error);
      toast.error("Failed to apply to team ,Please try again later.");
    },
  });
  return {
    requestJoin,
    isApplying,
    isSuccess,
  };
}
