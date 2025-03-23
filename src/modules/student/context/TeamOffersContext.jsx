import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";
import { useStudentSkills } from "../features/useStudentSkills";
import { useQuery } from "@tanstack/react-query";
import { getTeamOffers } from "../api/apiStudent";
import { getAllSkills } from "@/utils/helpers";

/* const teams = [
  {
    id: "team-1",
    name: "Alpha Development",
    number: "Team #42",
    description:
      "A dynamic team focused on building innovative web applications with modern technologies. We're looking for passionate developers to join our upcoming project.",
    technologies: ["React", "TypeScript", "Node.js", "Tailwindcss"],
    imageUrl: "/placeholder.svg?height=100&width=100",
    size: 3,
  },
  {
    id: "team-2",
    name: "Beta Solutions",
    number: "Team #87",
    description:
      "We specialize in creating enterprise-level solutions with a focus on security and scalability. Currently seeking backend developers with database expertise.",
    technologies: ["Python", "Django", "PostgreSQL", "Docker"],
    imageUrl: "/placeholder.svg?height=100&width=100",
    size: 2,
  },
  {
    id: "team-3",
    name: "Gamma Innovators",
    number: "Team #13",
    description:
      "An AI-focused team building next-generation applications. We're looking for machine learning engineers and frontend developers to join our cutting-edge projects.",
    technologies: [
      "TensorFlow",
      "React",
      "Python",
      "AWS",
      "JavaScript",
      "Ruby",
    ],
    imageUrl: "/placeholder.svg?height=100&width=100",
    size: 1,
  },
  {
    id: "team-4",
    name: "Dib Innovators",
    number: "Team #13",
    description:
      "An AI-focused team building next-generation applications. We're looking for machine learning engineers and frontend developers to join our cutting-edge projects.",
    technologies: ["Svelte", "AWS"],
    imageUrl: "/placeholder.svg?height=100&width=100",
    size: 4,
  },
  {
    id: "team-5",
    name: "Teta Innovators",
    number: "Team #13",
    description:
      "An AI-focused team building next-generation applications. We're looking for machine learning engineers and frontend developers to join our cutting-edge projects.",
    technologies: ["Nest", "React", "Python", "AWS"],
    imageUrl: "/placeholder.svg?height=100&width=100",
    size: 5,
  },
  {
    id: "team-6",
    name: "Other Innovators",
    number: "Team #13",
    description:
      "An AI-focused team building next-generation applications. We're looking for machine learning engineers and frontend developers to join our cutting-edge projects.",
    technologies: ["Nest", "Python"],
    imageUrl: "/placeholder.svg?height=100&width=100",
    size: 5,
  },
]; */

const TeamOffersContext = createContext();

function TeamOffersProvider({ children }) {
  // i made this context so as to separate the logic from the ui and avoid prop drilling
  //URL Management
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const filterValue = searchParams.get("filter")?.split(",") || [];
  // local State
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedSkills, setSelectedSkills] = useState(filterValue);
  const [openSkills, setOpenSkills] = useState(false);

  //StudentSkills
  const { studentSkills, isLoading } = useStudentSkills();
  const [customSkillsIsSelected, setCustomSkillsIsSelected] = useState(false);
  const studentSkillsArrayWithNameOnly = studentSkills?.map(
    (skill) => skill.name
  );

  //functions part

  function handleSelectSkill(currentSkill) {
    setSelectedSkills((prev) => {
      const updatedSkills = prev.includes(currentSkill)
        ? prev.filter((skill) => skill !== currentSkill)
        : [...prev, currentSkill];

      if (updatedSkills.length > 0) {
        searchParams.set("filter", updatedSkills.join(","));
      } else {
        searchParams.delete("filter");
      }
      setSearchParams(searchParams);
      return updatedSkills;
    });
  }

  function handleOtherSkills() {
    if (searchParams.get("filter") === "custom") {
      searchParams.delete("filter");
      setSearchParams(searchParams);
    } else {
      searchParams.set("filter", "custom");
      setSearchParams(searchParams);
    }
    setCustomSkillsIsSelected((selected) => !selected);
  }

  function handleClearFilters() {
    setSelectedSkills([]);
    searchParams.delete("filter");
    setSearchParams(searchParams);
    setCustomSkillsIsSelected(false);
  }

  const {
    data: teams,
    isLoading: isLoadingTeams,
    isError: isErrorGettingTeams,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeamOffers(),
    onError: (error) => {
      console.error("Error fetching teams offer:", error);
    },
  });

  let filteredTeams = teams;

  if (searchValue) {
    filteredTeams = filteredTeams?.filter((team) =>
      team.title.toLowerCase().includes(searchValue)
    );
  }
  const hasValidFilters =
    filterValue.length > 0 &&
    filterValue.some((filter) => filter.trim() !== "");

  if (hasValidFilters && filterValue[0] === "custom") {
    filteredTeams = filteredTeams?.filter((team) => {
      const allSkills = getAllSkills(
        team.general_required_skills,
        team.specific_required_skills
      );
      return allSkills.some(
        (tech) => !studentSkillsArrayWithNameOnly?.includes(tech)
      );
    });
  }
  if (hasValidFilters && filterValue[0] !== "custom") {
    filteredTeams = filteredTeams?.filter((team) =>
      team.general_required_skills.some((tech) =>
        filterValue.includes(tech.name)
      )
    );
  }
  const value = {
    teams,
    filteredTeams,
    filterValue,
    studentSkills,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedSkills,
    openSkills,
    setOpenSkills,
    customSkillsIsSelected,
    handleSelectSkill,
    handleOtherSkills,
    handleClearFilters,
    searchParams,
    setSearchParams,
    isErrorGettingTeams,
    isLoadingTeams,
  };

  return (
    <TeamOffersContext.Provider value={value}>
      {children}
    </TeamOffersContext.Provider>
  );
}

function useTeamOffers() {
  const context = useContext(TeamOffersContext);
  if (context === "undefined") {
    throw new Error("useTeamOffers must be used within a TeamOffersProvider");
  }
  return context;
}
export { useTeamOffers, TeamOffersProvider };
