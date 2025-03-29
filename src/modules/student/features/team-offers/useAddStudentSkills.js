import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addStudentSkills } from "../../api/apiStudentSkills";

export function useAddStudentSkills() {
  const queryClient = useQueryClient();
  const { mutate: addSkills, isPending: isAddingSkills } = useMutation({
    mutationFn: (skills) => addStudentSkills(skills),
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
