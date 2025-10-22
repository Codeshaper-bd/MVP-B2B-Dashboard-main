import { yupResolver } from "@hookform/resolvers/yup";
import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  type Resolver,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { uploadOnlyRequiredImages } from "@/lib/media/upload-only-required-images";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { useGetAllInventoryCategoryQuery } from "@/store/api/inventory-category/inventory-category-api";
import type { TInventoryCategory } from "@/store/api/inventory-category/inventory-category.types";
import {
  useCreateInventoryItemMutation,
  useGetAnInventoryItemQuery,
  useUpdateAnInventoryItemMutation,
} from "@/store/api/inventory-item/inventory-item-api";
import type {
  TBaseVolume,
  TCommonInventoryItemFields,
  TCreateInventoryItemArgs,
  TCreateInventoryItemRes,
  TSoldBy,
  TUnitWithShipmentVolume,
  TVolumeWithShipmentVolume,
  TUnitItem,
  TVolumeItem,
  TUnitNoShipmentVolume,
  TVolumeNoShipmentVolume,
} from "@/store/api/inventory-item/inventory-item.types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import PencilIcon from "@/components/icons/PencilIcon";
import { useRouter } from "@/components/navigation";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { useToast } from "@/components/ui/use-toast";

import AddInventoryCategoryDialog from "../add-category-dialog";
import type { ICreateInventoryFormProps } from "./index";
import type { TInventoryItemFormType } from "./types";
import { initialValues, transformInventoryItemToFormInputData } from "./utils";
import { inventoryItemFormValidationSchema } from "./validation-schema";

export interface IPageParams extends Params {
  locale?: string;
  category?: string;
  productSlug?: string;
}

interface IUseCreateInventoryProductFormProps
  extends ICreateInventoryFormProps {
  isEditMode?: boolean;
  closeModal?: () => void;
}

function useCreateInventoryProductForm({
  setIsLoading,
  productType,
  isEditMode,
  closeModal,
}: IUseCreateInventoryProductFormProps) {
  const router = useRouter();

  const { productSlug: inventoryItemSlug } = useParams<IPageParams>();
  const { data: getAnInventoryItemRes, ...getAnInventoryItemApiState } =
    useGetAnInventoryItemQuery(
      { slug: inventoryItemSlug },
      {
        skip:
          !checkIsValidId(inventoryItemSlug, { type: "string" }) && !isEditMode,
      },
    );
  const getAnInventoryItemData = getAnInventoryItemRes?.data;
  const [updateAnInventoryItem] = useUpdateAnInventoryItemMutation();
  const inventoryProductToastProps = useToast();
  const toastProps = useToast();
  const [createInventoryItem] = useCreateInventoryItemMutation();
  const [uploadAMedia] = useUploadAMediaMutation();
  const [soldByState, setSoldByState] = useState<TSoldBy | undefined>(
    undefined,
  );

  const methods = useForm<TInventoryItemFormType>({
    resolver: yupResolver(
      inventoryItemFormValidationSchema,
    ) as unknown as Resolver<TInventoryItemFormType>,
    context: { soldByState },
    defaultValues: initialValues,
  });

  const { setValue, reset, control } = methods;
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
  } = useGetAllInventoryCategoryQuery({
    search: inventoryCategorySearch,
    categoryType: type,
  });
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
            />
          ),
          value: category?.id ?? -1,
        }),
      );
    }, [getAllInventoryCategoriesData]);

  const onSubmit = async ({ media, ...data }: TInventoryItemFormType) => {
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

      let response: TCreateInventoryItemRes | undefined = undefined;
      let dataToSubmit: TCreateInventoryItemArgs | null = null;
      const commonData: TCommonInventoryItemFields = {
        name: data.name,
        categoryId: Number(data.categoryId),
        type: data.type,
        status: "Active",
        media: undefined,
      };

      if (media?.length) {
        const { finalMediaList } = await uploadOnlyRequiredImages({
          filesData: {
            mainImage: media?.[0],
            galleryImages: media?.slice?.(1),
          },
          mediaList: [],
          uploadAMedia,
          toastProps,
          toastMode: "group",
          tags: ["Product"],
        });
        commonData.media = finalMediaList;
      }

      const unitVolumes: TUnitItem["volumes"] = [];
      const volumeVolumes: TVolumeItem["volumes"] = [];

      const dataVolumes: TInventoryItemFormType["volumes"] = Array.isArray(
        data?.volumes,
      )
        ? data?.volumes
        : [];
      for (const vol of dataVolumes) {
        const baseVolume: TBaseVolume = {
          id: vol?.id,
          volume: convertToNumber({
            value: vol?.volume,
            digit: 2,
            fallback: 0,
          }),
          unit: vol?.unit,
          productCode: vol?.productCode,
          perLevel:
            typeof vol?.perLevel === "undefined" || vol?.perLevel === null
              ? undefined
              : convertToNumber({
                  value: vol?.perLevel,
                  digit: 0,
                  fallback: 0,
                }),
        };

        /* unit start */
        if (data?.soldBy === "UNIT" && !vol?.addShipment) {
          const unitNoShipmentVolume: TUnitNoShipmentVolume = {
            ...baseVolume,
            addShipment: !!vol?.addShipment,
            unitPerCase: convertToNumber({
              value: "unitPerCase" in vol ? vol?.unitPerCase : 0,
              digit: 0,
              fallback: 0,
            }),
          };
          unitVolumes?.push(unitNoShipmentVolume);
        }
        if (data?.soldBy === "UNIT" && vol?.addShipment) {
          const unitWithShipmentVolume: TUnitWithShipmentVolume = {
            ...baseVolume,
            addShipment: vol?.addShipment,
            casesReceived: convertToNumber({
              value: "casesReceived" in vol ? vol?.casesReceived : 0,
              digit: 0,
              fallback: 0,
            }),
            pricePerCase: convertToNumber({
              value: "pricePerCase" in vol ? vol?.pricePerCase : 0,
              digit: 2,
              fallback: 0,
            }),
            unitPerCase: convertToNumber({
              value: "unitPerCase" in vol ? vol?.unitPerCase : 0,
              digit: 0,
              fallback: 0,
            }),
          };
          unitVolumes?.push(unitWithShipmentVolume);
        }
        /* unit end */
        /* ------------------------------------------------------- */
        /* volume start */
        if (data?.soldBy === "VOLUME" && !vol?.addShipment) {
          const volumeNoShipmentVolume: TVolumeNoShipmentVolume = {
            ...baseVolume,
            addShipment: !!vol?.addShipment,
            netWeight: convertToNumber({
              value: vol?.netWeight,
              digit: 2,
              fallback: 0,
            }),
            netWeightUnit: vol?.netWeightUnit,
            currentStock:
              !!vol && "currentStock" in vol
                ? convertToNumber({
                    value: vol?.currentStock,
                    digit: 2,
                    fallback: 0,
                  })
                : 0,
            pricePerUnit:
              !!vol && "pricePerUnit" in vol && vol?.pricePerUnit
                ? convertToNumber({
                    value: vol?.pricePerUnit,
                    digit: 2,
                    fallback: 0,
                  })
                : 0,
          };
          volumeVolumes?.push(volumeNoShipmentVolume);
        }
        if (data?.soldBy === "VOLUME" && vol?.addShipment) {
          const volumeWithShipmentVolume: TVolumeWithShipmentVolume = {
            ...baseVolume,
            addShipment: vol?.addShipment,
            netWeight: convertToNumber({
              value: vol?.netWeight,
              digit: 2,
              fallback: 0,
            }),
            netWeightUnit: vol?.netWeightUnit,
            pricePerUnit:
              !!vol && "pricePerUnit" in vol && vol?.pricePerUnit
                ? convertToNumber({
                    value: vol?.pricePerUnit,
                    digit: 2,
                    fallback: 0,
                  })
                : 0,
            openingStock:
              !!vol && "openingStock" in vol
                ? convertToNumber({
                    value: vol?.openingStock,
                    digit: 2,
                    fallback: 0,
                  })
                : 0,
            currentStock:
              !!vol && "currentStock" in vol
                ? convertToNumber({
                    value: vol?.currentStock,
                    digit: 2,
                    fallback: 0,
                  })
                : 0,
          };
          volumeVolumes?.push(volumeWithShipmentVolume);
        }
        /* volume end */
      }

      const volumeItem: TVolumeItem = {
        ...commonData,
        soldBy: "VOLUME",
        volumes: volumeVolumes,
      };
      const unitItem: TUnitItem = {
        ...commonData,
        soldBy: "UNIT",
        volumes: unitVolumes,
      };

      dataToSubmit = data?.soldBy === "VOLUME" ? volumeItem : unitItem;

      if (!dataToSubmit) {
        throw new Error("No valid data to submit.");
      }

      if (!isEditMode) {
        response = await createInventoryItem(dataToSubmit).unwrap();
      } else {
        response = await updateAnInventoryItem({
          slug: inventoryItemSlug,
          body: dataToSubmit,
        }).unwrap();
      }

      if (!response?.success) {
        throw new Error("Something went wrong!");
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: `Inventory Product ${isEditMode ? "Updated" : "Created"} Successfully!`,
        description: getApiErrorMessage(
          response?.message,
          `Congratulations! You have successfully ${isEditMode ? "updated" : "created"} a new inventory product.`,
        ),
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
        `/inventory/inventory-management/${data?.type === "NON_ALCOHOLIC" ? "non-alcoholic" : "alcoholic"}${queryString}`,
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
    if (productType) {
      setValue("type", productType);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productType]);

  useEffect(() => {
    if (
      isEditMode &&
      getAnInventoryItemData &&
      !getAnInventoryItemApiState?.isLoading &&
      !getAnInventoryItemApiState?.isFetching &&
      getAnInventoryItemApiState?.isSuccess
    ) {
      const formStateData = transformInventoryItemToFormInputData(
        getAnInventoryItemData,
      );
      reset(formStateData);

      // Set soldByState based on the loaded data
      if (getAnInventoryItemData.soldBy) {
        setSoldByState(getAnInventoryItemData.soldBy);
      }
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAnInventoryItemData,
    isEditMode,
    getAnInventoryItemApiState?.isLoading,
    getAnInventoryItemApiState?.isFetching,
    getAnInventoryItemApiState?.isSuccess,
  ]);

  return {
    methods,
    onSubmit,
    watchValues: { media, soldBy, type, categoryId },
    volumesFieldArrayProps,
    getAnInventoryItemApiState,
    getAnInventoryItemData,
    inventoryItemSlug,
    soldByState,
    setSoldByState,
    inventoryCategoryOptions,
    isInventoryCategoryOptionsLoading:
      getAllInventoryCategoriesApiState?.isLoading ||
      getAllInventoryCategoriesApiState?.isFetching,
    setInventoryCategorySearch,
  };
}

export default useCreateInventoryProductForm;
