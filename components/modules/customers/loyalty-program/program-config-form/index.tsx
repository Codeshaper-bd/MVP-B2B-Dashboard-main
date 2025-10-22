"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, type Resolver, useForm } from "react-hook-form";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateALoyaltyProgramMutation,
  useGetALoyaltyProgramQuery,
} from "@/store/api/loyalty-program/loyalty-program.api";
import type { TCreateLoyaltyProgramArgs } from "@/store/api/loyalty-program/loyalty-program.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import FormContent from "./form-content";
import {
  initialLoyaltyFormValues,
  type TLoyaltyProgramFormInput,
} from "./utils";
import { loyaltyProgramSchema } from "./validator";

function ProgramConfigForm() {
  const { data: getALoyaltyProgramRes, ...getALoyaltyProgramApiState } =
    useGetALoyaltyProgramQuery();
  const getALoyaltyProgramData = getALoyaltyProgramRes?.data;
  const isEditMode = checkIsValidId(getALoyaltyProgramData?.id);
  const { toast } = useToast();

  const [createALoyaltyProgram] = useCreateALoyaltyProgramMutation();

  useEffect(() => {
    if (
      !getALoyaltyProgramApiState?.isError &&
      !getALoyaltyProgramApiState?.isLoading &&
      !getALoyaltyProgramApiState?.isFetching &&
      !getALoyaltyProgramApiState?.isUninitialized &&
      getALoyaltyProgramData &&
      isEditMode
    ) {
      methods.reset({
        enabled: getALoyaltyProgramData?.enabled,
        emailNotificationEnabled:
          getALoyaltyProgramData?.emailNotificationEnabled,
        pointsPerSpent: getALoyaltyProgramData?.pointsPerSpent,
        rewardType: getALoyaltyProgramData?.rewardType,
        rewardValue: getALoyaltyProgramData?.rewardValue,
        redemptionType: getALoyaltyProgramData?.redemptionType,
        notificationPoint:
          getALoyaltyProgramData?.notificationPoint ?? undefined,
        streakType: getALoyaltyProgramData?.streakType,
        streakValue: getALoyaltyProgramData?.streakValue ?? undefined,
        streakReward: getALoyaltyProgramData?.streakReward ?? undefined,
        redemptionThresholds: getALoyaltyProgramData?.RedemptionThreshold,
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEditMode,
    getALoyaltyProgramData,
    getALoyaltyProgramApiState?.isError,
    getALoyaltyProgramApiState?.isLoading,
    getALoyaltyProgramApiState?.isFetching,
    getALoyaltyProgramApiState?.isUninitialized,
  ]);

  const methods = useForm<TLoyaltyProgramFormInput>({
    defaultValues: initialLoyaltyFormValues,
    resolver: yupResolver(
      loyaltyProgramSchema,
    ) as unknown as Resolver<TCreateLoyaltyProgramArgs>,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = methods;

  const onSubmit = async (data: TLoyaltyProgramFormInput) => {
    const toastId = toast({
      variant: "loading",
      title: isEditMode ? "Update Notification" : "Create Notification",
      description: isEditMode
        ? "Updating Notification"
        : "Creating Notification",
    });

    try {
      const formData: TCreateLoyaltyProgramArgs = {
        enabled: data?.enabled,
        emailNotificationEnabled: data?.emailNotificationEnabled,
        pointsPerSpent: data?.pointsPerSpent,
        rewardType: data?.rewardType,
        rewardValue: data?.rewardValue,
        redemptionType: data?.redemptionType,
        notificationPoint: data?.notificationPoint,
        streakType: data?.streakType,
        streakValue: data?.streakValue,
        streakReward: data?.streakReward,
        redemptionThresholds: data?.redemptionThresholds?.map((item) => ({
          points: item?.points,
          dollarValue: item?.dollarValue,
        })),
      };

      await createALoyaltyProgram(formData).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: isEditMode
          ? "Loyalty Program Updated Successfully!"
          : "Loyalty Program Created Successfully! ",
        description: getApiErrorMessage(
          undefined,
          isEditMode
            ? "Congratulations! Loyalty Program has been updated successfully."
            : "Congratulations! Loyalty Program has been created successfully.",
        ),
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: isEditMode
            ? "Error Updating Loyalty Program"
            : "Error Creating Loyalty Program",
          description: isEditMode
            ? "Error Updating Loyalty Program"
            : "Error Creating Loyalty Program",
        }),
      });
    }
  };

  const formContent = (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormContent />
        <div className="mt-6 flex justify-end gap-3">
          <Button
            className="w-auto lg:w-[80px]"
            color="secondary"
            type="button"
            onClick={() => {
              reset();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="w-auto lg:w-[128px]"
            color="primary"
            type="submit"
            disabled={isSubmitting || !watch("enabled")}
          >
            <ButtonLoadingContent
              isLoading={isSubmitting}
              actionContent="Save Changes"
            />
          </Button>
        </div>
      </form>
    </FormProvider>
  );

  if (!isEditMode) {
    return formContent;
  }
  return (
    <RenderData
      expectedDataType="object"
      data={getALoyaltyProgramData}
      {...getALoyaltyProgramApiState}
    >
      {formContent}
    </RenderData>
  );
}

export default ProgramConfigForm;
