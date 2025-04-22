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
import { ChevronsUpDown, UsersRound } from "lucide-react";
import { useProjectOffers } from "../../context/ProjectOffersContext";
import { Checkbox } from "@/components/ui/checkbox";
import { getEsiAllYears, getMaxTeamsApplying } from "@/utils/helpers";
import { useSpecialities } from "@/features/specialities/useSpecialities";
import InlineSpinner from "@/components/commun/InlineSpinner";

function FilterProjectOffers() {
  const {
    yearValue,
    specialityValue,
    maxTeamsValue,
    handleSelectYear,
    handleSelectSpeciality,
    handleSelectMaxTeams,
    handleClearYear,
    handleClearMaxTeams,
    handleClearFilters,
    selectedSpeciality,
  } = useProjectOffers();
  const { specialities, isGettingSpecialities, isErrorGettingSpecialities } =
    useSpecialities();
  return (
    <div className="space-y-2">
      <div className="flex flex-col  sm:flex-row sm:items-center gap-2 ">
        <Popover>
          <PopoverTrigger asChild>
            {yearValue ? (
              <Button variant="comboboxActive" role="combobox">
                {yearValue} years
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            ) : (
              <Button variant="outline" role="combobox">
                Select year
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {getEsiAllYears().map((year) => {
                    return (
                      <CommandItem
                        key={year}
                        value={year}
                        onSelect={() => handleSelectYear(year)}
                        className="flex items-center justify-center text-primary text-sm"
                      >
                        {year} years
                      </CommandItem>
                    );
                  })}

                  <CommandSeparator />
                  <CommandItem>
                    <Button className="w-full" onClick={handleClearYear}>
                      All
                    </Button>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            {selectedSpeciality.length > 0 ? (
              <Button variant="comboboxActive" role="combobox">
                {selectedSpeciality.at(0)}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            ) : (
              <Button variant="outline" role="combobox">
                Select speciality
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            {isGettingSpecialities && <InlineSpinner />}
            {isErrorGettingSpecialities && (
              <div className="text-red-600"> error getting specialities</div>
            )}
            {!isErrorGettingSpecialities && !isGettingSpecialities && (
              <Command>
                <CommandInput placeholder="Search speciality..." />
                <CommandList>
                  <CommandEmpty>No speciality found.</CommandEmpty>
                  <CommandGroup>
                    {specialities?.map((speciality) => (
                      <CommandItem
                        key={speciality.id}
                        value={speciality.name}
                        onSelect={() => handleSelectSpeciality(speciality.name)}
                        className=" text-primary text-sm"
                      >
                        <Checkbox
                          id={speciality.id}
                          checked={specialityValue.includes(
                            speciality.name.toLowerCase()
                          )}
                        />{" "}
                        <label>{speciality.name}</label>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            {maxTeamsValue ? (
              <Button variant="comboboxActive" role="combobox">
                {maxTeamsValue} team{maxTeamsValue > 1 ? "s" : ""}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            ) : (
              <Button variant="outline" role="combobox">
                Select max teams
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search max teams..." />
              <CommandList>
                <CommandEmpty>No max teams found.</CommandEmpty>
                <CommandGroup>
                  {getMaxTeamsApplying().map((maxTeam) => (
                    <CommandItem
                      key={maxTeam}
                      value={maxTeam}
                      onSelect={() => handleSelectMaxTeams(maxTeam)}
                      className="flex items-center justify-center text-primary text-sm"
                    >
                      {maxTeam} <UsersRound />
                    </CommandItem>
                  ))}

                  <CommandSeparator />
                  <CommandItem>
                    <Button className="w-full" onClick={handleClearMaxTeams}>
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

export default FilterProjectOffers;
