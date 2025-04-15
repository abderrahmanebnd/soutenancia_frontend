import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useStudentSkills } from "../team-offers/useStudentSkills";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { Checkbox } from "@/components/ui/checkbox";

function FilterTeamApplication({ table }) {
  const [status, setStatus] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { studentSkills, isLoading } = useStudentSkills();
  function handleStatusSelection(value) {
    table.getColumn("status")?.setFilterValue(value);
    setStatus(value);
  }
  function handleSelectSkill(currentSkill) {
    setSelectedSkills((prevSkills) => {
      const updatedSkills = prevSkills.includes(currentSkill)
        ? prevSkills.filter((skill) => skill !== currentSkill)
        : [...prevSkills, currentSkill];
      if (updatedSkills.length > 0) {
        table.getColumn("generalSkills")?.setFilterValue(updatedSkills);
      } else {
        table.getColumn("generalSkills")?.setFilterValue([]);
      }
      return updatedSkills;
    });
  }
  function handleClearFilters() {
    setSelectedSkills([]);
    setStatus("");
    table.getColumn("status")?.setFilterValue("");
    table.getColumn("generalSkills")?.setFilterValue("");
  }
  return (
    <>
      <div className="space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px]">
              {status ? (
                status
              ) : (
                <>
                  Select Status
                  <ChevronsUpDown />
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => handleStatusSelection("pending")}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    Pending
                  </CommandItem>
                  <CommandItem
                    onSelect={() => handleStatusSelection("accepted")}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    Accepted
                  </CommandItem>
                  <CommandItem
                    onSelect={() => handleStatusSelection("rejected")}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    Rejected
                  </CommandItem>
                  <CommandItem
                    onSelect={() => handleStatusSelection("canceled")}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    Canceled
                  </CommandItem>
                  <CommandSeparator />
                </CommandGroup>

                <CommandGroup className="flex items-center justify-center">
                  <Button onClick={() => handleStatusSelection("")}>
                    Clear skills filter
                  </Button>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox">
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
                        onSelect={() => handleSelectSkill(skill.name)}
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
      </div>
      <div className="flex justify-center">
        <Button variant="link" onClick={handleClearFilters}>
          Clear all filters
        </Button>
      </div>
    </>
  );
}

export default FilterTeamApplication;
