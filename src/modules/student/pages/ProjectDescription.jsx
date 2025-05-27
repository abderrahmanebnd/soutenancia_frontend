import Spinner from "@/components/commun/Spinner";
import { useMyProjectDetails } from "../features/project-offers/useMyProjectDetails";
import SectionTitle from "../components/SectionTitle";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CodeXml } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ItemNotFound from "@/components/commun/ItemNotFound";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
function ProjectDescription() {
  const {
    projectDetails,
    isLoadingProjectDetails,
    isErrorGettingProjectDetails,
    error,
  } = useMyProjectDetails();

  const { currentUser } = useAuth();
  const isInProject =
    currentUser?.user?.Student?.TeamOffer?.at(0)?.assignedProjectId !== null;
  if (isLoadingProjectDetails) {
    return <Spinner />;
  }
  if (isErrorGettingProjectDetails && error.response?.status !== 404) {
    return <p className="text-destructive">Error loading project details</p>;
  }
  if (!isInProject || error?.response?.status === 404) {
    return (
      <ItemNotFound>
        <div className="text-center mb-4">
          <h3 className="text-2xl font-semibold text-primary">
            Not in a project yet ?
          </h3>
          <p className="text-muted-foreground text-lg">
            You are not in a project yet or your applications status are still
            <span className="font-semibold text-lg"> Pending</span>
          </p>
        </div>
        <Button asChild>
          <Link to={"/student/project-offers"}>Apply for a project</Link>
        </Button>
      </ItemNotFound>
    );
  }
  return (
    <div className="space-y-6  ">
      <section className="bg-white rounded-xl px-6 py-5 shadow-sm">
        <SectionTitle
          title="Project Description"
          subtitle="Here are the descriptions of your project"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4">
        {/* Left Column - Team Details */}
        <div className="lg:col-span-2 lg:row-span-full space-y-6">
          <Card className="border border-gray-200 shadow-sm overflow-hidden h-full">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Project Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Title
                </h3>
                <div
                  className={`p-3 rounded-md text-md ${
                    projectDetails.title
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-100 italic"
                  }`}
                >
                  {projectDetails.title}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Project Summary
                </h3>
                <div
                  className={`p-3 rounded-md text-md ${
                    projectDetails.description
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-100 italic"
                  }`}
                >
                  {projectDetails.description}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  Used Tools
                </h3>
                <div className="flex gap-2">
                  {projectDetails.tools.length > 0 ? (
                    projectDetails?.tools?.map((tool, idx) => (
                      <Badge key={idx}>{tool}</Badge>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      No tools specified
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <CodeXml />
                  Used Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {projectDetails.languages.length > 0 ? (
                    projectDetails?.languages?.map((language, idx) => (
                      <Badge key={idx}>{language}</Badge>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      No languages specified
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <h3 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                  </svg>
                  Project Capacity
                </h3>
                <p className="text-lg font-semibold">
                  {projectDetails.maxTeamsNumber}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Team Information */}

        {/* Team Leader Card */}
        <Card className="border border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-green-100 text-green-800 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Project Supervisors
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-blue-200">
                <AvatarFallback className="bg-blue-100 text-blue-800">
                  {projectDetails?.teacher?.user?.firstName.substring(0, 1)}
                  {projectDetails?.teacher?.user?.lastName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  {projectDetails?.teacher?.user?.firstName}{" "}
                  {projectDetails?.teacher?.user?.lastName}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {projectDetails?.teacher?.user?.email}
                </p>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Project Supervisor
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Card */}
        <Card className="border border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-800 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </span>
                Project Co-supervisors
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-2">
            {projectDetails?.coSupervisors.length > 0 ? (
              projectDetails?.coSupervisors?.map((coSupervisor) => (
                <div className="flex items-center gap-4" key={coSupervisor.id}>
                  <Avatar className="h-14 w-14 border-2 border-blue-200">
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {coSupervisor?.user?.firstName.substring(0, 1)}
                      {coSupervisor?.user?.lastName.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">
                      {coSupervisor?.user?.firstName}{" "}
                      {coSupervisor?.user?.lastName}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {coSupervisor?.user?.email}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Project Co-supervisor
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-gray-600 font-medium">
                  No co-supervisors for this project
                </h4>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProjectDescription;
