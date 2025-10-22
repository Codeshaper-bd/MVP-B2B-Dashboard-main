import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { IAttachFormProps } from "./attach-form";
import type { TAttachFormType } from "./types";

const useAttachSocial = (props: IAttachFormProps) => {
  const { isEditMode } = props;
  const toastHookProps = useToast();
  const { setClose } = useDialogContext();

  const formProps = useForm<TAttachFormType>({
    defaultValues: {
      selectedSocial: "facebook",
    },
  });

  // useEffect(() => {
  //   if (isEditMode) {

  //   }

  // }, [ isEditMode]);

  const onSubmit = useCallback(
    ({
      setClose,
    }: {
      toastHookProps: TUseToastReturnType;

      setClose: () => void;
    }) =>
      async (data: TAttachFormType) => {
        setClose();
        // const toastId = toastHookProps.toast({
        //   variant: "loading",
        //   title: `${isEditMode ? "Updating" : "Creating"} Ticket Tier`,
        //   description: `Please wait while we ${isEditMode ? "update" : "create"} the Ticket Tier`,
        // });

        // const formData = {
        //   ...data,

        // };

        // try {
        //   if (!eventId) {
        //     throw new Error("Event ID is required");
        //   }

        //   if (isEditMode) {
        //     await updateATicketTiers({
        //       slug: selectedSlug,
        //       body: formData,
        //     }).unwrap();
        //   } else {
        //     await createATicketTiers(formData).unwrap();
        //   }

        //   toastId.update({
        //     id: toastId.id,
        //     variant: "success",
        //     title: `Ticket Tier ${isEditMode ? "Updated" : "Created"} Successfully!`,
        //     description: `The Ticket Tier details have been successfully ${isEditMode ? "updated" : "created"}.`,
        //   });

        //   formProps.reset();
        //   setClose();
        // } catch (error) {
        //   console.error("Error creating ticket tier:", error);
        //   toastId.update({
        //     id: toastId.id,
        //     variant: "error",
        //     title: `Ticket Tier ${isEditMode ? "Update" : "Creation"} Failed`,
        //     description: getApiErrorMessage(
        //       error,
        //       `An error occurred while ${isEditMode ? "updating" : "creating"} the ticket tier.`,
        //     ),
        //   });
        // }
      },
    [],
  );

  return {
    formProps,
    onSubmit,
    toastHookProps,

    onSubmitAssistProps: {
      toastHookProps,
      isEditMode,
      formProps,
      setClose,
      isSubmitting: props?.isSubmitting,
      setIsSubmitting: props?.setIsSubmitting,
    },
  };
};

export default useAttachSocial;
