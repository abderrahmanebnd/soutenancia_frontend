import { useAuth } from "@/context/AuthContext";
import { useSingleSprintByProject } from "./useSingleSprintByProject";
import InlineSpinner from "@/components/commun/InlineSpinner";
import SectionTitle from "../../components/SectionTitle";

function SprintDescription({ idSprint }) {
  const { currentUser } = useAuth();
  const projectId =
    currentUser?.user?.Student?.TeamOffer?.at(0)?.assignedProjectId;
  const { sprintData, isGettingSprint, isErrorGettingSprint } =
    useSingleSprintByProject(projectId, idSprint);
  const colorStatus =
    sprintData?.status === "active"
      ? "text-pending"
      : sprintData?.status === "completed"
      ? "text-green-500"
      : "text-primary";
  if (isGettingSprint) return <InlineSpinner />;
  if (isErrorGettingSprint)
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        <p>Error fetching sprint data. Please try again later.</p>
      </div>
    );
  return (
    <div className="mt-8 space-y-4">
      <section className="bg-white rounded-xl p-4 shadow-md">
        <SectionTitle
          title="Sprint description"
          subtitle="See more details about this sprint"
        />
      </section>

      <div className=" bg-white rounded-xl p-4 shadow-sm">
        <h1 className="text-xl font-bold text-primary">{sprintData.title}</h1>
        <p className="text-muted-foreground">{sprintData.description}</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-primary">
            Sprint follow up
          </h2>
          <ul className="list-disc pl-5 text-muted-foreground">
            <li>
              Start date :{" "}
              <span className="text-primary">
                {sprintData.startDate.slice(0, 10)}
              </span>{" "}
            </li>
            <li>
              End date :{" "}
              <span className="text-primary">
                {sprintData.endDate.slice(0, 10)}
              </span>
            </li>
            <li>
              Status : <span className={colorStatus}>{sprintData?.status}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SprintDescription;
