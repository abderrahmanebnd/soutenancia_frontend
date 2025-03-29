import { Outlet } from "react-router";
import { TeamOffersProvider } from "../context/TeamOffersContext";

function Student() {
  return (
    <>
      <TeamOffersProvider>
        <Outlet />
      </TeamOffersProvider>
    </>
  );
}

export default Student;
