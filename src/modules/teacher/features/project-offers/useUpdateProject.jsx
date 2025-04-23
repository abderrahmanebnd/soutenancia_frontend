import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacherProject } from "../../api/apiTeacherProjects";
import toast from "react-hot-toast";

export function useUpdateProject() {
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateTeacherProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherProjects"] });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Failed to update project");
    }
  });

  return { updateProject: mutate, isUpdating: isPending };
}