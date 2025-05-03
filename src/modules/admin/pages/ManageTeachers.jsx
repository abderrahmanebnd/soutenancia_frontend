import SectionTitle from "@/modules/student/components/SectionTitle";
import { DataTable } from "@/components/commun/data-table";
import { userColumns } from "../features/user/AddUserColumn";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { useUsers } from "../features/user/useUsers";
import { AddUser } from "../features/user/AddUser";
import { useState } from "react";

function ManageTeachers() {
  const [editingUser, setEditingUser] = useState(null);
  const role = "teacher";

  const { 
    users, 
    createUser,
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
      deleteUser(userId);
    
  };

  const handleSuccess = () => {
    setEditingUser(null);
  };

  const formattedData = users.map((user) => ({
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
        {isGettingUsers && <InlineSpinner />}
        {isErrorGettingUsers && (
          <p className="text-destructive">Error fetching teachers</p>
        )}
        {!isErrorGettingUsers && !isGettingUsers && (
          <DataTable
            columns={userColumns(role, handleEdit, handleDelete)}
            data={formattedData}
            searchWith="firstName"
            emptyMessage="No teachers found"
          />
        )}
      </div>
    </div>
  );
}

export default ManageTeachers;