import SectionTitle from "@/modules/student/components/SectionTitle";
import TeacherMyProjectList from "../features/project-offers/TeacherMyProjectList";

function ProjectsApplications() {
  return (
    <div className="space-y-4">
      <section className="px-3 py-4 bg-section rounded-xl shadow-sm">
        <SectionTitle
          title="Projects Applications"
          subtitle="Browse and manage all applications submitted by students for your projects."
        />
      </section>
      <TeacherMyProjectList />
    </div>
  );
}

export default ProjectsApplications;
