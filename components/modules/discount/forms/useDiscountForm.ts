import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import {
  useCreateADiscountMutation,
  useGetADiscountQuery,
  useUpdateADiscountMutation,
} from "@/store/api/discounts/discounts-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast } from "@/components/ui/use-toast";

import discountValidationSchema from "./form-validation";
import {
  type TCreateOrEditDiscountFormProps,
  type TDiscountForm,
} from "./types";
import {
  initialDiscountFormValues,
  prepareDiscountFormStateValues,
} from "./utils";

const useDiscountForm = (props: TCreateOrEditDiscountFormProps) => {
  const { mode, setIsSubmitting } = props;
  const formProps = useForm<TDiscountForm>({
    defaultValues: initialDiscountFormValues,
    resolver: yupResolver(discountValidationSchema),
  });

  const [createADiscount] = useCreateADiscountMutation();
  const [updateADiscount] = useUpdateADiscountMutation();

  const { data: getADiscountRes, ...getADiscountApiState } =
    useGetADiscountQuery(
      {
        id: props?.mode === "server-edit" ? props?.discountId : null,
      },
      {
        skip:
          mode !== "server-edit" ||
          !checkIsValidId(props?.mode === "server-edit" && props?.discountId, {
            type: "number",
          }),
      },
    );
  const getADiscountData = getADiscountRes?.data;

  const toastHookProps = useToast();
  const { setClose } = useDialogContext();

  useEffect(() => {
    if (mode === "server-edit" && getADiscountData) {
      formProps.reset(
        prepareDiscountFormStateValues({
          data: getADiscountData,
        }),
      );
    }

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getADiscountData, mode]);

  useEffect(() => {
    if (props?.mode === "local-edit" && props?.editItemData) {
      formProps.reset(props?.editItemData);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props?.mode,
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (props as { editItemData: TDiscountForm | TNullish })?.editItemData,
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (props as { editItemData: TDiscountForm | TNullish })?.editItemData,
  ]);
  const redeemedCount = useWatch({
    control: formProps.control,
    name: "redeemedCount",
  });

  return {
    formProps,
    onSubmitAssistValues: {
      ...props,
      toastHookProps,
      formProps,
      createADiscount,
      updateADiscount,
      setClose,
      setIsSubmitting,
    },
    toastHookProps,
    getADiscountData,
    getADiscountApiState,
    redeemedCount,
  };
};

export default useDiscountForm;
