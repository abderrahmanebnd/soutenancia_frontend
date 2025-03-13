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
import { getItem } from "@/utils/localStorage";
import { useVerifyOtp } from "./useVerifyOtp";
import ButtonWithSpinner from "@/components/commun/ButtonWithSpinner";

const formSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});
function VerifyOtpForm() {
  const { verifyOtp, isPending, isError } = useVerifyOtp();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(formData) {
    const newFormData = {
      email: getItem("email"),
      otp: formData.otp,
    };
    verifyOtp(newFormData);
  }

  return (
    <div className="space-y-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center ">
          <img
            src="/assets/Soutenancia.png"
            alt="Logo"
            className="mx-auto w-44 md:w-48 lg:w-60"
          />
          <h1 className=" text-2xl lg:text-3xl font-bold text-primary">
            Confirmation Code
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the 4-digit code sent to your email address.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-center">
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email address.
                </FormDescription>
                <FormMessage />
                {isError && (
                  <p className="text-red-500 text-sm">
                    Invalid One time Password. Please try again.
                  </p>
                )}
              </FormItem>
            )}
          />

          {isPending ? (
            <ButtonWithSpinner disabled={isPending} />
          ) : (
            <Button type="submit" className="w-full">
              Submit The 4 digit-code
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default VerifyOtpForm;
