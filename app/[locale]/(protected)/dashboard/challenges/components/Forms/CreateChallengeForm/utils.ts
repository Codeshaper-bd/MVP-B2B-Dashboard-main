import {
  convertLocalToUTC,
  convertUTCToLocalDate,
} from "@/lib/date-time/utc-date";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type {
  TChallengeType,
  TCheckInBeforeType,
  TCreateChallengeCommonArgs,
  TCreateChallengeRes,
  TInviteFriendsType,
  TPurchaseType,
  TPurchaseTypeApiData,
  TSpendType,
} from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";

import type {
  IChallengeFormData,
  TChallengeTypeOption,
  TGetChallengeApiDataToFormData,
  THandleChallengeSubmit,
  THandleChallengeSubmitReturnType,
} from "./types";

export const initialState: IChallengeFormData = {
  name: "",
  typeOfChallenge: undefined,
  checkInTime: undefined,
  amountSpent: 0,
  purchaseQuantity: 0,
  dateRange: undefined,
  pointesEarned: 1,
  description: "",
  numberOfFriends: 0,
  item: undefined,
  maxRedemptionPerNight: 1,
};

export const typeOfChallengeOptions: TChallengeTypeOption[] = [
  {
    label: "Invite Friends",
    value: "INVITE_FRIENDS",
  },
  {
    label: "Check In Before",
    value: "CHECK_IN_BEFORE",
  },
  {
    label: "Spend",
    value: "SPENT",
  },
  {
    label: "Purchase",
    value: "PURCHASE",
  },
];
export const getTypeOfChallengeOptions = (
  type: TChallengeType | TChallengeType[] | void,
) => {
  if (!type) {
    return typeOfChallengeOptions;
  }

  if (Array.isArray(type)) {
    return typeOfChallengeOptions.filter((option) =>
      type.includes(option.value),
    );
  }

  const findRes = typeOfChallengeOptions.find(
    (option) => option.value === type,
  );
  return findRes ? [findRes] : [];
};

export const getChallengeApiDataToFormData: TGetChallengeApiDataToFormData = ({
  getAChallengeData,
  callBack,
}) => {
  const commonFormFields: Pick<
    IChallengeFormData,
    | "name"
    | "dateRange"
    | "description"
    | "pointesEarned"
    | "typeOfChallenge"
    | "maxRedemptionPerNight"
  > = {
    name: getAChallengeData?.name ?? "",
    dateRange: {
      from: convertUTCToLocalDate({
        utcDateTime: getAChallengeData?.startDate,
      }),
      to: convertUTCToLocalDate({ utcDateTime: getAChallengeData?.endDate }),
    },
    description: getAChallengeData?.description ?? "",
    pointesEarned: Number(getAChallengeData?.pointsEarned || 0),
    typeOfChallenge: getTypeOfChallengeOptions(getAChallengeData?.type)?.[0],
    maxRedemptionPerNight: getAChallengeData?.maxRedemptionPerNight,
  };

  switch (getAChallengeData?.type) {
    case "SPENT": {
      const spentData: TSpendType = {
        type: getAChallengeData?.type,
        targetAmount: Number(getAChallengeData?.targetAmount || 0),
      };

      const spentFormdata: Pick<
        IChallengeFormData,
        | "amountSpent"
        | "checkInTime"
        | "item"
        | "numberOfFriends"
        | "purchaseQuantity"
      > = {
        amountSpent: spentData?.targetAmount,
        checkInTime: undefined,
        item: undefined,
        numberOfFriends: 0,
        purchaseQuantity: 0,
      };

      const combinedData = {
        ...commonFormFields,
        ...spentFormdata,
      };
      callBack?.(combinedData);
      return combinedData;
    }

    case "INVITE_FRIENDS": {
      const inviteFriendsData: TInviteFriendsType = {
        type: getAChallengeData?.type,
        targetQuantity: Number(getAChallengeData?.targetQuantity || 0),
      };

      const inviteFriendFormData: Pick<
        IChallengeFormData,
        | "numberOfFriends"
        | "amountSpent"
        | "checkInTime"
        | "item"
        | "purchaseQuantity"
      > = {
        numberOfFriends: inviteFriendsData?.targetQuantity,
        amountSpent: 0,
        checkInTime: undefined,
        item: undefined,
        purchaseQuantity: 0,
      };

      const combinedData = {
        ...commonFormFields,
        ...inviteFriendFormData,
      };

      callBack?.(combinedData);
      return combinedData;
    }

    case "CHECK_IN_BEFORE": {
      const checkInBeforeData: TCheckInBeforeType = {
        type: getAChallengeData?.type,
        expireTime: getAChallengeData?.expireTime ?? "",
      };

      const checkInBeforeFormData: Pick<
        IChallengeFormData,
        | "checkInTime"
        | "amountSpent"
        | "item"
        | "numberOfFriends"
        | "purchaseQuantity"
      > = {
        checkInTime: checkInBeforeData?.expireTime,
        amountSpent: 0,
        item: undefined,
        numberOfFriends: 0,
        purchaseQuantity: 0,
      };

      const combinedData = {
        ...commonFormFields,
        ...checkInBeforeFormData,
      };

      callBack?.(combinedData);
      return combinedData;
    }

    case "PURCHASE": {
      const purchaseData: TPurchaseTypeApiData = {
        type: getAChallengeData?.type,
        targetQuantity: getAChallengeData?.targetQuantity,
        product: getAChallengeData?.product,
      };

      const purchaseFormData: Pick<
        IChallengeFormData,
        | "purchaseQuantity"
        | "amountSpent"
        | "checkInTime"
        | "item"
        | "numberOfFriends"
      > = {
        purchaseQuantity: Number(purchaseData?.targetQuantity || 0),
        item: {
          category: purchaseData?.product?.type, // categoryName
          id: purchaseData?.product?.id,
          currency: "$",
          // currentStock: purchaseData?.product?.,
          description: purchaseData?.product?.description,
          foodVolume: String(purchaseData?.product?.volume || ""),
          image:
            purchaseData?.product?.media?.find((media) => media?.isFeatured)
              ?.url ||
            purchaseData?.product?.media?.[0]?.url ||
            "",
          price: String(purchaseData?.product?.price ?? 0),
          // stock: purchaseData?.product?.currentStock,
          title: purchaseData?.product?.name,
          selectedFoodId: purchaseData?.product?.id,
        },
        amountSpent: 0,
        checkInTime: undefined,
        numberOfFriends: 0,
      };
      const combinedData = {
        ...commonFormFields,
        ...purchaseFormData,
      };

      callBack?.(combinedData);
      return combinedData;
    }

    default:
      break;
  }
};

export const handleChallengeSubmit: THandleChallengeSubmit =
  (props) => async (data) => {
    const {
      reset,
      dialogHookProps: { setClose } = {},
      toastHookProps: { toast } = {},
      setIsSubmitting,
      createChallenge,
      updateAChallenge,
      onSuccess,
      pathNameHookProps,
      routerHookProps,
    } = props;

    const shouldRenderToast =
      (props?.mode === "local-create" && !props?.disableToast) ||
      (props?.mode === "local-edit" && !props?.disableToast) ||
      props?.mode === "server-create" ||
      props?.mode === "server-edit";

    const toastId = shouldRenderToast
      ? toast?.({
          variant: "loading",
          title: "Creating Challenge Item",
          description: "Please wait while creating the challenge item.",
        })
      : null;

    try {
      setIsSubmitting?.(true);
      let returnValue: THandleChallengeSubmitReturnType = null;
      /**
          |--------------------------------------------------
          | numberOfFriends: target_quantity
          | checkInTime: checkInTime
          | item: product
          | amount: target_amount
          | purchaseQuantity: target_quantity
          |--------------------------------------------------
      */
      if (props?.mode === "local-create") {
        props?.onLocalCreateSuccess?.(data);
        returnValue = {
          mode: "local-create",
          data,
        };
      } else if (props?.mode === "local-edit") {
        props?.onLocalEditSuccess?.(data);
        returnValue = {
          mode: "local-edit",
          data,
        };
      }

      if (props?.mode === "server-create" || props?.mode === "server-edit") {
        let apiRes: TCreateChallengeRes | TNullish = null;
        const commonArgs: TCreateChallengeCommonArgs = {
          name: data?.name,
          startDate: convertLocalToUTC({
            localDateTime: data?.dateRange?.from,
            type: "withCurrentTime",
          }),
          endDate: convertLocalToUTC({
            localDateTime: data?.dateRange?.to,
            type: "endOfDay",
          }),
          pointsEarned: Number(data?.pointesEarned || 0),
          description: data?.description,
          maxRedemptionPerNight: data?.maxRedemptionPerNight,
        };

        switch (data?.typeOfChallenge?.value) {
          case "INVITE_FRIENDS":
            {
              const inviteFriendsData: TInviteFriendsType = {
                type: data?.typeOfChallenge?.value,
                targetQuantity: data?.numberOfFriends,
              };
              const combinedData = { ...commonArgs, ...inviteFriendsData };

              if (props?.mode === "server-create") {
                apiRes = await createChallenge?.(combinedData).unwrap?.();
                returnValue = {
                  mode: "server-create",
                  data: apiRes,
                };
              } else if (props?.mode === "server-edit") {
                apiRes = await updateAChallenge?.({
                  slug: props?.editItemSlug,
                  body: combinedData,
                }).unwrap?.();
                returnValue = {
                  mode: "server-edit",
                  data: apiRes,
                };
              }
            }
            break;

          case "CHECK_IN_BEFORE":
            {
              const checkInBeforeData: TCheckInBeforeType = {
                type: data?.typeOfChallenge?.value,
                expireTime: data?.checkInTime ?? "",
              };
              const combinedData = { ...commonArgs, ...checkInBeforeData };

              if (props?.mode === "server-create") {
                apiRes = await createChallenge?.(combinedData).unwrap?.();
                returnValue = {
                  mode: "server-create",
                  data: apiRes,
                };
              } else if (props?.mode === "server-edit") {
                apiRes = await updateAChallenge?.({
                  slug: props?.editItemSlug,
                  body: combinedData,
                }).unwrap?.();
                returnValue = {
                  mode: "server-edit",
                  data: apiRes,
                };
              }
            }
            break;

          case "SPENT":
            {
              const spentData: TSpendType = {
                type: data?.typeOfChallenge?.value,
                targetAmount: data?.amountSpent,
              };
              const combinedData = {
                ...commonArgs,
                ...spentData,
              };

              if (props?.mode === "server-create") {
                apiRes = await createChallenge?.(combinedData).unwrap?.();
                returnValue = {
                  mode: "server-create",
                  data: apiRes,
                };
              } else if (props?.mode === "server-edit") {
                apiRes = await updateAChallenge?.({
                  slug: props?.editItemSlug,
                  body: combinedData,
                }).unwrap?.();
                returnValue = {
                  mode: "server-edit",
                  data: apiRes,
                };
              }
            }
            break;

          case "PURCHASE":
            {
              const purchaseData: TPurchaseType = {
                type: data?.typeOfChallenge?.value,
                targetQuantity: data?.purchaseQuantity,
                productId: data?.item?.id,
              };
              const combinedData = {
                ...commonArgs,
                ...purchaseData,
              };

              if (props?.mode === "server-create") {
                apiRes = await createChallenge?.(combinedData).unwrap?.();
                returnValue = {
                  mode: "server-create",
                  data: apiRes,
                };
              } else if (props?.mode === "server-edit") {
                apiRes = await updateAChallenge?.({
                  slug: props?.editItemSlug,
                  body: combinedData,
                }).unwrap?.();
                returnValue = {
                  mode: "server-edit",
                  data: apiRes,
                };
              }
            }
            break;

          default:
            break;
        }

        if (!apiRes?.success) {
          throw new Error(
            apiRes?.message ||
              `Failed to ${props?.mode === "server-edit" ? "update" : "create"} challenge item`,
          );
        }
        if (!apiRes?.data) {
          throw new Error("Create challenge response data is empty");
        }
        onSuccess?.(apiRes?.data);
        apiRes = null;
      }

      if (shouldRenderToast) {
        toastId?.update?.({
          id: toastId.id,
          variant: "success",
          title: `Successfully ${props?.mode === "local-edit" || props?.mode === "server-edit" ? "Updated" : "Created"} Challenge Item`,
          description: `Challenge ${props?.mode === "local-edit" || props?.mode === "server-edit" ? "updated" : "created"} successfully.`,
        });
      }
      reset?.();
      setClose?.();
      if (pathNameHookProps?.endsWith?.("/challenges")) {
        routerHookProps?.push("/dashboard/challenges/view-all-challenges");
      }
      return returnValue;
    } catch (error) {
      console.error(
        `${props?.mode === "local-edit" || props?.mode === "server-edit" ? "update" : "create"} challenge form error: `,
        error,
      );
      if (shouldRenderToast) {
        toastId?.update?.({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: `Failed to ${props?.mode === "local-edit" || props?.mode === "server-edit" ? "update" : "create"} Challenge Item`,
            description: `Sorry, failed to ${props?.mode === "local-edit" || props?.mode === "server-edit" ? "update" : "create"} challenge item.`,
          }),
        });
      }
    } finally {
      setIsSubmitting?.(false);
    }
  };
