"use client";
import { Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";

import useObjectURL from "@/hooks/useObjectURL";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import FileUploader from "@/components/form/file-uploader";
import ArrowRightTopIcon from "@/components/icons/ArrowRightTopIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import PreviewQrCode from "@/components/QrCode/PreviewQrCode";
import RenderData from "@/components/render-data";
import InputSkeleton from "@/components/skeleton/input-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import InfoCard from "@/components/ui/info-card";
import { Input, InputExtension } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import MainVenue from "./MainVenue";
import useManageOrganizationProfileForm from "./useManageOrganizationProfileForm";
import PasswordVerificationModal from "../../modals/PasswordVerificationModal";

function OrganizationProfileForm() {
  const {
    manageProfileInfoFormProps: {
      formState: { errors },
      register,
      setValue,
      handleSubmit,
      trigger,
      watch,
    },
    userVerificationTokenLocalStorageProps: {
      isValidTokenData,
      setValue: setLocalUserVerificationData,
    },
    authenticatedUserOrganizationDetailsData,
    authenticatedUserOrganizationDetailsApiState,
    onSubmitAssistProps,
    onSubmit,
    phone,
    organizationLogo,
    isEditMode,
    setIsEditModeOpen,
    setIsEditModeClose,
  } = useManageOrganizationProfileForm();

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
  }, [isEditMode, isValidTokenData, authenticatedUserOrganizationDetailsData]);
  /* Custom implementation of phone input readOnly color change end */
  const { objectUrl: logoURL } = useObjectURL(organizationLogo?.[0]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit(onSubmitAssistProps))}>
      <Card className="p-6">
        <RenderData
          loadingSkeleton={<InputSkeleton length={7} />}
          {...authenticatedUserOrganizationDetailsApiState}
          data={authenticatedUserOrganizationDetailsData}
          expectedDataType="object"
        >
          <CardContent className="p-0">
            <h3 className="mb-3 text-lg font-semibold leading-7 text-default-900">
              Organization Profile
            </h3>

            <InfoCard
              title="This information will be displayed to customers."
              icon={<InfoIcon className="h-5 w-5 text-[#FDB022]" />}
              color="primary"
              className="text-[#FDB022]"
            />

            <h3 className="my-6 text-lg font-semibold text-[#F5F5F6]">Logo</h3>
            <div className="flex w-full max-w-[640px] items-center gap-5">
              <div className="flex-none">
                <div className="h-[145px] w-[214px]">
                  <Image
                    src={getImageFallback({
                      src: logoURL,
                      fallbackImageSize: 100,
                    })}
                    alt={authenticatedUserOrganizationDetailsData?.name || ""}
                    width={300}
                    height={200}
                    className="size-full rounded-md object-contain"
                  />
                </div>
              </div>
              <div className="flex-1">
                <LabelErrorWrapper
                  error={errors?.organizationLogo?.message}
                  label="Upload New image"
                >
                  <FileUploader
                    files={organizationLogo}
                    setFiles={(newFile) => {
                      setValue("organizationLogo", newFile);
                    }}
                    isMultiple={false}
                    readonly={!isValidTokenData || !isEditMode}
                  />
                </LabelErrorWrapper>
              </div>
            </div>
            <div className="max-w-[512px]">
              <div className="mt-6 space-y-6">
                <Input
                  {...register("name")}
                  label="Organization Name"
                  type="text"
                  backgroundColor={"secondary"}
                  placeholder="Enter organization name"
                  readOnly={!isValidTokenData || !isEditMode}
                  error={errors?.name?.message}
                />

                <Input
                  {...register("address")}
                  label="Address"
                  type="text"
                  backgroundColor={"secondary"}
                  leftContent={
                    <LocationIcon className="h-[16.67px] w-[13.33px] text-default-600" />
                  }
                  placeholder="Enter address"
                  readOnly={!isValidTokenData || !isEditMode}
                  error={errors?.address?.message}
                />

                <Input
                  {...register("email")}
                  label="Email address"
                  type="email"
                  backgroundColor={"secondary"}
                  placeholder="example@gmail.com"
                  readOnly={!isValidTokenData || !isEditMode}
                  leftContent={<EmailIcon className="h-5 w-5" />}
                  error={errors?.email?.message}
                />

                <NumberInput
                  id="totalEmployees"
                  label="Employees"
                  disabled={true}
                  backgroundColor={"secondary"}
                  placeholder="Employees count"
                  value={watch("totalEmployees")}
                  onChange={(value) => {
                    setValue("totalEmployees", Number(value));
                  }}
                  rightExtensionContent={
                    <InputExtension>
                      <Link
                        href={"/en/organization/employees/view-employees"}
                        target="_blank"
                        className="flex shrink-0 items-center justify-center gap-1.5 text-nowrap"
                      >
                        Go to employee page
                        <ArrowRightTopIcon className="m-[5px] size-2.5 shrink-0 text-default-700" />
                      </Link>
                    </InputExtension>
                  }
                  error={errors?.totalEmployees?.message}
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

                <Input
                  {...register("websiteUrl")}
                  type="url"
                  backgroundColor={"secondary"}
                  placeholder="Website"
                  label="Website"
                  readOnly={!isValidTokenData || !isEditMode}
                  leftContent={
                    <GlobeIcon className="size-[16.67px] text-default-600" />
                  }
                />

                <Input
                  {...register("code")}
                  type="text"
                  backgroundColor={"secondary"}
                  placeholder=""
                  label="Code"
                  readOnly={true}
                  leftContent={
                    <Code className="size-[16.67px] text-default-600" />
                  }
                />
                <PreviewQrCode />

                <Textarea
                  {...register("description")}
                  label="Description"
                  readOnly={!isValidTokenData || !isEditMode}
                  backgroundColor={"secondary"}
                  placeholder="Description"
                  disableResize
                />
              </div>
            </div>
            <h3 className="py-3 text-lg font-semibold text-default-700">
              Tax Information
            </h3>
            <Card className="max-w-[720px] bg-secondary/20">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="Tax. Id"
                    type="text"
                    {...register("taxId")}
                    placeholder="e.g. 1234556RT0001"
                    className="placeholder:opacity-40"
                    disabled={!isValidTokenData || !isEditMode}
                  />
                  <Input
                    label="Tax. Name"
                    type="text"
                    {...register("taxName")}
                    placeholder="e.g. GST, HST, VAT"
                    className="placeholder:opacity-40"
                    disabled={!isValidTokenData || !isEditMode}
                  />
                  <Input
                    label="Tax. Rate(%)"
                    type="text"
                    rightContent="%"
                    max={100}
                    {...register("taxRate", {
                      valueAsNumber: true,
                      onChange: (e) => {
                        const inputValue = Number(e.target.value);

                        const clampedValue = Math.max(
                          0,
                          Math.min(inputValue, 100),
                        );
                        setValue("taxRate", clampedValue);
                      },
                    })}
                    disabled={!isValidTokenData || !isEditMode}
                  />
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </RenderData>
        <Separator className="my-6 w-full" />

        <MainVenue isValidToken={isValidTokenData} />

        {!isEditMode ? (
          <div className="mt-12 flex w-full justify-end">
            <DialogContextProvider disableAutoClose>
              {isValidTokenData ? (
                <Button
                  color="secondary"
                  type="button"
                  onClick={setIsEditModeOpen()}
                >
                  <EditPenIcon className="mr-2 size-5" />
                  Edit Organization Info
                </Button>
              ) : (
                <DialogTrigger asChild>
                  <Button color="secondary" type="button">
                    <EditPenIcon className="mr-2 size-5" />
                    Edit Organization Info
                  </Button>
                </DialogTrigger>
              )}

              <PasswordVerificationModal
                onVerificationSuccess={(data) => {
                  setLocalUserVerificationData(data);
                  setIsEditModeOpen()();
                }}
              />
            </DialogContextProvider>
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
  );
}

export default OrganizationProfileForm;
