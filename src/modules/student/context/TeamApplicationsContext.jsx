import { createContext, useContext } from "react";
import { useTeamApplications } from "../features/team-management/useTeamApplications";
const TeamApplicationsContext = createContext();
function TeamApplicationsProvider({ children }) {
  const {
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
    generalSkills: app.student.skills.map((tech) => tech.skill),
    customSkills: app.student.customSkills,
  }));

  return (
    <TeamApplicationsContext.Provider
      value={{
        formattedData,
        isGettingTeamApplications,
        error,
        isErrorGettingTeamApplications,
        teamApplicationsData,
      }}
    >
      {children}
    </TeamApplicationsContext.Provider>
  );
}

function useTeamApplicationsWithContext() {
  const context = useContext(TeamApplicationsContext);
  if (!context) {
    throw new Error(
      "useTeamApplications must be used within a TeamApplicationsProvider"
    );
  }
  return context;
}
export { TeamApplicationsProvider, useTeamApplicationsWithContext };
