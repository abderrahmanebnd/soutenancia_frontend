import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";
import { useProjectOffersQuery } from "../features/project-offers/useProjectOffersQuery";

const ProjectOffersContext = createContext();
function ProjectOffersProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    projectOffersData,
    isGettingProjectOffers,
    isErrorGettingProjectOffers,
  } = useProjectOffersQuery();
  const searchValue = searchParams.get("search") || "";
  const yearValue = searchParams.get("year") || 0;
  const specialityValue = searchParams.get("speciality")?.split(",") || [];
  const maxTeamsValue = searchParams.get("max_teams") || 0;
  const [selectedSpeciality, setSelectedSpeciality] = useState(specialityValue);
  function handleSelectYear(year) {
    searchParams.set("year", year);
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
    searchParams.delete("speciality");
    searchParams.delete("max_teams");
    setSearchParams(searchParams);
  }
  let filteredProjects = projectOffersData;

  if (searchValue) {
    filteredProjects = filteredProjects?.filter((team) =>
      team.title.toLowerCase().includes(searchValue)
    );
  }
  if (yearValue) {
    filteredProjects = filteredProjects?.filter((project) => {
      return project.specialities.some(
        (speciality) => speciality.year === Number(yearValue)
      );
    });
  }
  if (maxTeamsValue) {
    filteredProjects = filteredProjects?.filter((project) => {
      return project.maxTeamsNumber === Number(maxTeamsValue);
    });
  }
  if (specialityValue.length > 0) {
    filteredProjects = filteredProjects?.filter((project) => {
      return specialityValue.every((filter) => {
        const lowerCaseSpeciality = project.specialities.map((spe) =>
          spe.name.toLowerCase()
        );
        return lowerCaseSpeciality.includes(filter.toLowerCase());
      });
    });
  }
  const value = {
    filteredProjects,
    searchValue,
    yearValue,
    specialityValue,
    maxTeamsValue,
    handleSelectYear,
    handleSelectSpeciality,
    handleSelectMaxTeams,
    handleClearYear,
    handleClearMaxTeams,
    handleClearFilters,
    selectedSpeciality,
    isGettingProjectOffers,
    isErrorGettingProjectOffers,
  };
  return (
    <ProjectOffersContext.Provider value={value}>
      {children}
    </ProjectOffersContext.Provider>
  );
}
function useProjectOffers() {
  const context = useContext(ProjectOffersContext);
  if (!context) {
    throw new Error(
      "useProjectOffers must be used within a ProjectOffersProvider"
    );
  }
  return context;
}
export { useProjectOffers, ProjectOffersProvider };
