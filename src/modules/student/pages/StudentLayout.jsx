import { Outlet } from "react-router";

function StudentLayout() {
  return (
    <div>
      Student dashboard sidebar and header
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
