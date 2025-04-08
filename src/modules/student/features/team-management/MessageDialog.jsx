import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, Loader2 } from "lucide-react";
import { useApplyToTeamOffer } from "./useApplyToTeamOffer";
import { useEffect, useState } from "react";

function MessageDialog({ title, teamOfferId, myTeamOffer }) {
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
        <Button variant="requestJoin">
          Request To Join <CirclePlus className="text-green-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" closeButton={true}>
        <DialogHeader>
          <DialogTitle className="text-primary">
            Team Application Message
          </DialogTitle>
          <DialogDescription>
            This description message will be sent to your requested team
          </DialogDescription>
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
        <DialogFooter>
          <Button
            type="submit"
            variant="requestJoin"
            onClick={handleSubmitMessage}
            disabled={isApplying || myTeamOffer}
          >
            Send the Message{" "}
            {isApplying && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default MessageDialog;
