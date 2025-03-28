
import { useState} from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Upload, X, Check, Plus } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStudentSkills } from "../features/useStudentSkills";
import { useaddTeamOffer } from "../features/useAddTeamOffer";
import { useAuth } from "@/context/AuthContext";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

const formSchema = z.object({
  title: z.string().min(1, { message: "Project title is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  general_required_skills: z.array(z.string()).min(1, { message: "Required skills are required." }),
  max_members: z.string().min(1, { message: "Team size is required." }),
  specific_required_skills: z.array(z.string()).optional(),
});

function RequiredSkillsField({ control, skills, className }) {
  return (
    <FormField
      control={control}
      name="general_required_skills"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base text-primary">
            Required Skills
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
              <Command>
                <CommandInput placeholder="Search skills..." />
                <CommandList>
                  <CommandEmpty>No skills found.</CommandEmpty>
                  <CommandGroup>
                    {skills?.map((skill) => {
                      const isSelected = field.value.includes(skill.name);
                      return (
                        <CommandItem
                          key={skill.id}
                          onSelect={() => {
                            if (isSelected) {
                              field.onChange(
                                field.value.filter((value) => value !== skill.name)
                              );
                            } else {
                              field.onChange([...field.value, skill.name]);
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
            </PopoverContent>
          </Popover>
          {field.value.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {field.value.map((skillValue) => (
                <Badge
                  key={skillValue}
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {skillValue}
                  <button
                    type="button"
                    onClick={() => {
                      field.onChange(
                        field.value.filter((value) => value !== skillValue)
                      );
                    }}
                    className="rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {skillValue}</span>
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function SubmitOffer() {
  const { studentSkills, isLoading } = useStudentSkills();
  const { addTeamOffer, isAdding } = useaddTeamOffer();
  const [customSkillInput, setCustomSkillInput] = useState("");
  const { currentUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      general_required_skills: [],
      max_members: "",
      specific_required_skills: [],
    },
  });

  function onSubmit(data) {
    const payload = {
      leader_id: currentUser.user.Student.id,
      title: data.title,
      max_members: parseInt(data.max_members, 10),
      description: data.description,
      general_required_skills: data.general_required_skills,
      specific_required_skills: data.specific_required_skills || [],
    };

    addTeamOffer(payload)
      .then(() => {
        toast.success("Team offer submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting team offer:", error);
        toast.error(error.message || "Failed to submit team offer.");
      });
  }

  if (currentUser?.user?.Student?.isLeader) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
        <p>You have already posted your offer.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-primary">Add Team Offer</h1>
        <p className="text-gray-600 text-center mb-8">Tell Us About Your Project Details</p>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary">Project Title</FormLabel>
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
                  <FormLabel className="text-base text-primary">Description</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Put All informations Related To The Project"
                      {...field}
                      className="w-full p-2 border rounded-md min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading ? (
              <ButtonWithSpinner  disabled={isAdding} />
            ) : (
              <RequiredSkillsField
                control={form.control}
                skills={studentSkills}
              />
            )}

            <FormField
              control={form.control}
              name="specific_required_skills"
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

            <FormField
              control={form.control}
              name="max_members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary">Team Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter team size" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<div className="flex justify-between items-center mt-6">
  {isAdding ? (
    <ButtonWithSpinner disabled={isAdding} />
  ) : (
    <Button type="submit" className="w-full">
      Submit Offer
    </Button>
  )}
</div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
export default SubmitOffer;