import ReusibleTabs from "@/components/commun/ReusibleTabs";
import { Outlet } from "react-router";

function ProjectOffers() {
  return (
    <ReusibleTabs
      tabs={[
        {
          value: "ThisYear'sProjects",
          link: "current-projects-offers",
          component: <Outlet />,
        },
        {
          value: "PreviousYear'sProjects",
          link: "previous-projects-offers",
          component: <Outlet />,
        },
      ]}
    />
  );
}

export default ProjectOffers;
