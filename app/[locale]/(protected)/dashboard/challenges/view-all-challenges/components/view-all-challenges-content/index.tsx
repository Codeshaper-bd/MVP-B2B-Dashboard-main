"use client";
import { memo, useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { compareDateTimes } from "@/lib/date-time/compare-date-times";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { cn } from "@/lib/utils";
import {
  useDeleteAChallengeMutation,
  useGetAllChallengeQuery,
  useUpdateAChallengeMutation,
  useLazyGetAChallengeActiveEventsQuery,
} from "@/store/api/challenges/challenges-api";
import type { TGetAllChallengeArgs } from "@/store/api/challenges/challenges.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import ItemCardList from "@/components/features/cards/ItemCardList";
import type { TCallbackData } from "@/components/features/cards/ItemCardList/ItemCard";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import ChallengeSkeleton from "@/components/skeleton/challenge-skeleton";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

import {
  handleClearData,
  handleDelete,
  handleDeleteButtonClick,
  handleEditButtonClick,
  handleOnOpenChange,
  handleOnSwitchChange,
  handleViewButtonClick,
  handleViewActiveEventButtonClick,
} from "./utils";
import EditChallengeModal from "../../../components/Modals/EditChallengeModal";
import SwitchConfirmationModal from "../../../components/Modals/SwitchConfirmationModal";
import ViewActiveEventModal from "../../../components/Modals/viewActiveEventModal";
import ViewDescriptionModal from "../../../components/Modals/viewDescriptionModal";

function ViewAllChallengesContent() {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    state: isDescriptionModalOpen,
    setState: setDescriptionModalState,
    setOpen: setDescriptionModalOpen,
  } = useBooleanState();
  const {
    state: isViewEventModalOpen,
    setState: setViewEventModalState,
    setOpen: setViewEventModalOpen,
  } = useBooleanState();
  const {
    state: isEditModalOpen,
    setState: setEditModalState,
    setOpen: setEditModalOpen,
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

  const [cardData, setCardData] = useState<TCallbackData | undefined>();
  const [updateAChallenge, { isLoading: isUpdateChallengeLoading }] =
    useUpdateAChallengeMutation();
  const [deleteAChallenge, { isLoading: isDeleteAChallengeLoading }] =
    useDeleteAChallengeMutation();
  const toastProps = useToast();

  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllChallengeArgs, void>>();
  const queryObject = getAllParamValue();
  const { data: getAllChallengesRes, ...getAllChallengesApiState } =
    useGetAllChallengeQuery({
      ...queryObject,
      page: queryObject?.page || contentPerPageOptions.initialPage,
      pageSize: queryObject?.pageSize || contentPerPageOptions[12],
    });
  const getAllChallengesData = getAllChallengesRes?.data;
  const getAllChallengesPagination = getAllChallengesRes?.pagination;

  const [getAChallengeActiveEvents] = useLazyGetAChallengeActiveEventsQuery();

  // Function to check if a challenge has active events
  const checkChallengeActiveEvents = async (challengeSlug: string) => {
    if (!checkIsValidId(challengeSlug, { type: "string" })) {
      return false;
    }

    try {
      const {
        data: getAChallengeActiveEventsRes,
        ...getAChallengeActiveEventsApiState
      } = await getAChallengeActiveEvents({
        slug: challengeSlug,
      });
      const getAChallengeActiveEventsData = getAChallengeActiveEventsRes?.data;
      if (
        getAChallengeActiveEventsData &&
        getAChallengeActiveEventsData?.length > 0
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
    <div
      className={cn(
        !getAllChallengesData?.length
          ? "flex min-h-[calc(100vh-300px)] items-center justify-center"
          : "",
      )}
    >
      <RenderData
        data={getAllChallengesData}
        expectedDataType="array"
        {...getAllChallengesApiState}
        loadingSkeleton={
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, idx) => (
              <ChallengeSkeleton key={idx} />
            ))}
          </div>
        }
      >
        <ItemCardList>
          {getAllChallengesData?.map((item) => {
            const { status } = compareDateTimes({
              providedDateTime: item.endDate,
              comparisonUnit: "seconds",
            });

            return (
              <ItemCardList.ItemCard
                key={item?.id}
                id={item?.slug}
                slug={item?.slug}
                title={item?.name}
                infoRows={[
                  {
                    icon: "DataBaseIcon",
                    label: "Points",
                    value: item.pointsEarned || 0,
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
                status={item?.status}
                error={status !== "after"}
                errorMessage={
                  status !== "after" && status !== "invalid"
                    ? "Challenge has expired"
                    : status === "invalid"
                      ? "Invalid date"
                      : undefined
                }
                onDeleteClick={handleDeleteButtonClick({
                  setCardData,
                  setIsDeleteAlertOpen,
                })}
                onEditClick={handleEditButtonClick({
                  setCardData,
                  setEditModalOpen,
                })}
                onDescriptionClick={handleViewButtonClick({
                  setCardData,
                  setViewModalOpen: setDescriptionModalOpen,
                })}
                onViewEventsClick={handleViewActiveEventButtonClick({
                  setCardData,
                  setViewEventModalOpen,
                })}
                onSwitchChange={handleOnSwitchChange({
                  toastProps,
                  updateAChallenge,
                  currentChallengeData: item,
                  setCardData,
                  setSwitchConfirmationModalOpen,
                  checkChallengeActiveEvents,
                })}
                isSwitchChangeLoading={isUpdateChallengeLoading}
                isOnDeleteLoading={isDeleteAChallengeLoading}
              />
            );
          })}
        </ItemCardList>
      </RenderData>

      <div className="pt-10">
        <BasicPagination
          isLoading={
            getAllChallengesApiState.isLoading ||
            getAllChallengesApiState.isFetching
          }
          totalPages={getAllChallengesPagination?.totalPages || 1}
          hideForTotalPagesOne
        />
      </div>

      <EditChallengeModal
        mode="server-edit"
        editItemSlug={cardData?.id?.toString()}
        open={isEditModalOpen}
        onOpenChange={handleOnOpenChange({ setCardData, setEditModalState })}
      />
      <ViewDescriptionModal
        open={isDescriptionModalOpen}
        productData={cardData}
        onOpenChange={handleOnOpenChange({
          setCardData,
          setEditModalState: setDescriptionModalState,
        })}
      />

      <SwitchConfirmationModal
        open={isSwitchConfirmationModalOpen}
        onOpenChange={handleOnOpenChange({
          setCardData,
          setEditModalState: setSwitchConfirmationModalState,
        })}
        productData={cardData}
      />

      <ViewActiveEventModal
        open={isViewEventModalOpen}
        onOpenChange={handleOnOpenChange({
          setCardData,
          setEditModalState: setViewEventModalState,
        })}
        productData={cardData}
      />
      {/* Delete Challenge Alert */}
      <AlertDialog open={isDeleteAlertOpen}>
        <StatusAlert
          status="destructive"
          withCloseButton
          disableInternallyClose
          onClose={setIsDeleteAlertClose({
            afterExecute: handleClearData({ setCardData, setIsDeleting }),
          })}
          icon={<DeleteIcon className="size-5" />}
          title={`Remove Challenges - ${cardData?.title}`}
          description="Are you sure you want to delete this challenge?"
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
                deleteAChallenge,
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

export default memo(ViewAllChallengesContent);
