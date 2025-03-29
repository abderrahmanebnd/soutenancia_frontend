import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import addTeamOffer from "../api/apiAddTeamOffer";
import { useNavigate } from "react-router";

export function useAddTeamOffer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: addTeamOfferMutation, isPending: isAdding } = useMutation({
    mutationFn: (data) => addTeamOffer(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
      toast.success("Offer submitted successfully!");
      navigate("/student/team-offers");
    },
    onError: (error) => {
      console.error("Error submitting offer:", error);
      toast.error(
        error.message || "Failed to submit offer. Please try again later."
      );
    },
  });

  return {
    addTeamOffer: addTeamOfferMutation,
    isAdding,
  };
}
