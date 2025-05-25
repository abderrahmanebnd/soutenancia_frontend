import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotesPerSprint } from "../../api/apiNotes";
import toast from "react-hot-toast";

export function useCreateNotePerSprint(sprintIdCacheKey) {
  const queryClient = useQueryClient();
  const {
    mutate: createNote,
    isPending: isCreatingNote,
    isSuccess: isSuccessCreatingNote,
  } = useMutation({
    mutationFn: ({ sprintId, data }) => createNotesPerSprint(sprintId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["allNotesBySprint", sprintIdCacheKey]);
      toast.success("note added successfully");
    },
    onError: (error) => {
      console.error("Error creating note :", error);
      toast.error("Failed to add note, please try again later");
    },
  });
  return {
    createNote,
    isCreatingNote,
    isSuccessCreatingNote,
  };
}
