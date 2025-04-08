import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, GraduationCap } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { Checkbox } from "@/components/ui/checkbox";

import { useTeamOffers } from "../../context/TeamOffersContext";

function FilterTeamOffers() {
  const {
    selectedSkills,
    openSkills,
    customSkillsIsSelected,
    handleSelectSkill,
    handleOtherSkills,
    handleClearFilters,
    studentSkills,
    isLoading,
    openMaxMembers,
    maxMembersValue,
    handleSelectMaxMembers,
    handleClearMaxMembers,
  } = useTeamOffers();
  const generalSkillsIsSelected = selectedSkills.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSkills}
              disabled={customSkillsIsSelected}
            >
              {selectedSkills.length > 0
                ? `${selectedSkills.length} skill${
                    selectedSkills.length > 1 ? "s" : ""
                  } selected`
                : "Select Skills"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            {isLoading ? (
              <InlineSpinner />
            ) : (
              <Command>
                <CommandInput placeholder="Search Skills..." />
                <CommandList>
                  <CommandEmpty>No Skill found.</CommandEmpty>
                  <CommandGroup>
                    {studentSkills?.map((skill) => (
                      <CommandItem
                        key={skill.id}
                        value={skill.name}
                        onSelect={handleSelectSkill}
                      >
                        <Checkbox
                          id={skill.id}
                          checked={selectedSkills.includes(skill.name)}
                        />

                        <label>{skill.name}</label>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
          </PopoverContent>
        </Popover>
        <Button
          variant={customSkillsIsSelected ? "default" : "outline"}
          onClick={handleOtherSkills}
          disabled={generalSkillsIsSelected}
        >
          Other Skills
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openMaxMembers}
            >
              {maxMembersValue ? `${maxMembersValue} students` : `Team Size`}

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search team size..." />
              <CommandList>
                <CommandEmpty>No Skill found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value={2}
                    onSelect={() => handleSelectMaxMembers(2)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    2 <GraduationCap />
                  </CommandItem>
                  <CommandItem
                    value={3}
                    onSelect={() => handleSelectMaxMembers(3)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    3 <GraduationCap />
                  </CommandItem>
                  <CommandItem
                    value={4}
                    onSelect={() => handleSelectMaxMembers(4)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    4 <GraduationCap />
                  </CommandItem>
                  <CommandItem
                    value={5}
                    onSelect={() => handleSelectMaxMembers(5)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    5 <GraduationCap />
                  </CommandItem>
                  <CommandItem
                    value={6}
                    onSelect={() => handleSelectMaxMembers(6)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    6 <GraduationCap />
                  </CommandItem>
                  <CommandItem
                    value={7}
                    onSelect={() => handleSelectMaxMembers(7)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    7 <GraduationCap />
                  </CommandItem>
                  <CommandSeparator />
                  <CommandItem>
                    <Button className="w-full" onClick={handleClearMaxMembers}>
                      All
                    </Button>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-center">
        <Button variant="link" onClick={handleClearFilters}>
          Clear all filters
        </Button>
      </div>
    </div>
  );
}

export default FilterTeamOffers;
