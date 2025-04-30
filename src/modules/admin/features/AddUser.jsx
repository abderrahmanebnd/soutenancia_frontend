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
import { useSignup } from "@/features/auth/useSignup";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

export function AddUser({ role }) {
  const [open, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { specialities, isGettingSpecialities, isErrorGettingSpecialities } =
    useSpecialities();
  const { signup, isAddingUser, isSuccessSignup } = useSignup();

  const baseSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
  });

  const formSchema =
    role === "student"
      ? baseSchema.extend({
          enrollmentNumber: z
            .string()
            .length(12, { message: "Enrollment number must be 12 characters" }),
          speciality: z.string({
            required_error: "Please select a speciality",
          }),
        })
      : baseSchema.extend({
          departement: z.string().min(1, "Please enter the teacher department"),
          title: z.string().min(1, "Please enter the teacher title"),
        });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      enrollmentNumber: "",
      speciality: "",
      departement: "",
      title: "",
    },
  });
  useEffect(() => {
    if (isSuccessSignup) {
      form.reset();
      setIsOpen(false);
    }
  }, [isSuccessSignup, form]);
  function onSubmit(data) {
    const userData = {
      ...data,
      role: role,
    };

    signup(userData);
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="capitalize">
          Add {role} <CirclePlus />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" closeButton={true}>
        <DialogHeader className="bg-primary px-4 py-6 rounded-md mt-3">
          <DialogTitle className="text-primary-foreground capitalize">
            add new {role}
          </DialogTitle>
          <DialogDescription className="text-section">
            Fill in the form below to add a new {role} to the system
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
                      <Input placeholder="first name" {...field} />
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
                      <Input placeholder="last name" {...field} />
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
                    <Input
                      type="email"
                      placeholder={`${role}@esi-sba.dz`}
                      {...field}
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {role === "student" && (
              <>
                <FormField
                  control={form.control}
                  name="enrollmentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enrollment Number</FormLabel>
                      <FormControl>
                        <Input placeholder="202238212345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                                ? specialities?.find(
                                    (speciality) =>
                                      speciality.id === field.value
                                  )?.name
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
                                Error getting specialities
                              </div>
                            )}
                            {!isGettingSpecialities &&
                              !isErrorGettingSpecialities && (
                                <>
                                  <CommandInput placeholder="Search speciality..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No speciality found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {specialities?.map((speciality) => (
                                        <CommandItem
                                          key={speciality.id}
                                          value={speciality.id}
                                          onSelect={() => {
                                            form.setValue(
                                              "speciality",
                                              speciality.id
                                            );
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              speciality.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {speciality.name}
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
              </>
            )}
            {role === "teacher" && (
              <>
                <FormField
                  control={form.control}
                  name="departement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Department" {...field} />
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
                        <Input placeholder="Title" {...field} />
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
                className=" flex-1"
                onClick={() => setIsOpen(false)}
              >
                &larr; back
              </Button>
              {isAddingUser ? (
                <ButtonWithSpinner disabled={isAddingUser} className="flex-1" />
              ) : (
                <Button type="submit" className="flex-1">
                  Add {role}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
