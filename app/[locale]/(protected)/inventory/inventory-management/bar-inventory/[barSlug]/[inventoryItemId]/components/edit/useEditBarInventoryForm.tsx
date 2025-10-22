import { yupResolver } from "@hookform/resolvers/yup";
import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  type Resolver,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import {
  useGetBarInventoryItemQuery,
  useUpdateBarInventoryItemMutation,
} from "@/store/api/bar-inventory/bar-inventory-api";
import { useGetAllInventoryCategoryQuery } from "@/store/api/inventory-category/inventory-category-api";
import type { TInventoryCategory } from "@/store/api/inventory-category/inventory-category.types";
import type { TSoldBy } from "@/store/api/inventory-item/inventory-item.types";
import PencilIcon from "@/components/icons/PencilIcon";
import { useRouter } from "@/components/navigation";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { useToast } from "@/components/ui/use-toast";

import type { TBarInventoryFormType } from "./types";
import {
  initialValues,
  transformApiDataToFormData,
  transformFormDataToApiData,
} from "./utils";
import { inventoryItemFormValidationSchema } from "./validation-schema";
import AddInventoryCategoryDialog from "../../../../../[inventoryType]/update-inventory/components/inventory-form/forms/add-category-dialog";

export interface IPageParams extends Params {
  locale?: string;
  barSlug?: string;
  inventoryItemId?: string;
}

type TUseCreateInventoryProductFormProps = {
  isEditMode?: boolean;
  closeModal?: () => void;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

function useEditBarInventoryForm({
  isEditMode,
  closeModal,
  setIsLoading,
}: TUseCreateInventoryProductFormProps) {
  const router = useRouter();
  // search params

  const params = useParams<IPageParams>();

  const { data: getBarInventoryItemRes, ...getBarInventoryItemApiState } =
    useGetBarInventoryItemQuery(
      {
        barSlug: params?.barSlug,
        inventoryItemId: params?.inventoryItemId,
      },
      {
        skip:
          !checkIsValidId(params?.barSlug, { type: "string" }) &&
          !checkIsValidId(
            convertToNumber({
              value: params?.inventoryItemId,
              fallback: -1,
              digit: 0,
            }),
            { type: "number" },
          ) &&
          !isEditMode,
      },
    );
  const getBarInventoryItemData = getBarInventoryItemRes?.data;
  const [updateBarInventoryItem] = useUpdateBarInventoryItemMutation();
  const inventoryProductToastProps = useToast();
  const toastProps = useToast();
  const [soldByState, setSoldByState] = useState<TSoldBy | undefined>(
    undefined,
  );

  const editBarInventoryFormProps = useForm<TBarInventoryFormType>({
    resolver: yupResolver(
      inventoryItemFormValidationSchema,
    ) as unknown as Resolver<TBarInventoryFormType>,
    context: { soldByState },
    defaultValues: initialValues,
  });

  const { setValue, reset, control } = editBarInventoryFormProps;
  const volumesFieldArrayProps = useFieldArray({ control, name: "volumes" });

  const soldBy = useWatch({ control, name: "soldBy" });
  const media = useWatch({ control, name: "media" });
  const type = useWatch({ control, name: "type" });
  const categoryId = useWatch({ control, name: "categoryId" });

  const [inventoryCategorySearch, setInventoryCategorySearch] = useState<
    string | undefined
  >(undefined);
  const {
    data: getAllInventoryCategoriesRes,
    ...getAllInventoryCategoriesApiState
  } = useGetAllInventoryCategoryQuery({ search: inventoryCategorySearch });
  const getAllInventoryCategoriesData = getAllInventoryCategoriesRes?.data;

  const inventoryCategoryOptions: IOption<TInventoryCategory>[] =
    useMemo(() => {
      if (!Array.isArray(getAllInventoryCategoriesData)) {
        return [];
      }
      return getAllInventoryCategoriesData.map(
        (category): IOption<TInventoryCategory> => ({
          leftContent: (
            <span className="relative size-[34px] shrink-0 overflow-hidden rounded-lg border border-default-200">
              <Image
                src={getImageFallback({
                  src: category?.media?.url,
                })}
                alt={category?.media?.originalName || "Category Image"}
                width={50}
                height={50}
                className="h-full w-full object-cover"
              />
            </span>
          ),
          label: category?.name || "Unknown Category",
          rightContent: (
            <AddInventoryCategoryDialog
              targetButton={
                <button
                  type="button"
                  className="flex w-fit shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent p-1.5 text-default-1000 duration-300 hover:bg-default-200"
                >
                  <PencilIcon className="size-3.5" />
                </button>
              }
              isEditMode
              slug={category?.slug}
              categoryType={type}
            />
          ),
          value: category?.id ?? -1,
        }),
      );
    }, [getAllInventoryCategoriesData, type]);

  const onSubmit = async ({ media, ...data }: TBarInventoryFormType) => {
    setIsLoading?.(true);
    const toastId = inventoryProductToastProps.toast({
      variant: "loading",
      title: `${isEditMode ? "Updating" : "Creating"} Inventory Product...`,
      description: `Please wait while we ${isEditMode ? "update" : "create"} the inventory product.`,
    });

    try {
      if (!data?.type) {
        throw new Error("Product type is required but missing!");
      }
      if (!data?.soldBy) {
        throw new Error(
          "Sold by is required to create/update inventory product but missing!",
        );
      }

      const response = await updateBarInventoryItem({
        barSlug: params?.barSlug,
        itemSlug: getBarInventoryItemData?.slug,
        body: transformFormDataToApiData({ ...data, media }),
      }).unwrap();

      if (!response?.success) {
        throw new Error(response?.message || "Something went wrong!");
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: `Bar Inventory Item Updated Successfully!`,
        description: `Congratulations! You have successfully updated a bar inventory item.`,
      });

      reset();
      const { queryString } = generateQueryString(
        {
          page: undefined,
          search: undefined,
          soldBy: data?.soldBy === "UNIT" ? "UNIT" : undefined,
        },
        {
          stringifyToPreserveTypes: true,
        },
      );
      router.replace(
        `/inventory/inventory-management/bar-inventory/${params?.barSlug}`,
      );
      closeModal?.();
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Failed to Create Inventory Product",
          description: "Something went wrong while creating inventory product.",
        }),
      });
    } finally {
      setIsLoading?.(false);
    }
  };

  useEffect(() => {
    if (
      isEditMode &&
      getBarInventoryItemData &&
      !getBarInventoryItemApiState?.isLoading &&
      !getBarInventoryItemApiState?.isFetching &&
      getBarInventoryItemApiState?.isSuccess
    ) {
      const formStateData = transformApiDataToFormData(getBarInventoryItemData);
      reset({ ...formStateData, media: undefined });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getBarInventoryItemData,
    isEditMode,
    getBarInventoryItemApiState?.isLoading,
    getBarInventoryItemApiState?.isFetching,
    getBarInventoryItemApiState?.isSuccess,
  ]);

  return {
    params,
    editBarInventoryFormProps,
    onSubmit,
    watchValues: { media, soldBy, type, categoryId },
    volumesFieldArrayProps,
    getBarInventoryItemApiState,
    getBarInventoryItemData,
    soldByState,
    setSoldByState,
    inventoryCategoryOptions,
    isInventoryCategoryOptionsLoading:
      getAllInventoryCategoriesApiState?.isLoading ||
      getAllInventoryCategoriesApiState?.isFetching,
    setInventoryCategorySearch,
  };
}

export default useEditBarInventoryForm;
