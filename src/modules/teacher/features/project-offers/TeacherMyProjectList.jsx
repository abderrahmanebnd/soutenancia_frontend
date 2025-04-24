import Spinner from "@/components/commun/Spinner";
import { useMyProjectOffers } from "./useMyProjectOffers";
import TeacherMyProjectCard from "./TeacherMyProjectCard";
import ItemNotFound from "@/components/commun/ItemNotFound";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function TeacherMyProjectList() {
  const {
    myProjectOffers,
    isGettingMyProjectOffers,
    isErrorGettingMyProjectOffers,
  } = useMyProjectOffers();

  if (isGettingMyProjectOffers) return <Spinner />;
  if (isErrorGettingMyProjectOffers)
    return <div className="text-red-600"> error getting my project offers</div>;
  return (
    <>
      {myProjectOffers?.length > 0 ? (
        <div className={"grid gap-6 grid-cols-1 lg:grid-cols-2"}>
          {myProjectOffers?.map((project) => (
            <TeacherMyProjectCard projectData={project} key={project.id} />
          ))}
        </div>
      ) : (
        <ItemNotFound>
          <p className="text-2xl font-semibold text-primary mb-2">
            you do not have a project offer yet
            <br />
            <span className="font-light text-xl">Do you want to create ?</span>
          </p>
          <Button asChild>
            <Link to="/teacher/Add-project-offer">Add a project</Link>
          </Button>
        </ItemNotFound>
      )}
    </>
  );
}

export default TeacherMyProjectList;
