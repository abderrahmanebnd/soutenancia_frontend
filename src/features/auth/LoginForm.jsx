import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { useLogin } from "./useLogin";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending, isError, error } = useLogin();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData) {
    login(formData);
  }
  return (
    <div className="space-y-4">
      <div className="w-full max-w-md">
        <div className=" space-y-2 text-center ">
          <img
            src="/assets/Soutenancia.png"
            alt="Logo"
            className="mx-auto w-44 md:w-48 lg:w-60 "
          />
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentials to login to your account
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
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
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>

                <div className="flex flex-col">
                  <FormMessage />

                  {isError && (
                    <p className="text-red-500 text-sm">
                      {error.response.status === 401
                        ? "Invalid email or password. Please try again."
                        : " An unexpected error occurred. Please try again later."}
                    </p>
                  )}
                </div>
                <Link
                  className="underline text-primary text-sm "
                  to="/forgot-password"
                >
                  Forgot Password ?
                </Link>
              </FormItem>
            )}
          />

          {isPending ? (
            <ButtonWithSpinner disabled={isPending} />
          ) : (
            <Button type="submit" className="w-full">
              Log In
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
