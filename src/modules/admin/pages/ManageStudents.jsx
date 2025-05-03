import SectionTitle from "@/modules/student/components/SectionTitle";
import { DataTable } from "@/components/commun/data-table";
import { userColumns } from "../features/user/AddUserColumn";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { useUsers } from "../features/user/useUsers";
import { AddUser } from "../features/user/AddUser";
import { useState } from "react";

function ManageStudents() {
  const [editingUser, setEditingUser] = useState(null);
  const role = "student";

  const { 
    users, 
    isGettingUsers, 
    isErrorGettingUsers,
    updateUser,
    deleteUser,
    isDeleting 
  } = useUsers(role);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteUser(userId);
    }
  };

  const handleSuccess = () => {
    setEditingUser(null);
  };

  const formattedData = users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    enrollmentNumber: user.Student?.enrollmentNumber || "N/A",
    speciality: {
      name: user.Student?.speciality?.name || "N/A",
      id: user.Student?.specialityId || "N/A"
    },
    isDeleting,
    onEdit: () => handleEdit(user),
    onDelete: () => handleDelete(user.id),
  }));

  return (
    <div className="space-y-4">
      <section className="flex gap-4 items-center justify-between bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Manage Students"
          subtitle="Browse and manage all students"
        />
        <AddUser 
          role={role} 
          editingUser={editingUser} 
          onSuccess={handleSuccess}
          updateUser={updateUser}
        />
      </section>

      <div className="bg-section p-4 rounded-xl shadow-sm">
        {isGettingUsers && <InlineSpinner />}
        {isErrorGettingUsers && (
          <p className="text-destructive">Error fetching students</p>
        )}
        {!isErrorGettingUsers && !isGettingUsers && (
          <DataTable
            columns={userColumns(role, handleEdit, handleDelete)}
            data={formattedData}
            searchWith="firstName"
            emptyMessage="No students found"
          />
        )}
      </div>
    </div>
  );
}

export default ManageStudents;