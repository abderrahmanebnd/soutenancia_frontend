import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";

function TeacherMyProjectCard({ projectData }) {
  const location = useLocation();
  const lastPath = location.pathname.split("/").slice(-1)[0];
  const { title, description, id: projectOfferId } = projectData;
  return (
    <div className="min-h-64 bg-[url('/assets/header-background2.jpg')]  bg-cover bg-no-repeat bg-center rounded-xl shadow-sm p-5 flex flex-col">
      <div className="flex-1">
        <h1 className="text-section text-xl font-semibold">{title}</h1>
        <h2 className="text-section font-light">{description}</h2>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Button className="flex-2 text-white bg-transparent hover:bg-section hover:text-primary border duration-300 transition-all ">
          <Link to={`/teacher/project-offers/${projectOfferId}`}>
            View Details <span>•••</span>
          </Link>
        </Button>
        {lastPath === "projects-applications" && (
          <Button
            className="flex-1 text-white bg-transparent hover:bg-section hover:text-primary border duration-300 transition-all "
            asChild
          >
            <Link to={projectOfferId}>Manage Application &rarr;</Link>
          </Button>
        )}
        {lastPath === "submit-project-offer" && (
          <Button
            className="flex-1 text-white bg-transparent hover:bg-section hover:text-primary border duration-300 transition-all "
            asChild
          >
            <Link to={`edit/${projectOfferId}`}>Edit Project Offer &rarr;</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default TeacherMyProjectCard;
