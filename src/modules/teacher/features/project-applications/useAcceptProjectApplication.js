import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { acceptProjectApplication } from "../../api/apiProjectApplications";

export function useAcceptProjectApplication(idProjectOffer) {
  const queryClient = useQueryClient();
  const {
    mutate: acceptThisProjectApplication,
    isPending: isAcceptingProjectApplication,
  } = useMutation({
    mutationFn: (idProjectApplication) =>
      acceptProjectApplication(idProjectApplication),

    onSuccess: () => {
      queryClient.invalidateQueries(["projectApplications", idProjectOffer]);
      queryClient.invalidateQueries(["projectOffer", idProjectOffer]);
      toast.success("Project Application accepted!");
    },
    onError: (error) => {
      console.error("Error accepting project application:", error);
      toast.error(
        "Failed to accept this project application. Please try again later."
      );
    },
  });
  return {
    acceptThisProjectApplication,
    isAcceptingProjectApplication,
  };
}
