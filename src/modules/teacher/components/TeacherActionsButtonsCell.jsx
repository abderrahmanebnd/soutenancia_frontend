import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { useAcceptProjectApplication } from "../features/project-applications/useAcceptProjectApplication";
import { useRejectProjectApplication } from "../features/project-applications/useRejectProjectApplication";

function TeacherActionsButtonsCell({ row }) {
  const { acceptThisProjectApplication, isAcceptingProjectApplication } =
    useAcceptProjectApplication(row.original.teamOfferId);
  const { rejectThisProjectApplication, isRejectingProjectApplication } =
    useRejectProjectApplication(row.original.teamOfferId);
  const isNotPending = row.original.status !== "pending";
  function handleAccept() {
    acceptThisProjectApplication(row.original.id);
  }
  function handleReject() {
    rejectThisProjectApplication(row.original.id);
  }
  return (
    <div className="flex items-center gap-2 flex-col sm:flex-row">
      <Button
        variant="outline"
        size="sm"
        className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 rounded-full h-6 hover:text-green-600"
        onClick={handleAccept}
        disabled={
          isAcceptingProjectApplication ||
          isRejectingProjectApplication ||
          isNotPending
        }
      >
        Accept
        {isAcceptingProjectApplication ? (
          <Loader2 className="animate-spin" />
        ) : (
          <CircleCheck />
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 hover:text-red-600"
        onClick={handleReject}
        disabled={
          isAcceptingProjectApplication ||
          isRejectingProjectApplication ||
          isNotPending
        }
      >
        Reject
        {isRejectingProjectApplication ? (
          <Loader2 className="animate-spin" />
        ) : (
          <CircleX />
        )}
      </Button>
    </div>
  );
}

export default TeacherActionsButtonsCell;
