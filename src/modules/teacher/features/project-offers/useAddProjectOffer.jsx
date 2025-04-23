import { useMutation, useQueryClient } from "@tanstack/react-query";
import addProjectOffer from "../../api/ApiProjectOffer";
import toast from "react-hot-toast";

export const useAddProjectOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectOfferData) => addProjectOffer(projectOfferData), // Ensure dynamic data is passed
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjectOffers"]);
      toast.success("Project offer submitted successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while submitting the project offer."
      );
    },
  });
};
