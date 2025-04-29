import ReusibleItemCard from "@/components/commun/ReusibleItemCard";
import { useTeamOffers } from "../../context/TeamOffersContext";
import Spinner from "@/components/commun/Spinner";
import { useSidebar } from "@/components/ui/sidebar";
import ItemNotFound from "@/components/commun/ItemNotFound";
import { useAuth } from "@/context/AuthContext";

function TeamOffersList() {
  const { open } = useSidebar();
  const { currentUser } = useAuth();
  const speciality = currentUser?.user.Student.speciality.id;

  const { filteredTeams, isLoadingTeams, isErrorGettingTeams } =
    useTeamOffers();
  const filteredTeamsOpen = filteredTeams?.filter(
    (team) => team.status === "open"
  );
  const filteredTeamsOpenWithSpeciality = filteredTeamsOpen?.filter(
    (openTeam) => openTeam.specialityId === speciality
  );
  if (isLoadingTeams) return <Spinner />;
  if (isErrorGettingTeams)
    return <div className="text-red-600"> error getting teams</div>;
  return (
    <>
      {filteredTeamsOpenWithSpeciality?.length > 0 ? (
        <div
          className={`grid gap-6 grid-cols-1 ${
            open
              ? " lg:grid-cols-2 xl:grid-cols-3"
              : "   sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredTeamsOpenWithSpeciality?.map((team) => (
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
