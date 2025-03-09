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

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useLogin } from "./useLogin";

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
  const { login, isPending, isError } = useLogin();
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
    <div className="space-y-6">
      <div className="w-full max-w-md">
        <div className="space-y-2 text-center ">
          <img
            src="/assets/Soutenancia.png"
            alt="Logo"
            width={250}
            className="mx-auto "
          />
          <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to login to your account
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      Invalid email or password. Please try again.
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
            <Button type="submit" className="w-full" disabled={isPending}>
              <Loader2 className="animate-spin" />
              Loggin in ...
            </Button>
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
