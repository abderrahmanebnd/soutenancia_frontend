import { Outlet } from "react-router";

function EnterpriseLayout() {
  return (
    <div>
      Enterprise dashboard sidebar and header
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default EnterpriseLayout;
