import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";
import { useProjectOffersHistory } from "../features/project-offers/useProjectOffersHistory";

const PreviousProjectOffersContext = createContext();
function PreviousProjectOffersProvider({ children }) {
  const lastYear = new Date().getFullYear() - 1;
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    previousProjectOffers,
    isGettingPreviousProjectOffers,
    isErrorGettingPreviousProjectOffers,
  } = useProjectOffersHistory();
  const searchValue = searchParams.get("search") || "";
  const yearValue = searchParams.get("year") || 0;
  const pastYearValue = searchParams.get("pastYear") || lastYear;
  const specialityValue = searchParams.get("speciality")?.split(",") || [];
  const maxTeamsValue = searchParams.get("max_teams") || 0;
  const [selectedSpeciality, setSelectedSpeciality] = useState(specialityValue);
  function handleSelectYear(year) {
    searchParams.set("year", year);
    setSearchParams(searchParams);
  }
  function handleSelectPastYear(pastYear) {
    searchParams.set("pastYear", pastYear);
    setSearchParams(searchParams);
  }
  function handleSelectSpeciality(currentSpeciality) {
    setSelectedSpeciality((prev) => {
      const updatedSpeciality = prev.includes(currentSpeciality.toLowerCase())
        ? prev.filter((spe) => spe !== currentSpeciality.toLowerCase())
        : [...prev, currentSpeciality.toLowerCase()];

      if (updatedSpeciality.length > 0) {
        searchParams.set("speciality", updatedSpeciality.join(","));
      } else {
        searchParams.delete("speciality");
      }
      setSearchParams(searchParams);
      return updatedSpeciality;
    });
  }
  function handleSelectMaxTeams(maxTeams) {
    searchParams.set("max_teams", maxTeams);
    setSearchParams(searchParams);
  }
  function handleClearYear() {
    searchParams.delete("year");
    setSearchParams(searchParams);
  }
  function handleClearMaxTeams() {
    searchParams.delete("max_teams");
    setSearchParams(searchParams);
  }
  function handleClearFilters() {
    setSelectedSpeciality([]);
    searchParams.delete("year");
    searchParams.delete("pastYear");
    searchParams.delete("speciality");
    searchParams.delete("max_teams");
    setSearchParams(searchParams);
  }
  let filteredPastProjects = previousProjectOffers;

  if (searchValue) {
    filteredPastProjects = filteredPastProjects?.filter((team) =>
      team.title.toLowerCase().includes(searchValue)
    );
  }
  if (yearValue) {
    filteredPastProjects = filteredPastProjects?.filter((project) => {
      return project.specialities.some(
        (speciality) => speciality.year === Number(yearValue)
      );
    });
  }
  if (pastYearValue) {
    filteredPastProjects = filteredPastProjects?.filter((project) => {
      return project.year === Number(pastYearValue);
    });
  }
  if (maxTeamsValue) {
    filteredPastProjects = filteredPastProjects?.filter((project) => {
      return project.maxTeamsNumber === Number(maxTeamsValue);
    });
  }
  if (specialityValue.length > 0) {
    filteredPastProjects = filteredPastProjects?.filter((project) => {
      return specialityValue.every((filter) => {
        const lowerCaseSpeciality = project.specialities.map((spe) =>
          spe.name.toLowerCase()
        );
        return lowerCaseSpeciality.includes(filter.toLowerCase());
      });
    });
  }
  const value = {
    filteredPastProjects,
    searchValue,
    yearValue,
    pastYearValue,
    specialityValue,
    maxTeamsValue,
    handleSelectYear,
    handleSelectSpeciality,
    handleSelectMaxTeams,
    handleClearYear,
    handleClearMaxTeams,
    handleClearFilters,
    handleSelectPastYear,
    selectedSpeciality,
    isGettingPreviousProjectOffers,
    isErrorGettingPreviousProjectOffers,
  };
  return (
    <PreviousProjectOffersContext.Provider value={value}>
      {children}
    </PreviousProjectOffersContext.Provider>
  );
}
function usePreviousProjectOffers() {
  const context = useContext(PreviousProjectOffersContext);
  if (!context) {
    throw new Error(
      "useProjectOffers must be used within a ProjectOffersProvider"
    );
  }
  return context;
}
export { usePreviousProjectOffers, PreviousProjectOffersProvider };
