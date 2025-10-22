"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { cn } from "@/lib/utils";
import {
  useVerifyPasswordResetOtpMutation,
  useVerifyPhoneNumberMutation,
} from "@/store/api/auth/auth-api";
import { useRouter } from "@/components/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";

export const verificationTypes = {
  verifyIdentifier: "/dashboard/dashboard",
  verifyPasswordReset: "/auth/set-new-password",
} as const;

export type TOtpVerificationType = keyof typeof verificationTypes;

type TFormValues = {
  pin: string;
};

const formSchema = Yup.object().shape({
  pin: Yup.string()
    .length(4, "Your one-time password must be 4 characters.")
    .required("Your one-time password is required."),
});

function OtpVerification() {
  const [verifyPhoneNumber] = useVerifyPhoneNumberMutation();
  const [verifyPasswordResetOtp] = useVerifyPasswordResetOtpMutation();
  const { getAParamValue } = useManageSearchParams<{
    phone: string;
    email: string;
    type: TOtpVerificationType;
  }>();

  // const [isOtpFormFocus, setIsOtpFormFocus] = useState(false);
  const {
    state: isOtpFormFocus,
    setOpen: setIsOtpFormFocused,
    setClose: setIsOtpFormBlur,
  } = useBooleanState({
    defaultValue: false,
  });
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: TFormValues) {
    const otpType = getAParamValue("type");

    switch (otpType) {
      case "verifyIdentifier":
        {
          const toastId = toast({
            variant: "loading",
            title: "Verifying OTP",
            description: "Please wait while we verify otp.",
          });

          try {
            const verifyPhoneNumberRes = await verifyPhoneNumber({
              otp: data.pin,
              phone: getAParamValue("phone") || "",
            }).unwrap();

            const loginData = verifyPhoneNumberRes?.data;
            if (loginData?.user?.type !== "ADMIN") {
              toastId.update({
                id: toastId.id,
                variant: "error",
                title: "Access Denied",
                description:
                  "You have been verified, but you do not have permission to access the admin panel.",
              });
              return;
            }

            toastId.update({
              id: toastId.id,
              variant: "success",
              title: "OTP Verified",
              description:
                "Your one-time password has been verified. Taking you to the next step.",
            });
            router.replace("/dashboard/dashboard");
          } catch (err) {
            toastId.update({
              id: toastId.id,
              variant: "error",
              ...getApiErrorMessages({
                error: err,
                title: "OTP Verification Failed",
                description:
                  "An error occurred while verifying your one-time password.",
              }),
            });
          }
        }
        break;

      case "verifyPasswordReset":
        {
          const toastId = toast({
            variant: "loading",
            title: "Verifying OTP To Reset Password",
            description: "Please wait while verifying otp.",
          });

          try {
            const verifyPasswordResetOtpRes = await verifyPasswordResetOtp({
              otp: data.pin,
              phone: getAParamValue("phone") || "",
            }).unwrap();

            toastId.update({
              id: toastId.id,
              variant: "success",
              title: "OTP Verified",
              description:
                "Your one-time password has been verified. Taking you to the login page. Please login again.",
            });

            const queryData: {
              token: string;
            } = {
              token: verifyPasswordResetOtpRes?.data?.token || "",
            };
            const { queryString } = generateQueryString(queryData);

            router.replace(
              `${verificationTypes.verifyPasswordReset}${queryString}`,
            );
          } catch (err) {
            toastId.update({
              id: toastId.id,
              variant: "error",
              ...getApiErrorMessages({
                error: err,
                title: "OTP Verification Failed",
                description:
                  "An error occurred while verifying your one-time password.",
              }),
            });
          }
        }
        break;

      default:
        break;
    }
  }

  const onPinChange = () => {
    const pin = form.getValues("pin");
    if (pin.length < 4) {
      return;
    }

    onSubmit({ pin });
  };

  const shouldInputOtpHighlighted = (index: number) => {
    const pin = form.getValues("pin") || "";
    if (!isOtpFormFocus) {
      return false;
    }
    return pin.length >= index;
  };

  return (
    <>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center"
          onChange={onPinChange}
          onFocus={setIsOtpFormFocused()}
          onBlur={setIsOtpFormBlur()}
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={4} {...field} className="text-xl">
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className={cn(
                          "z-10 h-20 w-20 border-slate-700 bg-background text-5xl",
                          {
                            "border-primary": shouldInputOtpHighlighted(0),
                            "border-destructive": form.formState.errors.pin,
                          },
                        )}
                      />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot
                        index={1}
                        className={cn(
                          "z-10 h-20 w-20 border-slate-700 bg-background text-5xl",
                          {
                            "border-primary": shouldInputOtpHighlighted(1),
                            "border-destructive": form.formState.errors.pin,
                          },
                        )}
                      />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot
                        index={2}
                        className={cn(
                          "z-10 h-20 w-20 border-slate-700 bg-background text-5xl",
                          {
                            "border-primary": shouldInputOtpHighlighted(2),
                            "border-destructive": form.formState.errors.pin,
                          },
                        )}
                      />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className={cn(
                          "z-10 h-20 w-20 border-slate-700 bg-background text-5xl",
                          {
                            "border-primary": shouldInputOtpHighlighted(3),
                            "border-destructive": form.formState.errors.pin,
                          },
                        )}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}

export default OtpVerification;
