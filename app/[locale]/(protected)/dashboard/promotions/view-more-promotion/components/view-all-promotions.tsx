"use client";
import React, { useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { compareDateTimes } from "@/lib/date-time/compare-date-times";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import {
  useDeleteAPromotionMutation,
  useGetAllPromotionQuery,
  useLazyGetAPromotionActiveEventsQuery,
  useUpdateAPromotionMutation,
} from "@/store/api/promotion/promotion-api";
import type {
  TDeleteAPromotionMutation,
  TGetAllPromotionsArgs,
  TPromotion,
  TUpdateAPromotionMutation,
} from "@/store/api/promotion/promotion.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import ItemCardList from "@/components/features/cards/ItemCardList";
import type { TCallbackData } from "@/components/features/cards/ItemCardList/ItemCard";
import DeleteIcon from "@/components/icons/DeleteIcon";
import BasicPagination from "@/components/pagination/basic-pagination";
import ViewQrCodeModal from "@/components/qr-code-modal";
import RenderData from "@/components/render-data";
import ChallengeSkeleton from "@/components/skeleton/challenge-skeleton";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import { typeOfPromotionOptions } from "../../components/Forms/CreatePromotionForm/utils";
import EditPromotionModal from "../../components/Modals/EditPromotionModal";
import SwitchConfirmationModal from "../../components/Modals/SwitchConfirmationModal";
import ViewActiveEventModal from "../../components/Modals/viewActiveEventModal";
import ViewDescriptionModal from "../../components/Modals/ViewDescriptionModal";

type THandleOnOpenChange = (props: {
  setState: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
}) => React.Dispatch<React.SetStateAction<boolean | void | null | undefined>>;

const handleOnOpenChange: THandleOnOpenChange =
  ({ setCardData, setState }) =>
  (value) => {
    setState(value);
    setCardData(undefined);
  };

const handleClearData =
  ({
    setCardData,
    setIsDeleting,
  }: {
    setCardData: React.Dispatch<
      React.SetStateAction<TCallbackData | undefined>
    >;
    setIsDeleting?: React.Dispatch<React.SetStateAction<boolean>>;
  }) =>
  () => {
    setCardData(undefined);
    setIsDeleting?.(false);
  };
const handleOpenModalButtonClick =
  ({
    setCardData,
    setOpen,
  }: {
    setCardData: React.Dispatch<
      React.SetStateAction<TCallbackData | undefined>
    >;
    setOpen: (props: Partial<TExternalState> | void) => () => void;
  }) =>
  (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: TCallbackData) => {
    setCardData(data);
    setOpen()();
  };

type THandleOnSwitchChange = (props: {
  toastProps: TUseToastReturnType;
  updateAPromotion: TUpdateAPromotionMutation;
  currentPromotionData: TPromotion | TNullish;
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setSwitchConfirmationModalOpen: (
    props: Partial<TExternalState> | void,
  ) => () => void;
  checkPromotionActiveEvents: (promotionSlug: string) => Promise<boolean>;
}) => (checked: boolean, data: TCallbackData) => Promise<void>;

const handleOnSwitchChange: THandleOnSwitchChange =
  ({
    updateAPromotion,
    toastProps: { toast },
    currentPromotionData,
    setCardData,
    setSwitchConfirmationModalOpen,
    checkPromotionActiveEvents,
  }) =>
  async (_, data) => {
    setCardData(data);
    if (currentPromotionData?.status === "Active") {
      // Check if the challenge has active events before allowing deactivation
      const hasActiveEvents = await checkPromotionActiveEvents(
        data?.slug || "",
      );

      if (hasActiveEvents) {
        setSwitchConfirmationModalOpen?.()?.();
        return;
      }
    }
    const toastId = toast({
      title: "Updating Promotion Status",
      description: "Please wait...",
      variant: "loading",
    });

    try {
      if (!data?.id) {
        throw new Error("Promotion ID is required to update challenge status");
      }
      const { status } = compareDateTimes({
        providedDateTime: currentPromotionData?.endDate,
        comparisonUnit: "seconds",
      });

      if (status !== "after") {
        // if (currentPromotionData?.status === "Active") {
        //   await updateAPromotion({
        //     slug: data.id?.toString(),
        //     body: {
        //       status: "Inactive",
        //     },
        //   }).unwrap();
        // }

        toastId.update({
          id: toastId.id,
          variant: "error",
          title: "Cannot Activate Expired Promotion",
          description:
            "You cannot update this Promotion because it has expired.",
        });
        return;
      }

      await updateAPromotion({
        slug: data.id?.toString(),
        body: {
          status: data?.switchedOn ? "Inactive" : "Active",
        },
      }).unwrap();
      toastId.update({
        id: toastId.id,
        title: "Promotion Status Updated",
        description: "Promotion status has been updated successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating challenge status:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Updating Promotion Status",
          description: "An error occurred while updating promotion status",
        }),
      });
    }
  };

type THandleDelete = (props: {
  toastProps: TUseToastReturnType;
  deleteAPromotion: TDeleteAPromotionMutation;
  data: TCallbackData | undefined;
  setIsDeleteAlertClose: (props: Partial<TExternalState> | void) => () => void;
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setIsDeleting?: React.Dispatch<React.SetStateAction<boolean>>;
}) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;

const handleDelete: THandleDelete =
  ({
    toastProps,
    data,
    deleteAPromotion,
    setIsDeleteAlertClose,
    setCardData,
    setIsDeleting,
  }) =>
  async () => {
    const toastId = toastProps.toast({
      title: "Deleting Promotion",
      description: "Please wait...",
      variant: "loading",
    });

    try {
      setIsDeleting?.(true);
      if (!data?.id) {
        throw new Error("Promotion slug is required to delete challenge");
      }

      await deleteAPromotion({ slug: data.id?.toString() }).unwrap();
      toastId.update({
        id: toastId.id,
        title: "Promotion Deleted",
        description: "Promotion has been deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting challenge:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Deleting Promotion",
          description: "An error occurred while deleting promotion",
        }),
      });
    } finally {
      setIsDeleteAlertClose?.()?.();
      setCardData?.(undefined);
      setIsDeleting?.(false);
    }
  };

function ViewAllPromotions() {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    state: isEditModalOpen,
    setState: setEditModalState,
    setOpen: setEditModalOpen,
  } = useBooleanState();
  const {
    state: isDescriptionModalOpen,
    setState: setDescriptionModalState,
    setOpen: setDescriptionModalOpen,
  } = useBooleanState();
  const {
    state: isDeleteAlertOpen,
    setOpen: setIsDeleteAlertOpen,
    setClose: setIsDeleteAlertClose,
  } = useBooleanState();
  const {
    state: isSwitchConfirmationModalOpen,
    setState: setSwitchConfirmationModalState,
    setOpen: setSwitchConfirmationModalOpen,
  } = useBooleanState();
  const {
    state: isViewEventModalOpen,
    setState: setViewEventModalState,
    setOpen: setViewEventModalOpen,
  } = useBooleanState();
  const {
    state: isViewQrModalOpen,
    setState: setViewQrModalState,
    setOpen: setViewQrModalOpen,
  } = useBooleanState();
  const [cardData, setCardData] = useState<TCallbackData | undefined>();
  const toastProps = useToast();
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllPromotionsArgs, void>>();
  const { search, status, sortBy, sortOrder, type, page, pageSize } =
    getAllParamValue();
  const [updateAPromotion, { isLoading: isUpdatePromotionLoading }] =
    useUpdateAPromotionMutation();
  const [deleteAPromotion, { isLoading: isDeleteAPromotionLoading }] =
    useDeleteAPromotionMutation();
  const { data: getAllPromotionRes, ...getAllPromotionApiState } =
    useGetAllPromotionQuery({
      search,
      status,
      sortBy,
      sortOrder,
      type,
      page: page || contentPerPageOptions.initialPage,
      pageSize: pageSize || contentPerPageOptions[12],
    });
  const getAllPromotionData = getAllPromotionRes?.data;
  const getAllPromotionPagination = getAllPromotionRes?.pagination;

  const [getAPromotionActiveEvents] = useLazyGetAPromotionActiveEventsQuery();

  const checkPromotionActiveEvents = async (promotionSlug: string) => {
    if (!checkIsValidId(promotionSlug, { type: "string" })) {
      return false;
    }

    try {
      const {
        data: getAPromotionActiveEventsRes,
        ...getAPromotionActiveEventsApiState
      } = await getAPromotionActiveEvents({
        slug: promotionSlug,
      });
      const getAPromotionActiveEventsData = getAPromotionActiveEventsRes?.data;
      if (
        getAPromotionActiveEventsData &&
        getAPromotionActiveEventsData?.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking active events:", error);
      return false;
    }
  };
  return (
    <div>
      <RenderData
        data={getAllPromotionData}
        expectedDataType="array"
        {...getAllPromotionApiState}
        loadingSkeleton={
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, idx) => (
              <ChallengeSkeleton key={idx} />
            ))}
          </div>
        }
      >
        <ItemCardList>
          {getAllPromotionData?.map((item) => {
            const { status } = compareDateTimes({
              providedDateTime: item.endDate,
              comparisonUnit: "seconds",
            });

            const itemType =
              typeOfPromotionOptions.find(
                (option) =>
                  !!option?.value &&
                  !!item?.type &&
                  option?.value === item?.type,
              )?.label || "N/A";

            return (
              <ItemCardList.ItemCard
                key={item?.id}
                id={item?.slug}
                slug={item?.slug}
                title={item?.name}
                isPrivate={item?.isPrivate}
                qrCode={item?.qrCode}
                isFromPromotion={true}
                infoRows={[
                  {
                    icon: null,
                    label: "Type",
                    value: itemType,
                  },
                  {
                    icon: "CalendarIcon",
                    label: "Valid From",
                    value: convertUTCToLocal({
                      utcDateTime: item?.startDate,
                      format: "DD MMMM YYYY,  hh:mm A",
                    }),
                  },
                  {
                    icon: "CalendarIcon",
                    label: "Valid Until",
                    value: convertUTCToLocal({
                      utcDateTime: item?.endDate,
                      format: "DD MMMM YYYY,  hh:mm A",
                    }),
                  },
                ]}
                switchedOn={item?.status === "Active"}
                error={status !== "after"}
                errorMessage={
                  status !== "after" && status !== "invalid"
                    ? "Promotion has expired"
                    : status === "invalid"
                      ? "Invalid date"
                      : undefined
                }
                status={item?.status}
                onDeleteClick={handleOpenModalButtonClick({
                  setCardData,
                  setOpen: setIsDeleteAlertOpen,
                })}
                onEditClick={handleOpenModalButtonClick({
                  setCardData,
                  setOpen: setEditModalOpen,
                })}
                onDescriptionClick={handleOpenModalButtonClick({
                  setCardData,
                  setOpen: setDescriptionModalOpen,
                })}
                onViewEventsClick={handleOpenModalButtonClick({
                  setCardData,
                  setOpen: setViewEventModalOpen,
                })}
                onViewQrClick={handleOpenModalButtonClick({
                  setCardData,
                  setOpen: setViewQrModalOpen,
                })}
                onSwitchChange={handleOnSwitchChange({
                  toastProps,
                  updateAPromotion,
                  currentPromotionData: item,
                  setCardData,
                  setSwitchConfirmationModalOpen,
                  checkPromotionActiveEvents,
                })}
                isSwitchChangeLoading={isUpdatePromotionLoading}
                isOnDeleteLoading={isDeleteAPromotionLoading}
              />
            );
          })}
        </ItemCardList>
      </RenderData>

      <div className="mt-5">
        <BasicPagination
          isLoading={
            getAllPromotionApiState.isLoading ||
            getAllPromotionApiState.isFetching
          }
          totalPages={getAllPromotionPagination?.totalPages || 1}
          hideForTotalPagesOne
        />
      </div>

      <SwitchConfirmationModal
        open={isSwitchConfirmationModalOpen}
        onOpenChange={handleOnOpenChange({
          setCardData,
          setState: setSwitchConfirmationModalState,
        })}
        productData={cardData}
      />

      <EditPromotionModal
        open={isEditModalOpen}
        onOpenChange={handleOnOpenChange({
          setCardData,
          setState: setEditModalState,
        })}
        editItemSlug={cardData?.id ? cardData.id.toString() : undefined}
      />

      <ViewDescriptionModal
        open={isDescriptionModalOpen}
        productData={cardData}
        onOpenChange={handleOnOpenChange({
          setCardData,
          setState: setDescriptionModalState,
        })}
      />
      <ViewActiveEventModal
        open={isViewEventModalOpen}
        onOpenChange={handleOnOpenChange({
          setCardData,
          setState: setViewEventModalState,
        })}
        productData={cardData}
      />
      <ViewQrCodeModal
        open={isViewQrModalOpen}
        onOpenChange={handleOnOpenChange({
          setCardData,
          setState: setViewQrModalState,
        })}
        qrCode={cardData?.qrCode}
      />

      {/* Delete Promotion Alert */}
      <AlertDialog open={isDeleteAlertOpen}>
        <StatusAlert
          status="destructive"
          withCloseButton
          disableInternallyClose
          onClose={setIsDeleteAlertClose({
            afterExecute: handleClearData({ setCardData, setIsDeleting }),
          })}
          icon={<DeleteIcon className="size-5" />}
          title={`Remove Promotion - ${cardData?.title}`}
          description="Are you sure you want to delete this promotion?"
        >
          <div className="flex w-full items-center justify-end gap-2">
            <StatusAlert.Buttons.SecondaryButton
              disableInternallyClose
              onClick={setIsDeleteAlertClose({
                afterExecute: handleClearData({ setCardData, setIsDeleting }),
              })}
              disabled={isDeleting}
            >
              Close
            </StatusAlert.Buttons.SecondaryButton>

            <StatusAlert.Buttons.PrimaryButton
              onClick={handleDelete({
                toastProps,
                deleteAPromotion,
                data: cardData,
                setIsDeleteAlertClose,
                setCardData,
                setIsDeleting,
              })}
              disabled={isDeleting}
            >
              <ButtonLoadingContent
                isLoading={isDeleting}
                actionContent="Remove"
              />
            </StatusAlert.Buttons.PrimaryButton>
          </div>
        </StatusAlert>
      </AlertDialog>
    </div>
  );
}

export default ViewAllPromotions;
