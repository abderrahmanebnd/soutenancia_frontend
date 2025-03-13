import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setItem } from "@/utils/localStorage";
import { useForgotPassword } from "./useForgotPassword";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

function ForgotPasswordForm() {
  const { forgotPwd, isPending, isError } = useForgotPassword();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(formData) {
    setItem("email", formData.email);
    forgotPwd(formData);
  }

  return (
    <div className="space-y-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center ">
          <img
            src="/assets/Soutenancia.png"
            alt="Logo"
            width={250}
            className="mx-auto w-44 md:w-48 lg:w-60"
          />
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">
            Forgot Password
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email address to receive a 4 digit-code
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
                {isError && (
                  <p className="text-red-500 text-sm">
                    email not found . Please try another.
                  </p>
                )}
              </FormItem>
            )}
          />

          {isPending ? (
            <ButtonWithSpinner disabled={isPending} />
          ) : (
            <Button type="submit" className="w-full">
              Get a 4-digit code
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default ForgotPasswordForm;
