import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { Checkbox } from "@/components/ui/checkbox";

import { useTeamOffers } from "../context/TeamOffersContext";

function FilterTeamOffers() {
  const {
    selectedSkills,
    openSkills,
    setOpenSkills,
    customSkillsIsSelected,
    handleSelectSkill,
    handleOtherSkills,
    handleClearFilters,
    studentSkills,
    isLoading,
  } = useTeamOffers();
  const generalSkillsIsSelected = selectedSkills.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Popover open={openSkills} onOpenChange={setOpenSkills}>
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
                {selectedSkills.length > 0 && (
                  <div className="flex items-center justify-between p-2 border-t">
                    <Button size="sm" onClick={() => setOpenSkills(false)}>
                      Apply
                    </Button>
                  </div>
                )}
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
      </div>
      <Button variant="link" className="w-full" onClick={handleClearFilters}>
        Clear all filters
      </Button>
    </div>
  );
}

export default FilterTeamOffers;
