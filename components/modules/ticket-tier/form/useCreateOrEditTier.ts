import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import {
  useCreateATicketTierMutation,
  useGetATicketTierQuery,
  useUpdateATicketTierMutation,
} from "@/store/api/ticket-tier/ticket-tier-api";
import type {
  TCreateTicketTierArgs,
  TCreateTicketTierRes,
} from "@/store/api/ticket-tier/ticket-tier.types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast } from "@/components/ui/use-toast";

import type { TTicketFormType, ICreateTierFormProps, TOnSubmit } from "./types";
import { initialTicketFormValues } from "./utils";
import tierFormValidationSchema from "./validator";

const useCreateOrEditTier = ({
  isEditMode,
  eventId,
  selectedSlug,
  isSubmitting,
  setIsSubmitting,
  onSubmitSuccess,
}: ICreateTierFormProps) => {
  const [createATicketTier] = useCreateATicketTierMutation();
  const [updateATicketTier] = useUpdateATicketTierMutation();

  const { data: getATicketTierRes, ...getATicketTierApiState } =
    useGetATicketTierQuery(
      { slug: selectedSlug },
      {
        skip: !isEditMode || !selectedSlug,
      },
    );
  const getATicketTierData = getATicketTierRes?.data;

  const toastHookProps = useToast();
  const { setClose } = useDialogContext();

  const formProps = useForm<TTicketFormType>({
    defaultValues: initialTicketFormValues,
    resolver: yupResolver(
      tierFormValidationSchema,
    ) as unknown as Resolver<TTicketFormType>,
  });

  const isAutoRelease = useWatch({
    control: formProps.control,
    name: "isAutoRelease",
    defaultValue: initialTicketFormValues.isAutoRelease,
  });

  const startDate = useWatch({
    control: formProps.control,
    name: "startDate",
    defaultValue: undefined,
  });

  const endDate = useWatch({
    control: formProps.control,
    name: "endDate",
    defaultValue: undefined,
  });

  useEffect(() => {
    if (
      isEditMode &&
      selectedSlug &&
      getATicketTierApiState?.isSuccess &&
      getATicketTierData
    ) {
      formProps.setValue("isEditMode", !!selectedSlug);

      const formData: TTicketFormType = {
        ...getATicketTierData,
        eventId: getATicketTierData?.eventId ?? -1,
        isEditMode: !!selectedSlug,
        isPrivate: getATicketTierData?.isPrivate ?? false,
      };

      formProps.reset(formData);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getATicketTierData,
    isEditMode,
    selectedSlug,
    getATicketTierApiState?.isSuccess,
  ]);

  useEffect(() => {
    formProps.setValue("eventId", checkIsValidId(eventId) ? eventId : -1);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const onSubmit: TOnSubmit = useCallback(
    ({
      toastHookProps,
      createATicketTier,
      updateATicketTier,
      eventId,
      isEditMode,
      formProps,
      selectedSlug,
      setClose,
      setIsSubmitting,
      onSubmitSuccess,
    }) =>
      async (data) => {
        const toastId = toastHookProps.toast({
          variant: "loading",
          title: `${isEditMode ? "Updating" : "Creating"} Ticket Tier`,
          description: `Please wait while we ${isEditMode ? "update" : "create"} the Ticket Tier`,
        });
        setIsSubmitting?.(true);

        const formData: TCreateTicketTierArgs = {
          name: data.name,
          price: Number(data.price),
          maxQty: Number(data.maxQty),
          isAutoRelease: data.isAutoRelease,
          maxTicketsPerCustomer: Number(data.maxTicketsPerCustomer),
          status: "Upcoming",
          eventId: eventId as number,
          startDate: data.isAutoRelease ? data.startDate : undefined,
          endDate: data.isAutoRelease ? data.endDate : undefined,
        };

        try {
          if (!checkIsValidId(eventId)) {
            throw new Error("Event ID is required");
          }

          let apiRes: TCreateTicketTierRes | TNullish = null;

          if (isEditMode) {
            apiRes = await updateATicketTier({
              slug: selectedSlug,
              body: formData,
            }).unwrap();
          } else {
            apiRes = await createATicketTier(formData).unwrap();
          }

          if (!apiRes?.success) {
            throw new Error(
              apiRes?.message ||
                `Failed to ${isEditMode ? "update" : "create"} ticket tier`,
            );
          }

          if (!apiRes?.data) {
            throw new Error("Data is not available in response");
          }

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: `Ticket Tier ${isEditMode ? "Updated" : "Created"} Successfully!`,
            description: `The Ticket Tier details have been successfully ${isEditMode ? "updated" : "created"}.`,
          });

          formProps.reset();
          onSubmitSuccess?.(apiRes.data);
          setClose();
        } catch (error) {
          console.error("Error creating ticket tier:", error);
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: `Ticket Tier ${isEditMode ? "Update" : "Creation"} Failed`,
              description: `An error occurred while ${isEditMode ? "updating" : "creating"} the ticket tier.`,
            }),
          });
        } finally {
          setIsSubmitting?.(false);
        }
      },
    [],
  );

  return {
    formProps,
    onSubmit,
    toastHookProps,
    getATicketTierApiState,
    getATicketTierData,
    watchValues: {
      isAutoRelease,
      startDate,
      endDate,
    },
    onSubmitAssistProps: {
      toastHookProps,
      createATicketTier,
      updateATicketTier,
      eventId,
      isEditMode,
      formProps,
      selectedSlug,
      setClose,
      isSubmitting,
      setIsSubmitting,
      onSubmitSuccess,
    },
  };
};

export default useCreateOrEditTier;
