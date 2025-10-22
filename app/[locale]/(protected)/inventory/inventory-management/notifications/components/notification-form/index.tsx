"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  type Resolver,
  FormProvider,
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateANotificationSettingsMutation,
  useGetANotificationSettingsQuery,
} from "@/store/api/inventories-settings/inventory-settings-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

import EmailRepeater from "./email-repeater";
import ParLevelRepeater from "./par-level-repeater";
import PhoneNumberRepeater from "./phone-number-repeater";
import {
  initialNotificationFormValues,
  type TNotificationFormInputs,
} from "./utils";
import { notificationFormValidationSchema } from "./validator";

function NotificationForm() {
  // get notification

  const {
    data: getANotificationSettingsRes,
    ...getANotificationSettingsApiState
  } = useGetANotificationSettingsQuery();
  const [createANotificationSettings] =
    useCreateANotificationSettingsMutation();
  const getANotificationData = getANotificationSettingsRes?.data;
  const isEditMode = checkIsValidId(getANotificationData?.id);

  const methods = useForm<TNotificationFormInputs>({
    defaultValues: initialNotificationFormValues,
    resolver: yupResolver(
      notificationFormValidationSchema,
    ) as Resolver<TNotificationFormInputs>,
  });
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const { toast } = useToast();
  useEffect(() => {
    if (getANotificationData && isEditMode) {
      methods.reset({
        thresholds:
          getANotificationData?.thresholds.map((item) => ({ value: item })) ||
          [],
        notify_email: getANotificationData?.notify_email || false,
        notify_phone: getANotificationData?.notify_phone || false,
        emails:
          getANotificationData?.emails?.map((item) => ({ value: item })) || [],
        phone_numbers:
          getANotificationData?.phone_numbers?.map((item) => ({
            value: item,
          })) || [],
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, getANotificationData]);

  const onSubmit: SubmitHandler<TNotificationFormInputs> = async (data) => {
    const toastId = toast({
      variant: "loading",
      title: isEditMode ? "Update Notification" : "Create Notification",
      description: isEditMode
        ? "Updating Notification"
        : "Creating Notification",
    });

    try {
      const formData = {
        notify_email: data.notify_email,
        notify_phone: data.notify_phone,
        thresholds: data.thresholds.map((item) => item.value),
        emails:
          data.emails
            ?.map((item) => (item.value !== undefined ? item.value : ""))
            .filter((value) => value !== "") || [],
        phone_numbers:
          data.phone_numbers
            ?.map((item) => item.value)
            .filter((value) => value !== undefined) || [],
      };

      await createANotificationSettings(formData).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: isEditMode
          ? "Notification Updated Successfully!"
          : "Notification Created Successfully! ",
        description: getApiErrorMessage(
          undefined,
          isEditMode
            ? "Congratulations! Notification has been updated successfully."
            : "Congratulations! Notification has been created successfully.",
        ),
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: `${isEditMode ? "Notification Update" : "Notification Creation"} Failed`,
          description: `An error occurred while ${isEditMode ? "updating" : "creating"} notification.`,
        }),
      });
    }
  };

  const formComponent = (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2 lg:flex-row">
            <p className="mt-2 flex-1 text-base font-medium text-default-900">
              Notify me when above
            </p>
            <div className="space-y-3">
              <ParLevelRepeater />
            </div>
          </div>

          <div className="flex items-center justify-start gap-2">
            <Switch
              color="success"
              id="email"
              checked={watch("notify_email")}
              onCheckedChange={(value) => {
                setValue("notify_email", value);
              }}
            />
            <Label htmlFor="email" className="mb-0 cursor-pointer text-sm">
              Email
            </Label>
          </div>

          {watch("notify_email") && <EmailRepeater />}

          <div className="flex items-center justify-start gap-2">
            <Switch
              color="success"
              id="phone"
              checked={watch("notify_phone")}
              onCheckedChange={(value) => setValue("notify_phone", value)}
            />

            <Label htmlFor="phone" className="mb-0 cursor-pointer text-sm">
              Phone Number
            </Label>
          </div>
          {!!watch("notify_phone") && <PhoneNumberRepeater />}
        </div>

        <Button type="submit" color="secondary" className="mt-7 w-full">
          <ButtonLoadingContent isLoading={false} actionContent={"Save"} />
        </Button>
      </form>
    </FormProvider>
  );

  if (!isEditMode) {
    return formComponent;
  }

  return (
    <RenderData
      data={getANotificationData}
      expectedDataType="object"
      {...getANotificationSettingsApiState}
    >
      {formComponent}
    </RenderData>
  );
}

export default NotificationForm;
