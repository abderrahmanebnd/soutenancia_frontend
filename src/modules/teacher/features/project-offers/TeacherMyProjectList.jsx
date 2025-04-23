import Spinner from "@/components/commun/Spinner";
import { useMyProjectOffers } from "./useMyProjectOffers";
import TeacherMyProjectCard from "./TeacherMyProjectCard";

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
        <div>you did not create a project yet </div>
      )}
    </>
  );
}

export default TeacherMyProjectList;
