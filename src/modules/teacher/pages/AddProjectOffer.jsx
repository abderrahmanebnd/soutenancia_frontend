import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UploadCloud } from "lucide-react";
import { FileUpload } from "@/components/commun/FileUpload";

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
  destinatedFor: z.string().min(1, { message: "Target audience is required." }),
  teamSize: z
    .array(z.number())
    .length(1, { message: "Team size must be specified." })
    .refine((val) => val[0] >= 2 && val[0] <= 7, {
      message: "Team size must be between 2 and 7",
    }),
  assignMode: z.string().min(1, { message: "Assignment mode is required." }),
  projectSummary: z
    .string()
    .min(10, { message: "Project summary must be at least 10 characters." }),
  projectAttachments: z.array(z.any()).optional(),
  generalSkills: z.array(z.string()).optional(),
  selectedFramers: z.array(z.string()).optional(),
});

const teacherOptions = ["Teacher A", "Teacher B", "Teacher C"];
const destinationOptions = ["Speciality A", "Speciality B", "Speciality C"];

export default function SubmitProjectOffer() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      usedTechnologies: ["Java", "React", "Express"],
      usedTools: ["VS Code", "Figma", "Linear"],
      destinatedFor: "",
      teamSize: [1],
      assignMode: "Auto-Selection",
      projectSummary: "",
      projectAttachments: [],
      selectedFramers: [],
    },
  });

  const [techInput, setTechInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const currentTeamSize = form.watch("teamSize")[0];
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(data) {
    setIsSubmitting(true);
    console.log("Form submitted:", data);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Form submitted successfully!");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl">
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
              {/* Rest of your form fields remain exactly the same */}
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

              {/* ... All other form fields remain unchanged ... */}
              
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
                              {teacherOptions.map((teacher) => {
                                const isSelected = field.value.includes(teacher);
                                return (
                                  <CommandItem
                                    key={teacher}
                                    onSelect={() => {
                                      if (isSelected) {
                                        field.onChange(
                                          field.value.filter((value) => value !== teacher)
                                        );
                                      } else {
                                        field.onChange([...field.value, teacher]);
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
                                    <span>{teacher}</span>
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
                        {field.value.map((teacher) => (
                          <Badge
                            key={teacher}
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            {teacher}
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((value) => value !== teacher)
                                );
                              }}
                              className="rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {teacher}</span>
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
                name="destinatedFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">Destination For</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value || "Select Specialities"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start" sideOffset={4}>
                        <Command>
                          <CommandInput placeholder="Search destination..." />
                          <CommandList>
                            <CommandEmpty>No destinations found.</CommandEmpty>
                            <CommandGroup>
                              {destinationOptions.map((option) => (
                                <CommandItem
                                  key={option}
                                  onSelect={() => field.onChange(option)}
                                >
                                  <span>{option}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                            if (trimmedValue && !field.value.includes(trimmedValue)) {
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
                          if (trimmedValue && !field.value.includes(trimmedValue)) {
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
                                field.onChange(field.value.filter((s) => s !== item));
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
                            if (trimmedValue && !field.value.includes(trimmedValue)) {
                              field.onChange([...field.value, trimmedValue]);
                              setToolInput("");
                          }
                        }}}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => {
                          const trimmedValue = toolInput.trim();
                          if (trimmedValue && !field.value.includes(trimmedValue)) {
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
                                field.onChange(field.value.filter((s) => s !== item));
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
                name="assignMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-primary">Assign Mode</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value || "Select assign mode"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandList>
                            <CommandEmpty>No modes found.</CommandEmpty>
                            <CommandGroup>
                              {["Auto-Selection", "Teacher Approval"].map((mode) => (
                                <CommandItem
                                  key={mode}
                                  onSelect={() => field.onChange(mode)}
                                >
                                  <span>{mode}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                          max={7}
                          step={9}
                          onValueChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        {currentTeamSize}
                      </div>
                    </div>
                    <FormDescription>
                      Select the number of teams  (1-9)
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
                  <FormLabel className="text-base text-primary">Project Summary</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Describe the project in detail"
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
                  <FormLabel className="text-base text-primary">Project Attachment :</FormLabel>
                  <FormDescription>
                    Project Specifications Book, Work Plan, Work Schedule And Every Thing Related To The Project
                  </FormDescription>
                  <FormControl>
                    <FileUpload field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center mt-8">
              {isSubmitting ? (
                <ButtonWithSpinner disabled={isSubmitting} />
              ) : (
                <Button
                  type="submit"
                  variant="outline" 
                  className="flex items-center px-6 py-3 space-x-2 border border-blue-500 text-blue-600 text-lg font-semibold hover:bg-blue-100"
                >
                  Submit Offer
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