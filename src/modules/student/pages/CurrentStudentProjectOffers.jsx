import SearchBar from "@/components/commun/SearchBar";
import SectionTitle from "../components/SectionTitle";

import { useStudentProjectOffers } from "../features/project-offers/studentProjectOffersContext";
import Filter from "@/components/commun/Filter";
import ProjectOffersList from "@/modules/teacher/features/project-offers/ProjectOffersList";
import FilterStudentProjectOffers from "../features/project-offers/FilterStudentProjectOffers";

function CurrentStudentProjectOffers() {
  const {
    maxTeamsValue,
    teacherValue,
    filteredProjects,
    isGettingProjectOffers,
    isErrorGettingProjectOffers,
  } = useStudentProjectOffers();
  return (
    <div className="space-y-4">
      <section className="sm:flex sm:flex-row sm:items-center sm:justify-between grid grid-cols-2 grid-rows-2 gap-4 bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="This Year's Project"
          subtitle="Browse all projects submitted by all instructors"
        />
        <SearchBar />
        <Filter maxTeamsValue={maxTeamsValue} teacherValue={teacherValue}>
          <FilterStudentProjectOffers />
        </Filter>
      </section>
      <ProjectOffersList
        data={filteredProjects}
        isGettingProjectOffers={isGettingProjectOffers}
        isErrorGettingProjectOffers={isErrorGettingProjectOffers}
      />
    </div>
  );
}

export default CurrentStudentProjectOffers;
