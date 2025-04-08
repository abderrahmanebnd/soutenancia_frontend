import { columnsTeamApplications } from "../features/team-management/columnsTeamApplications";
import { DataTable } from "../../../components/commun/data-table";
import SectionTitle from "../components/SectionTitle";
import FilterTeamApplication from "../features/team-management/FilterTeamApplication";
import { useTeamApplications } from "../features/team-management/useTeamApplications";
import InlineSpinner from "@/components/commun/InlineSpinner";

/* const data = [
  {
    id: "728ed521",
    studentName: "Mehdi",
    status: "pending",
    email: "m@example.com",

    message: "Hello, I am interested in joining your team gdygdyyevgygyvfgey.",
    skills: ["Python", "Java Script"],
  },
  {
    id: "728ed522",
    studentName: "Ali",
    status: "accepted",
    email: "a@example.com",

    message: "Hello, I am interested in joining your team.",
    skills: ["javascript", "React"],
  },
  {
    id: "728ed523",
    studentName: "Sara",
    status: "accepted",
    message: "Hello, I am interested in joining your team.",
    email: "b@example.com",
    skills: ["Nest", "Python"],
  },
  {
    id: "728ed524",
    studentName: "Nesrine",
    status: "rejected",
    message: "Hello, I am interested in joining your team.",
    email: "c@example.com",
    skills: ["c++", "Nest"],
  },
];
 */
export default function TeamApplications() {
  const {
    teamApplicationsData,
    isGettingTeamApplications,
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
  }));
  return (
    <div className="bg-section p-4 rounded-xl shadow-sm">
      <SectionTitle
        title="Team Applications"
        subtitle="Browse and manage your team applications here."
      />
      {isGettingTeamApplications && <InlineSpinner />}
      {isErrorGettingTeamApplications && (
        <p className="text-red-500">Error getting your team applications</p>
      )}
      {!isGettingTeamApplications && !isErrorGettingTeamApplications && (
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
