import { columnsMyApplications } from "../features/project-management/columnmyprojectapplication";
import { DataTable } from "../../../components/commun/data-table";
import SectionTitle from "../components/SectionTitle";
import FilterMyApplications from "../features/team-management/FilterMyApplications";
import { useMyProjectApplications } from "../features/project-management/usemyprojectapplication";
import { XCircle } from "lucide-react";
import InlineSpinner from "@/components/commun/InlineSpinner";

export default function MyProjectApplications() {
  const {
    data: { applications = [] } = {},
    isLoading,
    error,
    isError,
  } = useMyProjectApplications();

  return (
    <div className="bg-section p-4 rounded-xl shadow-sm">
      <SectionTitle
        title="My Project Applications"
        subtitle="Track and manage your project applications"
      />
      {isLoading && <InlineSpinner />}
      {isError && <ErrorMessage error={error} />}
      {!isError && !isLoading && (
        <DataTable
          columns={columnsMyApplications}
          data={applications} // Use applications directly from the hook
          searchWith="projectTitle"
          filterComponent={<FilterMyApplications />}
          className="mt-6"
        />
      )}
    </div>
  );
}

function ErrorMessage({ error }) {
  const isServerError = error.response?.status === 500;

  return (
    <div className="rounded-md bg-destructive/10 p-4 max-w-2xl mx-auto mt-8">
      <div className="flex items-center gap-2 text-destructive">
        <XCircle className="h-4 w-4" />
        <h3 className="font-medium">Application Error</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {isServerError
          ? "A server error occurred. Please try again later."
          : error.message}
      </p>
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