import { useTeamManagementContext } from "../context/TeamManagementContext";
import SectionTitle from "@/modules/student/components/SectionTitle";
import { DataTable } from "@/components/commun/data-table";
import { columnsManageMyTeams } from "../features/team-management/columnsManageMyTeams";

function ManageMyTeams() {
  const { myAssignedTeams } = useTeamManagementContext();

  return (
    <div>
      <div className="bg-section p-4 rounded-xl shadow-sm">
        <SectionTitle
          title="Manage My Teams"
          subtitle="View and manage teams assigned to your project offer"
        />

        <DataTable
          columns={columnsManageMyTeams}
          data={myAssignedTeams}
          searchWith="title"
          className="mt-6"
        />
      </div>
    </div>
  );
}

export default ManageMyTeams;
