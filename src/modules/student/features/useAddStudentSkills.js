import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudentSkills } from "../api/addStudentSkills";
import toast from "react-hot-toast";

export function useAddStudentSkills() {
  const queryClient = useQueryClient();
  const { mutate: addSkills, isPending: isAddingSkills } = useMutation({
    mutationFn: (skillsWithStudentId) => addStudentSkills(skillsWithStudentId),
    onSuccess: () => {
      toast.success("Skills added successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error("Error adding student skills:", error);
      toast.error("Failed to add skills. Please try again later.");
    },
  });

  return {
    addSkills,
    isAddingSkills,
  };
}
