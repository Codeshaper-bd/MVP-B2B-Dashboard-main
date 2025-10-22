"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { memo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { useAdminSignUpMutation } from "@/store/api/auth/auth-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { useRouter } from "@/components/navigation";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import PasswordInput from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";

import type { TOtpVerificationType } from "../otp-verification-old";
import { initialFormValues } from "./initialFormValues";
import type { TRegisterForm } from "./types";
import { subscriptionOptions } from "./utils";
import { registrationValidationSchema } from "./validator";

function RegForm() {
  const [adminSignUp] = useAdminSignUpMutation();

  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterForm>({
    resolver: yupResolver(registrationValidationSchema),
    mode: "all",
    defaultValues: initialFormValues,
  });

  const onSubmit: SubmitHandler<TRegisterForm> = async (data) => {
    const toastId = toast({
      variant: "loading",
      title: "Signing Up",
      description: "Please wait while we sign you up.",
    });

    try {
      await adminSignUp({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        organizationName: data.orgName,
        phone: data.phone,
        subscription: data.subscription,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Signed Up",
        description: "You have successfully signed up.",
      });

      const queryData: {
        phone: string;
        type: TOtpVerificationType;
      } = {
        phone: data.phone,
        type: "verifyIdentifier",
      };

      const { queryString } = generateQueryString(queryData, {
        stringifyToPreserveTypes: true,
      });
      router.replace(`/auth/otp-verification${queryString}`);
    } catch (error) {
      console.error("🚀 ~ create todo api ~ error:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Sign Up Failed",
          description: "An error occurred while signing you up.",
        }),
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          label="Organization Name"
          {...register("orgName")}
          placeholder="Your organization name"
          type="text"
          error={errors?.orgName?.message}
        />

        <div className="grid gap-2 lg:grid-cols-2">
          <Input
            label="First Name"
            {...register("first_name")}
            placeholder="Your first name"
            type="text"
            error={errors?.first_name?.message}
          />

          <Input
            label="Last Name"
            {...register("last_name")}
            placeholder="Your last name"
            type="text"
            error={errors?.last_name?.message}
          />

          <Input
            label="Email"
            {...register("email")}
            placeholder="Your email address"
            type="email"
            error={errors?.email?.message}
          />

          <LabelErrorWrapper
            label="Phone Number"
            error={errors?.phone?.message || errors?.dialCode?.message}
          >
            <PhoneInput
              onChange={(value, countryData: { dialCode: string }) => {
                setValue("dialCode", countryData?.dialCode ?? "");
                setValue("phone", value);
                trigger("phone");
                trigger("dialCode");
              }}
              onBlur={() => {
                trigger("phone");
                trigger("dialCode");
              }}
              value={watch("phone")}
              country={"ca"}
              placeholder="Your Phone Number"
            />
          </LabelErrorWrapper>

          <PasswordInput
            label="Password"
            {...register("password")}
            placeholder="Enter your password"
            error={errors?.password?.message}
          />

          <PasswordInput
            label="Confirm Password"
            {...register("confirmPassword")}
            placeholder="Re-enter your password"
            error={errors?.confirmPassword?.message}
          />
        </div>
        <SelectInput
          label="Subscription Plan"
          options={subscriptionOptions}
          error={errors?.subscription?.message}
          onChange={(value) =>
            setValue("subscription", value?.value || "NIGHT_CLUB")
          }
          value={subscriptionOptions.find(
            (option) => option.value === watch("subscription"),
          )}
        />
      </div>

      <LabelErrorWrapper error={errors?.agree?.message}>
        <div className="flex justify-between py-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="checkbox"
              checked={watch("agree")}
              onCheckedChange={(value) => setValue("agree", !!value)}
            />

            <Label htmlFor="checkbox" className="mb-0 mt-0 text-default-700">
              <span>I agree to the</span>{" "}
              <Link href="#" className="text-primary hover:underline">
                Term and Condition
              </Link>
            </Label>
          </div>
        </div>
      </LabelErrorWrapper>

      <Button
        fullWidth
        disabled={isSubmitting}
        className="font-semibold"
        color="primary"
      >
        <ButtonLoadingContent
          isLoading={isSubmitting}
          actionContent="Sign Up"
        />
      </Button>
    </form>
  );
}

export default memo(RegForm);
