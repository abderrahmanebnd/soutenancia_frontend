// hooks/useGetTeacher.ts
import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../../api/apiTeachers";

export const useGetTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
    select: (data) => {
      return {
        teachers: data.data.teachers || [],
        count: data.data.teachers?.length || 0,
      };
    },
    onError: (error) => {
      console.error("Teachers fetch error:", error.message);
    },
  });
};