import ReusibleTabs from "@/components/commun/ReusibleTabs";
import { Outlet } from "react-router";

function ManageUsers() {
  return (
    <ReusibleTabs
      tabs={[
        {
          value: "Manage Students",
          link: "manage-students",
          component: <Outlet />,
        },
        {
          value: "Manage Teachers",
          link: "manage-teachers",
          component: <Outlet />,
        },
      ]}
    />
  );
}

export default ManageUsers;
