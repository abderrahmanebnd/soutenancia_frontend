import SectionTitle from "@/modules/student/components/SectionTitle";
import { AddUser } from "../features/AddUser";
import { useGetTeachers } from "@/modules/teacher/features/project-offers/useGetTeachers";
import { DataTable } from "@/components/commun/data-table";
import { columnsTeachers } from "../features/columnsTeachers";
import InlineSpinner from "@/components/commun/InlineSpinner";

function ManageTeachers() {
  const { teachers, isGettingTeachers, isErrorGettingTeachers } =
    useGetTeachers();
  const formattedData = teachers?.map((teacher) => ({
    id: teacher.id,
    fullName: `${teacher.user.firstName} ${teacher.user.lastName}`,
    email: teacher.user.email,
    department: teacher.department,
    title: teacher.title,
  }));
  return (
    <div className="space-y-4">
      <section className=" flex gap-4 items-center justify-between bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Manage teachers"
          subtitle="Browse and add students from different specialities and years"
        />
        <AddUser role="teacher" />
      </section>
      <div className="bg-section p-4 rounded-xl shadow-sm">
        {isGettingTeachers && <InlineSpinner />}
        {isErrorGettingTeachers && (
          <p className="text-destructive">Error getting teachers</p>
        )}
        {!isErrorGettingTeachers && !isGettingTeachers && (
          <DataTable
            columns={columnsTeachers}
            data={formattedData}
            searchWith="fullName"
          />
        )}
      </div>
    </div>
  );
}

export default ManageTeachers;
