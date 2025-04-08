import TeamApplications from "./TeamApplications";
import MyApplications from "./MyApplications";

export default function TeamManagementPage() {
  return (
    <div className="space-y-8">
      <TeamApplications />
      <MyApplications />
    </div>
  );
}