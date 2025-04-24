import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacherProject } from "../../api/apiTeacherProjects";
import toast from "react-hot-toast";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: deleteTeacherProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherProjects"] });
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
    }
  });

  return { deleteProject: mutate, isDeleting: isPending };
};

export default function useDeleteProjectOffer() {
  // ...hook implementation...
};
