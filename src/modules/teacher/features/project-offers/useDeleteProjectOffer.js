import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacherProject } from "../../api/apiTeacherProjects";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useDeleteProjectOffer() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteProjectOffer, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteTeacherProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProjectOffers"] });
      queryClient.invalidateQueries({ queryKey: ["projectOffers"] });
      toast.success("Project deleted successfully");
      navigate("/teacher/my-project-offers");
    },
    onError: (error) => {
      console.error("Failed to delete project", error);
      toast.error("Failed to delete project. Please try again later.");
    },
  });

  return { deleteProjectOffer, isDeleting };
}
