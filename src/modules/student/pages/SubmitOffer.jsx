import { useAuth } from "@/context/AuthContext";
import EditTeamOffer from "./EditTeamOffer";
import AddTeamOffer from "./AddTeamOffer";

function SubmitOffer() {
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user?.Student?.isLeader;

  const isInTeam = currentUser?.user.Student.isInTeam;

  if (isInTeam) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
        <div className="flex items-center space-x-3">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z"
            />
          </svg>
          <p className="text-red-700 font-medium text-2xl">
            You’ve already joined a team!
          </p>
        </div>
        <p className="mt-2 text-sm text-destructive">
          {" "}
          You can’t create a new offer because you are a member in other team
        </p>
      </div>
    );
  }

  return isLeader ? <EditTeamOffer /> : <AddTeamOffer />;
}

export default SubmitOffer;
