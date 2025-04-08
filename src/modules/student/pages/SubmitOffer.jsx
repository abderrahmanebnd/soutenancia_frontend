import { useAuth } from "@/context/AuthContext";
import EditTeamOffer from "./EditTeamOffer";
import AddTeamOffer from "./AddTeamOffer";
import { useMyApplications } from "@/modules/student/features/team-management/useMyapplication";
import { useEffect } from "react";

function SubmitOffer() {
  const { currentUser } = useAuth();

  const isLeader = currentUser?.user.Student.isLeader;
  const isInTeam=currentUser?.user.Student.isInTeam



  if (isInTeam) {
    return null;

  }

  return isLeader ? <EditTeamOffer /> : <AddTeamOffer />;
}

export default SubmitOffer;