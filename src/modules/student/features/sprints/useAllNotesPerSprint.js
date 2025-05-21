import { useQuery } from "@tanstack/react-query";
import { getAllNotesBySprint } from "../../api/apiNotes";

export function useAllNotesPerSprint(sprintId) {
  const {
    data: allNotesData,
    isLoading: isGettingAllNotes,
    isError: isErrorGettingAllNotes,
  } = useQuery({
    queryKey: ["allNotesBySprint", sprintId],
    queryFn: () => getAllNotesBySprint(sprintId),
    onError: (error) => {
      console.error("Error fetching all notes per sprint:", error);
    },
  });

  return {
    allNotesData,
    isGettingAllNotes,
    isErrorGettingAllNotes,
  };
}
