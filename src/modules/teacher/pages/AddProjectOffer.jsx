import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Check, Info, FileSymlink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UploadCloud } from "lucide-react";
import { FileUpload } from "@/components/commun/FileUpload";
import { useGetTeachers } from "@/modules/teacher/features/project-offers/useGetTeachers";

import { useAddProjectOffer } from "../features/project-offers/useAddProjectOffer";
import { Link, useNavigate } from "react-router-dom";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useSpecialities } from "@/features/specialities/useSpecialities";
import { useAssignmentTypes } from "@/features/assignmentType/useAssignmentTypes";
import { useTeamsCompleted } from "@/features/Teams/useTeamsCompleted";
import { getEsiAllYears } from "@/utils/helpers";
import InlineSpinner from "@/components/commun/InlineSpinner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const formSchema = z.object({
  projectTitle: z.string().min(3, {
    message: "Project title is required and must be at least 3 characters.",
  }),
  usedTechnologies: z
    .array(z.string())
    .min(1, { message: "At least one technology is required." }),
  usedTools: z
    .array(z.string())
    .min(1, { message: "At least one tool is required." }),
  grade: z
    .number()
    .int({ message: "Grade must be an integer." })
    .refine((val) => !isNaN(val) && val !== 0, {
      message: "Grade is required.",
    }),
  destinatedFor: z
    .array(z.string())
    .min(1, { message: "Target speciality is required." }),
  chosedTeams: z
    .array(z.string())

    .refine((val) => val.length <= 9, {
      message: "You can select a maximum of 9 teams.",
    }),
  teamSize: z
    .array(z.number())
    .length(1, { message: "Team size must be specified." })
    .refine((val) => val[0] >= 2 && val[0] <= 9, {
      message: "Number of Teams  must be between 2 and 9",
    }),

  projectSummary: z
    .string()
    .min(10, { message: "Project summary must be at least 10 characters." }),
  projectAttachments: z.array(z.any()).optional(),
  generalSkills: z.array(z.string()).optional(),
  selectedFramers: z.array(z.string()).optional(),
});

export default function AddProjectOffer() {
  const { assignmentTypes } = useAssignmentTypes();
  const {
    teamsCompleted,
    isGettingTeamsCompleted,
    isErrorGettingTeamsCompleted,
  } = useTeamsCompleted();

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      usedTechnologies: [],
      usedTools: [],
      destinatedFor: [], //speciality
      teamSize: [1],
      grade: 0,
      projectSummary: "",
      chosedTeams: [],
      projectAttachments: [],
      selectedFramers: [],
    },
  });

  const { teachers } = useGetTeachers();
  const { specialities } = useSpecialities();
  const { mutate: submitProject, isPending } = useAddProjectOffer();

  const [techInput, setTechInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const currentTeamSize = form.watch("teamSize")[0];
  const watchedGrade = form.watch("grade");
  const watchedSpeciality = form.watch("destinatedFor");
  const assignmentMethodePerYear = assignmentTypes?.find(
    (assignmentmethode) => assignmentmethode.year === watchedGrade
  )?.assignmentType;

  const [isSubmitting] = useState(false);

  function onSubmit(formData) {
    const projectOfferData = {
      title: formData.projectTitle,
      description: formData.projectSummary,
      tools: formData.usedTools,
      languages: formData.usedTechnologies,
      maxTeamsNumber: formData.teamSize[0],
      fileUrl: formData.projectAttachments[0]?.url || null,
      specialities: formData.destinatedFor,
      coSupervisors: formData.selectedFramers,
      year: new Date().getFullYear(),
      ...(assignmentMethodePerYear === "amiability" && {
        chosedTeamsIds: formData.chosedTeams,
      }),
    };

    submitProject(
      { ...projectOfferData },
      {
        onSuccess: () => {
          form.reset();
          navigate("/teacher/my-project-offers");
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary text-left">
            Submit Project Offer
          </h1>
          <p className="text-gray-600 text-left">
            Create A Project Offer Including All Informations
          </p>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Project Title
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter the project title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="selectedFramers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Select Framers
                    </FormLabel>
                    <div className="flex space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value.length && "text-muted-foreground"
                              )}
                            >
                              {field.value.length > 0
                                ? `${field.value.length} teacher${
                                    field.value.length > 1 ? "s" : ""
                                  } selected`
                                : "Select Framers"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search Framers..." />
                            <CommandList>
                              <CommandEmpty>No Framers found.</CommandEmpty>
                              <CommandGroup>
                                {teachers?.map((teacher) => {
                                  const isSelected = field.value.includes(
                                    teacher.id
                                  );
                                  return (
                                    <CommandItem
                                      key={teacher.id}
                                      onSelect={() => {
                                        if (isSelected) {
                                          field.onChange(
                                            field.value.filter(
                                              (value) => value !== teacher.id
                                            )
                                          );
                                        } else {
                                          field.onChange([
                                            ...field.value,
                                            teacher.id,
                                          ]);
                                        }
                                      }}
                                    >
                                      <div
                                        className={cn(
                                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                          isSelected
                                            ? "bg-primary text-primary-foreground"
                                            : "opacity-50 [&_svg]:invisible"
                                        )}
                                      >
                                        <Check className="h-3 w-3" />
                                      </div>
                                      <span>
                                        {teacher.user.firstName}{" "}
                                        {teacher.user.lastName}
                                      </span>
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((id) => {
                          const teacher = teachers?.find((t) => t.id === id);
                          return (
                            <Badge
                              key={id}
                              className="flex items-center gap-1 px-3 py-1"
                            >
                              {teacher?.user.firstName} {teacher?.user.lastName}
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(
                                    field.value.filter((s) => s !== id)
                                  );
                                }}
                                className="rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">
                                  Remove {teacher?.user.firstName}
                                </span>
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Select Target grade
                    </FormLabel>
                    <div className="flex space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                field.value === 0 && "text-muted-foreground"
                              )}
                            >
                              {field.value > 0
                                ? `${field.value} year${
                                    field.value > 1 ? "s" : ""
                                  } selected`
                                : "Select Grade"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search Grade..." />
                            <CommandList>
                              <CommandEmpty>No grade found.</CommandEmpty>
                              <CommandGroup>
                                {getEsiAllYears().map((year) => {
                                  const isSelected = field.value === year;
                                  return (
                                    <CommandItem
                                      key={year}
                                      onSelect={() => {
                                        if (isSelected) {
                                          field.onChange(0);
                                        } else {
                                          field.onChange(year);
                                        }
                                      }}
                                    >
                                      <div
                                        className={cn(
                                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                          isSelected
                                            ? "bg-primary text-primary-foreground"
                                            : "opacity-50 [&_svg]:invisible"
                                        )}
                                      >
                                        <Check className="h-3 w-3" />
                                      </div>
                                      <span> {year} Year</span>
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="flex flex-col">
                <div className="flex items-center gap-1">
                  <FormLabel className="text-base text-primary">
                    Assignment Method
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger>
                      <Info size={17} className="text-primary" />
                    </PopoverTrigger>
                    <PopoverContent className="text-primary flex items-center gap-1">
                      The assignment method is defined by the admin for the
                      selected grade
                    </PopoverContent>
                  </Popover>
                </div>
                <FormControl>
                  <Button variant="outline" disabled={true} role="combobox">
                    {assignmentMethodePerYear
                      ? assignmentMethodePerYear
                      : "No Assignment Method"}
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="destinatedFor"
                render={({ field }) => {
                  const specialityByGrade = specialities?.filter(
                    (spe) => spe.year === watchedGrade
                  );
                  return (
                    <FormItem>
                      <div className="flex items-center gap-1">
                        <FormLabel className="text-base text-primary">
                          Destination For
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger>
                            <Info size={17} className="text-primary" />
                          </PopoverTrigger>
                          <PopoverContent className="text-primary flex items-center gap-1">
                            <Info size={17} className="text-primary" />
                            Please select the grade before
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex space-x-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                disabled={watchedGrade === 0}
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value.length && "text-muted-foreground"
                                )}
                              >
                                {field.value.length > 0
                                  ? `${field.value.length} specialit${
                                      field.value.length > 1 ? "ies" : "y"
                                    } selected`
                                  : "Select Specialities"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search specialities..." />
                              <CommandList>
                                <CommandEmpty>
                                  No specialities found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {specialityByGrade?.map((speciality) => {
                                    const isSelected = field.value.includes(
                                      speciality.id
                                    );
                                    return (
                                      <CommandItem
                                        key={speciality.id}
                                        onSelect={() => {
                                          if (isSelected) {
                                            field.onChange(
                                              field.value.filter(
                                                (value) =>
                                                  value !== speciality.id
                                              )
                                            );
                                          } else {
                                            field.onChange([
                                              ...field.value,
                                              speciality.id,
                                            ]);
                                          }
                                        }}
                                      >
                                        <div
                                          className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected
                                              ? "bg-primary text-primary-foreground"
                                              : "opacity-50 [&_svg]:invisible"
                                          )}
                                        >
                                          <Check className="h-3 w-3" />
                                        </div>
                                        <span>
                                          {speciality.name} (Year{" "}
                                          {speciality.year})
                                        </span>
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((id) => {
                            const speciality = specialities?.find(
                              (s) => s.id === id
                            );
                            return (
                              <Badge
                                key={id}
                                className="flex items-center gap-1 px-3 py-1"
                              >
                                {speciality?.name} (Year {speciality?.year})
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.onChange(
                                      field.value.filter((s) => s !== id)
                                    );
                                  }}
                                  className="rounded-full p-0.5"
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">
                                    Remove {speciality?.name}
                                  </span>
                                </button>
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="chosedTeams"
                render={({ field }) => {
                  const chosedTeamsWithSpeciality = teamsCompleted?.filter(
                    (team) => watchedSpeciality.includes(team.specialityId)
                  );
                  return (
                    <FormItem>
                      <div className="flex items-center gap-1">
                        <FormLabel className="text-primary text-base">
                          Select Teams
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger>
                            <Info size={17} className="text-primary" />
                          </PopoverTrigger>
                          <PopoverContent className="text-primary flex items-center gap-1">
                            Team selection is required when the assignment
                            method is amiability and the specialty has been
                            selected.
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value.length && "text-muted-foreground"
                              )}
                              disabled={
                                assignmentMethodePerYear !== "amiability" ||
                                watchedSpeciality.length === 0
                              }
                            >
                              {field.value.length > 0
                                ? `${field.value.length} team${
                                    field.value.length > 1 ? "s" : ""
                                  } selected`
                                : "Select teams"}
                              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                {field.value.length}
                              </span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          {isGettingTeamsCompleted && <InlineSpinner />}
                          {isErrorGettingTeamsCompleted && (
                            <div className="text-red-500">
                              Error getting completed teams.
                            </div>
                          )}
                          <Command>
                            <CommandInput placeholder="Search teams..." />
                            <CommandList>
                              <CommandEmpty>No teams found.</CommandEmpty>
                              <CommandGroup>
                                {chosedTeamsWithSpeciality?.map((team) => {
                                  const isSelected = field.value.includes(
                                    team.id
                                  );
                                  return (
                                    <div
                                      key={team.id}
                                      className="flex items-center gap-1"
                                    >
                                      <CommandItem
                                        onSelect={() => {
                                          if (isSelected) {
                                            field.onChange(
                                              field.value.filter(
                                                (value) => value !== team.id
                                              )
                                            );
                                          } else {
                                            field.onChange([
                                              ...field.value,
                                              team.id,
                                            ]);
                                          }
                                        }}
                                        className="flex-1"
                                      >
                                        <div
                                          className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected
                                              ? "bg-primary text-primary-foreground"
                                              : "opacity-50 [&_svg]:invisible"
                                          )}
                                        >
                                          <Check className="h-3 w-3" />
                                        </div>
                                        <span>{team.title}</span>
                                      </CommandItem>
                                      <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                      >
                                        <Link
                                          to={`/teacher/team-details/${team.id}`}
                                        >
                                          <HoverCard>
                                            <HoverCardTrigger>
                                              <FileSymlink
                                                size={20}
                                                className="text-primary"
                                              />
                                            </HoverCardTrigger>
                                            <HoverCardContent className="p-2 text-sm text-primary">
                                              View Team Details
                                            </HoverCardContent>
                                          </HoverCard>
                                        </Link>
                                      </Button>
                                    </div>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="usedTechnologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Used Technologies
                    </FormLabel>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a technology"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const trimmedValue = techInput.trim();
                            if (
                              trimmedValue &&
                              !field.value.includes(trimmedValue)
                            ) {
                              field.onChange([...field.value, trimmedValue]);
                              setTechInput("");
                            }
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => {
                          const trimmedValue = techInput.trim();
                          if (
                            trimmedValue &&
                            !field.value.includes(trimmedValue)
                          ) {
                            field.onChange([...field.value, trimmedValue]);
                            setTechInput("");
                          }
                        }}
                        variant="outline"
                        className="bg-primary/10"
                      >
                        <Plus className="h-4 w-4 text-primary" />
                      </Button>
                    </div>

                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((item, index) => (
                          <Badge
                            key={index}
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            {item}
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((s) => s !== item)
                                );
                              }}
                              className="rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {item}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="usedTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Used Tools
                    </FormLabel>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tool"
                        value={toolInput}
                        onChange={(e) => setToolInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const trimmedValue = toolInput.trim();
                            if (
                              trimmedValue &&
                              !field.value.includes(trimmedValue)
                            ) {
                              field.onChange([...field.value, trimmedValue]);
                              setToolInput("");
                            }
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => {
                          const trimmedValue = toolInput.trim();
                          if (
                            trimmedValue &&
                            !field.value.includes(trimmedValue)
                          ) {
                            field.onChange([...field.value, trimmedValue]);
                            setToolInput("");
                          }
                        }}
                        variant="outline"
                        className="bg-primary/10"
                      >
                        <Plus className="h-4 w-4 text-primary" />
                      </Button>
                    </div>

                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((item, index) => (
                          <Badge
                            key={index}
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            {item}
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((s) => s !== item)
                                );
                              }}
                              className="rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {item}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Number of Teams
                    </FormLabel>
                    <div className="flex items-center gap-4">
                      <FormControl className="flex-1">
                        <Slider
                          min={1}
                          max={9}
                          step={1}
                          onValueChange={field.onChange}
                          value={field.value}
                          className="w-full md:w-96"
                        />
                      </FormControl>
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        {currentTeamSize}
                      </div>
                    </div>
                    <FormDescription>
                      Select the number of teams (1-9)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="projectSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary">
                    Project Summary
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Full Project Details"
                      className="w-full rounded-md border p-2"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectAttachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary">
                    Project Attachment :
                  </FormLabel>
                  <FormDescription>
                    Project Specifications Book, Work Plan, Work Schedule And
                    Every Thing Related To The Project
                  </FormDescription>
                  <FormControl>
                    <FileUpload field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
              {isSubmitting ? (
                <ButtonWithSpinner disabled={isSubmitting} />
              ) : (
                <Button
                  type="submit"
                  disabled={isPending}
                  variant="outline"
                  className="flex items-center px-6 py-3 space-x-2 border border-blue-500 text-blue-600 text-lg font-semibold hover:bg-blue-100"
                >
                  {isPending ? "Submitting..." : "Submit Offer"}
                  <UploadCloud className="w-8 h-8" />
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
