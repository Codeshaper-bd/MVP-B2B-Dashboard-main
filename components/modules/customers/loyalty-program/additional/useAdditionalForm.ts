import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import {
  useGetAllCustomerLookupQuery,
  useLazyGetAllCustomerLookupQuery,
} from "@/store/api/customer-lookup/customer-lookup-api";
import { useCreateLoyaltyProgramPointsMutation } from "@/store/api/loyalty-program/loyalty-program.api";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { TAdditionalSettingsFormType, THandleLoadOptions } from "./types";
import { additionalValidationSchema } from "./validator";

const useAdditionalForm = () => {
  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const toastHookProps = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // add points api
  const [createLoyaltyProgramPoints] = useCreateLoyaltyProgramPointsMutation();
  // get all customers
  const [getAllCustomerLookup] = useLazyGetAllCustomerLookupQuery();
  const { data: getAllCustomersRes, ...getAllCustomersApiState } =
    useGetAllCustomerLookupQuery();
  const getAllCustomersData = getAllCustomersRes?.data;
  const defaultOptions: IOption[] =
    useMemo(
      () =>
        getAllCustomersData?.map(
          (customer): IOption => ({
            value: customer.id ?? -1,
            label: customer?.fullName,
            data: customer,
          }),
        ) ?? [],
      [getAllCustomersData],
    ) || [];

  const handleLoadOptions: THandleLoadOptions = useCallback(
    ({ getAllCustomerLookup }) =>
      async (inputValue, callback) => {
        // debounce implementation start
        if (searchTimeoutId.current) {
          clearTimeout(searchTimeoutId.current);
        }
        let searchValue: string | undefined = undefined;
        await new Promise<void>((resolve) => {
          searchTimeoutId.current = setTimeout(() => {
            searchValue = inputValue;
            resolve();
          }, 800);
        });
        searchValue = inputValue;
        // debounce implementation end

        /* ---------------------------------------------------------------------------------------- */

        // data fetching (by debounced search) start
        try {
          const getAllCustomerRes = await getAllCustomerLookup(
            {
              search: searchValue?.toLowerCase(),
            },
            true,
          ).unwrap();
          const getAllCustomerData = getAllCustomerRes?.data;

          return (
            getAllCustomerData?.map((customer) => ({
              value: customer.id ?? -1,
              label: customer?.fullName,
              data: customer,
            })) ?? []
          );
        } catch (error) {
          console.error("Error fetching promoters:", error);
          return [];
        }
        // data fetching (by debounced search) end
      },
    [],
  );

  // debounce implementation cleanup start
  useEffect(() => {
    const currentSearchTimeoutId = searchTimeoutId.current;
    return () => {
      if (currentSearchTimeoutId) {
        clearTimeout(currentSearchTimeoutId);
      }
    };
  }, []);
  // debounce implementation cleanup end
  const formProps = useForm<TAdditionalSettingsFormType>({
    defaultValues: {
      user: null,
      points: 0,
    },
    resolver: yupResolver(
      additionalValidationSchema,
    ) as unknown as Resolver<TAdditionalSettingsFormType>,
  });

  // form submit
  const onSubmit =
    ({ toastHookProps }: { toastHookProps: TUseToastReturnType }) =>
    async (data: TAdditionalSettingsFormType) => {
      const toastId = toastHookProps.toast({
        variant: "loading",
        title: "Add Free Points",
        description: "Please wait while we add your points",
      });

      try {
        setIsSubmitting?.(true);
        await createLoyaltyProgramPoints({
          userId: data.user?.value ?? -1,
          points: convertToNumber({
            value: data.points,
            digit: 0,
          }),
        });

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Added Points",
          description: "You have successfully added points",
        });
        setIsSubmitting?.(false);
      } catch (error) {
        console.error("Error Adding Points:", error);
        toastId.update({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: "Error Adding Points",
            description: "An error occurred while adding points",
          }),
        });
      } finally {
        setIsSubmitting?.(false);
      }
    };
  return {
    formProps,
    onSubmit,
    asyncSelectProps: {
      defaultOptions,
      handleLoadOptions,
      getAllCustomerLookup,
      getAllCustomersApiState,
    },
    toastHookProps,
    isSubmitting,
  };
};

export default useAdditionalForm;
