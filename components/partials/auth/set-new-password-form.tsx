"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as Yup from "yup";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { cn } from "@/lib/utils";
import { apiSlice } from "@/store/api";
import {
  useResetPasswordMutation,
  useSigninMutation,
} from "@/store/api/auth/auth-api";
import { logout, selectAuthUserEmail } from "@/store/features/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CircleCheckedIcon from "@/components/icons/CircleCheckedIcon";
import { useRouter } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";

type TFormValues = {
  password: string;
  confirmPassword: string;
};

const schema = Yup.object().shape({
  password: Yup.string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character",
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

type Inputs = {
  password: string;
  confirmPassword: string;
};

interface ISetNewPasswordFormProps {
  mode?: "loggedIn" | "loggedOut";
  forwardUrl?: string;
}

function SetNewPasswordForm({
  mode = "loggedOut",
  forwardUrl = mode === "loggedOut" ? "/" : "/dashboard/user-profile",
}: ISetNewPasswordFormProps) {
  const authUserEmail = useAppSelector(selectAuthUserEmail);
  const { getAParamValue } = useManageSearchParams<{
    token: string;
  }>();
  const [resetPassword] = useResetPasswordMutation();
  const [signin] = useSigninMutation();
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading, isSubmitting, isValid },
  } = useForm<TFormValues>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: TFormValues) => {
    const toastId = toast({
      variant: "loading",
      title: "Set New Password",
      description: "Please wait while setting your new password.",
    });
    try {
      const response = await resetPassword({
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
        token: getAParamValue("token") || "",
      }).unwrap();

      switch (mode) {
        case "loggedIn":
          {
            dispatch(apiSlice?.util?.resetApiState());
            const response = await signin({
              identifier: authUserEmail || "",
              password: data.password,
            }).unwrap();
            const loginData = response?.data;

            if (loginData?.user?.type !== "ADMIN") {
              toastId.update({
                id: toastId.id,
                variant: "error",
                title: "Sign In Failed",
                description: getApiErrorMessage(
                  undefined,
                  "You don't have permission to access admin panel.",
                ),
              });
              return;
            }

            toastId.update({
              id: toastId.id,
              variant: "success",
              title: "Password Reset Successful",
              description:
                "Your password has updated successfully. Redirecting you to profile page.",
            });
            if (loginData?.user?.type !== "ADMIN") {
              toastId.update({
                id: toastId.id,
                variant: "error",
                title: "Sign In Failed",
                description: getApiErrorMessage(
                  undefined,
                  "You don't have permission to access admin panel.",
                ),
              });
              return;
            }
            router?.replace(forwardUrl);
          }
          break;
        case "loggedOut":
          {
            Cookies.remove("authTokens");
            dispatch(logout());
            dispatch(apiSlice?.util?.resetApiState());
            router?.replace(forwardUrl);
            toastId.update({
              id: toastId.id,
              variant: "success",
              title: "Signed In",
              description:
                response?.message ||
                "You have successfully updated your password. Login now.",
            });
          }
          break;

        default:
          break;
      }
    } catch (err) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error: err,
          title: "Set New Password Failed",
          description: "An error occurred while setting your new password.",
        }),
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-5">
        <PasswordInput
          label="Password"
          {...register("password")}
          placeholder="Enter your password"
          error={errors?.password?.message}
        />

        <PasswordInput
          label="Confirm Password"
          {...register("confirmPassword")}
          placeholder="Rewrite your password"
          error={errors?.confirmPassword?.message}
        />

        <div className="flex shrink-0 items-center gap-2">
          <CircleCheckedIcon
            className={cn(
              "size-5 text-default-400",
              isValid && watch("password")?.length >= 8 && "text-[#17B26A]",
            )}
          />

          <p className="text-sm font-normal leading-5 text-[#94969C]">
            {errors?.password?.message ||
              "Password must be at least 8 characters"}
          </p>
        </div>
      </div>

      <Button
        fullWidth
        disabled={isLoading || isSubmitting}
        className="font-semibold"
        color="primary"
      >
        {(isLoading || isSubmitting) && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isLoading || isSubmitting ? "Loading..." : "Reset password"}
      </Button>
    </form>
  );
}
export default SetNewPasswordForm;
