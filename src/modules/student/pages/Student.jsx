import { Outlet } from "react-router";
import { TeamOffersProvider } from "../context/TeamOffersContext";
import { StudentProjectOffersProvider } from "../features/project-offers/studentProjectOffersContext";

function Student() {
  return (
    <>
      <StudentProjectOffersProvider>
        <TeamOffersProvider>
          <Outlet />
        </TeamOffersProvider>
      </StudentProjectOffersProvider>
    </>
  );
}

export default Student;
