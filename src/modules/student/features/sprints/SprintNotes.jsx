import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquarePlus, Clock, Loader2, Trash2 } from "lucide-react";
import { useAllNotesPerSprint } from "./useAllNotesPerSprint";
import { useCreateNotePerSprint } from "./useCreateNotePerSprint";
import { useDeleteNotePerSprint } from "./useDeleteNotePerSprint";
import { useEffect, useState } from "react";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { useAuth } from "@/context/AuthContext";
import { format, parseISO } from "date-fns";

function SprintNotes({ sprintId }) {
  const [newNote, setNewNote] = useState("");

  const { allNotesData, isGettingAllNotes, isErrorGettingAllNotes } =
    useAllNotesPerSprint(sprintId);
  const { createNote, isCreatingNote, isSuccessCreatingNote } =
    useCreateNotePerSprint(sprintId);
  const { deleteNote, isDeletingNote } = useDeleteNotePerSprint(sprintId);
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.user?.id;

  function handleSubmit(e) {
    e.preventDefault();
    if (newNote) {
      createNote({ sprintId, data: { content: newNote } });
    }
  }
  useEffect(() => {
    if (isSuccessCreatingNote) {
      setNewNote("");
    }
  }, [isSuccessCreatingNote]);
  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-primary">Sprint Notes</h2>
        <Badge variant="outline" className="px-2 py-1">
          {allNotesData?.length} {allNotesData?.length === 1 ? "note" : "notes"}
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          placeholder="Add a note related to this sprint..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={!newNote.trim() || isCreatingNote}
          >
            {isCreatingNote ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <MessageSquarePlus className="mr-2 h-4 w-4" />
            )}
            Add Note
          </Button>
        </div>
      </form>

      <div className="space-y-4 mt-4">
        {isGettingAllNotes && <InlineSpinner />}
        {isErrorGettingAllNotes && (
          <div className="text-red-500">
            Error loading notes. Please try again later.
          </div>
        )}
        {allNotesData?.length > 0 &&
          [...allNotesData]
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((note) => {
              return (
                <Card
                  key={note.id}
                  className="bg-white shadow-sm border border-slate-200 relative"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 ">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {note?.sender?.firstName[0]}
                          {note?.sender?.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 ">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="font-medium text-sm text-slate-800">
                              {note?.sender?.firstName} {note?.sender?.lastName}
                            </span>
                            {note?.sender?.id === currentUserId && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-[10px] px-1 py-0 h-4 bg-slate-100"
                              >
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {format(
                                parseISO(note?.createdAt),
                                "dd/MM/yyyy HH:mm"
                              )}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">
                          {note.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  {note?.sender?.id === currentUserId && (
                    <Button
                      variant="outline"
                      className="absolute -top-3 -right-3 w-7 h-7 p-0 rounded-full bg-white "
                      onClick={() => deleteNote({ sprintId, noteId: note?.id })}
                      disabled={isDeletingNote}
                    >
                      <Trash2 className="text-destructive " />
                    </Button>
                  )}
                </Card>
              );
            })}
        {allNotesData?.length === 0 && !isGettingAllNotes && (
          <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <MessageSquarePlus className="h-8 w-8 mx-auto mb-2 text-slate-400" />
            <p>No notes yet. Be the first to add a note!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SprintNotes;
