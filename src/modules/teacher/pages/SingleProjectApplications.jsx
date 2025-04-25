import { DataTable } from "@/components/commun/data-table";
import SectionTitle from "@/modules/student/components/SectionTitle";
import { useParams } from "react-router";
import { columnsProjectApplications } from "../features/project-applications/columnsProjectApplications";
import useTeacherProjectApplications from "../features/project-applications/useTeacherProjectApplications";
import InlineSpinner from "@/components/commun/InlineSpinner";

function SingleProjectApplications() {
  const { idProjectApplications } = useParams();

  const {
    projectApplications,
    isGettingProjectApplications,
    isErrorGettingProjectApplications,
  } = useTeacherProjectApplications(idProjectApplications);

  const formattedData = projectApplications?.map((app) => ({
    id: app.id,
    teamOfferId: app.teamOfferId,
    teamTitle: app.teamOffer.title,
    leaderName: `${app.teamOffer.leader.user.firstName} ${app.teamOffer.leader.user.lastName}`,
    status: app.status,
    message: app.message ? app.message : "No Message Provided",
  }));
  return (
    <div className="bg-section p-4 rounded-xl shadow-sm">
      <SectionTitle
        title="Team Applications"
        subtitle="Browse and manage your team applications here."
      />
      {isGettingProjectApplications && <InlineSpinner />}
      {isErrorGettingProjectApplications && (
        <p className="text-destructive">
          Error getting your applications for this project{" "}
        </p>
      )}
      {projectApplications && (
        <DataTable
          columns={columnsProjectApplications}
          data={formattedData}
          searchWith="teamTitle"
        />
      )}
    </div>
  );
}

export default SingleProjectApplications;
