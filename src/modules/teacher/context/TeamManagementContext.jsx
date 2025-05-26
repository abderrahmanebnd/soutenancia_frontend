import { createContext, useContext, useState } from "react";
const TeamManagementContext = createContext();
function TeamManagementProvider({ children }) {
  const [myAssignedTeams, setMyAssignedTeams] = useState([]);
  return (
    <TeamManagementContext.Provider
      value={{ myAssignedTeams, setMyAssignedTeams }}
    >
      {children}
    </TeamManagementContext.Provider>
  );
}
function useTeamManagementContext() {
  const context = useContext(TeamManagementContext);
  if (!context) {
    throw new Error(
      "useTeamManagementContext must be used within a TeamManagementProvider"
    );
  }
  return context;
}

export { TeamManagementProvider, useTeamManagementContext };
