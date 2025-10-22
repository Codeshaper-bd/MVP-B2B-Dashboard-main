import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { forwardRef, useCallback } from "react";
import {
  useForm,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import * as Yup from "yup";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { useVerifyUserPasswordMutation } from "@/store/api/profile/profile-api";
import type {
  TUserVerifiedData,
  TVerifyUserPasswordMutation,
} from "@/store/api/profile/profile.types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import PasswordInput from "@/components/ui/password-input";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

export type TPasswordVerificationFormData = {
  password: string;
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

export interface IPasswordVerificationFormProps {
  onVerificationSuccess?: (data: TUserVerifiedData) => void;
  onVerificationFailure?: (error: unknown) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type TOnSubmit = ({
  toastProps: { toast },
  verifyUserPassword,
  formProps: { reset },
  onVerificationSuccess,
  onVerificationFailure,
  setIsLoading,
  setClose,
}: {
  toastProps: TUseToastReturnType;
  verifyUserPassword: TVerifyUserPasswordMutation;
  formProps: UseFormReturn<TPasswordVerificationFormData>;
  setClose: () => void;
} & IPasswordVerificationFormProps) => SubmitHandler<TPasswordVerificationFormData>;

const PasswordVerificationForm = forwardRef<
  HTMLButtonElement,
  IPasswordVerificationFormProps
>(
  (
    { onVerificationFailure, onVerificationSuccess, isLoading, setIsLoading },
    ref,
  ) => {
    const { setClose } = useDialogContext();
    const [verifyUserPassword, { error }] = useVerifyUserPasswordMutation();
    const toastProps = useToast();
    const formProps = useForm<TPasswordVerificationFormData>({
      defaultValues: {
        password: "",
      },
      resolver: yupResolver(validationSchema),
    });
    const {
      formState: { errors },
      register,
      handleSubmit,
      control,
    } = formProps;

    const onSubmit: TOnSubmit = useCallback(
      ({
        toastProps: { toast },
        verifyUserPassword,
        formProps: { reset },
        onVerificationSuccess,
        onVerificationFailure,
        setIsLoading,
        setClose,
      }) =>
        async (values) => {
          setIsLoading(true);
          const toastId = toast?.({
            variant: "loading",
            title: "Verifying password",
            description: "Please wait while we verify your password",
          });
          try {
            const verifyUserPasswordRes = await verifyUserPassword({
              password: values.password,
            }).unwrap();
            if (!verifyUserPasswordRes?.success) {
              throw new Error(
                verifyUserPasswordRes?.message ||
                  "Password verification failed",
              );
            }
            const data = verifyUserPasswordRes?.data;
            if (!data) {
              throw new Error(
                "There is no data in the verify password response",
              );
            }
            onVerificationSuccess?.(data);
            reset();
            setClose?.();
            toastId?.update({
              id: toastId.id,
              title: "Success",
              description: "Password verified successfully",
              variant: "success",
            });
          } catch (error) {
            onVerificationFailure?.(error);
            toastId?.update({
              id: toastId.id,
              variant: "error",
              ...getApiErrorMessages({
                error,
                title: "verification failed",
                description: "An error occurred while verifying password",
              }),
            });
          } finally {
            setIsLoading(false);
          }
        },
      [],
    );

    return (
      <form noValidate>
        <PasswordInput
          {...register("password")}
          label="Password"
          backgroundColor={"secondary"}
          placeholder="Enter your password"
          error={errors?.password?.message || getApiErrorMessage(error)}
        />

        <div className="mt-5 flex w-full justify-end">
          <Link
            href={`/en/dashboard/user-profile/forgot-password`}
            className="text-sm font-semibold leading-5 text-primary"
          >
            Forgot password
          </Link>
        </div>

        <button
          type="button"
          className="hidden"
          ref={ref}
          onClick={control?.handleSubmit(
            onSubmit({
              toastProps,
              verifyUserPassword,
              formProps,
              onVerificationFailure,
              onVerificationSuccess,
              setIsLoading,
              isLoading,
              setClose,
            }),
          )}
        />
      </form>
    );
  },
);

PasswordVerificationForm.displayName = "PasswordVerificationForm";

export default PasswordVerificationForm;
