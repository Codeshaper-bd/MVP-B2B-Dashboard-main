"use client";
import { memo } from "react";

import { Link } from "@/i18n/routing";
import type { TUserType } from "@/store/api/auth/auth.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/password-input";

import useLoginForm from "./useLoginForm";
import { userOptions } from "./utils";

function LoginForm() {
  const {
    loginFormProps: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
    },
    userType,
    onSubmit,
  } = useLoginForm();
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4"
    >
      <Input
        label="Email"
        {...register("emailOrPhone")}
        type="email"
        placeholder="Enter your email"
        error={errors?.emailOrPhone?.message}
      />

      <PasswordInput
        label="Password"
        {...register("password")}
        placeholder="Enter your password"
        error={errors?.password?.message}
      />

      <CustomRadioGroup
        direction="row"
        gap="gap-3"
        label={"Login as"}
        className="pl-2.5"
        labelClassName="text-sm font-medium sm:text-sm text-default-700"
        options={userOptions}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("userType", e.target.value as TUserType);
        }}
        value={userType}
      />

      <div className="!mb-2 !mt-6 flex flex-col justify-between gap-3 md:flex-row">
        <div className="flex items-center gap-2">
          <Checkbox id="checkbox" defaultChecked />
          <Label htmlFor="checkbox" className="mb-0">
            Remember for 30 days
          </Label>
        </div>
        <Link
          href="/auth/forgot-password"
          className="text-sm font-medium leading-6 text-default-700 hover:text-primary hover:underline dark:text-default-400"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        fullWidth
        disabled={isSubmitting}
        color="primary"
        size="lg"
        rounded="lg"
      >
        <ButtonLoadingContent
          isLoading={isSubmitting}
          actionContent="Sign In"
        />
      </Button>
    </form>
  );
}

export default memo(LoginForm);
