import SectionTitle from "@/modules/student/components/SectionTitle";

import { userColumns } from "../features/user/AddUserColumn";
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
} from "@/components/ui/command";
import { useUsers } from "../features/user/useUsers";
import { AddUser } from "../features/user/AddUser";
import { useState } from "react";

import { UserDataTable } from "@/components/commun/user-data-table";
import { useSearchParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { getEsiAllYears } from "@/utils/helpers";
import { useAllStudents } from "../features/user/useAllStudents";
import { Input } from "@/components/ui/input";
import Filter from "@/components/commun/Filter";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, FilterIcon } from "lucide-react";
import { useSpecialities } from "@/features/specialities/useSpecialities";
import InlineSpinner from "@/components/commun/InlineSpinner";

function ManageStudents() {
  const [editingUser, setEditingUser] = useState(null);
  const [searchParams] = useSearchParams();
  const [filterCriteria, setFilterCriteria] = useState("");
  const [selectedSpecialty, setSelectedSpeciality] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const currentPage = searchParams.get("page") || 1;
  const role = "student";
  const { specialities, isGettingSpecialities, isErrorGettingSpecialities } =
    useSpecialities();
  const { createUser, updateUser, deleteUser, isDeleting } = useUsers(
    role,
    currentPage
  );
  const { allStudents, isLoadingAllStudents, isErrorGettingAllStudents } =
    useAllStudents(filterCriteria);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleSuccess = () => {
    setEditingUser(null);
  };
  function handleClearFilters() {
    setFilterCriteria("");
    setSelectedSpeciality(null);
    setSelectedRole(null);
    setSpecialtyOpen(false);
    setRoleOpen(false);
  }

  const formattedData = allStudents?.data?.map((user) => ({
    id: user.user.id,
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    email: user.user.email,
    enrollmentNumber: user?.enrollmentNumber || "N/A",
    speciality: {
      name: user?.speciality?.name || "N/A",
      id: user.specialityId || "N/A",
    },
    role: user?.isLeader ? "Leader" : "Member",
    isDeleting,
    onEdit: () => handleEdit(user),
    onDelete: () => handleDelete(user.user.id),
  }));

  return (
    <div className="space-y-4">
      <section className="flex gap-4 items-center justify-between bg-section rounded-xl px-3 py-4 shadow-sm">
        <SectionTitle
          title="Manage Students"
          subtitle="Browse and manage all students"
        />
        <AddUser
          role={role}
          editingUser={editingUser}
          onSuccess={handleSuccess}
          updateUser={updateUser}
          createUser={createUser}
        />
      </section>
      <div className="bg-section  rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center px-4 flex-wrap gap-2 ">
          <div className="flex items-center gap-4 ">
            <Input
              placeholder={`Search by first name`}
              type="text"
              onChange={(e) => setFilterCriteria(`search=${e.target.value}`)}
              className="min-w-[250px] max-w-[400px] bg-secondary"
            />
          </div>
          <Filter>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Popover open={specialtyOpen} onOpenChange={setSpecialtyOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={selectedSpecialty ? "default" : "outline"}
                    role="combobox"
                    aria-expanded={specialtyOpen}
                    className="justify-between min-w-[200px]"
                  >
                    <div className="flex items-center gap-2">
                      <FilterIcon className="h-4 w-4" />
                      {selectedSpecialty || "Specialty"}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    {isGettingSpecialities && <InlineSpinner />}
                    {isErrorGettingSpecialities && (
                      <p className="text-destructive">
                        Error getting specialties
                      </p>
                    )}
                    <CommandInput placeholder="Search specialties..." />
                    <CommandList>
                      <CommandEmpty>No specialty found.</CommandEmpty>
                      <CommandGroup>
                        {specialities?.map((specialty) => (
                          <CommandItem
                            key={specialty.id}
                            value={specialty.name}
                            onSelect={() => {
                              setFilterCriteria(`specialityId=${specialty.id}`);
                              setSelectedSpeciality(specialty.name);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                selectedSpecialty === specialty.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {specialty.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Popover open={roleOpen} onOpenChange={setRoleOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={selectedRole ? "default" : "outline"}
                    role="combobox"
                    aria-expanded={roleOpen}
                    className="justify-between min-w-[200px]"
                  >
                    <div className="flex items-center gap-2">
                      <FilterIcon className="h-4 w-4" />
                      {selectedRole || "Role"}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search roles..." />
                    <CommandList>
                      <CommandEmpty>No role found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="Leader"
                          onSelect={() => {
                            setFilterCriteria(`isLeader=true`);
                            setSelectedRole("Leader");
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedRole === "Leader"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          Leader
                        </CommandItem>
                        <CommandItem
                          value="Member"
                          onSelect={() => {
                            setFilterCriteria(`isLeader=false`);
                            setSelectedRole("Member");
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedRole === "Member"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          Member
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                className="mb-4 justify-self-center col-span-full"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </Filter>
        </div>
        <div className="bg-section p-4 rounded-xl shadow-sm">
          {isLoadingAllStudents && (
            <div className="space-y-4">
              {getEsiAllYears().map((year) => (
                <div className="flex items-center space-x-4" key={year}>
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {isErrorGettingAllStudents && (
            <p className="text-destructive">Error fetching students</p>
          )}

          {!isLoadingAllStudents && !isErrorGettingAllStudents && (
            <UserDataTable
              columns={userColumns(role, handleEdit, handleDelete)}
              data={formattedData || []}
              isLoading={isLoadingAllStudents}
              emptyMessage="No students found"
              totalPages={allStudents?.pagination?.totalPages}
              filterCriteria={filterCriteria}
              setFilterCriteria={setFilterCriteria}
              searchWith="firstName"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageStudents;
