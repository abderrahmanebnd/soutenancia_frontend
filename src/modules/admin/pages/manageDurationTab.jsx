import ReusibleTabs from "@/components/commun/ReusibleTabs";
import { ManageTeamCompositions } from "./ManageTeamCompositions";
import { ManageProjectSelections } from "./manageProjetSeletions";

export function ManageDurationsTabs() {
  return (
    <ReusibleTabs
      tabs={[
        {
          value: "Team Compositions",
          link: "team-compositions",
          component: <ManageTeamCompositions />,
        },
        {
          value: "Project Selections",
          link: "project-selections",
          component: <ManageProjectSelections />,
        },
      ]}
    />
  );
}