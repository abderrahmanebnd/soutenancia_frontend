import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { editCurrentLeaderTeamOffer } from "../../api/apiStudent";

export function useEditCurrentLeaderTeamOffer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: editTeamOffer, isPending: isEditing } = useMutation({
    mutationFn: (params) => editCurrentLeaderTeamOffer(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["myTeamOffer"] });
      toast.success("Team offer updated successfully");
      navigate("/student/team-offers");
    },
    onError: (error) => {
      console.error("Failed to update team offer", error);
      toast.error("Failed to update team offer. Please try again later.");
    },
  });
  return { editTeamOffer, isEditing };
}
