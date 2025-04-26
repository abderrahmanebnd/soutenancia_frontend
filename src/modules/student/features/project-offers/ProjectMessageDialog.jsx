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
import { useEffect, useState } from "react";
import { useApplyToProjectOffer } from "./useApplyToProjectOffer";
import { CirclePlus, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";

function ProjectMessageDialog({ teamOfferId, projectOfferId }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user?.Student?.isLeader;
  const { applyToProject, isApplyingToProject, isSuccessApplyToProject } =
    useApplyToProjectOffer();
  useEffect(() => {
    if (isSuccessApplyToProject) {
      setOpen(false);
      setMessage("");
    }
  }, [isSuccessApplyToProject]);
  function handleSubmitMessage(e) {
    e.preventDefault();
    applyToProject({
      projectOfferId,
      offerIdAndMessage: { teamOfferId, message },
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="requestJoin" className="w-1/2" disabled={!isLeader}>
          Apply <CirclePlus className="text-green-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" closeButton={true}>
        <DialogHeader>
          <DialogTitle className="text-primary">
            Project Application Message
          </DialogTitle>
          <DialogDescription>
            This description message will be sent to your requested Project
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
            disabled={isApplyingToProject}
          >
            Send the Message{" "}
            {isApplyingToProject && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectMessageDialog;
