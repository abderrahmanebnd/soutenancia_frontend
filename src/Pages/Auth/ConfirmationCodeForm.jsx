import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
function ConfirmationCodeForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(formData) {
    console.log(formData);
    // TODO: when endpoint for api is ready
    // login(formData);
  }

  return (
    <div className="space-y-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center ">
          <img
            src="/assets/Soutenancia.png"
            alt="Logo"
            width={250}
            className="mx-auto "
          />
          <h1 className="text-3xl font-bold text-primary">Confirmation Code</h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-center">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit The 6 digit-code
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

export default ConfirmationCodeForm;
