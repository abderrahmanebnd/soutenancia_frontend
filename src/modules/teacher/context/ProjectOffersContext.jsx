import { createContext, useContext } from "react";
import { useSearchParams } from "react-router";
const projects = [
  {
    title: "AI-Powered Tutor Bot",
    description:
      "An intelligent chatbot that helps students learn through conversation and interactive exercises.",
    targetSpecialities: ["Computer Science", "AI & Data Science"],
    year: 5,
    maxTeams: 5,
    assignedMethod: "auto-selection",
    toolsRequired: ["Python", "TensorFlow", "Dialogflow", "React"],
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
  },
];
const ProjectOffersContext = createContext();
function ProjectOffersProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const yearValue = searchParams.get("year") || 0;
  const specialityValue = searchParams.get("speciality") || "";
  const maxTeamsValue = searchParams.get("max_teams") || 0;

  function handleSelectYear(year) {
    searchParams.set("year", year);
    setSearchParams(searchParams);
  }
  function handleSelectSpeciality(speciality) {
    searchParams.set("speciality", speciality);
    setSearchParams(searchParams);
  }
  function handleSelectMaxTeams(maxTeams) {
    searchParams.set("max_teams", maxTeams);
    setSearchParams(searchParams);
  }
  function handleClearFilters() {
    searchParams.delete("year");
    searchParams.delete("speciality");
    searchParams.delete("max_teams");
    setSearchParams(searchParams);
  }
  let filteredProjects = projects;

  if (searchValue) {
    filteredProjects = filteredProjects?.filter((team) =>
      team.title.toLowerCase().includes(searchValue)
    );
  }
  if (yearValue) {
    filteredProjects = filteredProjects?.filter((project) => {
      return project.year === Number(yearValue);
    });
  }
  if (maxTeamsValue) {
    filteredProjects = filteredProjects?.filter((project) => {
      return project.maxTeams === Number(maxTeamsValue);
    });
  }
  if (specialityValue) {
    filteredProjects = filteredProjects?.filter((project) => {
      return project.targetSpecialities
        .map((speciality) => speciality.toLowerCase())
        .includes(specialityValue.toLowerCase());
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
    handleClearFilters,
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
