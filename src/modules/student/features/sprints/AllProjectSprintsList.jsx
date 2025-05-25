import InlineSpinner from "@/components/commun/InlineSpinner";
import { useAllSprintsByProject } from "./useAllSprintsByProject";
import { useAuth } from "@/context/AuthContext";
import AllProjectSprintsItem from "./AllProjectSprintsItem";

function AllProjectSprintsList() {
  const { currentUser } = useAuth();
  const projectId =
    currentUser?.user?.Student?.TeamOffer?.at(0)?.assignedProjectId;
  const { allSprintsData, isGettingAllSprints, isErrorGettingAllSprints } =
    useAllSprintsByProject(projectId);
  if (isGettingAllSprints) return <InlineSpinner />;
  if (isErrorGettingAllSprints)
    return (
      <div className="text-red-500">Error getting sprints for this project</div>
    );
  if (!allSprintsData || allSprintsData.length === 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl text-primary mb-2 font-bold">
          No sprint has been added
        </p>
      </div>
    );
  return (
    <ul className="flex flex-col gap-4">
      {allSprintsData?.map((sprint) => (
        <AllProjectSprintsItem key={sprint.id} sprintData={sprint} />
      ))}
    </ul>
  );
}

export default AllProjectSprintsList;
