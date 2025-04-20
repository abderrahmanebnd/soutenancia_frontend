import { useSidebar } from "@/components/ui/sidebar";
import ProjectOfferCard from "./ProjectOfferCard";
import { useProjectOffers } from "../../context/ProjectOffersContext";

function ProjectOffersList() {
  const { open } = useSidebar();
  const { filteredProjects } = useProjectOffers();
  return (
    <div
      className={`grid gap-6 grid-cols-1 ${
        open
          ? " lg:grid-cols-2 xl:grid-cols-3"
          : "   sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {filteredProjects.map((project) => (
        <ProjectOfferCard data={project} key={project.title} />
      ))}
    </div>
  );
}

export default ProjectOffersList;
