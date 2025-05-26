import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExcelFileTeacher } from "../../api/apiuser";
import toast from "react-hot-toast";

export function useAddTeachersExcel() {
  const queryClient = useQueryClient();
  const {
    mutate: addTeachersExcel,
    isPending: isAddingTeachersExcel,
    isSuccess: isSuccessAddingTeachersExcel,
  } = useMutation({
    mutationFn: (file) => addExcelFileTeacher(file),
    onSuccess: () => {
      queryClient.invalidateQueries(["allTeachers"]);
      toast.success("Teachers added successfully");
    },
    onError: (error) => {
      console.error("Error adding Excel teachers :", error);
      toast.error("Failed to add Excel file, please try again later");
    },
  });
  return {
    addTeachersExcel,
    isAddingTeachersExcel,
    isSuccessAddingTeachersExcel,
  };
}
