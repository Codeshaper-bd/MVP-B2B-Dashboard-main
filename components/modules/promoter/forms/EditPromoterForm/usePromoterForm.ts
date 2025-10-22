import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import {
  useGetAPromoterDetailsQuery,
  useUpdateAPromoterAssignmentsMutation,
} from "@/store/api/promoters/promoters-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast } from "@/components/ui/use-toast";

import type { IEditPromoterFormProps } from ".";
import type { ICreatePromoterFormValues } from "./types";

export const usePromoterForm = ({ userId }: IEditPromoterFormProps) => {
  const { toast } = useToast();
  const { setClose } = useDialogContext();

  const { data: promoterDetailsRes, ...getAPromoterDetailsApiState } =
    useGetAPromoterDetailsQuery({
      userId,
    });
  const promoterData = promoterDetailsRes?.data;

  const [updatePromoter, { isLoading: isUpdating }] =
    useUpdateAPromoterAssignmentsMutation();

  const methods = useForm<ICreatePromoterFormValues>();
  // fetch data on promoter data change
  useEffect(() => {
    const fetchData = async () => {
      const formData = {
        promoter: promoterData?.phone,
        selectedEvent: promoterData?.assignedEvents?.map((item) => ({
          label: item?.name ?? "",
          value: item?.id ?? 0,
        })),
        permissions: promoterData?.permissions,
        publicRatePerTicketSold: promoterData?.publicRatePerTicketSold ?? 0,
        publicTicketRateType:
          promoterData?.publicTicketRateType ?? "FIXED_AMOUNT",
        ratePerPrivateGuestListEntry:
          promoterData?.ratePerPrivateGuestListEntry ?? 0,
      };
      methods.reset(formData);
    };
    fetchData();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promoterData]);

  const onSubmit = async (data: ICreatePromoterFormValues) => {
    const toastId = toast({
      variant: "loading",
      title: "Updating Promoter",
      description: "Please wait while we update the promoter.",
    });
    try {
      await updatePromoter({
        id: userId,
        body: {
          assignedEvent: data?.selectedEvent?.map((item) =>
            convertToNumber({
              value: item?.value,
              digit: 0,
            }),
          ),
          permissions: data?.permissions,
          publicRatePerTicketSold: data?.publicRatePerTicketSold,
          publicTicketRateType: data?.publicTicketRateType,
          ratePerPrivateGuestListEntry: data?.ratePerPrivateGuestListEntry,
        },
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Promoter Updated",
        description: "Promoter updated successfully.",
      });
      setClose?.();
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Updating Promoter",
          description: "An error occurred while updating the promoter.",
        }),
      });
    }
  };

  // cancel

  const handleCancel = () => {
    setClose?.();
  };

  return {
    methods,
    onSubmit,
    watchValues: {
      promoter: promoterData,
    },
    handleCancel,
    isLoading: isUpdating,
    getAPromoterDetailsApiState,
    promoterData,
  };
};
