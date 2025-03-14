import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, X, Check } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useStudentSkills } from "./useStudentSkills";

import InlineSpinner from "@/components/commun/InlineSpinner";
import { useAddStudentSkills } from "./useAddStudentSkills";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

const formSchema = z
  .object({
    generalSkills: z.array(z.string()).min(1, {
      message: "Please select at least one skill",
    }),
    customSkill: z.array(z.string()),
  })
  .refine(
    (data) =>
      !data.generalSkills.some((skill) => data.customSkill.includes(skill)),
    {
      message:
        "You have duplicate skills in both selected and custom skills. Please remove the one from custom skills.",
      path: ["customSkill"],
    }
  );

export function StudentSkillsModal() {
  const { currentUser } = useAuth();
  const { studentSkills, isLoading } = useStudentSkills();
  const { addSkills, isAddingSkills } = useAddStudentSkills();
  const currentStudentId = currentUser?.user.Student.id;
  const [customSkillInput, setCustomSkillInput] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      generalSkills: [],
      customSkill: [],
    },
  });

  function onSubmit(formData) {
    const skillsWithStudentId = {
      studentId: currentStudentId,
      ...formData,
    };
    addSkills(skillsWithStudentId);
  }

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-[400px] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg">
            Skills Selection
          </DialogTitle>
          <DialogDescription>
            Tell us about your skills. You can select from the list or add your
            own custom skills.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <InlineSpinner />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="customSkill"
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
                        className="bg-primary/10 "
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
                              className="rounded-full  p-0.5"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {skill}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                {isAddingSkills ? (
                  <ButtonWithSpinner disabled={isAddingSkills} />
                ) : (
                  <Button type="submit" className="w-full">
                    Add Skills
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
