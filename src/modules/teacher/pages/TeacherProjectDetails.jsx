import SprintsManagement from "@/modules/student/pages/SprintsManagement";
import { useParams } from "react-router";

function TeacherProjectDetails() {
  const { teamId, projectId } = useParams();
  return (
    <div>
      <SprintsManagement teacherProjectId={projectId} teacherTeamId={teamId} />
    </div>
  );
}

export default TeacherProjectDetails;
