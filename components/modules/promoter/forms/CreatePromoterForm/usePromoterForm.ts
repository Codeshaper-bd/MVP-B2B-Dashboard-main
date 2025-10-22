import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import {
  useCreatePromoterMutation,
  useLazyCheckPromoterStatusQuery,
} from "@/store/api/promoters/promoters-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast } from "@/components/ui/use-toast";

import type { ICreatePromoterFormValues } from "./types";
import { initialPromoterFormValues } from "./utils";
import addPromoterSchema from "./validator";

export const usePromoterForm = () => {
  const { toast } = useToast();
  const { setClose } = useDialogContext();
  const [createPromoter, { isLoading: isCreatingPromoter }] =
    useCreatePromoterMutation();
  const [checkPromoterStatus, { isLoading: isCheckingPromoterStatus }] =
    useLazyCheckPromoterStatusQuery();

  // Initialize the form methods with default values
  // This will be used to manage the form state and validation
  const methods = useForm<ICreatePromoterFormValues>({
    defaultValues: initialPromoterFormValues,
    resolver: yupResolver(addPromoterSchema),
  });
  const { setValue, setError } = methods;

  const promoter = useWatch({
    control: methods.control,
    name: "promoter",
    defaultValue: undefined,
  });

  const isSubmitted = useWatch({
    control: methods.control,
    name: "isSubmitted",
    defaultValue: initialPromoterFormValues.isSubmitted,
  });
  const status = useWatch({
    control: methods.control,
    name: "status",
    defaultValue: initialPromoterFormValues.status,
  });

  const handleCancel = () => {
    methods.setValue("phoneNumber", "");
    methods.setValue("selectedEvent", []);
    setClose?.();
  };

  const onSubmit = async (data: ICreatePromoterFormValues) => {
    try {
      // Check if this is the first submission (checking if promoter exists)
      const isFirstSubmission = !data.isSubmitted;

      if (isFirstSubmission) {
        // First API call: Check if promoter exists
        const promotersResponse = await checkPromoterStatus({
          phone: data?.phoneNumber,
        }).unwrap();

        const promoterData = promotersResponse?.data;

        setValue("promoter", promoterData?.promoter);
        setValue("status", promoterData?.status);
        setValue(
          "isSubmitted",
          promoterData?.status === "new" || promoterData?.status === "exist",
        );
        setError("phoneNumber", {
          message: promoterData?.message,
        });
      } else {
        // Second API call: Create new promoter (only if promoter doesn't exist)
        await createPromoter({
          promoter: data.phoneNumber,
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
        }).unwrap();

        methods.clearErrors("phoneNumber");
        setClose?.();
        toast({
          variant: "success",
          title: "Promoter Invitation Sent",
          description: "Promoter added or invited successfully.",
        });
      }
    } catch (error) {
      toast({
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Creating Promoter",
          description: "An error occurred while creating the promoter.",
        }),
      });
    }
  };
  return {
    methods,
    onSubmit,
    watchValues: {
      promoter,
      isSubmitted,
      status,
    },
    setClose,
    handleCancel,
    isLoading: isCheckingPromoterStatus || isCreatingPromoter,
  };
};
