import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import {
  useCreateAGroupDiscountMutation,
  useGetAGroupDiscountQuery,
  useUpdateAGroupDiscountMutation,
} from "@/store/api/group-discounts/group-discounts-api";
import type { IApiStateInfo } from "@/components/render-data";
import { useToast } from "@/components/ui/use-toast";

import { type TGroupDiscountFormInput } from "./types";
import { initialGroupDiscountValues } from "./utils";
import groupDiscountValidation from "./validator";
interface IGroupDiscountFormProps {
  getAnEventData: TEvent | TNullish;
  getAnEventApiState: IApiStateInfo;
}
const useManageGroupDiscount = ({
  getAnEventData,
  getAnEventApiState,
}: IGroupDiscountFormProps) => {
  const eventId = getAnEventData?.details?.id;
  const isEditMode =
    checkIsValidId(getAnEventData?.groupDiscount?.id) &&
    checkIsValidId(eventId);
  const { data: getAGroupDiscountRes, ...getAGroupDiscountApiState } =
    useGetAGroupDiscountQuery(
      {
        id: getAnEventData?.groupDiscount?.id,
      },
      {
        skip: !isEditMode || !checkIsValidId(getAnEventData?.groupDiscount?.id),
      },
    );
  const getAGroupDiscountData = getAGroupDiscountRes?.data;
  const [createAGroupDiscount] = useCreateAGroupDiscountMutation();
  const [updateAGroupDiscount] = useUpdateAGroupDiscountMutation();
  const toastProps = useToast();
  const formProps = useForm<TGroupDiscountFormInput>({
    defaultValues: initialGroupDiscountValues,
    resolver: yupResolver(groupDiscountValidation),
  });

  const discountType = useWatch({
    control: formProps?.control,
    name: "type",
    defaultValue: initialGroupDiscountValues.type,
  });

  useEffect(() => {
    if (getAGroupDiscountData && isEditMode) {
      formProps?.reset({
        type: getAGroupDiscountData?.type,
        amount: getAGroupDiscountData?.amount,
        minQty: getAGroupDiscountData?.minQty,
        maxQty: getAGroupDiscountData?.maxQty,
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, getAGroupDiscountData]);

  return {
    handleGroupDiscountSubmitAssistProps: {
      toastProps,
      createAGroupDiscount,
      updateAGroupDiscount,
      eventId,
      isEditMode,
      groupDiscountId: getAnEventData?.groupDiscount?.id,
    },
    discountType,
    formProps,
    getAnEventApiState,
    getAGroupDiscountRes,
    getAGroupDiscountData,
    getAGroupDiscountApiState,
    isEditMode,
  };
};

export default useManageGroupDiscount;
