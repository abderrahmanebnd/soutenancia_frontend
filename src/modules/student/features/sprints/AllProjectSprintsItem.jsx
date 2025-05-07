import { Badge } from "@/components/ui/badge";

import EditSprintDialog from "../../components/EditSprintDialog";
import DeleteSprintDialog from "../../components/DeleteSprintDialog";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CircleEllipsis } from "lucide-react";

function AllProjectSprintsItem({ sprintData }) {
  const { id: sprintId, title, startDate, endDate, status } = sprintData;
  const colorStatus =
    status === "active"
      ? "bg-pending"
      : status === "completed"
      ? "bg-green-500"
      : "bg-primary";
  return (
    <li className="bg-background p-4 rounded-xl text-primary flex justify-between  gap-2 flex-wrap">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p>
          &bull; Start date :{" "}
          <span className="font-light">{startDate.slice(0, 10)}</span>
        </p>
        <p>
          &bull; End date :{" "}
          <span className="font-light">{endDate.slice(0, 10)}</span>
        </p>
        <div>
          {" "}
          &bull; Status : <Badge className={colorStatus}>{status}</Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <EditSprintDialog sprintId={sprintId} />
        <DeleteSprintDialog sprintId={sprintId} />
        <Button asChild className="col-span-2 self-end">
          <Link to={`/student/sprints/${sprintId}`}>
            View and manage
            <CircleEllipsis />
          </Link>
        </Button>
      </div>
    </li>
  );
}

export default AllProjectSprintsItem;
