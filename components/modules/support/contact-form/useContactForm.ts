import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import type { TLinkAMediaToAModuleArgs } from "@/store/api/media/media.types";
import { useCreateASupportTicketsMutation } from "@/store/api/support-tickets/support-tickets-api";
import { useRouter } from "@/components/navigation";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import { initialContactFormInputs, type TContactFormInputs } from "./utils";
import contactFormValidationSchema from "./validation";

const useContactForm = () => {
  const [uploadAMedia] = useUploadAMediaMutation();
  const [createASupportTickets] = useCreateASupportTicketsMutation();
  const router = useRouter();

  const formProps = useForm<TContactFormInputs>({
    defaultValues: initialContactFormInputs,
    resolver: yupResolver(contactFormValidationSchema),
  });
  const toastHookProps = useToast();

  const onSubmit =
    ({ toastHookProps }: { toastHookProps: TUseToastReturnType }) =>
    async (data: TContactFormInputs) => {
      const toastId = toastHookProps.toast({
        variant: "loading",
        title: "Creating Support Ticket",
        description: "Please wait while we create your support ticket",
      });
      try {
        const formData = {
          priority: data?.priority,
          subject: data?.subject,
          tags: data?.tags?.map((tag) => tag?.value),
          type: data?.type,
          description: data?.description,
          media: [] as TLinkAMediaToAModuleArgs[],
        };

        if (data?.images?.length) {
          for (let i = 0; i < data?.images?.length; i++) {
            const mediaCurrentData = data?.images[i];

            const { data: mediaData } =
              (await uploadAMedia({
                file: mediaCurrentData,
                tags: ["Support"],
              }).unwrap()) || {};

            if (mediaData) {
              formData?.media?.push({
                id: mediaData?.id,
                isFeatured: false,
              });
            }
          }
        }

        await createASupportTickets(formData).unwrap();

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Request Submitted Successfully!",
          description:
            "Thank you! Your support request has been received. Our team will review your issue and respond via email.",
        });
        formProps.reset(initialContactFormInputs);
        router.back();
      } catch (err) {
        toastId?.update({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error: err,
            title: "Error creating Support Ticket",
            description: "There was an error creating your support ticket.",
          }),
        });
      }
    };
  return {
    formProps,
    onSubmit,
    toastHookProps,
  };
};

export default useContactForm;
