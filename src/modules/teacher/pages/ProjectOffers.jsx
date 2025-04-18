import ReusibleTabs from "@/components/commun/ReusibleTabs";
import { Outlet } from "react-router";

function ProjectOffers() {
  return (
    <ReusibleTabs
      defaultValue={`ThisYear'sProjects`}
      secondaryValue={`PreviousYear'sProjects`}
      defaultComponent={<Outlet />}
      secondaryComponent={<Outlet />}
      defaultLink="current-projects-offers"
      secondaryLink="previous-projects-offers"
    />
  );
}

export default ProjectOffers;
