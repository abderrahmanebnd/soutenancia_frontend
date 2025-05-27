import SectionTitle from "../components/SectionTitle";

import AllProjectSprintsList from "../features/sprints/AllProjectSprintsList";
import CreateSprintDialog from "../components/CreateSprintDialog";
import { useAuth } from "@/context/AuthContext";

function SprintsManagement({ teacherProjectId = "", teacherTeamId = "" }) {
  const { currentUser } = useAuth();
  const role = currentUser?.user.role;
  return (
    <div className="space-y-6  ">
      <section className="bg-white rounded-xl px-6 py-5 shadow-sm">
        <SectionTitle
          title="Sprints Details"
          subtitle="Here you manage all your sprints concerning your project "
        />
      </section>
      <section className=" w-full px-6 py-5 bg-section rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-primary">Sprints Management</h1>
          {role === "student" && (
            <CreateSprintDialog
              projectId={
                currentUser?.user?.Student?.TeamOffer?.at(0)
                  ?.assignedProjectId ||
                currentUser?.user?.Student?.TeamMember?.at(0)?.teamOffer
                  ?.assignedProjectId
              }
              teamId={
                currentUser?.user?.Student?.TeamOffer?.at(0)?.id ||
                currentUser?.user?.Student?.TeamMember?.at(0)?.teamOffer?.id
              }
            />
          )}
          {role === "teacher" && (
            <CreateSprintDialog
              projectId={teacherProjectId}
              teamId={teacherTeamId}
            />
          )}
        </div>
        {role === "student" && (
          <AllProjectSprintsList
            projectId={
              currentUser?.user?.Student?.TeamOffer?.at(0)?.assignedProjectId ||
              currentUser?.user?.Student?.TeamMember?.at(0)?.teamOffer
                ?.assignedProjectId
            }
          />
        )}
        {role === "teacher" && (
          <AllProjectSprintsList
            projectId={teacherProjectId}
            teamId={teacherTeamId}
          />
        )}
      </section>
    </div>
  );
}

export default SprintsManagement;
