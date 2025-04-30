import SectionTitle from "@/modules/student/components/SectionTitle";
import { AddUser } from "../features/AddUser";

function ManageStudents() {
  return (
    <div className="space-y-4">
      <section className=" flex gap-4 items-center justify-between bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Manage Students"
          subtitle="Browse and add students from different specialities and years"
        />
        <AddUser role="student" />
      </section>
    </div>
  );
}

export default ManageStudents;
