"use client";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";

import useObjectURL from "@/hooks/useObjectURL";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import UploadSingleFile from "@/components/form/upload-single-file";
import { EditIcon as EditPenIcon } from "@/components/icons";
import { MailIcon as EmailIcon } from "@/components/icons";
import UserIcon from "@/components/icons/UserIcon";
import RenderData from "@/components/render-data";
import InputSkeleton from "@/components/skeleton/input-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import PasswordInput from "@/components/ui/password-input";

import useManageProfileInfoForm from "./useManageBasicInfoForm";
import PasswordVerificationModal from "../../modals/PasswordVerificationModal";

function BasicInfoForm() {
  const {
    manageProfileInfoFormProps: {
      formState: { errors },
      register,
      setValue,
      handleSubmit,
      trigger,
    },
    media,
    phone,
    dialCode,
    onSubmitAssistProps,
    onSubmit,
    isEditMode,
    setIsEditModeOpen,
    setIsEditModeClose,
    userVerificationTokenLocalStorageProps: {
      isValidTokenData,
      setValue: setLocalUserVerificationData,
    },
    authenticatedUserProfileData,
    authenticatedUserProfileApiState,
  } = useManageProfileInfoForm();
  const { objectUrl: avatarUrl } = useObjectURL(media);

  /* Custom implementation of phone input readOnly color change start */
  useEffect(() => {
    const flagDropdownElement = document.querySelector(".react-tel-input");
    const flagDropdownElements =
      flagDropdownElement?.querySelectorAll(".flag-dropdown");

    if (!isValidTokenData || !isEditMode) {
      flagDropdownElements?.[0]?.classList?.add("read-only-bg");
    } else {
      flagDropdownElements?.[0]?.classList?.remove("read-only-bg");
    }
  }, [isEditMode, isValidTokenData, authenticatedUserProfileData]);
  /* Custom implementation of phone input readOnly color change end */

  return (
    <DialogContextProvider disableAutoClose>
      <RenderData
        loadingSkeleton={<InputSkeleton length={6} />}
        {...authenticatedUserProfileApiState}
        data={authenticatedUserProfileData}
        expectedDataType="object"
      >
        <form noValidate onSubmit={handleSubmit(onSubmit(onSubmitAssistProps))}>
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="max-w-[512px]">
                <h3 className="mb-1 text-lg font-semibold leading-7 text-default-900">
                  Basic Information of Admin / Account User
                </h3>

                <p className="text-sm leading-5 text-default-600">
                  Update your photo and personal details here.
                </p>

                <div className="mt-6 space-y-6">
                  <div className="flex flex-col gap-5 md:flex-row">
                    <div className="flex-none">
                      <Avatar className="h-16 w-16 border border-border bg-secondary shadow-none">
                        <AvatarImage src={avatarUrl || ""} alt="dashcode" />

                        <AvatarFallback>
                          <UserIcon className="h-8 w-8 text-default-600" />
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1">
                      <UploadSingleFile
                        files={
                          media
                            ? [
                                {
                                  file: media,
                                  id: crypto.randomUUID(),
                                },
                              ]
                            : null
                        }
                        setFiles={async (media) => {
                          setValue("media", media?.[0]?.file);
                          await trigger("media");
                        }}
                        hidePreviewInside
                        readonly={!isValidTokenData || !isEditMode}
                        error={
                          errors?.media?.message || errors?.media?.root?.message
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Input
                      {...register("firstName")}
                      type="text"
                      backgroundColor={"secondary"}
                      placeholder="First Name"
                      label="First Name"
                      readOnly={!isValidTokenData || !isEditMode}
                      error={errors?.firstName?.message}
                    />

                    <Input
                      {...register("lastName")}
                      type="text"
                      backgroundColor={"secondary"}
                      placeholder="Last Name"
                      label="Last Name"
                      readOnly={!isValidTokenData || !isEditMode}
                      error={errors?.lastName?.message}
                    />
                  </div>

                  <Input
                    {...register("email")}
                    type="email"
                    backgroundColor={"secondary"}
                    id="email"
                    placeholder="example@gmail.com"
                    label="Email address"
                    leftContent={<EmailIcon className="h-5 w-5" />}
                    readOnly={!isValidTokenData || !isEditMode}
                    error={errors?.email?.message}
                  />

                  <PasswordInput
                    {...register("password")}
                    backgroundColor={"secondary"}
                    placeholder="Enter password"
                    label="Password"
                    // leftContent={<EmailIcon className="h-5 w-5" />}
                    readOnly={!isValidTokenData || !isEditMode}
                    error={errors?.password?.message}
                  />

                  <PasswordInput
                    {...register("confirmPassword")}
                    backgroundColor={"secondary"}
                    placeholder="Re enter password"
                    label="Confirm Password"
                    // leftContent={<EmailIcon className="h-5 w-5" />}
                    readOnly={!isValidTokenData || !isEditMode}
                    error={errors?.confirmPassword?.message}
                  />

                  <LabelErrorWrapper
                    label="Phone Number"
                    error={errors?.phone?.message || errors?.dialCode?.message}
                  >
                    <PhoneInput
                      onChange={async (
                        value,
                        countryData: { dialCode: string },
                      ) => {
                        setValue("dialCode", countryData?.dialCode ?? "");
                        setValue("phone", value);
                        await trigger("phone");
                        await trigger("dialCode");
                      }}
                      onBlur={async () => {
                        await trigger("phone");
                        await trigger("dialCode");
                      }}
                      value={phone}
                      country={"ca"}
                      placeholder="Your Phone Number"
                      disabled={!isValidTokenData || !isEditMode}
                      disableCountryCode={!isValidTokenData || !isEditMode}
                      inputStyle={{
                        backgroundColor:
                          !isValidTokenData || !isEditMode
                            ? "#343842"
                            : "transparent",
                        pointerEvents:
                          !isValidTokenData || !isEditMode ? "none" : "auto",
                      }}
                    />
                  </LabelErrorWrapper>
                </div>
              </div>
            </CardContent>

            {!isEditMode ? (
              <div className="mt-12 flex w-full justify-end">
                {isValidTokenData ? (
                  <Button
                    color="secondary"
                    type="button"
                    onClick={setIsEditModeOpen()}
                  >
                    <EditPenIcon className="mr-2 size-5" />
                    Update Account Information
                  </Button>
                ) : (
                  <DialogTrigger asChild>
                    <Button color="secondary" type="button">
                      <EditPenIcon className="mr-2 size-5" />
                      Update Account Information
                    </Button>
                  </DialogTrigger>
                )}
              </div>
            ) : isValidTokenData ? (
              <div className="mt-12 flex justify-end gap-3">
                <Button
                  color="secondary"
                  type="button"
                  onClick={setIsEditModeClose()}
                >
                  Cancel
                </Button>

                <Button color="primary" type="submit">
                  <ButtonLoadingContent
                    isLoading={false}
                    actionContent="Save Changes"
                  />
                </Button>
              </div>
            ) : null}
          </Card>
        </form>
      </RenderData>

      <PasswordVerificationModal
        onVerificationSuccess={(data) => {
          setLocalUserVerificationData(data);
          setIsEditModeOpen()();
        }}
      />
    </DialogContextProvider>
  );
}

export default BasicInfoForm;
