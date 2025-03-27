import { useAuth } from "@/context/AuthContext";
import SectionTitle from "../components/SectionTitle";
import { useTeamOffers } from "../context/TeamOffersContext";
import Filter from "../../../components/commun/Filter";
import SearchBar from "../../../components/commun/SearchBar";
import TeamOffersList from "../features/TeamOffersList";
import EditHoverButton from "@/components/commun/EditHoverButton";
import FilterTeamOffers from "../features/FilterTeamOffers";

function TeamOffers() {
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user.Student.isLeader;
  const { filterValue } = useTeamOffers();
  return (
    <div className="space-y-4">
      <section className="sm:flex sm:flex-row sm:items-center sm:justify-between grid grid-cols-2 grid-rows-2 gap-4 bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Team Offers"
          subtitle="Choose your team and start your journey"
        />
        <SearchBar />
        <Filter filterValue={filterValue}>
          <FilterTeamOffers />
        </Filter>
      </section>
      {isLeader && (
        <EditHoverButton path="/student/edit-team-offer">
          Edit my team offer
        </EditHoverButton>
      )}

      <TeamOffersList />
    </div>
  );
}

export default TeamOffers;
