import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { type Resolver, useForm } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateBankDetailsMutation,
  useGetABankDetailsQuery,
  useUpdateBankDetailsMutation,
} from "@/store/api/bank-details/bank-details-api";
import type { TCreateBankDetailsArgs } from "@/store/api/bank-details/bank-details.types";
import { useToast } from "@/components/ui/use-toast";

import { initialState } from "./utils";
import { validationSchema } from "./validator";

interface ICreateBankDetailsFormProps {
  handleBackToPaymentMethod?: () => void;
  isEdit?: boolean;
  bankDetailsId?: number;
}

const useCreateBankDetails = ({
  handleBackToPaymentMethod,
  isEdit,
  bankDetailsId,
}: ICreateBankDetailsFormProps) => {
  const { toast } = useToast();

  const [createBankDetails, { isLoading }] = useCreateBankDetailsMutation();
  const [updateABankDetails, { isLoading: isUpdating }] =
    useUpdateBankDetailsMutation();

  const formProps = useForm<TCreateBankDetailsArgs>({
    defaultValues: initialState,
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<TCreateBankDetailsArgs>,
  });

  const { data: getABankDetailsRes, ...getABankDetailsApiState } =
    useGetABankDetailsQuery(
      {
        id: bankDetailsId,
      },
      {
        skip: !checkIsValidId(bankDetailsId),
      },
    );
  const getABankDetailsData = getABankDetailsRes?.data;

  useEffect(() => {
    if (isEdit && getABankDetailsData) {
      const fetchData = async () => {
        const formData = {
          bankAccountNumber: getABankDetailsData?.bankAccountNumber ?? "",
          transitNumber: getABankDetailsData?.transitNumber ?? "",
          institutionNumber: getABankDetailsData?.institutionNumber ?? "",
          bankName: getABankDetailsData?.bankName ?? "",
          country: getABankDetailsData?.country ?? "",
          province: getABankDetailsData?.province ?? "",
          postalCode: getABankDetailsData?.postalCode ?? "",
          email: getABankDetailsData?.email ?? "",
        };

        formProps.reset(formData);
      };
      fetchData();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getABankDetailsData, isEdit, bankDetailsId]);

  const onSubmit = async (data: TCreateBankDetailsArgs) => {
    const toastId = toast({
      variant: "loading",
      title: `${isEdit ? "Updating" : "Adding"} Bank Details`,
      description: `Please wait while we ${isEdit ? "update" : "add"} your bank details.`,
    });
    try {
      if (isEdit) {
        await updateABankDetails({
          id: bankDetailsId,
          body: { ...data },
        }).unwrap();
      } else {
        await createBankDetails(data).unwrap();
      }
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: isEdit
          ? "Bank Details Updated Successfully!"
          : "Bank Details Added Successfully!",
        description: isEdit
          ? "Your bank details have been update successfully."
          : "Congratulations! Your bank details have been added successfully.",
      });
      handleBackToPaymentMethod?.();
    } catch (error) {
      console.error(error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Add Bank Details Failed",
          description: "An error occurred while adding your bank details.",
        }),
      });
    }
  };

  return {
    formProps,
    onSubmit,
    isLoading: isLoading || isUpdating,
    getABankDetailsApiState,
    getABankDetailsData,
  };
};

export default useCreateBankDetails;
