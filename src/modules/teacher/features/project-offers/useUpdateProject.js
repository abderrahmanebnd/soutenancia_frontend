import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacherProject } from "../../api/apiTeacherProjects";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useUpdateProject() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: updateProject,
    isLoading: isUpdating,
    isError,
  } = useMutation({
    mutationFn: ({ id, data }) => updateTeacherProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully.");
      navigate("/teacher/project-offers");
    },
    onError: (error) => {
      console.error("Error updating project:", error);
      toast.error(
        error.response?.data?.message || "Failed to update project. Please try again later."
      );
    },
  });

  return {
    updateProject,
    isUpdating,
    isError,
  };
}