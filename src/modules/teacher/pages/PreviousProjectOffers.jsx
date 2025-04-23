import Filter from "@/components/commun/Filter";
import SearchBar from "@/components/commun/SearchBar";
import SectionTitle from "@/modules/student/components/SectionTitle";
import ProjectOffersList from "../features/project-offers/ProjectOffersList";
import FilterPreviousProjectOffers from "../features/project-offers/FilterPreviousProjectOffers";
import { usePreviousProjectOffers } from "../context/PreviousProjectOffersContext";

function PreviousProjectOffers() {
  const {
    selectedSpeciality,
    maxTeamsValue,
    yearValue,
    filteredPastProjects,
    pastYearValue,
    isGettingPreviousProjectOffers,
    isErrorGettingPreviousProjectOffers,
  } = usePreviousProjectOffers();

  return (
    <div className="space-y-4">
      <section className="sm:flex sm:flex-row sm:items-center sm:justify-between grid grid-cols-2 grid-rows-2 gap-4 bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Previous Year's Project"
          subtitle="Browse all previous projects submitted by all instructors"
        />
        <SearchBar />
        <Filter
          filterValue={selectedSpeciality}
          maxMembersValue={maxTeamsValue}
          yearValue={yearValue}
          pastYearValue={pastYearValue}
        >
          <FilterPreviousProjectOffers />
        </Filter>
      </section>
      <ProjectOffersList
        data={filteredPastProjects}
        isGettingPreviousProjectOffers={isGettingPreviousProjectOffers}
        isErrorGettingPreviousProjectOffers={
          isErrorGettingPreviousProjectOffers
        }
      />
    </div>
  );
}

export default PreviousProjectOffers;
