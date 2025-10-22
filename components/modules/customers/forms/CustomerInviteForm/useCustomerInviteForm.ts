import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useCreateACustomerMutation } from "@/store/api/customer-lookup/customer-lookup-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { ICustomerInviteFormsProps } from ".";
import {
  initialInviteCustomerFormValues,
  type TInviteCustomerFormInputs,
} from "./utils";
import { customerValidationSchema } from "./validator";

type TTabValue = "customerLookup" | "inviteHistory";

export type TTabCustomerState = { tab?: TTabValue };

const useCustomerInviteForm = ({
  isSubmitting,
  setIsSubmitting,
}: ICustomerInviteFormsProps) => {
  // state
  const toastHookProps = useToast();
  const { updateMultipleParam } = useManageSearchParams<
    TTabCustomerState & { search?: string }
  >();

  // api
  const [createACustomer] = useCreateACustomerMutation();
  const { setClose } = useDialogContext();

  const formProps = useForm<TInviteCustomerFormInputs>({
    defaultValues: initialInviteCustomerFormValues,
    resolver: yupResolver(customerValidationSchema),
  });

  // roles data

  const onSubmit =
    ({
      toastHookProps,
      setIsSubmitting,
    }: {
      toastHookProps: TUseToastReturnType;
      setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
    }) =>
    async (data: TInviteCustomerFormInputs) => {
      const toastId = toastHookProps.toast({
        variant: "loading",
        title: "Inviting Customer",
        description: "Please wait while we invite the customer.",
      });

      try {
        setIsSubmitting?.(true);
        await createACustomer({
          name: data?.name,
          email: data?.email,
          phone: data?.phone,
        }).unwrap();

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Customer Invited",
          description:
            "Congratulations! The customer has been invited successfully.",
        });

        formProps.reset();
        updateMultipleParam({
          tab: "inviteHistory",
          search: undefined,
        });
        setClose();
      } catch (error) {
        toastId.update({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: "Error Inviting Customer",
            description: "An error occurred while inviting the customer.",
          }),
        });
      } finally {
        setIsSubmitting?.(false);
      }
    };
  return {
    formProps,
    onSubmit,
    toastHookProps,
    setIsSubmitting,
    isSubmitting,
  };
};

export default useCustomerInviteForm;
