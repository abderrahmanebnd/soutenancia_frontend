import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";
const previousProjects = [
  {
    title: "AI-Powered Tutor Bot",
    description:
      "An intelligent chatbot that helps students learn through conversation and interactive exercises.",
    targetSpecialities: ["Computer Science", "AI & Data Science"],
    year: 5,
    maxTeams: 5,
    assignedMethod: "auto-selection",
    toolsRequired: ["Python", "TensorFlow", "Dialogflow", "React"],
    pastYear: 2024,
  },
  {
    title: "Smart Farming System",
    description:
      "A sensor-based system to monitor soil, weather, and crop conditions for precision agriculture.",
    targetSpecialities: ["Agricultural Engineering", "Electronics"],
    year: 3,
    maxTeams: 4,
    assignedMethod: "teacher-approval",
    toolsRequired: ["Arduino", "IoT Sensors", "C++", "Node-RED"],
    pastYear: 2023,
  },
  {
    title: "Blockchain Voting App",
    description:
      "A secure and transparent voting platform using blockchain technology for student elections.",
    targetSpecialities: ["Cybersecurity", "Software Engineering"],
    year: 2,
    maxTeams: 6,
    assignedMethod: "auto-selection",
    toolsRequired: ["Solidity", "Ethereum", "React", "Metamask"],
    pastYear: 2022,
  },
  {
    title: "Health Tracker Mobile App",
    description:
      "A mobile application that helps users track fitness activities, calories, and heart rate.",
    targetSpecialities: ["Health Informatics", "Mobile Development"],
    year: 4,
    maxTeams: 5,
    assignedMethod: "teacher-approval",
    toolsRequired: ["Flutter", "Firebase", "Wearable APIs", "Dart"],
    pastYear: 2021,
  },
  {
    title: "E-Learning Platform with Gamification",
    description:
      "An online learning platform with gamified quizzes and progress tracking ",
    targetSpecialities: ["Educational Technology", "Web Development"],
    year: 5,
    maxTeams: 6,
    assignedMethod: "auto-selection",
    toolsRequired: ["React", "Node.js", "MongoDB", "Gamification APIs"],
    pastYear: 2020,
  },
  {
    title: "Autonomous Delivery Robot",
    description:
      "A robotic system that navigates campuses to deliver items autonomously.",
    targetSpecialities: ["Robotics", "Embedded Systems"],
    year: 4,
    maxTeams: 3,
    assignedMethod: "teacher-approval",
    toolsRequired: ["Raspberry Pi", "ROS", "Python", "Lidar"],
    pastYear: 2019,
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
      const updatedSpeciality = prev.includes(currentSpeciality)
        ? prev.filter((spe) => spe !== currentSpeciality)
        : [...prev, currentSpeciality];

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
      return project.year === Number(yearValue);
    });
  }
  if (pastYearValue) {
    filteredPastProjects = filteredPastProjects?.filter((project) => {
      return project.pastYear === Number(pastYearValue);
    });
  }
  if (maxTeamsValue) {
    filteredPastProjects = filteredPastProjects?.filter((project) => {
      return project.maxTeams === Number(maxTeamsValue);
    });
  }
  if (specialityValue.length > 0) {
    filteredPastProjects = filteredPastProjects?.filter((project) => {
      return specialityValue.every((filter) => {
        const lowerCaseSpeciality = project.targetSpecialities.map((spe) =>
          spe.toLowerCase()
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
