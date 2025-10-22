"use client";
import { useCallback, useState } from "react";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { hasValidAccess } from "@/lib/user/checkAuth";
import { getRedirectPath } from "@/lib/user/getRedirectPath";
import {
  useVerifyPasswordResetOtpMutation,
  useVerifyPhoneNumberMutation,
} from "@/store/api/auth/auth-api";
import type {
  TVerifyPasswordResetOtpMutation,
  TVerifyPhoneNumberMutation,
} from "@/store/api/auth/auth.types";
import { useRouter } from "@/components/navigation";
import { InputOTP } from "@/components/ui/input-otp";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import OtpField from "./OtpField";

const OTP_LENGTH: number = 6;
const otpArray = Array.from({ length: OTP_LENGTH });

type TOnSubmitCurryArgs = {
  setIsError: (props: Partial<TExternalState> | void) => () => void;
  setIsNotError: (props: Partial<TExternalState> | void) => () => void;
  verifyPhoneNumber: TVerifyPhoneNumberMutation;
  toastProps: TUseToastReturnType;
  router: ReturnType<typeof useRouter>;
  getAParamValue: <U extends "phone" | "email" | "type">(
    key: U,
  ) =>
    | Partial<{
        phone: string;
        email: string;
        type: TOtpVerificationType;
      }>[U]
    | undefined;
  verifyPasswordResetOtp: TVerifyPasswordResetOtpMutation;
} & IOtpVerificationProps;

type THandleChange = (props: {
  onSubmit: TOnSubmit;
  onSubmitCurryArgs: TOnSubmitCurryArgs;
}) => (value: string) => void;

export const verificationTypes = {
  verifyIdentifier: "/dashboard/dashboard",
  verifyPasswordReset: "/auth/set-new-password",
} as const;

export type TOtpVerificationType = keyof typeof verificationTypes;

type TOnSubmit = (props: TOnSubmitCurryArgs) => (data: string) => Promise<void>;

interface IOtpVerificationProps {
  verifyPasswordResetForWardUrl?: string;
  verifyIdentifierForWardUrl?: string;
}

function OtpVerificationNew({
  verifyPasswordResetForWardUrl,
  verifyIdentifierForWardUrl,
}: IOtpVerificationProps) {
  const [verifyPhoneNumber, verifyPhoneNumberApiState] =
    useVerifyPhoneNumberMutation();
  const [verifyPasswordResetOtp] = useVerifyPasswordResetOtpMutation();
  const { getAParamValue } = useManageSearchParams<{
    phone: string;
    email: string;
    type: TOtpVerificationType;
  }>();
  const router = useRouter();
  const toastProps = useToast();

  const [otp, setOtp] = useState("");
  const {
    state: isFocused,
    setOpen: setIsFocused,
    setClose: setIsNotFocused,
  } = useBooleanState({ defaultValue: false });
  const {
    state: isError,
    setOpen: setIsError,
    setClose: setIsNotError,
  } = useBooleanState({ defaultValue: false });

  const onSubmit: TOnSubmit = useCallback(
    ({
      setIsError,
      setIsNotError,
      verifyPhoneNumber,
      verifyPasswordResetOtp,
      toastProps: { toast },
      router,
      getAParamValue,
      verifyIdentifierForWardUrl,
      verifyPasswordResetForWardUrl,
    }) =>
      async (data: string) => {
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
                  otp: data,
                  phone: getAParamValue("phone") || "",
                }).unwrap();

                const loginData = verifyPhoneNumberRes?.data;
                if (!hasValidAccess(loginData?.user)) {
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
                const getRedirectUrl = () => getRedirectPath(loginData?.user);
                const redirectUrl = getRedirectUrl()?.split("/en")[1];
                router.replace(verifyIdentifierForWardUrl || redirectUrl);
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
                  otp: data,
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
                const { queryString } = generateQueryString(queryData, {
                  stringifyToPreserveTypes: true,
                });

                router.replace(
                  `${verifyPasswordResetForWardUrl || verificationTypes.verifyPasswordReset}${queryString}`,
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
      },
    [],
  );

  const handleChange: THandleChange = useCallback(
    ({ onSubmit, onSubmitCurryArgs: { setIsNotError }, onSubmitCurryArgs }) =>
      (value: string) => {
        setOtp(value);
        setIsNotError()();

        if (value.length === OTP_LENGTH) {
          onSubmit(onSubmitCurryArgs)(value);
        }
      },
    [],
  );

  const preventPageReload: React.FormEventHandler<HTMLFormElement> =
    useCallback((e) => e.preventDefault(), []);

  return (
    <>
      <form
        className="flex justify-center"
        onSubmit={preventPageReload}
        noValidate
      >
        <LabelErrorWrapper
          error={
            isError &&
            getApiErrorMessage(verifyPhoneNumberApiState?.error, "Invalid OTP")
          }
        >
          <InputOTP
            maxLength={OTP_LENGTH}
            onChange={handleChange({
              onSubmit,
              onSubmitCurryArgs: {
                setIsError,
                setIsNotError,
                verifyPhoneNumber,
                verifyPasswordResetOtp,
                toastProps,
                router,
                getAParamValue,
                verifyIdentifierForWardUrl,
                verifyPasswordResetForWardUrl,
              },
            })}
            value={otp}
            className="text-xl"
            onFocus={setIsFocused()}
            onBlur={setIsNotFocused()}
          >
            <div className="flex w-full justify-center gap-3">
              {otpArray.map((_, index) => (
                <OtpField
                  key={index}
                  index={index}
                  isFocused={isFocused}
                  totalLength={6}
                  value={otp}
                  isError={isError}
                />
              ))}
            </div>
          </InputOTP>
        </LabelErrorWrapper>
      </form>
    </>
  );
}

export default OtpVerificationNew;
