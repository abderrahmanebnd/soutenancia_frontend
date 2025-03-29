import { useAuth } from "@/context/AuthContext";
import EditTeamOffer from "./EditTeamOffer";
import AddTeamOffer from "./AddTeamOffer";

function SubmitOffer() {
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user.Student.isLeader;
  return <div>{isLeader ? <EditTeamOffer /> : <AddTeamOffer />}</div>;
}

export default SubmitOffer;
