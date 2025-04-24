import { Outlet } from "react-router";
import { ProjectOffersProvider } from "../context/ProjectOffersContext";
import { PreviousProjectOffersProvider } from "../context/PreviousProjectOffersContext";

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
