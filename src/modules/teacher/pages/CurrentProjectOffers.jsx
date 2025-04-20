import Filter from "@/components/commun/Filter";
import SearchBar from "@/components/commun/SearchBar";
import SectionTitle from "@/modules/student/components/SectionTitle";
import ProjectOffersList from "../features/project-offers/ProjectOffersList";
import FilterProjectOffers from "../features/project-offers/FilterProjectOffers";

function CurrentProjectOffers() {
  return (
    <div className="space-y-4">
      <section className="sm:flex sm:flex-row sm:items-center sm:justify-between grid grid-cols-2 grid-rows-2 gap-4 bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="This Year's Project"
          subtitle="Browse all projects submitted by all instructors"
        />
        <SearchBar />
        <Filter>
          <FilterProjectOffers />
        </Filter>
      </section>
      <ProjectOffersList />
    </div>
  );
}

export default CurrentProjectOffers;
