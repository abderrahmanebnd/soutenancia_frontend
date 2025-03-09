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
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
function ForgotPasswordForm() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(formData) {
    console.log(formData);
    navigate("/confirmation-code");
    // TODO: when endpoint for api is ready
    // login(formData);
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
            Enter your email address to receive a 6 digit-code
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

          <Button type="submit" className="w-full">
            Get a 6-digit code
          </Button>

          {/* 
          TODO: when endpoint for api is ready
          <Button type="submit" className="w-full">
            {isLoading
              ? `Submit`
              : (<Loader2 className="animate-spin" />)`Please wait...`}
          </Button> */}
        </form>
      </Form>
    </div>
  );
}

export default ForgotPasswordForm;
