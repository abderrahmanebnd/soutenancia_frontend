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

export function SkillsForm({ 
  open,
  onClose,
  initialData = { skill: '', technology: '' }, 
  onSubmit,
  isLoading 
}) {
  const formSchema = z.object({
    skill: z.string().min(2, "Skill must be at least 2 characters"),
    technology: z.string().min(2, "Technology must be at least 2 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = (values) => {
    // Combine skill and technology into the format "skill(technology)"
    const combinedValue = `${values.skill}(${values.technology})`;
    onSubmit({ name: combinedValue });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="bg-primary px-4 py-6 rounded-md mt-3">
          <DialogTitle className="text-primary-foreground">
            {initialData.id ? "Edit Skill" : "Add New Skill"}
          </DialogTitle>
          <DialogDescription className="text-section">
            {initialData.id
              ? "Update the skill details below"
              : "Fill in the form below to add a new skill"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend, Backend" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="technology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technology</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React, Node.js" {...field} />
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
                  {initialData.id ? "Update Skill" : "Add Skill"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}