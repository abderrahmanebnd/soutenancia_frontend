import { columnsMyApplications } from "../features/team-management/columnmyApplications";
import { DataTable } from "../../../components/commun/data-table";
import SectionTitle from "../components/SectionTitle";
import FilterMyApplications from "../features/team-management/FilterMyApplications";
import { useMyApplications } from "@/modules/student/features/team-management/useMyapplication";
import LoadingSpinner from "@/components/commun/ButtonWithSpinner";
import { useTeamOffer } from "../features/team-offers/useTeamOffer";
import toast from "react-hot-toast";
import { useQueries } from "@tanstack/react-query";

export default function MyApplications() {
  const { data: myApplications, isLoading, error } = useMyApplications();
  const teamOfferIds = myApplications?.applications?.map(app => app.teamOfferId) || [];
  const teamOfferQueries = useQueries({
    queries: teamOfferIds.map(id => ({
      queryKey: ["team", id],
      queryFn: () => getTeamOfferById(id),
    })),
  });
  const isTeamOffersLoading = teamOfferQueries.some(query => query.isLoading);
  const applicationsData = myApplications?.applications?.map((app, index) => {
    const teamOfferQuery = teamOfferQueries[index];
    const teamOfferDetails = teamOfferQuery?.data;
    const generalSkills = teamOfferDetails?.general_required_skills?.map(skill => skill.name) || [];
    const specificSkills = teamOfferDetails?.specific_required_skills || [];

    return {
      ...app,
      teamOffer: {
        title: teamOfferDetails?.title || app.teamOffer?.title || 'N/A',
        max_members: teamOfferDetails?.max_members || app.teamOffer?.max_members || 1,
        membersCount: teamOfferDetails?.membersCount || 0,
        specific_required_skills: specificSkills,
        general_required_skills: generalSkills
      },
      status: app.status || 'pending',
      createdAt: app.createdAt || new Date().toISOString(),
      isTeamOfferLoading: teamOfferQuery?.isLoading,
      isTeamOfferError: teamOfferQuery?.isError
    };
  }) || [];

  if (isLoading || isTeamOffersLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="bg-section p-6 rounded-xl shadow-sm">
      <SectionTitle
        title="My Applications"
        subtitle="Track and manage your project applications"
      />
      <DataTable
        columns={columnsMyApplications}
        data={applicationsData}
        searchWith="projectTitle"  
        filterComponent={<FilterMyApplications />}
        className="mt-6"
      />
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <div className="rounded-md bg-destructive/10 p-4">
      <div className="flex items-center gap-2 text-destructive">
        <XCircle className="h-4 w-4" />
        <h3 className="font-medium">Failed to load applications</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message || 'Please try again later'}
      </p>
    </div>
  );
}