import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { X, Check, Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStudentSkills } from "../features/team-offers/useStudentSkills";

import SectionTitle from "../components/SectionTitle";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { Slider } from "@/components/ui/slider";
import { useCurrentLeaderTeamOffer } from "../features/team-offers/useCurrentLeaderTeamOffer";
import { useEditCurrentLeaderTeamOffer } from "../features/team-offers/useEditCurrentLeaderTeamOffer";
import toast from "react-hot-toast";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";
import { useDeleteCurrentLeaderTeamOffer } from "../features/team-offers/useDeleteCurrentLeaderTeamOffer";
import Spinner from "@/components/commun/Spinner";

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Project title is required and must be at least 3 characters .",
    })
    .max(10, { message: "Project title must be less than 10 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(1000, {
      message: "Description must be less than 1000 characters.",
    }),
  generalSkills: z
    .array(z.string())
    .min(1, { message: "General skills are required." }),
  maxMembers: z
    .array(z.number())
    .min(1, { message: "Members must be between 2 and 7" })
    .refine((val) => val[0] >= 2 && val[0] <= 7, {
      message: "Members must be between 2 and 7",
    }),
  customSkills: z.array(z.string()).optional(),
});

function EditTeamOffer() {
  const { studentSkills, isLoading: isGettingStudentSkills } =
    useStudentSkills();
  const [customSkillInput, setCustomSkillInput] = useState("");
  const { dataTeamOffer, isLoadingCurrentLeaderTeamOffer, isError } =
    useCurrentLeaderTeamOffer();

  const { editTeamOffer, isEditing } = useEditCurrentLeaderTeamOffer();
  const { deleteTeamOffer, isDeleting } = useDeleteCurrentLeaderTeamOffer();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      generalSkills: [],
      maxMembers: [2],
      customSkills: [],
    },
  });
  useEffect(() => {
    if (dataTeamOffer && !isLoadingCurrentLeaderTeamOffer) {
      form.reset({
        title: dataTeamOffer.title || "",
        description: dataTeamOffer.description || "",
        generalSkills:
          dataTeamOffer.general_required_skills?.map((skill) => skill.name) ||
          [],
        maxMembers: [dataTeamOffer.max_members || 2],
        customSkills: dataTeamOffer.specific_required_skills || [],
      });
    }
  }, [dataTeamOffer, isLoadingCurrentLeaderTeamOffer, form]);
  const currentValue = form.watch("maxMembers")[0];

  function onSubmit(data) {
    const updatedDataOnly = {};

    if (data.title !== dataTeamOffer.title) {
      updatedDataOnly.title = data.title;
    }

    if (data.description !== dataTeamOffer.description) {
      updatedDataOnly.description = data.description;
    }

    if (data.maxMembers[0] !== dataTeamOffer.max_members) {
      updatedDataOnly.max_members = data.maxMembers[0];
    }

    const originalSkillNames =
      dataTeamOffer.general_required_skills?.map((skill) => skill.name) || [];

    const skillsChanged =
      data.generalSkills.length !== originalSkillNames.length ||
      !data.generalSkills.every((skill) => originalSkillNames.includes(skill));

    if (skillsChanged) {
      updatedDataOnly.general_required_skills = data.generalSkills;
    }

    const customSkillsChanged =
      data.customSkills.length !==
        (dataTeamOffer.specific_required_skills?.length || 0) ||
      !data.customSkills.every((skill) =>
        dataTeamOffer.specific_required_skills?.includes(skill)
      );

    if (customSkillsChanged) {
      updatedDataOnly.specific_required_skills = data.customSkills;
    }

    const hasChanges = Object.keys(updatedDataOnly).length > 0;

    if (hasChanges) {
      editTeamOffer({ id: dataTeamOffer.id, data: updatedDataOnly });
    } else {
      toast.error("No changes detected.");
    }
  }

  if (isLoadingCurrentLeaderTeamOffer) return <Spinner />;

  if (isError)
    return (
      <p className="text-red-500">
        Failed to get your team offer . Please try again later.
      </p>
    );

  return (
    <div className="min-h-[80vh] flex justify-center p-4">
      <div className="bg-white px-6 pt-6 lg:px-12 lg:pt-12 pb-6 rounded-xl shadow-lg w-full md:max-w-2xl space-y-6">
        <SectionTitle
          title="Edit Team Offer"
          subtitle="Want to edit or delete your team offer? You can do it here."
        />

        {!isLoadingCurrentLeaderTeamOffer && !isError && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Team Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Description
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Put All informations Related To The team"
                        {...field}
                        className="w-full p-2 border rounded-md min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="generalSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary text-base">
                      Select Skills
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
                              ? `${field.value.length} skill${
                                  field.value.length > 1 ? "s" : ""
                                } selected`
                              : "Select skills"}
                            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              {field.value.length}
                            </span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        {isGettingStudentSkills ? (
                          <InlineSpinner />
                        ) : (
                          <Command>
                            <CommandInput placeholder="Search skills..." />
                            <CommandList>
                              <CommandEmpty>No skills found.</CommandEmpty>
                              <CommandGroup>
                                {studentSkills?.map((skill) => {
                                  const isSelected = field.value.includes(
                                    skill.name
                                  );
                                  return (
                                    <CommandItem
                                      key={skill.id}
                                      onSelect={() => {
                                        if (isSelected) {
                                          field.onChange(
                                            field.value.filter(
                                              (value) => value !== skill.name
                                            )
                                          );
                                        } else {
                                          field.onChange([
                                            ...field.value,
                                            skill.name,
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
                                      <span>{skill.name}</span>
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        )}
                      </PopoverContent>
                    </Popover>
                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {field.value.map((skillValue) => {
                          const skill = studentSkills?.find(
                            (s) => s.name === skillValue
                          );
                          return (
                            <Badge
                              key={skillValue}
                              className="flex items-center gap-1 px-3 py-1"
                            >
                              {skillValue}
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(
                                    field.value.filter(
                                      (value) => value !== skillValue
                                    )
                                  );
                                }}
                                className="rounded-full p-0.5"
                              >
                                <X className="h-3 w-3 " />
                                <span className="sr-only ">
                                  Remove {skill?.name || skillValue}
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
                name="customSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">
                      Add Custom Skills
                    </FormLabel>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter a custom skill"
                        value={customSkillInput}
                        onChange={(e) => setCustomSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const trimmedValue = customSkillInput.trim();
                            if (
                              trimmedValue &&
                              !field.value.includes(trimmedValue)
                            ) {
                              field.onChange([...field.value, trimmedValue]);
                              setCustomSkillInput("");
                            }
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => {
                          const trimmedValue = customSkillInput.trim();
                          if (
                            trimmedValue &&
                            !field.value.includes(trimmedValue)
                          ) {
                            field.onChange([...field.value, trimmedValue]);
                            setCustomSkillInput("");
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
                        {field.value.map((skill, index) => (
                          <Badge
                            key={index}
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((s) => s !== skill)
                                );
                              }}
                              className="rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {skill}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4 w-full">
                <FormField
                  control={form.control}
                  name="maxMembers"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-base text-primary">
                        Select the team size
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={2}
                          max={7}
                          step={1}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription>
                        Move the slider to select a value between 2 and 6
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  {currentValue}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center  items-start gap-2">
                {isEditing ? (
                  <ButtonWithSpinner disabled={isEditing} className="w-1/2" />
                ) : (
                  <Button type="submit" className="w-1/2">
                    Edit Team Offer
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
                    className="w-1/2 "
                    onClick={() => deleteTeamOffer(dataTeamOffer.id)}
                  >
                    Delete Team Offer
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
export default EditTeamOffer;
