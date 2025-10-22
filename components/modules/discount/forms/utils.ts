import dayjs from "dayjs";

import { convertLocalToUTC, convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TCreateDiscountArgs,
  TDiscount,
  TUpdateADiscountRes,
} from "@/store/api/discounts/discounts.types";
import { type TUseToastReturnType } from "@/components/ui/use-toast";

import type { TDiscountForm, THandleDiscountSubmit } from "./types";

export const initialDiscountFormValues: TDiscountForm = {
  name: "",
  code: "",
  discountType: "PERCENTAGE",
  amount: 1,
  expirationDate: new Date(),
  maxNumberOfRedemptions: 1,
  maxTicketsPerRedemption: 1,
};

export const prepareDiscountFormStateValues = ({
  data,
  callback,
}: {
  data: TDiscount;
  callback?: (data: TDiscountForm) => void;
}): TDiscountForm => {
  const formData = {
    name: data?.name ?? "",
    amount: data?.amount ?? 0,
    maxNumberOfRedemptions: data?.maxNumberOfRedemptions ?? 0,
    maxTicketsPerRedemption: data?.maxTicketsPerRedemption ?? 0,
    code: data?.code ?? "",
    discountType: data?.discountType || initialDiscountFormValues.discountType,
    expirationDate: dayjs(
      convertUTCToLocal({ utcDateTime: data?.expireDate }),
    ).toDate(),
    redeemedCount: data?.redeemedCount ?? 0,
  };
  callback?.(formData);

  return formData;
};

export const handleDiscountSubmit: THandleDiscountSubmit =
  (props) => async (data) => {
    const {
      toastHookProps,
      formProps,
      createADiscount,
      updateADiscount,
      setClose,
      setIsSubmitting,
      mode,
    } = props;
    const isEditMode = mode === "local-edit" || mode === "server-edit";
    let toastId: ReturnType<TUseToastReturnType["toast"]> | TNullish = null;
    const shouldShowToast =
      (props?.mode === "local-create" && !props?.disableToast) ||
      (props?.mode === "local-edit" && !props?.disableToast) ||
      props?.mode === "server-create" ||
      props?.mode === "server-edit";

    if (shouldShowToast) {
      toastId = toastHookProps?.toast?.({
        variant: "loading",
        title: `${isEditMode ? "Updating" : "Creating"} Discount`,
        description: `"Please wait while we ${isEditMode ? "update" : "create"} the Discount"`,
      });
    }
    setIsSubmitting?.(true);

    try {
      if (props?.mode === "local-create") {
        props?.onLocalCreateSuccess?.(data);
      } else if (props?.mode === "local-edit") {
        props?.onLocalEditSuccess?.(data);
      }

      if (props?.mode === "server-create" || props?.mode === "server-edit") {
        let apiRes: TUpdateADiscountRes | TNullish = null;
        const formData: Omit<TCreateDiscountArgs, "model" | "modelId"> = {
          name: data?.name,
          amount: Number(data?.amount),
          maxNumberOfRedemptions: Number(data?.maxNumberOfRedemptions),
          maxTicketsPerRedemption: Number(data?.maxTicketsPerRedemption),
          code: data?.code,
          discountType: data?.discountType,
          expireDate: convertLocalToUTC({
            localDateTime: data?.expirationDate,
            type: "endOfDay",
          }),
        };
        if (props?.mode === "server-edit") {
          if (typeof props?.discountId !== "number") {
            throw new Error("Discount Id is required");
          }

          apiRes = await updateADiscount?.({
            id: props?.discountId,
            body: formData,
          }).unwrap();
        } else if (props?.mode === "server-create") {
          if (typeof props?.model !== "string") {
            throw new Error("Model type is required");
          }
          if (typeof props?.modelId !== "number") {
            throw new Error("Event Id is required");
          }

          apiRes = await createADiscount?.({
            ...formData,
            model: props?.model,
            modelId: props?.modelId,
          })?.unwrap?.();
        }

        if (!apiRes?.success) {
          throw new Error(apiRes?.message || "Failed to create discount");
        }
        if (!apiRes?.data) {
          throw new Error("Data not found in response");
        }
      }

      if (shouldShowToast) {
        toastId?.update?.({
          id: toastId.id,
          variant: "success",
          title: `Discount Successfully ${isEditMode ? "Updated" : "Created"}!`,
          description: `Congratulations! Successfully ${isEditMode ? "updated" : "created"} a discount`,
        });
      }

      formProps?.reset?.();
      setClose?.();
    } catch (error) {
      console.error("Error creating discount code:", error);
      if (shouldShowToast) {
        toastId?.update?.({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: `Discount ${isEditMode ? "Update" : "Creation"} Failed`,
            description: `An error occurred while ${isEditMode ? "updating" : "creating"} the Discount.`,
          }),
        });
      }
    } finally {
      setIsSubmitting?.(false);
    }
  };
