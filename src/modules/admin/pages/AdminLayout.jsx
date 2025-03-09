import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div>
      admin Dashboard sidebar and header
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
