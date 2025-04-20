import { Button } from "@/components/ui/button";
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
import { ChevronsUpDown } from "lucide-react";
import { useProjectOffers } from "../../context/ProjectOffersContext";

function FilterProjectOffers() {
  const {
    yearValue,
    specialityValue,
    maxTeamsValue,
    handleSelectYear,
    handleSelectSpeciality,
    handleSelectMaxTeams,
    handleClearFilters,
  } = useProjectOffers();
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox">
              {yearValue ? yearValue : "Select year"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value={2}
                    onSelect={() => handleSelectYear(2)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    2 year
                  </CommandItem>
                  <CommandItem
                    value={3}
                    onSelect={() => handleSelectYear(3)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    3 year
                  </CommandItem>
                  <CommandItem
                    value={4}
                    onSelect={() => handleSelectYear(4)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    4 year
                  </CommandItem>
                  <CommandItem
                    value={5}
                    onSelect={() => handleSelectYear(5)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    5 year
                  </CommandItem>

                  <CommandSeparator />
                  <CommandItem>
                    <Button className="w-full">All</Button>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              /*TODO:all these coments would be uncommented when the data from the backend is complete  aria-expanded={openSkills}
            disabled={customSkillsIsSelected} */
            >
              {/* {selectedSkills.length > 0
              ? `${selectedSkills.length} skill${
                  selectedSkills.length > 1 ? "s" : ""
                } selected`
              : "Select Skills"} */}
              {specialityValue ? specialityValue : "Select speciality"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            {/* {isLoading ? (
            <InlineSpinner />
          ) : ( */}
            <Command>
              <CommandInput placeholder="Search speciality..." />
              <CommandList>
                <CommandEmpty>No speciality found.</CommandEmpty>
                <CommandGroup>
                  {/*  {studentSkills?.map((skill) => ( TODO:fix the commandItem because the data has really changed */}
                  <CommandItem
                    value="Computer Science"
                    onSelect={() => handleSelectSpeciality("computer science")}
                    className=" text-primary text-sm"
                  >
                    Computer Science
                  </CommandItem>
                  <CommandItem
                    value="Ai & Data Science"
                    onSelect={() => handleSelectSpeciality("ai & data science")}
                    className="text-primary text-sm"
                  >
                    Ai & Data Science
                  </CommandItem>
                  {/*  <Checkbox
                  id={skill.id}
                  checked={selectedSkills.includes(skill.name)}
                /> */}

                  {/*  ))} */}
                </CommandGroup>
              </CommandList>
            </Command>
            {/* )} */}
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox">
              {maxTeamsValue ? maxTeamsValue : "Select Max teams"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search max teams..." />
              <CommandList>
                <CommandEmpty>No max teams found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value={1}
                    onSelect={() => handleSelectMaxTeams(1)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    1
                  </CommandItem>
                  <CommandItem
                    value={2}
                    onSelect={() => handleSelectMaxTeams(2)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    2
                  </CommandItem>
                  <CommandItem
                    value={3}
                    onSelect={() => handleSelectMaxTeams(3)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    3
                  </CommandItem>
                  <CommandItem
                    value={4}
                    onSelect={() => handleSelectMaxTeams(4)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    4
                  </CommandItem>
                  <CommandItem
                    value={5}
                    onSelect={() => handleSelectMaxTeams(5)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    5
                  </CommandItem>
                  <CommandItem
                    value={6}
                    onSelect={() => handleSelectMaxTeams(6)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    6
                  </CommandItem>
                  <CommandItem
                    value={7}
                    onSelect={() => handleSelectMaxTeams(7)}
                    className="flex items-center justify-center text-primary text-sm"
                  >
                    7
                  </CommandItem>

                  <CommandSeparator />
                  <CommandItem>
                    <Button className="w-full">All</Button>
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

export default FilterProjectOffers;
