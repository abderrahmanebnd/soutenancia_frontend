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
import TeamCompositionProtectedRoute from "./modules/student/features/team-management/TeamCompositionProtectedRoute";
import TeamCompositionUnauthorized from "./modules/student/pages/TeamCompositionUnauthorized";
import ProjectOffers from "./modules/teacher/pages/ProjectOffers";
import CurrentProjectOffers from "./modules/teacher/pages/CurrentProjectOffers";
import PreviousProjectOffers from "./modules/teacher/pages/PreviousProjectOffers";
import ProjectOfferDetails from "./modules/teacher/pages/ProjectOfferDetails";
import SubmitProject from "./modules/teacher/pages/SubmitProject";
import AddProjectOffer from "./modules/teacher/pages/AddProjectOffer";
import SingleProjectApplications from "./modules/teacher/pages/SingleProjectApplications";
import CurrentStudentProjectOffers from "./modules/student/pages/CurrentStudentProjectOffers";
import ProjectCompositionProtectedRoute from "./modules/student/features/project-composition-countdown/ProjectCompositionProtectedRoute";

import EditProject from "./modules/teacher/pages/EditProject";
import MyProjectApplications from "./modules/student/pages/MyProjectApplications";
import ManageUsers from "./modules/admin/pages/ManageUsers";
import ManageStudents from "./modules/admin/pages/ManageStudents";
import ManageTeachers from "./modules/admin/pages/ManageTeachers";

import ProjectDescription from "./modules/student/pages/ProjectDescription";
import ProjectDetails from "./modules/student/pages/ProjectDetails";
import SprintsManagement from "./modules/student/pages/SprintsManagement";
import SprintDetails from "./modules/student/pages/SprintDetails";

import ManageSkills from "./modules/admin/pages/manage-skills";
import ManageSpecialties from "./modules/admin/pages/manage-specialties";
import AssignmentModes from "./modules/admin/pages/AssignementModes";
import { ManageDurationsTabs } from "./modules/admin/pages/manageDurationTab";
import { ManageProjectSelections } from "./modules/admin/pages/manageProjetSeletions";
import { ManageTeamCompositions } from "./modules/admin/pages/manageTeamCompositions";
import ProfileCard from "./Pages/ProfileCard";
import ManageMyTeams from "./modules/teacher/pages/ManageMyTeams";
import { TeamManagementProvider } from "./modules/teacher/context/TeamManagementContext";
import TeacherProjectDetails from "./modules/teacher/pages/TeacherProjectDetails";

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
                  <Route
                    index
                    element={<Navigate replace to="manage-students" />}
                  />
                  <Route element={<ManageUsers />}>
                    <Route
                      index
                      path="manage-students"
                      element={<ManageStudents />}
                    />
                    <Route
                      index
                      path="manage-teachers"
                      element={<ManageTeachers />}
                    />
                  </Route>

                  <Route
                    path="manage-specialties"
                    element={<ManageSpecialties />}
                  />
                  <Route path="manage-skills" element={<ManageSkills />} />
                  <Route
                    path="assignment-modes"
                    element={<AssignmentModes />}
                  />
                  <Route element={<ManageDurationsTabs />}>
                    <Route
                      index
                      path="project-selections"
                      element={<ManageProjectSelections />}
                    />
                    <Route
                      index
                      path="team-Compositions"
                      element={<ManageTeamCompositions />}
                    />
                  </Route>
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
                  <Route
                    path="team-offers"
                    element={
                      <TeamCompositionProtectedRoute>
                        <TeamOffers />
                      </TeamCompositionProtectedRoute>
                    }
                  />
                  <Route
                    path="team-offers/:idTeamOfferDetails"
                    element={
                      <TeamCompositionProtectedRoute>
                        <TeamOfferDetails />
                      </TeamCompositionProtectedRoute>
                    }
                  />
                  <Route
                    path="edit-team-offer"
                    element={
                      <TeamCompositionProtectedRoute>
                        <EditTeamOffer />
                      </TeamCompositionProtectedRoute>
                    }
                  />
                  <Route
                    path="submit-team-offer"
                    element={
                      <TeamCompositionProtectedRoute>
                        <SubmitOffer />
                      </TeamCompositionProtectedRoute>
                    }
                  />
                  <Route
                    path="team-applications"
                    element={
                      <TeamCompositionProtectedRoute>
                        <TeamApplicationsProvider>
                          <TeamApplicationsManagement />
                        </TeamApplicationsProvider>
                      </TeamCompositionProtectedRoute>
                    }
                  />
                  <Route
                    path="team-details"
                    element={
                      <TeamCompositionProtectedRoute>
                        <TeamDetails />
                      </TeamCompositionProtectedRoute>
                    }
                  />
                  <Route
                    path="team-composition-unauthorized"
                    element={<TeamCompositionUnauthorized />}
                  />
                  <Route
                    path="project-offers"
                    element={
                      <ProjectCompositionProtectedRoute>
                        <CurrentStudentProjectOffers />
                      </ProjectCompositionProtectedRoute>
                    }
                  />
                  <Route
                    path="project-offers/:idProjectOfferDetails"
                    element={
                      <ProjectCompositionProtectedRoute>
                        <ProjectOfferDetails />
                      </ProjectCompositionProtectedRoute>
                    }
                  />
                  <Route
                    path="project-applications"
                    element={
                      <ProjectCompositionProtectedRoute>
                        <MyProjectApplications />
                      </ProjectCompositionProtectedRoute>
                    }
                  />
                  <Route
                    element={
                      <ProjectCompositionProtectedRoute>
                        <ProjectDetails />
                      </ProjectCompositionProtectedRoute>
                    }
                  >
                    <Route
                      index
                      path="project-description"
                      element={<ProjectDescription />}
                    />
                    <Route path="sprints" element={<SprintsManagement />} />
                  </Route>
                  <Route path="sprints/:idSprint" element={<SprintDetails />} />

                  <Route path="profile" element={<ProfileCard />} />
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoute allowedRoles={["teacher"]}>
                    <SessionLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="/teacher"
                  element={
                    <TeamManagementProvider>
                      <Teacher />
                    </TeamManagementProvider>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to="project-offers" />}
                  />

                  <Route path="project-offers" element={<ProjectOffers />}>
                    <Route
                      index
                      element={
                        <Navigate replace to="current-projects-offers" />
                      }
                    />
                    <Route
                      path="current-projects-offers"
                      element={<CurrentProjectOffers />}
                    />
                    <Route
                      path="previous-projects-offers"
                      element={<PreviousProjectOffers />}
                    />
                  </Route>
                  <Route
                    path="project-offers/:idProjectOfferDetails"
                    element={<ProjectOfferDetails />}
                  />
                  <Route path="my-project-offers" element={<SubmitProject />} />

                  <Route
                    path="Add-project-offer"
                    element={<AddProjectOffer />}
                  />
                  <Route
                    path="my-project-offers/edit/:idEditProjectOffer"
                    element={<EditProject />}
                  />
                  <Route
                    path="my-project-offers/project-applications/:idProjectApplications"
                    element={<SingleProjectApplications />}
                  />
                  <Route
                    path="my-project-offers/:idProjectOffer/manage-my-teams"
                    element={<ManageMyTeams />}
                  />
                  <Route
                    path="team-details/:idTeamOfferDetails"
                    element={<TeamOfferDetails />}
                  />
                  <Route
                    path={`manage-team/:teamId/project/:projectId`}
                    element={<TeacherProjectDetails />}
                  />
                  <Route
                    path="manage-team/:teamId/project/:projectId/sprint/:idSprint"
                    element={<SprintDetails />}
                  />
                  <Route path="profile" element={<ProfileCard />} />
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
