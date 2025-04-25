import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { rejectProjectApplication } from "../../api/apiProjectApplications";

export function useRejectProjectApplication(idProjectOffer) {
  const queryClient = useQueryClient();
  const {
    mutate: rejectThisProjectApplication,
    isPending: isRejectingProjectApplication,
  } = useMutation({
    mutationFn: (idProjectApplication) =>
      rejectProjectApplication(idProjectApplication),

    onSuccess: () => {
      queryClient.invalidateQueries(["projectApplications", idProjectOffer]);
      queryClient.invalidateQueries(["projectOffer", idProjectOffer]);

      toast.success("Project Application Rejected!");
    },
    onError: (error) => {
      console.error("Error Rejecting project application:", error);
      toast.error(
        "Failed to Reject this project application. Please try again later."
      );
    },
  });
  return {
    rejectThisProjectApplication,
    isRejectingProjectApplication,
  };
}
