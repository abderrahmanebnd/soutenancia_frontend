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

import { getMaxTeamsApplying } from "@/utils/helpers";

import { useStudentProjectOffers } from "./studentProjectOffersContext";
import { useGetTeachers } from "@/modules/teacher/features/project-offers/useGetTeachers";
import InlineSpinner from "@/components/commun/InlineSpinner";

function FilterStudentProjectOffers() {
  const {
    maxTeamsValue,
    handleSelectMaxTeams,
    handleClearMaxTeams,
    handleClearFilters,
    teacherValue,
    handleSelectTeacher,
    handleClearTeacher,
  } = useStudentProjectOffers();
  const { teachers, isGettingTeachers, isErrorGettingTeachers } =
    useGetTeachers();

  return (
    <div className="space-y-2">
      <div className="flex flex-col  sm:flex-row sm:items-center gap-2 ">
        <Popover>
          <PopoverTrigger asChild>
            {teacherValue ? (
              <Button variant="comboboxActive" role="combobox">
                {
                  teachers?.find((teacher) => teacher.id === teacherValue)?.user
                    .firstName
                }
                {
                  teachers?.find((teacher) => teacher.id === teacherValue)?.user
                    .lastName
                }
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            ) : (
              <Button variant="outline" role="combobox">
                Select teacher
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            {isGettingTeachers && <InlineSpinner />}
            {isErrorGettingTeachers && (
              <div className="text-red-600"> error getting teachers</div>
            )}
            <Command>
              <CommandInput placeholder="Search teachers..." />
              <CommandList>
                <CommandEmpty>No teacher found.</CommandEmpty>
                <CommandGroup>
                  {teachers?.map((teacher) => {
                    return (
                      <CommandItem
                        key={teacher.id}
                        value={teacher.id}
                        onSelect={() => handleSelectTeacher(teacher.id)}
                        className="flex items-center justify-center text-primary text-sm"
                      >
                        {teacher?.user.firstName} {teacher?.user.lastName}
                      </CommandItem>
                    );
                  })}

                  <CommandSeparator />
                  <CommandItem>
                    <Button className="w-full" onClick={handleClearTeacher}>
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

export default FilterStudentProjectOffers;
