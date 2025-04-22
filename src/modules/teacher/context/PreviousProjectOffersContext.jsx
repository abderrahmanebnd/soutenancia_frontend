import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";
const previousProjects = [
  {
    id: "cm9rfahbu0003v3lwyhkbndpx",
    title: "AI-Based Attendance System",
    description:
      "A system that uses face recognition to automate attendance tracking.",
    tools: ["TensorFlow", "OpenCV", "React"],
    languages: ["Python", "JavaScript"],
    status: "open",
    maxTeamsNumber: 5,
    fileUrl: "https://example.com/requirements.pdf",
    year: 2023,
    teacherId: "cm9r6h48n0003v30whfjia918",
    assignmentType: "auto",
    createdAt: "2025-04-21T18:42:01.146Z",
    updatedAt: "2025-04-21T18:42:01.146Z",
    teacher: {
      id: "cm9r6h48n0003v30whfjia918",
      userId: "cm9r6h48m0002v30wa97lx0f6",
      department: null,
      title: "DR",
      bio: null,
      createdAt: "2025-04-21T14:35:12.958Z",
      updatedAt: "2025-04-21T14:35:12.958Z",
    },
    specialities: [
      {
        id: "cm9r71odm0000v37sbrxzxegi",
        name: "Ai",
        year: 5,
      },
      {
        id: "cm9r71odm0000v37sbrxzxert",
        name: "Cybersecurity",
        year: 4,
      },
    ],
    applications: [],
    assignedTeamsOffers: [],
  },
];
const PreviousProjectOffersContext = createContext();
function PreviousProjectOffersProvider({ children }) {
  const lastYear = new Date().getFullYear() - 1;
  const [searchParams, setSearchParams] = useSearchParams();
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
  let filteredPastProjects = previousProjects;

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
