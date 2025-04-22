import { useGetTeacherProjects } from "../features/project-offers/usegetTeacherProject";
import MyProjectsCard from "./myProjectsCard";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/commun/Spinner";
import { Plus } from "lucide-react";
import OperationsHoverButton from "@/components/commun/OperationsHoverButton";
import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

const SubmitProject = () => {
  const { data, isLoading, isError } = useGetTeacherProjects();
  const navigate = useNavigate();
  const { open } = useSidebar();

  useEffect(() => {
    if (!isLoading && !isError && data?.projects?.length === 0) {
      navigate("/Add-project-offer");
    }
  }, [isLoading, isError, data, navigate]);

  if (isLoading) return <Spinner />;
  if (isError || !data) {
    return <div className="text-red-500">Error loading projects</div>;
  }

  const validProjects = data.projects?.filter(project => 
    project?.id && typeof project === 'object'
  ) || [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">My Projects</h1>
      <div className="flex justify-end">
        <OperationsHoverButton
          path="/teacher/Add-project-offer"
          icon={<Plus strokeWidth={3} />}
        >
          Add Project Offer
        </OperationsHoverButton>
      </div>
      <div
        className={`grid gap-6 ${
          open
            ? "lg:grid-cols-2 xl:grid-cols-3"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {validProjects.length > 0 ? (
          validProjects.map((project) => (
            <MyProjectsCard  data={project} key={project.id} />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            No projects found
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitProject;