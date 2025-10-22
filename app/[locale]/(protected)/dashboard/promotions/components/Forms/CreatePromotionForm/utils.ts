import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import generateFeedbackMessages from "@/lib/notification/generate-feedback-messages";
import type {
  TBuyXGetX,
  TConditionalCreatePromotionArgs,
  TCreatePromotionArgs,
  TCreatePromotionCommonArgs,
  TCreatePromotionRes,
  TUpdateAPromotionRes,
} from "@/store/api/promotion/promotion.types";

import type {
  IPromotionFormData,
  TDiscountTypeOption,
  THandlePromotionSubmit,
  TPromotionTypeOption,
} from "./types";

export const initialState: IPromotionFormData = {
  promotionName: "",
  typeOfPromotion: undefined,
  promotionDuration: undefined,
  description: "",
  buy: 0,
  free: 0,
  product: undefined,
  discountType: "FIXED_AMOUNT",
  discount: 0,
  pointsNeeded: 0,
  maxRedemptionPerNight: 1,
  isPrivate: false,
};

export const typeOfPromotionOptions: TPromotionTypeOption[] = [
  {
    label: "BUY X GET Y FREE",
    value: "BUY_X_GET_X_FREE",
  },
  {
    label: "Free drink",
    value: "FREE_DRINK",
  },
  {
    label: "Apply Discount",
    value: "APPLY_DISCOUNT",
  },
];

export const discountOptions: TDiscountTypeOption[] = [
  {
    label: "%",
    value: "PERCENTAGE",
  },
  {
    label: "$",
    value: "FIXED_AMOUNT",
  },
];

export const handlePromotionSubmit: THandlePromotionSubmit =
  ({
    dialogHookProps: { setClose },
    toastHookProps: { toast },
    createPromotionFormProps: { reset },
    setIsSubmitting,
    isEditMode,
    editItemSlug,
    createAPromotion,
    updateAPromotion,
    onSuccess,
    pathnameHookProps,
    routerHookProps,
  }) =>
  async (data) => {
    const { loadingMessage, successMessage, errorMessage } =
      generateFeedbackMessages(isEditMode ? "update" : "create", {
        name: "Promotion Item",
      });

    // Show loading toast:
    const toastId = toast({
      variant: "loading",
      title: loadingMessage.title,
      description: loadingMessage.description,
    });

    try {
      setIsSubmitting?.(true);

      // Build the common arguments used for both create and update:
      const commonArgs: TCreatePromotionCommonArgs &
        Pick<TBuyXGetX, "productId"> = {
        name: data?.promotionName,
        startDate: convertLocalToUTC({
          localDateTime: data?.promotionDuration?.from,
          type: "withCurrentTime",
        }),
        endDate: convertLocalToUTC({
          localDateTime: data?.promotionDuration?.to,
          type: "endOfDay",
        }),
        description: data?.description,
        productId: data?.product?.id ? Number(data?.product?.id) : -1,
        pointsNeeded: data?.pointsNeeded ?? 0,
        maxRedemptionPerNight: data?.maxRedemptionPerNight ?? 0,
        isPrivate: data?.isPrivate ?? false,
      };

      // Create promotion-specific fields based on the type:
      let promotionSpecificData: TConditionalCreatePromotionArgs | null = null;
      switch (data?.typeOfPromotion) {
        case "BUY_X_GET_X_FREE":
          promotionSpecificData = {
            type: "BUY_X_GET_X_FREE",
            buyQuantity: Number(data?.buy),
            freeQuantity: Number(data?.free),
            productId: commonArgs.productId,
          };
          break;
        case "APPLY_DISCOUNT":
          promotionSpecificData = {
            type: "APPLY_DISCOUNT",
            discountType: data?.discountType ?? "FIXED_AMOUNT",
            discountAmount: Number(data?.discount),
            productId: commonArgs.productId,
          };
          break;
        case "FREE_DRINK":
          promotionSpecificData = {
            type: "FREE_DRINK",
            productId: commonArgs.productId,
          };
          break;
        default:
          throw new Error("Unsupported promotion type");
      }

      // Execute the create or update API call:
      let promotionRes: TCreatePromotionRes | TUpdateAPromotionRes | null =
        null;
      const combinedApiArgsData: TCreatePromotionArgs = {
        ...commonArgs,
        ...promotionSpecificData,
      };
      if (isEditMode) {
        if (!updateAPromotion || !editItemSlug) {
          throw new Error(
            "Update function or edit slug missing for update mode",
          );
        }
        promotionRes = await updateAPromotion({
          slug: editItemSlug,
          body: combinedApiArgsData,
        })?.unwrap?.();
      } else {
        if (!createAPromotion) {
          throw new Error("Create function missing for creation mode");
        }
        promotionRes = await createAPromotion(combinedApiArgsData)?.unwrap?.();
      }

      if (!promotionRes?.data) {
        throw new Error(
          isEditMode
            ? "No promotion data returned from update"
            : "No promotion data returned from creation",
        );
      }

      // Call the onSuccess callback:
      onSuccess?.(promotionRes?.data);

      // Update toast to success:
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: successMessage.title,
        description: successMessage.description,
      });
      if (pathnameHookProps?.endsWith?.("/promotions")) {
        routerHookProps?.push("/dashboard/promotions/view-more-promotion");
      }
      reset();
      setClose();

      return {
        success: true,
        formData: data,
        apiResData: promotionRes?.data,
      };
    } catch (error) {
      console.error(
        isEditMode
          ? "Update promotion form error: "
          : "Create promotion form error: ",
        error,
      );
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: errorMessage.title,
          description: errorMessage.description,
        }),
      });

      return {
        success: false,
        formData: data,
        apiResData: null,
      };
    } finally {
      setIsSubmitting?.(false);
    }
  };
