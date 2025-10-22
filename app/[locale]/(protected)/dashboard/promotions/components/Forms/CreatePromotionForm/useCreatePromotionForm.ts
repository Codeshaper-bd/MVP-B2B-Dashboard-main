import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useEffect } from "react";
import { type Resolver, useForm, useWatch } from "react-hook-form";

import {
  useCreateAPromotionMutation,
  useGetAPromotionQuery,
  useUpdateAPromotionMutation,
} from "@/store/api/promotion/promotion-api";
import type { TFreeDrink } from "@/store/api/promotion/promotion.types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { usePathname, useRouter } from "@/components/navigation";
import { useToast } from "@/components/ui/use-toast";

import type { ICreatePromotionFormProps, IPromotionFormData } from "./types";
import { initialState } from "./utils";
import { validationSchema } from "./validator";

const useCreatePromotionForm = (props: ICreatePromotionFormProps) => {
  const { isEditMode, editItemSlug, setIsSubmitting, onSuccess } = props || {};
  const [createAPromotion] = useCreateAPromotionMutation();
  const [updateAPromotion] = useUpdateAPromotionMutation();
  const { data: getAPromotionRes, ...getAPromotionApiState } =
    useGetAPromotionQuery(
      { slug: editItemSlug },
      { skip: !isEditMode || !editItemSlug },
    );
  const getAPromotionData = getAPromotionRes?.data;
  const dialogHookProps = useDialogContext();
  const toastHookProps = useToast();
  const pathnameHookProps = usePathname();
  const routerHookProps = useRouter();
  const createPromotionFormProps = useForm<IPromotionFormData>({
    defaultValues: initialState,
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<IPromotionFormData>,
  });

  const promotionDuration = useWatch({
    control: createPromotionFormProps.control,
    name: "promotionDuration",
    defaultValue: initialState?.promotionDuration,
  });
  const typeOfPromotionValue = useWatch({
    control: createPromotionFormProps.control,
    name: "typeOfPromotion",
    defaultValue: initialState?.typeOfPromotion,
  });

  useEffect(() => {
    if (
      !!isEditMode &&
      !!editItemSlug &&
      getAPromotionData &&
      !getAPromotionApiState?.isLoading &&
      !getAPromotionApiState?.isFetching &&
      !getAPromotionApiState?.isUninitialized &&
      !getAPromotionApiState?.isError &&
      getAPromotionApiState?.isSuccess
    ) {
      // new code

      const commonArgs: Pick<
        IPromotionFormData,
        | "promotionName"
        | "promotionDuration"
        | "description"
        | "product"
        | "pointsNeeded"
        | "maxRedemptionPerNight"
        | "isPrivate"
      > = {
        promotionName: getAPromotionData.name ?? "",
        promotionDuration: {
          from: getAPromotionData.startDate
            ? dayjs(getAPromotionData.startDate).toDate()
            : undefined,
          to: getAPromotionData.endDate
            ? dayjs(getAPromotionData.endDate).toDate()
            : undefined,
        },
        description: getAPromotionData.description ?? "",
        pointsNeeded: getAPromotionData.pointsNeeded ?? 0,
        maxRedemptionPerNight: getAPromotionData.maxRedemptionPerNight ?? 0,
        isPrivate: getAPromotionData?.isPrivate ?? false,
        product: {
          id: getAPromotionData.product.id,
          title: getAPromotionData.product.name,
          category: getAPromotionData.product.type,
          description: getAPromotionData.product.description,
          currency: "$",
          image:
            getAPromotionData?.product?.media?.find(
              (media) => media?.isFeatured,
            )?.url ||
            getAPromotionData?.product?.media?.[0]?.url ||
            "",
          // currentStock: getAPromotionData.product.currentStock,
          foodVolume: String(getAPromotionData.product.volume || ""),
          price: String(getAPromotionData.product.price ?? 0),
          selectedFoodId: getAPromotionData.product.id,
        },
      };

      switch (getAPromotionData.type) {
        case "BUY_X_GET_X_FREE":
          {
            const buyXGetXFormdata: Pick<
              IPromotionFormData,
              "buy" | "free" | "product" | "typeOfPromotion"
            > = {
              buy: getAPromotionData.buyQuantity ?? 0,
              free: getAPromotionData.freeQuantity ?? 0,
              typeOfPromotion: getAPromotionData.type ?? "BUY_X_GET_X_FREE",
              product: commonArgs?.product,
            };

            createPromotionFormProps.reset({
              ...commonArgs,
              ...buyXGetXFormdata,
            });
          }
          break;
        case "FREE_DRINK":
          {
            const freeDrinkData: TFreeDrink = {
              type: getAPromotionData.type,
              productId: getAPromotionData.product.id,
            };
            const freeDrinkFormData: Pick<
              IPromotionFormData,
              "product" | "typeOfPromotion"
            > = {
              typeOfPromotion: getAPromotionData.type ?? "FREE_DRINK",
              product: commonArgs?.product,
            };

            createPromotionFormProps.reset({
              ...commonArgs,
              ...freeDrinkFormData,
            });
          }
          break;
        case "APPLY_DISCOUNT":
          {
            const applyDiscountFormData: Pick<
              IPromotionFormData,
              "product" | "discount" | "discountType" | "typeOfPromotion"
            > = {
              discount: getAPromotionData.discountAmount ?? 0,
              discountType: getAPromotionData.discountType,
              typeOfPromotion: getAPromotionData.type ?? "APPLY_DISCOUNT",
              product: commonArgs?.product,
            };

            createPromotionFormProps.reset({
              ...commonArgs,
              ...applyDiscountFormData,
            });
          }
          break;

        default:
          break;
      }
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEditMode,
    editItemSlug,
    getAPromotionData,
    getAPromotionApiState?.isLoading,
    getAPromotionApiState?.isFetching,
    getAPromotionApiState?.isUninitialized,
    getAPromotionApiState?.isError,
    getAPromotionApiState?.isSuccess,
  ]);

  return {
    createPromotionFormProps,
    dialogHookProps,
    toastHookProps,
    promotionDuration,
    typeOfPromotionValue,
    createAPromotion,
    updateAPromotion,
    getAPromotionApiState,
    getAPromotionData,
    handlePromotionSubmitAssistProps: {
      createPromotionFormProps,
      dialogHookProps,
      toastHookProps,
      createAPromotion,
      updateAPromotion,
      setIsSubmitting,
      isEditMode,
      editItemSlug,
      onSuccess,
      pathnameHookProps,
      routerHookProps,
    },
  };
};

export default useCreatePromotionForm;
