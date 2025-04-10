import { columnsTeamApplications } from "../features/team-management/columnsTeamApplications";
import { DataTable } from "../../../components/commun/data-table";
import SectionTitle from "../components/SectionTitle";
import FilterTeamApplication from "../features/team-management/FilterTeamApplication";

import InlineSpinner from "@/components/commun/InlineSpinner";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useTeamApplicationsWithContext } from "../context/TeamApplicationsContext";

export default function TeamApplications() {
  /*  const {
    teamApplicationsData,
    isGettingTeamApplications,
    error,
    isErrorGettingTeamApplications,
  } = useTeamApplications();

  const formattedData = teamApplicationsData?.map((app) => ({
    id: app.id,
    studentName: `${app.student.user.firstName} ${app.student.user.lastName}`,
    status: app.status,
    email: app.student.user.email,
    message: app.message ? app.message : "No Message Provided",
    generalSkills: app.student.skills.map((tech) => tech.skill.name),
    customSkills: app.student.customSkills,
  })); */
  const {
    formattedData,
    isGettingTeamApplications,
    error,
    isErrorGettingTeamApplications,
    teamApplicationsData,
  } = useTeamApplicationsWithContext();

  return (
    <div className="bg-section p-4 rounded-xl shadow-sm">
      <SectionTitle
        title="Team Applications"
        subtitle="Browse and manage your team applications here."
      />

      {isGettingTeamApplications && <InlineSpinner />}

      {isErrorGettingTeamApplications && (
        <>
          {error.response.status === 403 ? (
            <div className="flex flex-col items-center gap-3 p-8">
              <img
                src="/assets/team-not-found.svg"
                alt="team not found"
                className="w-48 h-48 mx-auto mb-4"
              />
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-primary">
                  Not in a team yet ?
                </h3>
                <p className="text-muted-foreground">
                  You are not in a team yet or your applications status are
                  still
                  <span className="font-semibold text-lg"> Pending</span>
                </p>
              </div>
              <Button>
                <Link to="/student/team-offers">Explore Team Offers</Link>
              </Button>
            </div>
          ) : (
            <p className="text-destructive">
              Error getting your team applications
            </p>
          )}
        </>
      )}
      {teamApplicationsData && (
        <DataTable
          columns={columnsTeamApplications}
          data={formattedData}
          searchWith="studentName"
          filterComponent={<FilterTeamApplication />}
        />
      )}
    </div>
  );
}
