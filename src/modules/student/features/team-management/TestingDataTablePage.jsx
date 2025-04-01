import { columns } from "./columns";
import { DataTable } from "./data-table";
const data = [
  {
    id: "728ed521",
    studentName: "Mehdi",
    status: "pending",
    email: "m@example.com",
    skills: "Python",
  },
  {
    id: "728ed522",
    studentName: "Ali",
    status: "processing",
    email: "a@example.com",
    skills: "javascript",
  },
  {
    id: "728ed523",
    studentName: "Sara",
    status: "success",
    email: "b@example.com",
    skills: "java",
  },
  {
    id: "728ed524",
    studentName: "Nesrine",
    status: "failed",
    email: "c@example.com",
    skills: "c++",
  },
];

export default function TestingDataTablePage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
