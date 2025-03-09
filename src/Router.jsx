import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import AdminLayout from "./modules/admin/pages/AdminLayout";
import StudentLayout from "./modules/student/pages/StudentLayout";
import TeacherLayout from "./modules/teacher/pages/TeacherLayout";
import EnterpriseLayout from "./modules/enterprise/pages/EnterpriseLayout";
import PageNotFound from "./Pages/PageNotFound";

import Unauthorized from "./Pages/Unauthorized";

import LoginForm from "./features/auth/LoginForm";
import ForgotPasswordForm from "./features/auth/ForgotPasswordForm";
import ConfirmationCodeForm from "./features/auth/ConfirmationCodeForm";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import PublicRoute from "./features/auth/PublicRoute";

function Router() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            >
              <Route index element={<Navigate replace to="login" />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="forgot-password" element={<ForgotPasswordForm />} />
              <Route
                path="confirmation-code"
                element={<ConfirmationCodeForm />}
              />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route
              element={
                <ProtectedRoute allowedRoles="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/admin"
                element={<div>content of the admin dashboard</div>}
              />
            </Route>

            <Route
              element={
                <ProtectedRoute allowedRoles="student">
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/student"
                element={<div>content of the student dashboard</div>}
              />
            </Route>

            <Route
              element={
                <ProtectedRoute allowedRoles="teacher">
                  <TeacherLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/teacher"
                element={<div>content of the teacher dashboard</div>}
              />
            </Route>

            <Route
              element={
                <ProtectedRoute allowedRoles="enterprise">
                  <EnterpriseLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/enterprise"
                element={<div>content of the enterprise dashboard</div>}
              />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default Router;
