import SectionTitle from "@/modules/student/components/SectionTitle";
import TeacherMyProjectList from "../features/project-offers/TeacherMyProjectList";
import OperationsHoverButton from "@/components/commun/OperationsHoverButton";
import { Plus } from "lucide-react";

const SubmitProject = () => {
  return (
    <div className="space-y-4">
      <section className="px-3 py-4 bg-section rounded-xl shadow-sm">
        <SectionTitle
          title="Add & Edit Projects"
          subtitle="Add,Edit and Manage all your projects here"
        />
      </section>
      <TeacherMyProjectList />
      <OperationsHoverButton
        path="/teacher/Add-project-offer"
        icon={<Plus strokeWidth={3} />}
      >
        Add a project offer
      </OperationsHoverButton>
    </div>
  );
};

export default SubmitProject;
