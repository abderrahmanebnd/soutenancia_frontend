import TeamApplications from "./TeamApplications";
import MyApplications from "./MyApplications";
import { useAuth } from "@/context/AuthContext";
import ReusibleTabs from "@/components/commun/ReusibleTabs";

export default function TeamApplicationsManagement() {
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user?.Student?.isLeader;
  if (isLeader) return <TeamApplications />;
  return (
    <ReusibleTabs
      defaultValue={"TeamApplications"}
      secondaryValue={"MyApplications"}
      defaultComponent={<TeamApplications />}
      secondaryComponent={<MyApplications />}
    />
  );
}
