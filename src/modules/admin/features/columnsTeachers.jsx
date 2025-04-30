import { createColumnHelper } from "@tanstack/react-table";

import HeaderCellWithSorting from "@/modules/student/components/HeaderCellWithSorting";

const columnHelper = createColumnHelper();

export const columnsTeachers = [
  columnHelper.accessor("fullName", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Full Name"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <p className="font-semibold text-primary capitalize">
          {row.original.fullName}
        </p>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Email"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <p>{row.original.email}</p>;
    },
  }),
  columnHelper.accessor("department", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Department"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.department ? (
            <p className="text-primary font-medium">
              {row.original.department}
            </p>
          ) : (
            <p className="text-slate-400">No department provided</p>
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => {
      return (
        <HeaderCellWithSorting
          title="Title"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.title ? (
            <p className="text-primary font-medium">{row.original.title}</p>
          ) : (
            <p className="text-slate-400">No title provided</p>
          )}
        </div>
      );
    },
  }),
];
