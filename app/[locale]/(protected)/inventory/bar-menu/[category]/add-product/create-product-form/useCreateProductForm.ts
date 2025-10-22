import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import {
  useForm,
  useWatch,
  type Resolver,
  type UseFormReturn,
} from "react-hook-form";

import {
  getChallengeApiDataToFormData,
  handleChallengeSubmit,
} from "@/app/[locale]/(protected)/dashboard/challenges/components/Forms/CreateChallengeForm/utils";
import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateBarMenuItemMutation,
  useGetAllBarMenuItemByBarMenuSlugQuery,
  useGetBarMenuItemQuery,
  useUpdateBarMenuItemMutation,
} from "@/store/api/bar-menu-item/bar-menu-item-api";
import type {
  TCreateBarMenuItemMutation,
  TCreateBarMenuItemRes,
  TUpdateBarMenuItemMutation,
} from "@/store/api/bar-menu-item/bar-menu-item.types";
import {
  useCreateAChallengeMutation,
  useGetAllChallengeQuery,
  useUpdateAChallengeMutation,
} from "@/store/api/challenges/challenges-api";
import type {
  TCreateAChallengeMutation,
  TUpdateAChallengeMutation,
} from "@/store/api/challenges/challenges.types";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import {
  useCreateADiscountMutation,
  useGetAllDiscountQuery,
  useUpdateADiscountMutation,
} from "@/store/api/discounts/discounts-api";
import type {
  TCreateADiscountMutation,
  TUpdateADiscountMutation,
} from "@/store/api/discounts/discounts.types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import type { TUploadAMediaMutation } from "@/store/api/media/media.types";
import {
  handleDiscountSubmit,
  prepareDiscountFormStateValues,
} from "@/components/modules/discount/forms/utils";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type {
  ICreateProductFormProps,
  TBarMenuItemFormType,
  TChallengeFormState,
  TDiscountFormState,
  TOnSubmit,
  TPageParams,
  TUniqueProduct,
} from "./types";
import { initialValues } from "./utils";
import { barMenuItemFormValidationSchema } from "./validator";

type TUseCreateProductFormProps = ICreateProductFormProps & {};

function useCreateProductForm({
  isEditMode,
  productSlug,
}: TUseCreateProductFormProps) {
  const isEdit =
    !!isEditMode && checkIsValidId(productSlug, { type: "string" });
  const [createBarMenuItem] = useCreateBarMenuItemMutation();
  const [updateBarMenuItem] = useUpdateBarMenuItemMutation();
  const [uploadAMedia] = useUploadAMediaMutation();
  const [createAChallenge] = useCreateAChallengeMutation();
  const [updateAChallenge] = useUpdateAChallengeMutation();
  const [createADiscount] = useCreateADiscountMutation();
  const [updateADiscount] = useUpdateADiscountMutation();
  const { category: categorySlug, ...restParams } = useParams<TPageParams>();
  const {
    data: getAllBarMenuItemByBarMenuSlugRes,
    ...getAllBarMenuItemByBarMenuSlugApiState
  } = useGetAllBarMenuItemByBarMenuSlugQuery(
    {
      slug: categorySlug,
    },
    {
      skip: !checkIsValidId(categorySlug, {
        type: "string",
      }),
    },
  );
  const { data: getBarMenuItemRes, ...getBarMenuItemApiState } =
    useGetBarMenuItemQuery(
      {
        slug: productSlug,
      },
      {
        skip: !isEdit,
      },
    );
  const getBarMenuItemData = getBarMenuItemRes?.data;
  const { data: getAllChallengeRes, ...getAllChallengeApiState } =
    useGetAllChallengeQuery(
      {
        barMenuItemSlug: productSlug,
      },
      {
        skip: !isEdit,
      },
    );
  const getAllChallengeData = getAllChallengeRes?.data;
  const { data: getAllDiscountRes, ...getAllDiscountApiState } =
    useGetAllDiscountQuery(
      {
        // barMenuItemSlug: productSlug,
        model: "Product",
        modelId: getBarMenuItemData?.id,
      },
      {
        skip: !isEdit,
      },
    );
  const getAllDiscountData = getAllDiscountRes?.data;
  const toastProps = useToast();
  const router = useRouter();

  const formProps = useForm<TBarMenuItemFormType>({
    defaultValues: initialValues,
    resolver: yupResolver(
      barMenuItemFormValidationSchema,
    ) as unknown as Resolver<TBarMenuItemFormType>,
  });

  const isSaleable = useWatch({
    name: "isSaleable",
    control: formProps?.control,
    defaultValue: initialValues?.isSaleable,
  });

  const type = useWatch({
    name: "type",
    control: formProps?.control,
    defaultValue: initialValues?.type,
  });

  const discounts = useWatch({
    name: "discounts",
    control: formProps?.control,
    defaultValue: initialValues?.discounts,
  });

  const challenges = useWatch({
    name: "challenges",
    control: formProps?.control,
    defaultValue: initialValues?.challenges,
  });

  useEffect(() => {
    if (
      isEdit &&
      !getBarMenuItemApiState?.isError &&
      !getBarMenuItemApiState?.isLoading &&
      !getBarMenuItemApiState?.isFetching &&
      getBarMenuItemApiState?.isSuccess &&
      getBarMenuItemData
    ) {
      const formData: TBarMenuItemFormType = {
        ...getBarMenuItemData,
        unit: getBarMenuItemData?.unit ?? "oz",
        ingredients:
          getBarMenuItemData?.ingredients?.map(
            (item): TUniqueProduct => ({
              ...item,
              _id: item?.id,
              usageQuantity: item?.usageQuantity,
              usageUnit: item?.unit,
              unit: item?.unit,
              isFullSize: !!item?.isFullSize,
              ingredientId: item?.id,
            }),
          ) ?? [],
        media:
          getBarMenuItemData?.media?.map((item) => ({
            ...item,
            _id: item?.id,
          })) ?? [],
      };

      formProps.reset(formData);
    }

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getBarMenuItemData,
    isEdit,
    getBarMenuItemApiState?.isError,
    getBarMenuItemApiState?.isLoading,
    getBarMenuItemApiState?.isFetching,
    getBarMenuItemApiState?.isSuccess,
  ]);

  /* discounts */
  useEffect(() => {
    if (
      getAllDiscountApiState?.isSuccess &&
      !getAllDiscountApiState?.isLoading &&
      !getAllDiscountApiState?.isFetching &&
      !getAllDiscountApiState?.isError &&
      getAllDiscountData &&
      isEdit
    ) {
      const discounts = (getAllDiscountData
        ?.map((item): TDiscountFormState | TNullish => {
          let processedData: TDiscountFormState | TNullish = null;
          prepareDiscountFormStateValues({
            data: item,
            callback: (data) => {
              processedData = {
                ...data,
                mode: "edit",
                formIdentifier: crypto.randomUUID(),
                _id: item?.id,
              };
            },
          });
          return processedData;
        })
        .filter(Boolean) ?? []) as TDiscountFormState[];

      formProps?.setValue("discounts", discounts);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // discounts deps
    getAllDiscountData,
    getAllDiscountApiState?.isSuccess,
    getAllDiscountApiState?.isLoading,
    getAllDiscountApiState?.isFetching,
    getAllDiscountApiState?.isError,
    isEdit,
  ]);

  /* challenges */
  useEffect(() => {
    if (
      getAllChallengeApiState?.isSuccess &&
      !getAllChallengeApiState?.isLoading &&
      !getAllChallengeApiState?.isFetching &&
      !getAllChallengeApiState?.isError &&
      getAllChallengeData &&
      isEdit
    ) {
      const challenges = (getAllChallengeData
        ?.map((item): TChallengeFormState | TNullish => {
          let processedData: TChallengeFormState | TNullish = null;
          getChallengeApiDataToFormData({
            getAChallengeData: item,
            callBack: (data) => {
              processedData = {
                ...data,
                mode: "edit",
                formIdentifier: crypto.randomUUID(),
                slug: item?.slug,
              };
            },
          });

          return processedData;

          // ({
          //   mode: "edit",
          //   formIdentifier: crypto.randomUUID(),
          //   slug: item?.slug,
          // });
        })
        .filter(Boolean) ?? []) as TChallengeFormState[];
      formProps?.setValue("challenges", challenges);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // challenges deps
    getAllChallengeData,
    getAllChallengeApiState?.isSuccess,
    getAllChallengeApiState?.isLoading,
    getAllChallengeApiState?.isFetching,
    getAllChallengeApiState?.isError,
    isEdit,
  ]);

  const onSubmit = useCallback(
    ({
      toastProps: { toast },
      toastProps: toastHookProps,
      formProps: { reset },
      barMenuId,
      createBarMenuItem,
      updateBarMenuItem,
      uploadAMedia,
      createAChallenge,
      updateAChallenge,
      createADiscount,
      updateADiscount,
      isEdit,
      productSlug,
    }: {
      toastProps: TUseToastReturnType;
      formProps: UseFormReturn<TBarMenuItemFormType>;
      barMenuId: number | TNullish;
      createBarMenuItem: TCreateBarMenuItemMutation;
      updateBarMenuItem: TUpdateBarMenuItemMutation;
      uploadAMedia: TUploadAMediaMutation;
      createAChallenge: TCreateAChallengeMutation;
      updateAChallenge: TUpdateAChallengeMutation;
      createADiscount: TCreateADiscountMutation;
      updateADiscount: TUpdateADiscountMutation;
      isEdit?: boolean;
      productSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
    }): TOnSubmit =>
      async (data) => {
        const toastId = toast({
          variant: "loading",
          title: `${isEdit ? "Updating" : "Creating"} Product`,
          description: `Please wait while we ${isEdit ? "update" : "create"} your product.`,
        });

        try {
          if (
            !checkIsValidId(barMenuId, {
              type: "number",
            })
          ) {
            throw new Error(
              `barMenuId is required to ${isEdit ? "update" : "create"} a product`,
            );
          }

          let response: TCreateBarMenuItemRes | TNullish = null;
          if (isEdit) {
            response = await updateBarMenuItem({
              slug: productSlug,
              body: {
                ...data,
                barMenuId,
                ingredients: data?.ingredients?.map((item) => ({
                  ingredientId: item?._id,
                  usageUnit: item?.usageUnit,
                  usageQuantity: item?.usageQuantity,
                  isFullSize: item?.isFullSize,
                })),
                media: Array.isArray(data?.media)
                  ? data.media.map((item, idx) => ({
                      id: item?._id,
                      isFeatured: idx === 0,
                    }))
                  : [],
              },
            }).unwrap();
          } else {
            const ingredients =
              data?.ingredients && data.ingredients.length > 0
                ? data.ingredients.map((item) => ({
                    ingredientId: item?._id,
                    usageUnit: item?.usageUnit,
                    usageQuantity: item?.usageQuantity,
                    isFullSize: item?.isFullSize,
                  }))
                : undefined;
            response = await createBarMenuItem({
              ...data,
              barMenuId,
              ingredients,
              // ingredients: data?.ingredients?.map((item) => ({
              //   ingredientId: item?._id,
              //   usageUnit: item?.usageUnit,
              //   usageQuantity: item?.usageQuantity,
              //   isFullSize: item?.isFullSize,
              // })),
              media: Array.isArray(data?.media)
                ? data.media.map((item, idx) => ({
                    id: item?._id,
                    isFeatured: idx === 0,
                  }))
                : [],
            }).unwrap();
          }

          if (!response?.success) {
            throw new Error(
              response?.message ||
                `"Error ${isEdit ? "updating" : "creating"} product"`,
            );
          }

          if (!response?.data) {
            throw new Error(
              `No data returned from the ${isEdit ? "updateBarMenuItem" : "createBarMenuItem"} API`,
            );
          }

          if (data?.challenges?.length) {
            for (let index = 0; index < data.challenges.length; index++) {
              const challenge = data.challenges?.[index];
              const { mode, formIdentifier, ...restChallengeData } = challenge;
              switch (mode) {
                case "create": {
                  const createChallengeRes = await handleChallengeSubmit({
                    mode: "server-create",
                    createChallenge: createAChallenge,
                    onSuccess: (response) => {},
                    toastHookProps,
                  })({
                    ...challenge,
                    item: {
                      selectedFoodId: response?.data?.id,
                      id: response?.data?.id,
                      category: response?.data?.barMenuId,
                      title: response?.data?.name,
                      image: response?.data?.media?.[0]?.url ?? "",
                      description: response?.data?.description,
                      price: String(response?.data?.price ?? "N/A"),
                      foodVolume: String(response?.data?.volume ?? "N/A"),
                    },
                  });
                  break;
                }
                case "edit": {
                  const updateChallengeRes = await handleChallengeSubmit({
                    mode: "server-edit",
                    editItemSlug: challenge?.slug,
                    updateAChallenge,
                    toastHookProps,
                    onSuccess: (response) => {},
                  })({
                    ...challenge,
                    item: {
                      selectedFoodId: response?.data?.id,
                      id: response?.data?.id,
                      category: response?.data?.barMenuId,
                      title: response?.data?.name,
                      image: response?.data?.media?.[0]?.url ?? "",
                      description: response?.data?.description,
                      price: String(response?.data?.price ?? "N/A"),
                      foodVolume: String(response?.data?.volume ?? "N/A"),
                    },
                  });
                  break;
                }

                default:
                  break;
              }
            }
          }

          if (data?.discounts?.length) {
            for (let index = 0; index < data.discounts.length; index++) {
              const discount = data.discounts?.[index];
              const { mode, formIdentifier, ...restDiscountData } = discount;
              switch (mode) {
                case "create": {
                  const createDiscountRes = await handleDiscountSubmit({
                    mode: "server-create",
                    model: "Product",
                    modelId: response?.data?.id,
                    createADiscount,
                    toastHookProps,
                  })(restDiscountData);
                  break;
                }
                case "edit": {
                  const updateDiscountRes = await handleDiscountSubmit({
                    mode: "server-edit",
                    updateADiscount,
                    toastHookProps,
                    discountId: discount?._id,
                  })(restDiscountData);
                  break;
                }

                default:
                  break;
              }
            }
          }

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: `Product ${isEdit ? "Updated" : "Created"} Successfully!`,
            description: getApiErrorMessage(
              response?.message,
              `Congratulations! You have successfully ${isEdit ? "updated" : "created"} a new product.`,
            ),
          });
          reset();

          router.push(`/en/inventory/bar-menu/${categorySlug}`);
        } catch (error) {
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: `Product ${isEdit ? "Update" : "Creation"} Failed`,
              description: "Something went wrong! Please try again.",
            }),
          });
        }
      },
    [categorySlug, router],
  );

  return {
    formProps,
    isEditMode: isEdit,
    onSubmit,
    onSubmitAssistProps: {
      toastProps,
      formProps,
      barMenuId: getAllBarMenuItemByBarMenuSlugRes?.data?.barMenu?.id,
      createBarMenuItem,
      updateBarMenuItem,
      uploadAMedia,
      createAChallenge,
      updateAChallenge,
      createADiscount,
      updateADiscount,
      isEdit,
      productSlug,
    },
    watchValues: {
      isSaleable,
      type,
      discounts,
      challenges,
      // unit,
    },
    getAllBarMenuItemByBarMenuSlugRes,
    getAllBarMenuItemByBarMenuSlugApiState,
    getAllChallengeApiState,
    getAllDiscountApiState,
  };
}

export default useCreateProductForm;
