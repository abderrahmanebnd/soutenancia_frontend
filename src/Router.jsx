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
import IsCompletedRoute from "./modules/student/features/team-offers/IsCompletedRoute";
import Student from "./modules/student/pages/Student";
import StudentSkills from "./modules/student/pages/StudentSkills";
import SessionLayout from "./components/commun/SessionLayout";
import Admin from "./modules/admin/pages/Admin";
import Enterprise from "./modules/enterprise/pages/Enterprise";
import Teacher from "./modules/teacher/pages/Teacher";
import { SessionProvider } from "./context/SessionContext";
import TeamOffers from "./modules/student/pages/TeamOffers";
import TeamOfferDetails from "./modules/student/pages/TeamOfferDetails";
import EditTeamOffer from "./modules/student/pages/EditTeamOffer";
import SubmitOffer from "./modules/student/pages/SubmitOffer";
import { TeamApplicationsProvider } from "./modules/student/context/TeamApplicationsContext";
import TeamApplicationsManagement from "./modules/student/pages/TeamApplicationsManagement";
import TeamDetails from "./modules/student/pages/TeamDetails";

function Router() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SessionProvider>
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
                <Route
                  path="forgot-password"
                  element={<ForgotPasswordForm />}
                />
                <Route path="verification-code" element={<VerifyOtpForm />} />
                <Route path="reset-password" element={<ResetPasswordForm />} />
              </Route>
              <Route path="unauthorized" element={<Unauthorized />} />

              <Route
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <SessionLayout />
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
                    <SessionLayout />
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
                  <Route path="team-offers" element={<TeamOffers />} />
                  <Route
                    path="team-offers/:idTeamOfferDetails"
                    element={<TeamOfferDetails />}
                  />
                  <Route path="edit-team-offer" element={<EditTeamOffer />} />
                  <Route path="submit-team-offer" element={<SubmitOffer />} />
                  <Route
                    path="team-applications"
                    element={
                      <TeamApplicationsProvider>
                        <TeamApplicationsManagement />
                      </TeamApplicationsProvider>
                    }
                  />
                  <Route path="team-details" element={<TeamDetails />} />
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoute allowedRoles={["teacher"]}>
                    <SessionLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/teacher" element={<Teacher />}>
                  <Route
                    index
                    element={<Navigate replace to="add-project" />}
                  />

                  <Route path="add-project" element={<div>add-project</div>} />
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoute allowedRoles={["enterprise"]}>
                    <SessionLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/enterprise" element={<Enterprise />}>
                  <Route
                    index
                    element={<Navigate replace to="add-project" />}
                  />

                  <Route path="add-project" element={<div>add-project</div>} />
                </Route>
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </SessionProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default Router;
