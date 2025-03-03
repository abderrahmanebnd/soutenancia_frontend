import { Outlet } from "react-router";

function TeacherLayout() {
  return (
    <div>
      teacher dashboard sidebar and header
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default TeacherLayout;
