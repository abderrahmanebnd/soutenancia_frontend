import { useQuery } from "@tanstack/react-query";
import { getAvailableSkills } from "../../api/apiStudentSkills";
import toast from "react-hot-toast";

export function useStudentSkills() {
  const { data: studentSkills, isLoading } = useQuery({
    queryKey: ["studentSkills"],
    queryFn: () => getAvailableSkills(),
    onError: (error) => {
      console.error("Error fetching student skills:", error);
      toast.error("Failed to get student skills. Please try again later.");
    },
  });
  return {
    studentSkills,
    isLoading,
  };
}
