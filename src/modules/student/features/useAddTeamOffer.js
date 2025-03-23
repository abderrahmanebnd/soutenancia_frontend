import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import addTeamOffer from "../api/apiAddTeamOffer";

export const useaddTeamOffer = () => {
  const queryClient = useQueryClient();
  const { mutate: addTeamOfferMutation, isPending: isAdding } = useMutation({
    mutationFn: (data) => addTeamOffer(data),
    onSuccess: () => {
      toast.success("Offer submitted successfully!");
      queryClient.invalidateQueries(["teamOffers"]); 
    },
    onError: (error) => {
      console.error("Error submitting offer:", error);
      toast.error(error.message || "Failed to submit offer. Please try again later.");
    },
  });

  return {
    addTeamOffer: addTeamOfferMutation,
    isAdding,
  };
};