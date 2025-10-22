import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type {
  TCreateGroupDiscountArgs,
  TCreateGroupDiscountRes,
} from "@/store/api/group-discounts/group-discounts.types";

import type {
  THandleGroupDiscountSubmit,
  TGroupDiscountFormInput,
} from "./types";

export const initialGroupDiscountValues: TGroupDiscountFormInput = {
  type: "PERCENTAGE",
  amount: 0,
  minQty: 0,
  maxQty: 0,
};

export const handleGroupDiscountSubmit: THandleGroupDiscountSubmit =
  ({
    toastProps: { toast },
    createAGroupDiscount,
    updateAGroupDiscount,
    eventId,
    isEditMode,
    groupDiscountId,
  }) =>
  async (data: TGroupDiscountFormInput) => {
    const toastId = toast({
      variant: "loading",
      title: `${isEditMode ? "Updating" : "Creating"} Group Discount`,
      description: `Please wait while we ${isEditMode ? "update" : "create"} your group discount`,
    });

    const formdata: TCreateGroupDiscountArgs = {
      eventId,
      maxQty: data?.maxQty,
      minQty: data?.minQty,
      type: data?.type,
      amount: data?.amount,
    };

    try {
      if (!checkIsValidId(eventId)) {
        throw new Error("Event ID is required to create a group discount");
      }

      let apiRes: TCreateGroupDiscountRes | null = null;

      if (isEditMode) {
        apiRes = await updateAGroupDiscount({
          id: groupDiscountId,
          body: formdata,
        }).unwrap();
      } else {
        apiRes = await createAGroupDiscount(formdata).unwrap();
      }

      if (!apiRes?.success) {
        throw new Error(
          apiRes?.message ||
            `Group discount ${isEditMode ? "update failed" : "create failed"}`,
        );
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: `Group Discount ${isEditMode ? "Updated" : "Created"}`,
        description: `Your group discount has been ${isEditMode ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      console.error(
        "🚀 ~ file: group-discount-form.tsx ~ line 49 ~ onSubmit ~ error",
        error,
      );

      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: `Group Discount ${isEditMode ? "Update" : "Creation"} Failed`,
          description: `Failed to ${isEditMode ? "update" : "create"} group discount. Please try again later.`,
        }),
      });
    }
  };
