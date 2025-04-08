import { CirclePlus, Loader2, OctagonAlert } from "lucide-react";

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

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useApplyToTeamOffer } from "./useApplyToTeamOffer";
import { useEffect, useState } from "react";

function LeaderApplyDialog({ title, teamOfferId, myTeamOffer, isLoadingData }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { requestJoin, isApplying, isSuccess } = useApplyToTeamOffer(title);
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setMessage("");
    }
  }, [isSuccess]);
  function handleSubmitMessage(e) {
    e.preventDefault();
    requestJoin({ teamOfferId });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="requestJoin" disabled={isLoadingData}>
          Request To Join{" "}
          {isLoadingData ? (
            <Loader2 className="animate-spin" />
          ) : (
            <CirclePlus className="text-green-600" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" closeButton={true}>
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="bg-red-100 w-fit p-4 rounded-full mx-auto relative flex items-center justify-center">
            <OctagonAlert className="text-red-600 z-20" size={34} />
            <div className="absolute w-12 h-12 bg-red-200 rounded-full z-10"></div>
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-xl text-center">
              Want to join {title} ?
            </DialogTitle>
            <DialogDescription className="text-center">
              by applying to this team, you will be removed from your current
              team and your team will be deleted.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message" className="text-primary">
            Your Message
          </Label>
          <Textarea
            placeholder="Type your message here."
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className=" shadow-md border-2 hover:shadow-lg transition-all duration-200 w-1/2"
            >
              &larr; Return
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSubmitMessage}
            disabled={isApplying || myTeamOffer}
            className="w-1/2"
          >
            Apply
            {isApplying && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default LeaderApplyDialog;
