import { useAuth } from "@/context/AuthContext";
import EditTeamOffer from "./EditTeamOffer";
import AddTeamOffer from "./AddTeamOffer";
import { useMyApplications } from "@/modules/student/features/team-management/myApplications/useMyapplication";
import { useEffect } from "react";
import toast from "react-hot-toast";

function SubmitOffer() {
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user.Student.isLeader;
  const { data } = useMyApplications();

  useEffect(() => {
    if (data?.isInTeam) {
      toast.error("You have existing team applications");
    }
  }, [data?.isInTeam]);

  if (data?.isInTeam) {
    return null;
  }

  return isLeader ? <EditTeamOffer /> : <AddTeamOffer />;
}

export default SubmitOffer;