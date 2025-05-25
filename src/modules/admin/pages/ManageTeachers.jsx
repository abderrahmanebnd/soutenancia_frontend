import SectionTitle from "@/modules/student/components/SectionTitle";

import { userColumns } from "../features/user/AddUserColumn";

import { useUsers } from "../features/user/useUsers";
import { AddUser } from "../features/user/AddUser";
import { useState } from "react";

import { UserDataTable } from "@/components/commun/user-data-table";
import { useSearchParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { getEsiAllYears } from "@/utils/helpers";

import { Input } from "@/components/ui/input";

import { useAllTeachers } from "../features/user/useAllTeachers";

function ManageTeachers() {
  const [editingUser, setEditingUser] = useState(null);
  const [searchParams] = useSearchParams();
  const [filterCriteria, setFilterCriteria] = useState("");
  const currentPage = searchParams.get("page") || 1;
  const role = "teacher";

  const { createUser, updateUser, deleteUser, isDeleting } = useUsers(
    role,
    currentPage
  );
  const { allTeachers, isLoadingAllTeachers, isErrorGettingAllTeachers } =
    useAllTeachers(filterCriteria);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleSuccess = () => {
    setEditingUser(null);
  };

  const formattedData = allTeachers?.data?.map((user) => ({
    id: user.user.id,
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    email: user.user.email,
    departement: user?.department || "N/A",
    title: user?.title || "N/A",
    isDeleting,
    onEdit: () => handleEdit(user),
    onDelete: () => handleDelete(user.user.id),
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
      <div className="bg-section  rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center px-4 flex-wrap gap-2 ">
          <div className="flex items-center gap-4 ">
            <Input
              placeholder={`Search by first name`}
              type="text"
              onChange={(e) => setFilterCriteria(`search=${e.target.value}`)}
              className="min-w-[250px] max-w-[400px] bg-secondary"
            />
          </div>
        </div>
        <div className="bg-section p-4 rounded-xl shadow-sm">
          {isLoadingAllTeachers && (
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
          {isErrorGettingAllTeachers && (
            <p className="text-destructive">Error fetching students</p>
          )}

          {!isLoadingAllTeachers && !isErrorGettingAllTeachers && (
            <UserDataTable
              columns={userColumns(role, handleEdit, handleDelete)}
              data={formattedData || []}
              isLoading={isLoadingAllTeachers}
              emptyMessage="No teachers found"
              totalPages={allTeachers?.pagination?.totalPages}
              filterCriteria={filterCriteria}
              setFilterCriteria={setFilterCriteria}
              searchWith="firstName"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageTeachers;
