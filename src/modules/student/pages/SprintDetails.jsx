import { useParams } from "react-router";
import SprintTabs from "../components/SprintTabs";

function SprintDetails() {
  const { idSprint } = useParams();
  return (
    <div>
      <SprintTabs idSprint={idSprint} />
    </div>
  );
}

export default SprintDetails;
