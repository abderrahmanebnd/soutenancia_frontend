import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import SectionTitle from "@/modules/student/components/SectionTitle";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";
import { useParams } from "react-router-dom";
import { useDeleteProjectOffer } from "../features/project-offers/useDeleteProjectOffer";
import Spinner from "@/components/commun/Spinner";
import toast from "react-hot-toast";
import { useProjectOfferDetails } from "../features/project-offers/useProjectOfferDetails";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { cn } from "@/lib/utils";
import { useGetTeachers } from "@/modules/teacher/features/project-offers/useGetTeachers";
import { useUpdateProject } from "../features/project-offers/useUpdateProject"; // Ensure this import is correct

const formSchema = z.object({
  projectTitle: z.string().min(3, {
    message: "Project title is required and must be at least 3 characters.",
  }),
  projectSummary: z
    .string()
    .min(10, { message: "Project summary must be at least 10 characters." }),
  usedTechnologies: z
    .array(z.string())
    .min(1, { message: "At least one technology is required." }),
  usedTools: z
    .array(z.string())
    .min(1, { message: "At least one tool is required." }),

  teamNumbers: z
    .array(z.number())
    .length(1)
    .refine((val) => val[0] >= 2 && val[0] <= 9, {
      message: "Number of teams must be between 2 and 9",
    }),

  projectAttachments: z.array(z.any()).optional(),
  selectedFramers: z.array(z.string()).optional(),
});

export default function EditProject() {
  const { idEditProjectOffer } = useParams();
  const { updateProject, isUpdating } = useUpdateProject(idEditProjectOffer); // Ensure this hook is correctly implemented
  const { deleteProjectOffer, isDeleting } = useDeleteProjectOffer();
  // Add loading state
  const { teachers: framers } = useGetTeachers(); // Extract teachers directly

  const [techInput, setTechInput] = useState("");
  const [toolInput, setToolInput] = useState("");

  const {
    projectOfferDetails,
    isGettingProjectOfferDetails,
    isErrorGettingProjectOfferDetails,
  } = useProjectOfferDetails(idEditProjectOffer);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      projectSummary: "",
      usedTechnologies: [],
      usedTools: [],

      teamNumbers: [2],

      projectAttachments: [],
      selectedFramers: [],
    },
  });

  const currentTeamSize = form.watch("teamNumbers")[0];

  useEffect(() => {
    if (!idEditProjectOffer) {
      toast.error("Invalid project ID. Please check the URL.");
      return;
    }

    if (!projectOfferDetails) return;

    form.reset({
      projectTitle: projectOfferDetails.title || "",
      projectSummary: projectOfferDetails.description || "",
      usedTechnologies: projectOfferDetails.languages || [],
      usedTools: projectOfferDetails.tools || [],

      teamNumbers: [projectOfferDetails.maxTeamsNumber || 2],

      projectAttachments: projectOfferDetails.fileUrl
        ? [projectOfferDetails.fileUrl]
        : [],
      selectedFramers:
        projectOfferDetails.coSupervisors?.map((s) => s.id) || [],
    });
  }, [projectOfferDetails, idEditProjectOffer, form]);

  const onSubmit = (data) => {
    const updatedDataOnly = {};

    if (data.projectTitle !== projectOfferDetails.title) {
      updatedDataOnly.title = data.projectTitle;
    }
    if (data.projectSummary !== projectOfferDetails.description) {
      updatedDataOnly.description = data.projectSummary;
    }
    if (data.teamNumbers[0] !== projectOfferDetails.maxTeamsNumber) {
      updatedDataOnly.maxTeamsNumber = data.teamNumbers[0];
    }

    if (
      JSON.stringify(data.usedTechnologies) !==
      JSON.stringify(projectOfferDetails.languages || [])
    ) {
      updatedDataOnly.languages = data.usedTechnologies;
    }
    if (
      JSON.stringify(data.usedTools) !==
      JSON.stringify(projectOfferDetails.tools || [])
    ) {
      updatedDataOnly.tools = data.usedTools;
    }

    const currentCoSupervisorIds =
      projectOfferDetails.coSupervisors?.map((c) => c.id) || [];
    if (
      JSON.stringify(data.selectedFramers) !==
      JSON.stringify(currentCoSupervisorIds)
    ) {
      updatedDataOnly.coSupervisors = data.selectedFramers;
    }

    const hasChanges = Object.keys(updatedDataOnly).length > 0;

    if (hasChanges) {
      /*  console.log("Updated data:", updatedDataOnly);
      console.log("id", idEditProjectOffer); */
      updateProject(
        { id: idEditProjectOffer, data: updatedDataOnly },
        {
          onError: (error) => {
            console.error("Update error details:", {
              error: error.response?.data,
              payload: updatedDataOnly,
            });
            toast.error(
              error.response?.data?.message ||
                "Failed to update project. Please check console for details."
            );
          },
        }
      );
    } else {
      toast.error("No changes detected.");
    }
  };

  const handleDelete = () => {
    if (!idEditProjectOffer) {
      toast.error("Invalid project ID. Unable to delete.");
      return;
    }

    if (projectOfferDetails?.assignedTeams?.length > 0) {
      toast.error("Cannot delete the project as there are assigned teams.");
      return;
    }

    deleteProjectOffer(idEditProjectOffer);
  };

  if (!idEditProjectOffer) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-red-500">
          Invalid project ID. Please check the URL.
        </p>
      </div>
    );
  }

  if (isGettingProjectOfferDetails) return <Spinner />;

  if (isErrorGettingProjectOfferDetails) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-red-500">
          Failed to load project details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex justify-center p-4">
      <div className="bg-white px-6 pt-6 lg:px-12 lg:pt-12 pb-6 rounded-xl shadow-lg w-full md:max-w-2xl space-y-6">
        <SectionTitle
          title="Edit Project"
          subtitle="Modify or delete your project offer here."
        />

        {!isGettingProjectOfferDetails &&
          !isErrorGettingProjectOfferDetails && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="projectTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-primary">
                        Project Title
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter project title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          placeholder="Enter project summary"
                          className="w-full p-2 border rounded-md min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                          {field.value.map((technology, index) => (
                            <Badge
                              key={index}
                              className="flex items-center gap-1 px-3 py-1"
                            >
                              {technology}
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(
                                    field.value.filter((t) => t !== technology)
                                  );
                                }}
                                className="rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">
                                  Remove {technology}
                                </span>
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
                          {field.value.map((tool, index) => (
                            <Badge
                              key={index}
                              className="flex items-center gap-1 px-3 py-1"
                            >
                              {tool}
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(
                                    field.value.filter((t) => t !== tool)
                                  );
                                }}
                                className="rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove {tool}</span>
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
                  name="selectedFramers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-primary">
                        Select Framers
                      </FormLabel>
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
                                {framers?.map((teacher) => {
                                  // Use framers instead of teachersData?.teachers
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
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((id) => {
                            const teacher = framers?.find((t) => t.id === id);
                            return (
                              <Badge
                                key={id}
                                className="flex items-center gap-1 px-3 py-1"
                              >
                                {teacher?.user.firstName}{" "}
                                {teacher?.user.lastName}
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
                  name="teamNumbers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-primary">
                        Number of Teams
                      </FormLabel>
                      <div className="flex items-center gap-4">
                        <FormControl className="flex-1">
                          <Slider
                            min={2}
                            max={9}
                            step={1}
                            onValueChange={field.onChange}
                            value={field.value}
                          />
                        </FormControl>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                          {currentTeamSize}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2">
                  {isUpdating ? (
                    <ButtonWithSpinner
                      disabled={isUpdating}
                      className="w-1/2"
                    />
                  ) : (
                    <Button type="submit" className="w-1/2">
                      Save Changes
                    </Button>
                  )}
                  {isDeleting ? (
                    <ButtonWithSpinner
                      disabled={isDeleting}
                      className="w-1/2"
                      variant="destructive"
                    />
                  ) : (
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-1/2"
                      onClick={handleDelete}
                    >
                      Delete Project
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          )}
      </div>
    </div>
  );
}
