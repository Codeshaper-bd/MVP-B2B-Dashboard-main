"use client";

import { getFileUrl } from "@/lib/media/file-to-url";
import { cn } from "@/lib/utils";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { CheckIcon as CheckIcon } from "@/components/icons";
import PhoneIcon from "@/components/icons/PhoneIcon";
import { ArrowRightIcon as RightArrowIcon } from "@/components/icons";
import UploadIcon from "@/components/icons/UploadIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import PasswordInput from "@/components/ui/password-input";

import PromoterFormHeader from "./promoter-form-header";
import { usePromoterRegisterForm } from "./usePromoterRegisterForm";

function PromoterRegisterForm() {
  const {
    formProps: {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    },
    watchValues: { phone, code, profilePicture },
    onSubmit,
    isLoading,
    progress,
  } = usePromoterRegisterForm();

  const { url: imageUrl } = getFileUrl({ file: profilePicture });
  return (
    <div className="mx-auto max-w-[520px]">
      <PromoterFormHeader progress={progress} />

      <div className="space-y-8">
        <form
          className="space-y-4 rounded-3xl border border-default-100 bg-default p-6"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <LabelErrorWrapper error={errors?.profilePicture?.message}>
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
              <div className="flex items-center gap-5">
                <Avatar className="h-16 w-16 border border-border bg-secondary shadow-none">
                  <AvatarImage src={imageUrl} alt="Profile Picture" />

                  <AvatarFallback>
                    <UserIcon className="h-8 w-8 text-default-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-[7px]">
                  <h3 className="font-medium">Upload your profile picture</h3>
                  <p className="text-sm font-normal text-default-600">
                    PNG, JPG or JPEG (max. 5MB)
                  </p>
                </div>
              </div>

              <div>
                <Input
                  id="imgBtn"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("profilePicture", file);
                    }
                  }}
                />
                <Label
                  className="flex gap-1 rounded-[8px] bg-primary px-3.5 py-2.5 font-semibold text-default"
                  htmlFor="imgBtn"
                >
                  <UploadIcon className="size-5" />
                  <span>Upload</span>
                </Label>
              </div>
            </div>
          </LabelErrorWrapper>
          <Input
            label="Phone Number"
            className="bg-default-100"
            type="tel"
            leftContent={<PhoneIcon className="size-4 text-default-700" />}
            rightContent={<CheckIcon className="size-4 text-[#47CD89]" />}
            minLength={10}
            value={phone}
            error={errors?.phone?.message}
          />
          <Input
            label="Email"
            type="email"
            size={"md"}
            placeholder="Enter Your Email"
            {...register("email")}
            error={errors?.email?.message}
          />

          <div className="flex gap-4">
            <Input
              label="First Name"
              type="text"
              size={"md"}
              placeholder="Enter Your First Name"
              {...register("firstName")}
              error={errors?.firstName?.message}
            />
            <Input
              label="Last Name"
              type="text"
              size={"md"}
              placeholder="Enter Your Last Name"
              {...register("lastName")}
              error={errors?.lastName?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
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

          <div className="py-6">
            <Button
              className={cn(
                "flex w-full gap-1 bg-default-100 text-[#85888E] hover:bg-default-100 hover:text-default",
                {
                  "bg-primary text-default hover:bg-primary hover:text-default":
                    progress === 100,
                },
              )}
              type="submit"
              size="default"
              disabled={progress !== 100}
            >
              <ButtonLoadingContent
                isLoading={isLoading}
                actionContent={<span>Save & Continue</span>}
              />
              <RightArrowIcon className="size-3" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PromoterRegisterForm;
