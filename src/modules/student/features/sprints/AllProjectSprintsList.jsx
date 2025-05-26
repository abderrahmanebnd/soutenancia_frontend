import InlineSpinner from "@/components/commun/InlineSpinner";
import { useAllSprintsByProject } from "./useAllSprintsByProject";

import AllProjectSprintsItem from "./AllProjectSprintsItem";

function AllProjectSprintsList({ projectId, teamId }) {
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
        <AllProjectSprintsItem
          key={sprint.id}
          sprintData={sprint}
          projectId={projectId}
          teamId={teamId}
        />
      ))}
    </ul>
  );
}

export default AllProjectSprintsList;
