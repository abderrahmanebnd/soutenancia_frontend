import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNoteById } from "../../api/apiNotes";
import toast from "react-hot-toast";

export function useDeleteNotePerSprint(sprintIdCacheKey) {
  const queryClient = useQueryClient();
  const { mutate: deleteNote, isPending: isDeletingNote } = useMutation({
    mutationFn: ({ sprintId, noteId }) => deleteNoteById(sprintId, noteId),

    onSuccess: () => {
      queryClient.invalidateQueries(["allNotesBySprint", sprintIdCacheKey]);
      toast.success("Note deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note, please try again later");
    },
  });
  return {
    deleteNote,
    isDeletingNote,
  };
}
