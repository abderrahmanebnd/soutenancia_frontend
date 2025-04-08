import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { CircleCheck, CircleX } from "lucide-react";

function ActionsButtonsCell({ row }) {
  const { currentUser } = useAuth();

  const isLeader = currentUser?.user.Student.isLeader;
  function handleAccept() {
    console.log(`Accepting student ${row.original.studentName}`);
  }

  function handleReject() {
    console.log(`Rejecting student`);
  }
  return (
    <div className="flex items-center gap-2 flex-col sm:flex-row">
      <Button
        variant="outline"
        size="sm"
        className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 rounded-full h-6 hover:text-green-600"
        onClick={handleAccept}
        disabled={!isLeader}
      >
        Accept
        <CircleCheck />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-6 hover:text-red-600"
        onClick={handleReject}
        disabled={!isLeader}
      >
        Reject <CircleX />
      </Button>
    </div>
  );
}


export default ActionsButtonsCell;

