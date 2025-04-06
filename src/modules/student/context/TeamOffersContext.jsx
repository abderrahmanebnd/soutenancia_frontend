import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";
import { useStudentSkills } from "../features/team-offers/useStudentSkills";
import { useQuery } from "@tanstack/react-query";
import { getTeamOffers } from "../api/apiStudentOffer";
import { getAllSkills, getGeneralSkillsWithNameOnly } from "@/utils/helpers";

const TeamOffersContext = createContext();

function TeamOffersProvider({ children }) {
  // i made this context so as to separate the logic from the ui and avoid prop drilling
  //URL Management
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const filterValue = searchParams.get("filter")?.split(",") || [];
  const maxMembersValue = searchParams.get("max_members") || 0;
  // local State
  const [selectedSkills, setSelectedSkills] = useState(filterValue);
  const [openSkills] = useState(false);
  const [openMaxMembers, setOpenMaxMembers] = useState(false);

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
  function handleSelectMaxMembers(currentMaxMembers) {
    searchParams.set("max_members", currentMaxMembers);
    setSearchParams(searchParams);
  }
  function handleClearMaxMembers() {
    searchParams.delete("max_members");
    setSearchParams(searchParams);
    setOpenMaxMembers(false);
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
    searchParams.delete("max_members");
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
  if (maxMembersValue) {
    filteredTeams = filteredTeams?.filter((team) => {
      return team.max_members === Number(maxMembersValue);
    });
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
    filteredTeams = filteredTeams?.filter((team) => {
      const teamSkills = getGeneralSkillsWithNameOnly(
        team.general_required_skills
      );
      return filterValue.every((filter) => teamSkills.includes(filter));
    });
  }

  const value = {
    teams,
    filteredTeams,
    filterValue,
    studentSkills,
    isLoading,
    selectedSkills,
    openSkills,
    customSkillsIsSelected,
    handleSelectSkill,
    handleOtherSkills,
    handleClearFilters,
    searchParams,
    setSearchParams,
    isErrorGettingTeams,
    isLoadingTeams,
    openMaxMembers,
    maxMembersValue,
    handleSelectMaxMembers,
    handleClearMaxMembers,
  };

  return (
    <TeamOffersContext.Provider value={value}>
      {children}
    </TeamOffersContext.Provider>
  );
}

function useTeamOffers() {
  const context = useContext(TeamOffersContext);
  if (context === undefined) {
    throw new Error("useTeamOffers must be used within a TeamOffersProvider");
  }
  return context;
}
export { useTeamOffers, TeamOffersProvider };
