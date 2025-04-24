import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { editProjectOffer } from "../../api/ApiProjectOffer";

export function useEditProjectOffer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: mutateEditProjectOffer, isPending: isEditing } = useMutation({
    mutationFn: (params) => editProjectOffer(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["myProjectOffer"] });
      toast.success("Project offer updated successfully");
      navigate("/student/project-offers");
    },
    onError: (error) => {
      console.error("Failed to update project offer", error);
      toast.error("Failed to update project offer. Please try again later.");
    },
  });
  return { editProjectOffer: mutateEditProjectOffer, isEditing };
}