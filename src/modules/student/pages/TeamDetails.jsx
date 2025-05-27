import { useTeamOffer } from "../features/team-offers/useTeamOffer";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/commun/Spinner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SectionTitle from "../components/SectionTitle";
import { Button } from "@/components/ui/button";
import { useDeleteTeamMember } from "../features/team-management/useDeleteTeamMember";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OctagonX, TrashIcon } from "lucide-react";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router";

const TeamDetails = () => {
  const { currentUser } = useAuth();
  const teamOfferId = currentUser?.user.Student.TeamMember[0]?.teamOfferId;
  const isLeader = currentUser?.user?.Student?.isLeader;
  const isInTeam = currentUser?.user?.Student?.isInTeam;

  console.log("Team Offer ID:", teamOfferId);
  const { teamOfferDetails, isLoading, isError } = useTeamOffer(teamOfferId);
  const { deleteTeamMembers, isDeleting } = useDeleteTeamMember();

  const handleDeleteTeamMember = (member) => {
    deleteTeamMembers({
      teamOfferId,
      memberId: member.student.id,
    });
  };

  if (!isInTeam && !isLeader) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <section className="bg-white rounded-xl px-6 py-5 shadow-md mb-6">
          <SectionTitle
            title="Team Details"
            subtitle="View and manage your team information"
          />
        </section>
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <img
            src="/assets/team-not-found.svg"
            alt="team not found"
            className="w-52 h-52 lg:w-64 lg:h-64 mx-auto mb-3"
          />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {" "}
            You are not currently in a team
          </h3>
          <p className="text-gray-500 mb-6">
            Join or create a team to access team management features
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button>
              <Link to="/student/team-offers">Browse Team Offers</Link>
            </Button>
            <Button>
              <Link to="/student/submit-team-offer">Create New Team</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-12">
        <div className="mx-auto bg-red-100 text-red-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <OctagonX className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium">Error loading team details</h3>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );

  if (!teamOfferDetails)
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No team found</h3>
      </div>
    );

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const generalSkills = (teamOfferDetails.general_required_skills || []).map(
    (s) => s.name
  );
  const specificSkills = teamOfferDetails.specific_required_skills || [];
  const allSkills = [...generalSkills, ...specificSkills];

  const currentMembers = teamOfferDetails.TeamMembers?.length || 1;
  const maxMembers = teamOfferDetails.max_members || 5;
  const memberPercentage = (currentMembers / maxMembers) * 100;

  const progressColor =
    memberPercentage < 50
      ? "bg-green-500"
      : memberPercentage < 80
      ? "bg-blue-500"
      : memberPercentage < 100
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="space-y-6  ">
      <section className="bg-white rounded-xl px-6 py-5 shadow-sm">
        <SectionTitle
          title="Team & Team Details"
          subtitle="Manage your team members and Team information"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Team Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-gray-200 shadow-sm overflow-hidden">
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
                Team Details
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
                  Team Title
                </h3>
                <div
                  className={`p-3 rounded-md text-md ${
                    teamOfferDetails.title
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-100 italic"
                  }`}
                >
                  {teamOfferDetails.title || "No title provided"}
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
                  Team Summary
                </h3>
                <div
                  className={`p-3 rounded-md text-md ${
                    teamOfferDetails.description
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-100 italic"
                  }`}
                >
                  {teamOfferDetails.description || "No description provided."}
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
                  Used Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allSkills.length > 0 ? (
                    allSkills.map((skill, idx) => (
                      <Badge key={`skill-${idx}`}>{skill}</Badge>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      No technologies specified
                    </div>
                  )}
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
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                  </svg>
                  Team Capacity
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-md font-medium">
                    <span>
                      {currentMembers} member{currentMembers !== 1 ? "s" : ""}{" "}
                      joined
                    </span>
                    <span className="text-gray-600">
                      Max {maxMembers} members
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={memberPercentage}
                      className={`h-2.5 ${progressColor}`}
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(memberPercentage)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Team Information */}
        <div className="space-y-3">
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
                Team Leader
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-blue-200">
                  <AvatarImage src={teamOfferDetails.leader?.user?.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {getInitials(
                      teamOfferDetails.leader?.user?.firstName,
                      teamOfferDetails.leader?.user?.lastName
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    {teamOfferDetails.leader?.user?.firstName}{" "}
                    {teamOfferDetails.leader?.user?.lastName}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {teamOfferDetails.leader?.user?.email}
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Team Leader
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
                  Team Members
                </CardTitle>
                <Badge variant="outline" className="bg-white text-gray-600">
                  {currentMembers - 1} member
                  {currentMembers - 1 !== 1 ? "s" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {teamOfferDetails.TeamMembers?.length > 1 ? (
                <div className="space-y-4">
                  {teamOfferDetails.TeamMembers.slice(1).map((member) => (
                    <div
                      key={`member-${member.student.id}`}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Avatar className="h-11 w-11 border border-gray-200 flex-shrink-0">
                          <AvatarImage src={member.student.user.avatar} />
                          <AvatarFallback className="bg-gray-100 text-gray-800">
                            {getInitials(
                              member.student.user.firstName,
                              member.student.user.lastName
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <h4 className="text-md font-semibold text-gray-800 truncate">
                            {member.student.user.firstName}{" "}
                            {member.student.user.lastName}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {member.student.user.email}
                          </p>
                        </div>
                      </div>
                      {isLeader && (
                        <div className="flex-shrink-0 ml-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 hover:text-red-700 focus-visible:ring-red-200 focus-visible:ring-offset-red-50"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md rounded-lg">
                              <DialogHeader className="space-y-4">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                  <OctagonX className="h-6 w-6 text-red-600" />
                                </div>
                                <DialogTitle className="text-center text-lg font-semibold text-gray-800">
                                  Confirm Removal
                                </DialogTitle>
                                <DialogDescription className="text-center text-gray-600">
                                  This will permanently remove{" "}
                                  {member.student.user.firstName} from the team.
                                  <br />
                                  Are you sure you want to continue?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="gap-3 sm:gap-0">
                                <DialogClose asChild>
                                  <Button variant="outline" className="w-full">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                {isDeleting ? (
                                  <ButtonWithSpinner
                                    disabled={isDeleting}
                                    variant="destructive"
                                  />
                                ) : (
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleDeleteTeamMember(member)
                                    }
                                    disabled={isDeleting}
                                    className="w-full"
                                  >
                                    Confirm Removal
                                  </Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                    No team members yet
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Only the team leader is currently part of this team
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
