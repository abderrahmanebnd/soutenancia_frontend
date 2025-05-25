import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

export function DurationForm({ 
  open,
  onClose,
  initialData = { specialityId: '', startDate: '', endDate: '' }, 
  onSubmit,
  isLoading,
  specialities,
  title
}) {
  const formSchema = z.object({
    specialityId: z.string().min(1, "Speciality is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required")
      .refine((endDate) => {
        if (!form.getValues().startDate) return true;
        return new Date(endDate) > new Date(form.getValues().startDate);
      }, "End date must be after start date"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        startDate: initialData.startDate ? formatForDateTimeInput(initialData.startDate) : '',
        endDate: initialData.endDate ? formatForDateTimeInput(initialData.endDate) : ''
      };
      form.reset(formattedData);
    }
  }, [initialData, form]);

  function formatForDateTimeInput(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="bg-primary px-4 py-6 rounded-md mt-3">
          <DialogTitle className="text-primary-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-section">
            {title.startsWith("Edit") 
              ? "Update the duration details below"
              : "Fill in the form below to add a new duration"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="specialityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speciality</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a speciality</option>
                      {specialities.map((speciality) => (
                        <option key={speciality.id} value={speciality.id}>
                          {speciality.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="datetime-local" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="datetime-local" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              {isLoading ? (
                <ButtonWithSpinner className="flex-1" />
              ) : (
                <Button type="submit" className="flex-1">
                  {title.startsWith("Edit") ? "Update" : "Add"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}