import { useProjectOffersQuery } from "@/modules/teacher/features/project-offers/useProjectOffersQuery";
import { createContext, useContext } from "react";
import { useSearchParams } from "react-router";

const StudentProjectOffersContext = createContext();
function StudentProjectOffersProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    projectOffersData,
    isGettingProjectOffers,
    isErrorGettingProjectOffers,
  } = useProjectOffersQuery();
  const searchValue = searchParams.get("search") || "";
  const maxTeamsValue = searchParams.get("max_teams") || 0;
  const teacherValue = searchParams.get("teacher") || "";
  function handleSelectMaxTeams(maxTeams) {
    searchParams.set("max_teams", maxTeams);
    setSearchParams(searchParams);
  }
  function handleSelectTeacher(teacherId) {
    searchParams.set("teacher", teacherId);
    setSearchParams(searchParams);
  }
  function handleClearTeacher() {
    searchParams.delete("teacher");
    setSearchParams(searchParams);
  }
  function handleClearMaxTeams() {
    searchParams.delete("max_teams");
    setSearchParams(searchParams);
  }
  function handleClearFilters() {
    searchParams.delete("max_teams");
    searchParams.delete("teacher");
    setSearchParams(searchParams);
  }
  let filteredProjects = projectOffersData;

  if (searchValue) {
    filteredProjects = filteredProjects?.filter((team) =>
      team.title.toLowerCase().includes(searchValue)
    );
  }
  if (teacherValue) {
    filteredProjects = filteredProjects?.filter((project) => {
      return project.teacherId === teacherValue;
    });
  }

  if (maxTeamsValue) {
    filteredProjects = filteredProjects?.filter((project) => {
      return project.maxTeamsNumber === Number(maxTeamsValue);
    });
  }

  const value = {
    filteredProjects,
    searchValue,
    teacherValue,
    maxTeamsValue,
    handleClearTeacher,
    handleSelectMaxTeams,
    handleSelectTeacher,
    handleClearMaxTeams,
    handleClearFilters,

    isGettingProjectOffers,
    isErrorGettingProjectOffers,
  };
  return (
    <StudentProjectOffersContext.Provider value={value}>
      {children}
    </StudentProjectOffersContext.Provider>
  );
}

function useStudentProjectOffers() {
  const context = useContext(StudentProjectOffersContext);
  if (context === undefined) {
    throw new Error(
      "useStudentProjectOffers must be used within a StudentProjectOffersProvider"
    );
  }
  return context;
}
export { StudentProjectOffersProvider, useStudentProjectOffers };
