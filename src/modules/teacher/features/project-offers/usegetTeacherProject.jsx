import { useQuery } from "@tanstack/react-query";
import { getTeacherProjects } from "../../api/apiTeacherProjects";

export const useGetTeacherProjects = () => {
  return useQuery({
    queryKey: ["teacherProjects"],
    queryFn: async () => {
      try {
        const data = await getTeacherProjects();
        return {
          projects: Array.isArray(data) ? data : [],
          count: Array.isArray(data) ? data.length : 0,
        };
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });
};