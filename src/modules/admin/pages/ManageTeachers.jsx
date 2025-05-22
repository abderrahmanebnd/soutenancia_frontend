import SectionTitle from "@/modules/student/components/SectionTitle";

import { userColumns } from "../features/user/AddUserColumn";

import { useUsers } from "../features/user/useUsers";
import { AddUser } from "../features/user/AddUser";
import { useState } from "react";

import { UserDataTable } from "@/components/commun/user-data-table";
import { useSearchParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { getEsiAllYears } from "@/utils/helpers";

function ManageTeachers() {
  const [editingUser, setEditingUser] = useState(null);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const role = "teacher";

  const {
    users,
    createUser,
    isGettingUsers,
    isErrorGettingUsers,
    updateUser,
    deleteUser,
    isDeleting,
  } = useUsers(role, currentPage);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleSuccess = () => {
    setEditingUser(null);
  };

  const formattedData = users?.data?.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    departement: user.Teacher?.department || "N/A",
    title: user.Teacher?.title || "N/A",
    isDeleting,
    onEdit: () => handleEdit(user),
    onDelete: () => handleDelete(user.id),
  }));

  return (
    <div className="space-y-4">
      <section className="flex gap-4 items-center justify-between bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Manage Teachers"
          subtitle="Browse and manage all teachers"
        />
        <AddUser
          role={role}
          editingUser={editingUser}
          onSuccess={handleSuccess}
          updateUser={updateUser}
          createUser={createUser}
        />
      </section>

      <div className="bg-section p-4 rounded-xl shadow-sm">
        {isGettingUsers && (
          <div className="space-y-4">
            {getEsiAllYears().map((year) => (
              <div className="flex items-center space-x-4" key={year}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        )}
        {isErrorGettingUsers && (
          <p className="text-destructive">Error fetching students</p>
        )}
        {!isErrorGettingUsers && !isGettingUsers && (
          <UserDataTable
            columns={userColumns(role, handleEdit, handleDelete)}
            data={formattedData}
            isLoading={isGettingUsers}
            emptyMessage="No students found"
            totalPages={users?.pagination?.totalPages}
          />
        )}
      </div>
    </div>
  );
}

export default ManageTeachers;
