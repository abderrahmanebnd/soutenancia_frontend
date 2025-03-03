import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./Auth/Login";
import AdminLayout from "./modules/admin/pages/AdminLayout";
import StudentLayout from "./modules/student/pages/StudentLayout";
import TeacherLayout from "./modules/teacher/pages/TeacherLayout";
import EnterpriseLayout from "./modules/enterprise/pages/EnterpriseLayout";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate replace to="login" />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={<div>content of the admin dashboard</div>}
            />
          </Route>
          <Route element={<StudentLayout />}>
            <Route
              path="/student"
              element={<div>content of the student dashboard</div>}
            />
          </Route>
          <Route element={<TeacherLayout />}>
            <Route
              path="/teacher"
              element={<div>content of the teacher dashboard</div>}
            />
          </Route>
          <Route element={<EnterpriseLayout />}>
            <Route
              path="/enterprise"
              element={<div>content of the enterprise dashboard</div>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
