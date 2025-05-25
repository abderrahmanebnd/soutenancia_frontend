import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

const columnHelper = createColumnHelper();

export const userColumns = (role, onEdit, onDelete) => [
  columnHelper.accessor("firstName", {
    header: () => <h1>First Name</h1>,
    cell: ({ row }) => (
      <span className="font-medium capitalize">{row.original.firstName}</span>
    ),
  }),
  columnHelper.accessor("lastName", {
    header: () => <h1>Last Name</h1>,
    cell: ({ row }) => (
      <span className="font-medium capitalize">{row.original.lastName}</span>
    ),
  }),
  columnHelper.accessor("email", {
    header: () => <h1>Email</h1>,
    cell: ({ row }) => (
      <span className="text-primary">{row.original.email}</span>
    ),
  }),
  ...(role === "student"
    ? [
        columnHelper.accessor("enrollmentNumber", {
          header: () => <h1>Enrollement</h1>,
          cell: ({ row }) => (
            <span className="font-mono">{row.original.enrollmentNumber}</span>
          ),
        }),
        columnHelper.accessor("speciality.name", {
          header: () => <h1>Speciality</h1>,
          cell: ({ row }) => (
            <span className="capitalize">{row.original.speciality?.name}</span>
          ),
        }),
        columnHelper.accessor("role", {
          id: "role",
          header: () => <h1>Role</h1>,
          cell: ({ row }) => {
            return <span className="capitalize">{row.original.role}</span>;
          },
        }),
      ]
    : [
        columnHelper.accessor("departement", {
          header: () => <h1>Departement</h1>,
          cell: ({ row }) => (
            <span className="capitalize">{row.original.departement}</span>
          ),
        }),
        columnHelper.accessor("title", {
          header: () => <h1>Title</h1>,
          cell: ({ row }) => (
            <span className="capitalize">{row.original.title}</span>
          ),
        }),
      ]),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200 rounded-full h-8 hover:text-blue-600"
          onClick={() => onEdit(row.original)}
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-full h-8 hover:text-red-600"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
    ),
  }),
];
