import { CirclePlus, OctagonX } from "lucide-react";

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

function WarningDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="requestJoin">
          Request To Join <CirclePlus className="text-green-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" closeButton={true}>
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="bg-red-100 w-fit p-4 rounded-full mx-auto relative flex items-center justify-center">
            <OctagonX className="text-red-600 z-20" size={34} />
            <div className="absolute w-12 h-12 bg-red-200 rounded-full z-10"></div>
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-xl text-center">
              Cannot Request To Join
            </DialogTitle>
            <DialogDescription className="text-center">
              You cannot request to join this team because you are already a
              member of another team.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full shadow-md border-2 hover:shadow-lg transition-all duration-200"
            >
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default WarningDialog;
