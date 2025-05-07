import SectionTitle from "../components/SectionTitle";

import AllProjectSprintsList from "../features/sprints/AllProjectSprintsList";
import CreateSprintDialog from "../components/CreateSprintDialog";

function SprintsManagement() {
  return (
    <div className="space-y-6  ">
      <section className="bg-white rounded-xl px-6 py-5 shadow-sm">
        <SectionTitle
          title="Sprints Details"
          subtitle="Here you manage all your sprints concerning your project "
        />
      </section>
      <section className=" w-full px-6 py-5 bg-section rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-primary">Sprints Management</h1>
          <CreateSprintDialog />
        </div>
        <AllProjectSprintsList />
      </section>
    </div>
  );
}

export default SprintsManagement;
