import SectionTitle from "../components/SectionTitle";
import { TeamOffersProvider } from "../context/TeamOffersContext";
import Filter from "../features/Filter";
import SearchBar from "../features/SearchBar";
import TeamOffersList from "../features/TeamOffersList";

function TeamOffers() {
  return (
    <TeamOffersProvider>
      <div className="space-y-4">
        <section className="sm:flex sm:flex-row sm:items-center sm:justify-between grid grid-cols-2 grid-rows-2 gap-4 bg-section rounded-xl px-3 py-4 shadow-sm">
          <SectionTitle
            title="Team Offers"
            subTitle="Choose your team and start your journey"
          />
          <SearchBar />
          <Filter />
        </section>
        <TeamOffersList />
      </div>
    </TeamOffersProvider>
  );
}

export default TeamOffers;
