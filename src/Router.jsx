import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./Pages/Login";
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
import SessionLayout from "./components/commun/SessionLayout";
import { getSessionSidebarData } from "./utils/getSessionSidebarData";
import Admin from "./modules/admin/pages/Admin";
import Enterprise from "./modules/enterprise/pages/Enterprise";
import Teacher from "./modules/teacher/pages/Teacher";

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
                  <SessionLayout
                    dashboardTitle={"Admin Dashboard"}
                    sessionSidebarLinks={getSessionSidebarData("admin")}
                  />
                </ProtectedRoute>
              }
            >
              {/* this is an exemple route for admin  just for testing */}
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Navigate replace to="add-users" />} />

                <Route path="add-users" element={<div>add-users</div>} />
              </Route>
            </Route>

            <Route
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <SessionLayout
                    dashboardTitle={"Student Dashboard"}
                    sessionSidebarLinks={getSessionSidebarData("student")}
                  />
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
                  <SessionLayout
                    dashboardTitle={"Teacher Dashboard"}
                    sessionSidebarLinks={getSessionSidebarData("teacher")}
                  />
                </ProtectedRoute>
              }
            >
              <Route path="/teacher" element={<Teacher />}>
                <Route index element={<Navigate replace to="add-project" />} />

                <Route path="add-project" element={<div>add-project</div>} />
              </Route>
            </Route>

            <Route
              element={
                <ProtectedRoute allowedRoles={["enterprise"]}>
                  <SessionLayout
                    dashboardTitle={"Enterprise Dashboard"}
                    sessionSidebarLinks={getSessionSidebarData("enterprise")}
                  />
                </ProtectedRoute>
              }
            >
              <Route path="/enterprise" element={<Enterprise />}>
                <Route index element={<Navigate replace to="add-project" />} />

                <Route path="add-project" element={<div>add-project</div>} />
              </Route>
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default Router;
