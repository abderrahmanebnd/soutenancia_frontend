import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Auth/Login";
import AdminLayout from "./modules/admin/pages/AdminLayout";
import StudentLayout from "./modules/student/pages/StudentLayout";
import TeacherLayout from "./modules/teacher/pages/TeacherLayout";
import EnterpriseLayout from "./modules/enterprise/pages/EnterpriseLayout";
import PageNotFound from "./Pages/PageNotFound";
/* import { AuthProvider } from "./Pages/Auth/AuthContext"; */
import Unauthorized from "./Pages/Auth/unauthorized";
/* import ProtectedRoute from "./Pages/Auth/ProtectedRoute"; */
import LoginForm from "./Pages/Auth/LoginForm";
import ForgotPasswordForm from "./Pages/Auth/ForgotPasswordForm";
import ConfirmationCodeForm from "./Pages/Auth/ConfirmationCodeForm";

function Router() {
  return (
    <>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element={<Login />}>
            <Route index element={<Navigate replace to="login" />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="forgot-password" element={<ForgotPasswordForm />} />
            <Route
              path="confirmation-code"
              element={<ConfirmationCodeForm />}
            />
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />
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

          <Route
            element={
              /*  <ProtectedRoute allowedRoles="teacher"> */
              <TeacherLayout />
              /* </ProtectedRoute> */
            }
          >
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

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </>
  );
}

export default Router;
