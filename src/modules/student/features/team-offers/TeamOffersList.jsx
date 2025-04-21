import ReusibleItemCard from "@/components/commun/ReusibleItemCard";
import { useTeamOffers } from "../../context/TeamOffersContext";
import Spinner from "@/components/commun/Spinner";
import { useSidebar } from "@/components/ui/sidebar";
import ItemNotFound from "@/components/commun/ItemNotFound";

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
        <ItemNotFound>
          No team found with the provided filter or search
        </ItemNotFound>
      )}
    </>
  );
}

export default TeamOffersList;
