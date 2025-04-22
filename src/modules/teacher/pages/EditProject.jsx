import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useUpdateProject } from "../features/project-offers/useUpdateProject";
import { useDeleteProject } from "../features/project-offers/useDeleteProjectOffer";
import SectionTitle from "@/modules/student/components/SectionTitle";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";
import { useParams } from "react-router-dom";
import { useGetProject } from "../features/project-offers/useGetProject";

const formSchema = z.object({
  projectTitle: z.string().min(3, { message: "Project title must be at least 3 characters." }),
  projectSummary: z.string().min(10, { message: "Project summary must be at least 10 characters." }),
  usedTechnologies: z.array(z.string()).min(1, { message: "At least one technology is required." }),
  usedTools: z.array(z.string()).min(1, { message: "At least one tool is required." }),
  destinatedFor: z.array(z.string()).min(1, { message: "Target audience is required." }),
  teamNumbers: z.number().min(2, { message: "Number of teams must be at least 2." }).max(9, { message: "Number of teams must not exceed 9." }),
  assignMode: z.string().min(1, { message: "Assignment mode is required." }),
  projectAttachments: z.array(z.any()).optional(),
  selectedFramers: z.array(z.string()).optional(),
});

function EditProject() {
  const { id } = useParams();
  const { data: project } = useGetProject(id);
  const { updateProject, isUpdating } = useUpdateProject();
  const { deleteProject, isDeleting } = useDeleteProject();

  const [techInput, setTechInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [specialityInput, setSpecialityInput] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: project?.title || "",
      projectSummary: project?.description || "",
      usedTechnologies: project?.languages || [],
      usedTools: project?.tools || [],
      destinatedFor: project?.specialities || [],
      teamNumbers: project?.maxTeamsNumber || 2,
      assignMode: project?.assignmentType === "auto" ? "Auto-Selection" : "Teacher Approval",
      projectAttachments: project?.attachments || [],
      selectedFramers: project?.framers || [],
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        projectTitle: project.title,
        projectSummary: project.description,
        usedTechnologies: project.languages,
        usedTools: project.tools,
        destinatedFor: project.specialities,
        teamNumbers: project.maxTeamsNumber,
        assignMode: project.assignmentType === "auto" ? "Auto-Selection" : "Teacher Approval",
        projectAttachments: project.attachments,
        selectedFramers: project.framers,
      });
    }
  }, [project, form]);

  const onSubmit = (data) => {
    const updatedData = {
      title: data.projectTitle,
      description: data.projectSummary,
      tools: data.usedTools,
      languages: data.usedTechnologies,
      maxTeamsNumber: data.teamNumbers,
      assignmentType: data.assignMode === "Auto-Selection" ? "auto" : "teacherApproval",
      specialities: data.destinatedFor,
      attachments: data.projectAttachments,
      framers: data.selectedFramers,
    };
    updateProject({ id, data: updatedData });
  };

  return (
    <div className="min-h-[80vh] flex justify-center p-4">
      <div className="bg-white px-6 pt-6 lg:px-12 lg:pt-12 pb-6 rounded-xl shadow-lg w-full md:max-w-2xl space-y-6">
        <SectionTitle title="Edit Project" subtitle="Modify or delete your project offer here." />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-base text-primary">Project Title</label>
            <Input {...form.register("projectTitle")} placeholder="Enter project title" />
            <p className="text-red-500">{form.formState.errors.projectTitle?.message}</p>
          </div>
          <div>
            <label className="block text-base text-primary">Project Summary</label>
            <textarea
              {...form.register("projectSummary")}
              placeholder="Enter project summary"
              className="w-full p-2 border rounded-md min-h-[100px]"
            />
            <p className="text-red-500">{form.formState.errors.projectSummary?.message}</p>
          </div>
          <div>
            <label className="block text-base text-primary">Used Technologies</label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a technology"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const trimmedValue = techInput.trim();
                    if (trimmedValue && !form.getValues("usedTechnologies").includes(trimmedValue)) {
                      form.setValue("usedTechnologies", [...form.getValues("usedTechnologies"), trimmedValue]);
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
                  if (trimmedValue && !form.getValues("usedTechnologies").includes(trimmedValue)) {
                    form.setValue("usedTechnologies", [...form.getValues("usedTechnologies"), trimmedValue]);
                    setTechInput("");
                  }
                }}
                variant="outline"
                className="bg-primary/10"
              >
                <Plus className="h-4 w-4 text-primary" />
              </Button>
            </div>
            {form.getValues("usedTechnologies").length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.getValues("usedTechnologies").map((technology, index) => (
                  <Badge key={index} className="flex items-center gap-1 px-3 py-1">
                    {technology}
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue(
                          "usedTechnologies",
                          form.getValues("usedTechnologies").filter((t) => t !== technology)
                        );
                      }}
                      className="rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {technology}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-red-500">{form.formState.errors.usedTechnologies?.message}</p>
          </div>
          <div>
            <label className="block text-base text-primary">Used Tools</label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a tool"
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const trimmedValue = toolInput.trim();
                    if (trimmedValue && !form.getValues("usedTools").includes(trimmedValue)) {
                      form.setValue("usedTools", [...form.getValues("usedTools"), trimmedValue]);
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
                  if (trimmedValue && !form.getValues("usedTools").includes(trimmedValue)) {
                    form.setValue("usedTools", [...form.getValues("usedTools"), trimmedValue]);
                    setToolInput("");
                  }
                }}
                variant="outline"
                className="bg-primary/10"
              >
                <Plus className="h-4 w-4 text-primary" />
              </Button>
            </div>
            {form.getValues("usedTools").length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.getValues("usedTools").map((tool, index) => (
                  <Badge key={index} className="flex items-center gap-1 px-3 py-1">
                    {tool}
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue(
                          "usedTools",
                          form.getValues("usedTools").filter((t) => t !== tool)
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
            <p className="text-red-500">{form.formState.errors.usedTools?.message}</p>
          </div>
          <div>
            <label className="block text-base text-primary">Destinated For</label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a speciality"
                value={specialityInput}
                onChange={(e) => setSpecialityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const trimmedValue = specialityInput.trim();
                    if (trimmedValue && !form.getValues("destinatedFor").includes(trimmedValue)) {
                      form.setValue("destinatedFor", [...form.getValues("destinatedFor"), trimmedValue]);
                      setSpecialityInput("");
                    }
                  }
                }}
                className="flex-1"
              />
              <Button
                type="button"
                size="icon"
                onClick={() => {
                  const trimmedValue = specialityInput.trim();
                  if (trimmedValue && !form.getValues("destinatedFor").includes(trimmedValue)) {
                    form.setValue("destinatedFor", [...form.getValues("destinatedFor"), trimmedValue]);
                    setSpecialityInput("");
                  }
                }}
                variant="outline"
                className="bg-primary/10"
              >
                <Plus className="h-4 w-4 text-primary" />
              </Button>
            </div>
            {form.getValues("destinatedFor").length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.getValues("destinatedFor").map((speciality, index) => (
                  <Badge key={index} className="flex items-center gap-1 px-3 py-1">
                    {speciality}
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue(
                          "destinatedFor",
                          form.getValues("destinatedFor").filter((s) => s !== speciality)
                        );
                      }}
                      className="rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {speciality}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-red-500">{form.formState.errors.destinatedFor?.message}</p>
          </div>
          <div>
            <label className="block text-base text-primary">Team Numbers</label>
            <Slider
              min={2}
              max={9}
              step={1}
              value={[form.watch("teamNumbers")]}
              onValueChange={(value) => form.setValue("teamNumbers", value[0])}
            />
            <p className="text-red-500">{form.formState.errors.teamNumbers?.message}</p>
          </div>
          <div>
            <label className="block text-base text-primary">Assign Mode</label>
            <Input {...form.register("assignMode")} placeholder="Enter assignment mode" />
            <p className="text-red-500">{form.formState.errors.assignMode?.message}</p>
          </div>
          <div>
            <label className="block text-base text-primary">Project Attachments</label>
            <Input {...form.register("projectAttachments")} placeholder="Enter project attachments" />
            <p className="text-red-500">{form.formState.errors.projectAttachments?.message}</p>
          </div>
          <div>
            <label className="block text-base text-primary">Selected Framers</label>
            <Input {...form.register("selectedFramers")} placeholder="Enter selected framers" />
            <p className="text-red-500">{form.formState.errors.selectedFramers?.message}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2">
            {isUpdating ? (
              <ButtonWithSpinner disabled={isUpdating} className="w-1/2" />
            ) : (
              <Button type="submit" className="w-1/2">
                Save Changes
              </Button>
            )}
            {isDeleting ? (
              <ButtonWithSpinner disabled={isDeleting} className="w-1/2" variant="destructive" />
            ) : (
              <Button
                type="button"
                variant="destructive"
                className="w-1/2"
                onClick={() => deleteProject(id)}
              >
                Delete Project
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
