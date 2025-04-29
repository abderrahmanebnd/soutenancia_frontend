import { Outlet } from "react-router";

import { PreviousProjectOffersProvider } from "../context/PreviousProjectOffersContext";
import { ProjectOffersProvider } from "../context/ProjectOffersContext";

function Teacher() {
  return (
    <>
      <PreviousProjectOffersProvider>
        <ProjectOffersProvider>
          <Outlet />
        </ProjectOffersProvider>
      </PreviousProjectOffersProvider>
    </>
  );
}

export default Teacher;
