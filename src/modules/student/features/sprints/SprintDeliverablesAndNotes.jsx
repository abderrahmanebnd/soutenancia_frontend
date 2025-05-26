import Spinner from "@/components/commun/Spinner";
import SectionTitle from "../../components/SectionTitle";
import { useAllDeliverablesPerSprint } from "./useAllDeliverablesPerSprint";
import SprintDeliverablesCards from "./SprintDeliverablesCards";
import SprintNotes from "./SprintNotes";

function SprintDeliverablesAndNotes({ idSprint }) {
  const {
    allDeliverablesData,
    isGettingAllDeliverables,
    isErrorGettingAllDeliverables,
  } = useAllDeliverablesPerSprint(idSprint);

  if (isGettingAllDeliverables) return <Spinner />;
  if (isErrorGettingAllDeliverables)
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        <p>Error fetching deliverables data. Please try again later.</p>
      </div>
    );
  return (
    <div className="mt-8 space-y-4">
      <section className="bg-white rounded-xl p-4 shadow-md ">
        <SectionTitle
          title="Sprint Deliverables and Notes"
          subtitle="See more details about this project deliverables and notes"
        />
      </section>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200 col-span-full">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Sprint Deliverables
        </h2>

        {allDeliverablesData?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {allDeliverablesData?.map((deliverable) => (
              <SprintDeliverablesCards
                key={deliverable.id}
                title={deliverable.title}
                description={deliverable.description}
                file={deliverable.fileUrl}
                uploadDate={deliverable.createdAt}
                deliverableId={deliverable.id}
                sprintId={idSprint}
                firstName={deliverable.sender.firstName}
                lastName={deliverable.sender.lastName}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No deliverables have been shared yet.
          </div>
        )}
      </div>
      <SprintNotes sprintId={idSprint} />
    </div>
  );
}

export default SprintDeliverablesAndNotes;
