import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsUpDown, CirclePlus, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { useSpecialities } from "@/features/specialities/useSpecialities";
import InlineSpinner from "@/components/commun/InlineSpinner";
import { toast } from "react-hot-toast";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

export function AddUser({ role, editingUser, onSuccess, createUser, updateUser, isUpdating }) {
  const [open, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { specialities, isGettingSpecialities, isErrorGettingSpecialities } =
    useSpecialities();

  const passwordValidation = editingUser
    ? z.string()
        .min(8, "Password must be at least 8 characters (if changing)")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter (if changing)")
        .optional()
        .or(z.literal(''))
    : z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter");

  const baseSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: passwordValidation
  });

  const formSchema =
    role === "student"
      ? baseSchema.extend({
          enrollmentNumber: editingUser 
            ? z.string().optional()
            : z.string().length(12, "Enrollment number must be 12 characters"),
          speciality: z.string().min(1, "Please select a speciality"),
        })
      : baseSchema.extend({
          department: z.string().min(1, "Please enter the department"),
          title: z.string().min(1, "Please enter the title"),
        });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (editingUser) {
      form.reset({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        email: editingUser.email,
        password: "",
        ...(role === "student" ? {
          enrollmentNumber: editingUser.Student?.enrollmentNumber || "",
          speciality: editingUser.Student?.specialityId || "",
        } : {
          department: editingUser.Teacher?.department || "",
          title: editingUser.Teacher?.title || "",
        })
      });
      setIsOpen(true);
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        ...(role === "student" ? {
          enrollmentNumber: "",
          speciality: "",
        } : {
          department: "",
          title: "",
        })
      });
    }
  }, [editingUser, form, role]);

  const onSubmit = async (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: role,
      ...(data.password && { password: data.password }),
      ...(editingUser && { id: editingUser.id }),
    };

    if (role === "student") {
      if (data.enrollmentNumber) {
        userData.enrollmentNumber = data.enrollmentNumber;
      }
      userData.specialityId = data.speciality;
    } else {
      userData.department = data.department;
      userData.title = data.title;
    }

    try {
      if (editingUser) {
        await updateUser(userData);
        toast.success(`${role} updated successfully`);
      } else {
        await createUser(userData);
        toast.success(`${role} created successfully`);
      }
      
      form.reset();
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 
        `Failed to ${editingUser ? 'update' : 'create'} ${role}`);
      console.error("Operation error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setIsOpen(isOpen);
      if (!isOpen) {
        form.reset();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="capitalize">
          { `Add ${role}`} 
          <CirclePlus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="bg-primary px-4 py-6 rounded-md mt-3">
          <DialogTitle className="text-primary-foreground capitalize">
            {editingUser ? `Edit ${role}` : `Add new ${role}`}
          </DialogTitle>
          <DialogDescription className="text-section">
            {editingUser
              ? `Update the ${role} details below`
              : `Fill in the form below to add a new ${role}`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {editingUser ? "New Password (leave blank to keep current)" : "Password"}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={editingUser ? "Leave blank to keep current password" : "••••••••"}
                        {...field}
                        value={field.value || ""}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {role === "student"  && (
              <FormField
                control={form.control}
                name="enrollmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollment Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {role === "student" ? (
              <FormField
                control={form.control}
                name="speciality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speciality</FormLabel>
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
                            {field.value
                              ? specialities?.find(s => s.id === field.value)?.name
                              : "Select speciality"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          {isGettingSpecialities && <InlineSpinner />}
                          {isErrorGettingSpecialities && (
                            <div className="p-4 text-red-500">
                              Error loading specialities
                            </div>
                          )}
                          {!isGettingSpecialities && !isErrorGettingSpecialities && (
                            <>
                              <CommandInput placeholder="Search speciality..." />
                              <CommandList>
                                <CommandEmpty>No speciality found</CommandEmpty>
                                <CommandGroup>
                                  {specialities?.map((speciality) => (
                                    <CommandItem
                                      key={speciality.id}
                                      value={speciality.id}
                                      onSelect={() => form.setValue("speciality", speciality.id)}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          speciality.id === field.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {speciality.name} ({speciality.year} year)
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </>
                          )}
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              {isUpdating ? (
                <ButtonWithSpinner className="flex-1" />
              ) : (
                <Button type="submit" className="flex-1">
                  {editingUser ? "Save Changes" : "Create"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}