import { useAuth } from "@/context/AuthContext";
import SectionTitle from "../components/SectionTitle";
import { useTeamOffers } from "../context/TeamOffersContext";
import Filter from "../../../components/commun/Filter";
import SearchBar from "../../../components/commun/SearchBar";
import TeamOffersList from "../features/team-offers/TeamOffersList";
import OperationsHoverButton from "@/components/commun/OperationsHoverButton";
import FilterTeamOffers from "../features/team-offers/FilterTeamOffers";
import { Pencil, Plus } from "lucide-react";

function TeamOffers() {
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user.Student.isLeader;
  const { filterValue, maxMembersValue } = useTeamOffers();
  return (
    <div className="space-y-4">
      <section className="sm:flex sm:flex-row sm:items-center sm:justify-between grid grid-cols-2 grid-rows-2 gap-4 bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Team Offers"
          subtitle="Choose your team and start your journey"
        />
        <SearchBar />
        <Filter filterValue={filterValue} maxMembersValue={maxMembersValue}>
          <FilterTeamOffers />
        </Filter>
      </section>
      {isLeader ? (
        <OperationsHoverButton
          path="/student/submit-team-offer"
          icon={<Pencil />}
        >
          Edit my team offer
        </OperationsHoverButton>
      ) : (
        <OperationsHoverButton
          path="/student/submit-team-offer"
          icon={<Plus strokeWidth={3} />}
        >
          Add a team offer
        </OperationsHoverButton>
      )}

      <TeamOffersList />
    </div>
  );
}

export default TeamOffers;
