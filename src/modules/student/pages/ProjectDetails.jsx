import ReusibleTabs from "@/components/commun/ReusibleTabs";
import { Outlet } from "react-router";

function ProjectDetails() {
  return (
    <ReusibleTabs
      tabs={[
        {
          value: "Project Description",
          link: "project-description",
          component: <Outlet />,
        },
        {
          value: "Sprints Management",
          link: "sprints",
          component: <Outlet />,
        },
      ]}
    />
  );
}

export default ProjectDetails;
