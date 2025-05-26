import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExcelFileStudent } from "../../api/apiuser";
import toast from "react-hot-toast";

export function useAddStudentsExcel() {
  const queryClient = useQueryClient();
  const {
    mutate: addStudentsExcel,
    isPending: isAddingStudentsExcel,
    isSuccess: isSuccessAddingStudentsExcel,
  } = useMutation({
    mutationFn: (file) => addExcelFileStudent(file),
    onSuccess: () => {
      queryClient.invalidateQueries(["allStudents"]);
      toast.success("Students added successfully");
    },
    onError: (error) => {
      console.error("Error adding Excel students :", error);
      toast.error("Failed to add Excel file, please try again later");
    },
  });
  return {
    addStudentsExcel,
    isAddingStudentsExcel,
    isSuccessAddingStudentsExcel,
  };
}
