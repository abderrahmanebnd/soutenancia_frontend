import ReusibleItemCard from "@/components/commun/ReusibleItemCard";
import { useTeamOffers } from "../../context/TeamOffersContext";
import Spinner from "@/components/commun/Spinner";
import { UserRoundX } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

function TeamOffersList() {
  const { open } = useSidebar();
  const { filteredTeams, isLoadingTeams, isErrorGettingTeams } =
    useTeamOffers();
  if (isLoadingTeams) return <Spinner />;
  if (isErrorGettingTeams)
    return <div className="text-red-600"> error getting teams</div>;
  return (
    <>
      {filteredTeams?.length > 0 ? (
        <div
          className={`grid gap-6 grid-cols-1 ${
            open
              ? " lg:grid-cols-2 xl:grid-cols-3"
              : "   sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredTeams?.map((team) => (
            <ReusibleItemCard data={team} key={team.id} />
          ))}
        </div>
      ) : (
        <div className="flex  justify-center gap-4 flex-col items-center bg-section rounded-xl shadow-sm py-20">
          <UserRoundX className="w-40 h-40 text-muted-foreground" />
          <h2 className="text-2xl text-muted-foreground text-center">
            No teams found with the provided search or filters.
          </h2>
        </div>
      )}
    </>
  );
}

export default TeamOffersList;
