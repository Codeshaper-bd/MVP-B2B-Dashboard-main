"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { memo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { useRequestPasswordResetMutation } from "@/store/api/auth/auth-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { useRouter } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { useToast } from "@/components/ui/use-toast";

import type { TOtpVerificationType } from "./otp-verification-old";

type TFormValues = {
  // emailOrPhone: string;
  dialCode: string;
  phone: string;
};
const initialValues: TFormValues = {
  // emailOrPhone: "",
  dialCode: "",
  phone: "",
};

const schema = Yup.object().shape({
  // emailOrPhone: Yup.string()
  //   .test(
  //     "emailOrPhone",
  //     "Your email or phone number is invalid.",
  //     (value) =>
  //       Yup.string().email().isValidSync(value) ||
  //       Yup.string()
  //         .matches(/^[0-9]{9,}$/, "Phone number must be at least 9 digits.")
  //         .isValidSync(value),
  //   )
  //   .required("Email or phone number is required"),

  dialCode: Yup.string().required("Dial code is required"),
  phone: Yup.string()
    .matches(
      /^[0-9]{11,}$/,
      "Phone number must be at least 9 digits (without country code).",
    )
    .required("Phone number is required"),
});

interface IForgotPassProps {
  forwardUrl?: string;
}

function ForgotPass({
  forwardUrl = "/auth/otp-verification",
}: IForgotPassProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [requestPasswordReset] = useRequestPasswordResetMutation();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<TFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    const toastId = toast({
      variant: "loading",
      title: "Forgot Password",
      description: "Please wait while we process your password reset.",
    });
    try {
      const response = await requestPasswordReset({
        phone: data.phone,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "OTP Verification Sent",
        description:
          response?.message ||
          "Your password reset request is successful. Please check your phone or email for OTP verification.",
      });

      const queryData: {
        phone: string;
        type: TOtpVerificationType;
      } = {
        phone: data.phone,
        type: "verifyPasswordReset",
      };
      const { queryString } = generateQueryString(queryData, {
        stringifyToPreserveTypes: true,
      });
      router.push(`${forwardUrl}${queryString}`);
    } catch (err) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error: err,
          title: "Failed to Reset Password",
          description: "An error occurred while resetting your password.",
        }),
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* <Input
        label="Phone or Email"
        placeholder="Enter your phone or email"
        {...register("emailOrPhone")}
        error={errors?.emailOrPhone?.message}
      /> */}

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
          value={watch("phone")}
          country={"ca"}
          placeholder="Your Phone Number"
          onBlur={() => {
            trigger("phone");
            trigger("dialCode");
          }}
        />
      </LabelErrorWrapper>

      <Button
        type="submit"
        fullWidth
        disabled={isSubmitting || isLoading}
        className="font-semibold"
        color="primary"
      >
        <ButtonLoadingContent
          isLoading={isSubmitting || isLoading}
          actionContent={
            isSubmitting || isLoading ? "Loading..." : "Reset password"
          }
        />
      </Button>
    </form>
  );
}

export default memo(ForgotPass);
