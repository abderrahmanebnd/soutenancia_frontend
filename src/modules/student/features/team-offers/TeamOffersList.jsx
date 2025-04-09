import ReusibleItemCard from "@/components/commun/ReusibleItemCard";
import { useTeamOffers } from "../../context/TeamOffersContext";
import Spinner from "@/components/commun/Spinner";
import { useSidebar } from "@/components/ui/sidebar";

function TeamOffersList() {
  const { open } = useSidebar();
  const { filteredTeams, isLoadingTeams, isErrorGettingTeams } =
    useTeamOffers();
  const filteredTeamsOpen = filteredTeams?.filter(
    (team) => team.status === "open"
  );
  if (isLoadingTeams) return <Spinner />;
  if (isErrorGettingTeams)
    return <div className="text-red-600"> error getting teams</div>;
  return (
    <>
      {filteredTeamsOpen?.length > 0 ? (
        <div
          className={`grid gap-6 grid-cols-1 ${
            open
              ? " lg:grid-cols-2 xl:grid-cols-3"
              : "   sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredTeamsOpen?.map((team) => (
            <ReusibleItemCard data={team} key={team.id} />
          ))}
        </div>
      ) : (
        <div className="flex  justify-center gap-4 flex-col items-center bg-section rounded-xl shadow-sm py-20">
          <img
            src="/assets/team-not-found.svg"
            alt="team not found"
            className="w-52 h-52 lg:w-64 lg:h-64"
          />
          <h2 className="text-2xl text-muted-foreground text-center">
            No team found with the provided search or filters.
          </h2>
        </div>
      )}
    </>
  );
}

export default TeamOffersList;
