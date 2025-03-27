import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { deleteCurrentLeaderTeamOffer } from "../api/apiStudent";

export function useDeleteCurrentLeaderTeamOffer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteTeamOffer, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteCurrentLeaderTeamOffer(id),
    onSuccess: () => {
      queryClient.setQueryData(["myTeamOffer"], null); //this line is to set the team offer to null because it is deleted
      queryClient.invalidateQueries(["teams"]);
      toast.success("Team offer deleted successfully");
      navigate("/student/team-offers");
    },
    onError: (error) => {
      console.error("Failed to delete team offer", error);
      toast.error("Failed to delete team offer. Please try again later.");
    },
  });
  return { deleteTeamOffer, isDeleting };
}
