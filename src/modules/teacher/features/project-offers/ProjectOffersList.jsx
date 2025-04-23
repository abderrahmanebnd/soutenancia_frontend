import { useSidebar } from "@/components/ui/sidebar";
import ProjectOfferCard from "./ProjectOfferCard";

import ItemNotFound from "@/components/commun/ItemNotFound";
import Spinner from "@/components/commun/Spinner";

function ProjectOffersList({
  data,
  isGettingProjectOffers,
  isErrorGettingProjectOffers,
  isGettingPreviousProjectOffers,
  isErrorGettingPreviousProjectOffers,
}) {
  const { open } = useSidebar();
  if (isGettingProjectOffers || isGettingPreviousProjectOffers)
    return <Spinner />;
  if (isErrorGettingProjectOffers || isErrorGettingPreviousProjectOffers)
    return <div className="text-red-600"> error getting project offers</div>;
  return (
    <>
      {data?.length > 0 ? (
        <div
          className={`grid gap-6 grid-cols-1 ${
            open
              ? " lg:grid-cols-2 xl:grid-cols-3"
              : "   sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {data?.map((project) => (
            <ProjectOfferCard data={project} key={project.title} />
          ))}
        </div>
      ) : (
        <ItemNotFound>
          No project found with the provided filter or search
        </ItemNotFound>
      )}
    </>
  );
}

export default ProjectOffersList;
