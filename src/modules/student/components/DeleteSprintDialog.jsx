import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useDeleteSprintByProject } from "../features/sprints/useDeleteSprintByProject";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

function DeleteSprintDialog({ sprintId }) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteSprint, isDeletingSprint, isSuccessDeletingSprint } =
    useDeleteSprintByProject();
  const { currentUser } = useAuth();
  const projectId =
    currentUser?.user?.Student?.TeamOffer?.at(0)?.assignedProjectId;
  useEffect(() => {
    if (isSuccessDeletingSprint) {
      setIsOpen(false);
    }
  }, [isSuccessDeletingSprint]);

  function handleDeleteSprint() {
    deleteSprint({ projectId, sprintId });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-destructive hover:text-red-700 p-2"
        >
          Delete <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" closeButton={true}>
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="bg-red-100 w-fit p-4 rounded-full mx-auto relative flex items-center justify-center">
            <Trash2 className="text-red-600 z-20" size={34} />
            <div className="absolute w-12 h-12 bg-red-200 rounded-full z-10"></div>
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-xl text-center">
              Are you sure you want to delete this sprint?
            </DialogTitle>
            <DialogDescription className="text-center">
              This action cannot be undone. All data related to this sprint will
              be permanently deleted.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="sm:justify-start flex gap-1">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1 shadow-md border-2 hover:shadow-lg transition-all duration-200"
            >
              Back
            </Button>
          </DialogClose>
          {isDeletingSprint ? (
            <ButtonWithSpinner variant="destructive" className="flex-1" />
          ) : (
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDeleteSprint}
            >
              Confirm Deletion
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteSprintDialog;
