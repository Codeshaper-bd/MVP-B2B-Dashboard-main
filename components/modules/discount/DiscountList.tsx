import { useCallback, useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageStateParams from "@/hooks/useManageStateParams";
import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
} from "@/store/api/common-api-types";
import {
  useDeleteADiscountMutation,
  useGetAllDiscountQuery,
} from "@/store/api/discounts/discounts-api";
import type {
  TDeleteADiscountMutation,
  TDiscountModel,
  TUpdateADiscountArgs,
} from "@/store/api/discounts/discounts.types";
import type { TEvent } from "@/store/api/events/events.types";
import OutlinePagination from "@/components/pagination/outline-pagination";
import RenderData from "@/components/render-data";
import SearchComponent from "@/components/ui/search-component";
import { Separator } from "@/components/ui/separator";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import DeleteConfirmationDialog from "./delete-confirmation-dialog";
import DiscountCard from "./DiscountCard";
import EditDiscountDialog from "./modals/edit-discount-dialog";

export interface IDiscountListProps {
  model: TDiscountModel;
  modelId: TIdOrSlugOrIdentifier["id"];
  getAnEventData: TNullish | TEvent;
  isShowRedeemedCount?: boolean;
  isPastEvent?: boolean;
}

function DiscountList({
  model,
  modelId,
  getAnEventData,
  isShowRedeemedCount,
  isPastEvent,
}: IDiscountListProps) {
  const {
    state: isDeleteModalOpen,
    setOpen: openDeleteModal,
    setClose: closeDeleteModal,
  } = useBooleanState({
    defaultValue: false,
  });
  const {
    state: isEditModalOpen,
    setOpen: openEditModal,
    setClose: closeEditModal,
  } = useBooleanState({
    defaultValue: false,
  });
  const [discountId, setDiscountId] =
    useState<TUpdateADiscountArgs["id"]>(null);
  const { getAllParamValue, updateMultipleParam } =
    useManageStateParams<Exclude<TPaginationArgs, void | undefined>>();
  const queryObject = getAllParamValue();
  const { data: getAllDiscountRes, ...getAllDiscountApiState } =
    useGetAllDiscountQuery(
      {
        ...queryObject,
        model,
        modelId,
        pageSize: contentPerPageOptions[4],
      },
      {
        skip: !checkIsValidId(modelId),
      },
    );
  const getAllDiscountData = getAllDiscountRes?.data;
  const getAllDiscountPagination = getAllDiscountRes?.pagination;

  const [deleteADiscount, { isLoading: isDeleteADiscount }] =
    useDeleteADiscountMutation();

  const toastProps = useToast();

  const handleDiscountEdit =
    ({
      openEditModal,
    }: {
      openEditModal: (props: Partial<TExternalState> | void) => () => void;
      setDiscountId: React.Dispatch<
        React.SetStateAction<string | number | TNullish>
      >;
    }) =>
    (id: TUpdateADiscountArgs["id"]) => {
      setDiscountId(id);
      openEditModal()();
    };

  const handleDeleteDiscount = useCallback(
    ({
      id,
      closeDeleteModal,
      deleteADiscount,
      toastProps: { toast },
    }: {
      id: TUpdateADiscountArgs["id"];
      closeDeleteModal: (props: Partial<TExternalState> | void) => () => void;
      deleteADiscount: TDeleteADiscountMutation;
      toastProps: TUseToastReturnType;
    }) =>
      async () => {
        const toastId = toast({
          variant: "loading",
          title: "Deleting Discount",
          description: "Please wait while we delete your discount",
        });

        try {
          await deleteADiscount({ id }).unwrap();

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: "Discount Deleted",
            description: getApiErrorMessage(
              undefined,
              "Your discount has been deleted successfully",
            ),
          });
          closeDeleteModal()();
        } catch (error) {
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Discount Deletion Failed",
              description: "An error occurred while deleting the discount",
            }),
          });
        }
      },
    [],
  );

  return (
    <div className="mt-4">
      <div className="ms-auto max-w-sm">
        <SearchComponent<"external">
          mode="external"
          search={queryObject?.search}
          setSearch={(value) => {
            updateMultipleParam({
              search: value,
              page: undefined,
            });
          }}
          className="w-full"
          placeholder="Search Discounts"
        />
      </div>
      <RenderData
        data={getAllDiscountData}
        {...getAllDiscountApiState}
        expectedDataType="array"
      >
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {getAllDiscountData?.map((item) => (
            <DiscountCard
              key={item?.id}
              item={item}
              handleDiscountEdit={
                isPastEvent
                  ? undefined
                  : handleDiscountEdit({
                      openEditModal,
                      setDiscountId,
                    })
              }
              handleDeleteDiscount={
                isPastEvent
                  ? undefined
                  : openDeleteModal({
                      beforeExecute: () => setDiscountId(item?.id),
                    })
              }
              isShowRedeemedCount={isShowRedeemedCount}
            />
          ))}
        </div>

        <>
          <Separator className="my-6" />

          <OutlinePagination
            isLoading={
              getAllDiscountApiState.isLoading ||
              getAllDiscountApiState.isFetching
            }
            currentPage={Number(queryObject.page || 1)}
            totalPages={getAllDiscountPagination?.totalPages || 1}
            hideForTotalPagesOne
            disableUrlState
            onPageChange={(value) => {
              updateMultipleParam({ page: value <= 1 ? undefined : value });
            }}
          />
        </>
      </RenderData>

      <EditDiscountDialog
        mode="server-edit"
        discountId={discountId}
        open={isEditModalOpen}
        setOpen={closeEditModal({
          beforeExecute: () => setDiscountId(null),
        })}
        getAnEventData={getAnEventData}
      />

      <DeleteConfirmationDialog
        open={isDeleteModalOpen}
        setOpen={closeDeleteModal({
          beforeExecute: () => setDiscountId(null),
        })}
        onConfirm={handleDeleteDiscount({
          id: discountId,
          closeDeleteModal,
          deleteADiscount,
          toastProps,
        })}
        isLoading={isDeleteADiscount}
      />
    </div>
  );
}

export default DiscountList;
