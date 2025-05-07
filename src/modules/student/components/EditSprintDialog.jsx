import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useSingleSprintByProject } from "../features/sprints/useSingleSprintByProject";
import InlineSpinner from "@/components/commun/InlineSpinner";
import toast from "react-hot-toast";
import { format, parseISO } from "date-fns";
import { useEditSprintByProject } from "../features/sprints/useEditSprintByProject";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

const formSchema = z
  .object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    status: z.enum(["completed", "planned", "active"], {
      required_error: "Please select a status.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    startDate: z.date({
      required_error: "Start date is required.",
    }),
    endDate: z.date({
      required_error: "End date is required.",
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
function EditSprintDialog({ sprintId }) {
  const [open, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const projectId =
    currentUser?.user?.Student?.TeamOffer?.at(0)?.assignedProjectId;
  const { sprintData, isGettingSprint, isErrorGettingSprint } =
    useSingleSprintByProject(projectId, sprintId);

  const { editSprint, isEditingSprint, isSuccessEditSprint } =
    useEditSprintByProject(sprintId, projectId);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  useEffect(() => {
    if (sprintData) {
      form.reset({
        title: sprintData.title || "",
        description: sprintData.description || "",
        status: sprintData.status || "planned",
        startDate: sprintData.startDate ? parseISO(sprintData.startDate) : null,
        endDate: sprintData.endDate ? parseISO(sprintData.endDate) : null,
      });
    }
  }, [sprintData, form]);

  useEffect(() => {
    if (isSuccessEditSprint) {
      setIsOpen(false);
      form.reset();
    }
  }, [isSuccessEditSprint, form]);

  function onSubmit(data) {
    const updatedDataOnly = {};

    if (data.title !== sprintData.title) {
      updatedDataOnly.title = data.title;
    }
    if (data.description !== sprintData.description) {
      updatedDataOnly.description = data.description;
    }
    if (data.status !== sprintData.status) {
      updatedDataOnly.status = data.status;
    }

    const isoStart = data.startDate.toISOString();
    const isoEnd = data.endDate.toISOString();

    if (
      sprintData.startDate &&
      isoStart !== new Date(sprintData.startDate).toISOString()
    ) {
      updatedDataOnly.startDate = isoStart;
    }

    if (
      sprintData.endDate &&
      isoEnd !== new Date(sprintData.endDate).toISOString()
    ) {
      updatedDataOnly.endDate = isoEnd;
    }

    const hasChanges = Object.keys(updatedDataOnly).length > 0;

    if (hasChanges) {
      editSprint(updatedDataOnly);
    } else {
      toast.error("No changes detected.");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="capitalize p-2" variant="ghost">
          Edit <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" closeButton={true}>
        <DialogHeader className="bg-primary px-4 py-6 rounded-md mt-3">
          <DialogTitle className="text-primary-foreground capitalize">
            Edit sprint
          </DialogTitle>
          <DialogDescription className="text-section">
            Edit sprint informations
          </DialogDescription>
        </DialogHeader>
        {isGettingSprint && <InlineSpinner />}
        {isErrorGettingSprint && (
          <p className="text-red-500">Error getting sprint data</p>
        )}
        {!isGettingSprint && !isErrorGettingSprint && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-4 justify-between">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Sprint Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select task status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter sprint description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 justify-between">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select start date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select end date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {isEditingSprint ? (
                <ButtonWithSpinner />
              ) : (
                <Button type="submit" className="w-full">
                  Edit Sprint
                </Button>
              )}
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditSprintDialog;
