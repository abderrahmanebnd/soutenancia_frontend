import { columnsMyApplications } from "../features/team-management/columnmyApplications";
import { DataTable } from "../../../components/commun/data-table";
import SectionTitle from "../components/SectionTitle";
import FilterMyApplications from "../features/team-management/FilterMyApplications";
import { useMyApplications } from "@/modules/student/features/team-management/useMyapplication";

import { useQueries } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import InlineSpinner from "@/components/commun/InlineSpinner";

export default function MyApplications() {
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user?.Student?.isLeader;
  const {
    data: myApplications,
    isLoading,
    error,
    isError,
  } = useMyApplications();

  if (isLeader) {
    return null;
  }

  const teamOfferIds =
    myApplications?.applications?.map((app) => app.teamOfferId) || [];

  const teamOfferQueries = useQueries({
    queries: teamOfferIds.map((id) => ({
      queryKey: ["teamOffer", id],
      queryFn: () => getTeamOfferById(id),
      retry: 1,
      enabled: !!id && !isError, // Only fetch if we have an ID and no auth error
    })),
  });

  const isTeamOffersLoading = teamOfferQueries.some(
    (query) => query.isLoading && query.fetchStatus !== "idle"
  );

  const applicationsData =
    myApplications?.applications?.map((app, index) => {
      const teamOfferQuery = teamOfferQueries[index];
      const teamOfferDetails = teamOfferQuery?.data || app.teamOffer;

      return {
        ...app,
        teamOffer: {
          ...app.teamOffer,
          ...teamOfferDetails,
          _count: {
            TeamMembers: teamOfferDetails?._count?.TeamMembers || 0,
          },
        },
      };
    }) || [];

  return (
    <div className="bg-section p-4 rounded-xl shadow-sm">
      <SectionTitle
        title="My Applications"
        subtitle="Track and manage your project applications"
      />
      {isLoading || (isTeamOffersLoading && <InlineSpinner />)}
      {isError && <ErrorMessage error={error} />}
      {!isError && !isLoading && !isTeamOffersLoading && (
        <DataTable
          columns={columnsMyApplications}
          data={applicationsData}
          searchWith="projectTitle"
          filterComponent={<FilterMyApplications />}
          className="mt-6"
        />
      )}
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <div className="rounded-md bg-destructive/10 p-4 max-w-2xl mx-auto mt-8">
      <div className="flex items-center gap-2 text-destructive">
        <XCircle className="h-4 w-4" />
        <h3 className="font-medium">Application Error</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      {error.message.includes("permission") && (
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm text-primary underline"
        >
          Try refreshing the page
        </button>
      )}
    </div>
  );
}
