import { Outlet } from "react-router";
import { ProjectOffersProvider } from "../context/ProjectOffersContext";

function Teacher() {
  return (
    <>
      <ProjectOffersProvider>
        <Outlet />
      </ProjectOffersProvider>
    </>
  );
}

export default Teacher;
