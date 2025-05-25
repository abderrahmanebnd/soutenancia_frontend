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

export function AssignmentModeForm({ 
  open,
  onClose,
  initialData = { year: 1, assignmentType: '' }, 
  onSubmit,
  isLoading
}) {
  const formSchema = z.object({
    year: z.number().min(1).max(5),
    assignmentType: z.string().min(2, "Type must be at least 2 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="bg-primary px-4 py-6 rounded-md mt-3">
          <DialogTitle className="text-primary-foreground">
            {initialData.id ? "Edit Assignment Mode" : "Add New Assignment Mode"}
          </DialogTitle>
          <DialogDescription className="text-section">
            {initialData.id
              ? "Update the assignment mode details below"
              : "Fill in the form below to add a new assignment mode"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {[1, 2, 3, 4, 5].map((year) => (
                        <option key={year} value={year}>
                          Year {year}
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
              name="assignmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignment Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter assignment type" {...field} />
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
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              {isLoading ? (
                <ButtonWithSpinner className="flex-1" />
              ) : (
                <Button type="submit" className="flex-1">
                  {initialData.id ? "Update Mode" : "Add Mode"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}