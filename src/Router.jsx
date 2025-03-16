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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import PublicRoute from "./features/auth/PublicRoute";
import VerifyOtpForm from "./features/auth/VerifyOtpForm";
import ResetPasswordForm from "./features/auth/ResetPasswordForm";
import IsCompletedRoute from "./modules/student/features/IsCompletedRoute";
import Student from "./modules/student/pages/Student";
import StudentSkills from "./modules/student/pages/StudentSkills";

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
              <Route path="verification-code" element={<VerifyOtpForm />} />
              <Route path="reset-password" element={<ResetPasswordForm />} />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
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
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/student" element={<Student />}>
                <Route
                  index
                  element={<Navigate replace to="student-preferences" />}
                />
                <Route
                  path="student-preferences"
                  element={
                    <IsCompletedRoute>
                      <StudentSkills />
                    </IsCompletedRoute>
                  }
                />
                <Route
                  path="team-offers"
                  element={<div>team offer page</div>}
                />
                <Route
                  path="submit-offer"
                  element={<div>submit offer page</div>}
                />
                <Route
                  path="team-management"
                  element={<div>team management page</div>}
                />
              </Route>
            </Route>

            <Route
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
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
                <ProtectedRoute allowedRoles={["enterprise"]}>
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
