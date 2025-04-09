import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { useUpdateTeamApplication } from "../features/team-management/useUpdateTeamApplication";
import { useState } from "react";

function ActionsButtonsCell({ row }) {
  const [buttonSpin, setButtonSpin] = useState("");
  const { currentUser } = useAuth();
  const { updateTeamApplication, isUpdatingTeamApplication } =
    useUpdateTeamApplication(row.original.id);
  const isLeader = currentUser?.user.Student.isLeader;
  function handleAccept() {
    setButtonSpin("accept");
    updateTeamApplication({ status: "accepted" });
  }
  function handleReject() {
    setButtonSpin("reject");
    updateTeamApplication({ status: "rejected" });
  }
  return (
    <div className="flex items-center gap-2 flex-col sm:flex-row">
      <Button
        variant="outline"
        size="sm"
        className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 rounded-full h-6 hover:text-green-600"
        onClick={handleAccept}
        disabled={!isLeader || isUpdatingTeamApplication}
      >
        Accept
        {isUpdatingTeamApplication && buttonSpin === "accept" ? (
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
        disabled={!isLeader || isUpdatingTeamApplication}
      >
        Reject
        {isUpdatingTeamApplication && buttonSpin === "reject" ? (
          <Loader2 className="animate-spin" />
        ) : (
          <CircleX />
        )}
      </Button>
    </div>
  );
}

export default ActionsButtonsCell;
