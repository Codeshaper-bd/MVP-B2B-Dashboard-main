import { memo, useCallback, useState, useMemo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type {
  TIdOrSlugOrIdentifier,
  TPaginationArgs,
} from "@/store/api/common-api-types";
import {
  useGetAllTicketTierQuery,
  useUpdateATicketTierMutation,
  useDeleteATicketTierMutation,
} from "@/store/api/ticket-tier/ticket-tier-api";
import type {
  TCreateTicketTierRes,
  TTicketTier,
  TTicketTierStatus,
  TUpdateATicketTierMutation,
  TDeleteATicketTierMutation,
} from "@/store/api/ticket-tier/ticket-tier.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import InfoIcon from "@/components/icons/InfoIcon";
import EditTierDialog from "@/components/modules/ticket-tier/modals/edit-tier-dialog";
import OutlinePagination from "@/components/pagination/outline-pagination";
import RenderData from "@/components/render-data";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import TicketsCard from "./TicketsCard";

type TTManageRelease = (props: {
  selectedTicketTier: TTicketTier | null;
  toastHookProps: TUseToastReturnType;
  updateATicketTier: TUpdateATicketTierMutation;
  status?: TTicketTierStatus;
  setIsSubmitting?: (isSubmitting: boolean) => void;
  setClose?: () => void;
  setSelectedTicketTier: React.Dispatch<
    React.SetStateAction<TTicketTier | null>
  >;
}) => () => Promise<void>;

function TicketsList({
  eventId,
  isShowBadge,
  isPastEvent,
}: {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  isShowBadge?: boolean;
  isPastEvent?: boolean;
}) {
  const toastHookProps = useToast();
  const [updateATicketTier, { isLoading: isUpdateATicketTierLoading }] =
    useUpdateATicketTierMutation();
  const [deleteATicketTier, { isLoading: isDeleteATicketTierLoading }] =
    useDeleteATicketTierMutation();
  const { state: open, setOpen, setClose } = useBooleanState();

  const [selectedTicketTier, setSelectedTicketTier] =
    useState<TTicketTier | null>(null);

  const clearSlug = useCallback(() => setSelectedTicketTier(null), []);

  // Delete state management
  const [tierToDelete, setTierToDelete] = useState<TTicketTier | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const clearDeleteState = useCallback(() => {
    setTierToDelete(null);
    setIsDeleteDialogOpen(false);
  }, []);

  // Delete handler function
  const handleDeleteTier = useCallback(
    ({
      tierToDelete,
      deleteATicketTier,
      toastHookProps,
      clearDeleteState,
    }: {
      tierToDelete: TTicketTier | null;
      deleteATicketTier: TDeleteATicketTierMutation;
      toastHookProps: TUseToastReturnType;
      clearDeleteState: () => void;
    }) =>
      async () => {
        if (!tierToDelete) {
          return;
        }

        const toastId = toastHookProps.toast({
          variant: "loading",
          title: "Deleting Ticket Tier",
          description: "Please wait while we delete the ticket tier",
        });

        try {
          await deleteATicketTier({
            slug: tierToDelete.slug,
          }).unwrap();

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: "Ticket Tier Deleted Successfully!",
            description: "The ticket tier has been successfully deleted.",
          });

          clearDeleteState();
        } catch (error) {
          console.error("Error deleting ticket tier:", error);
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Ticket Tier Deletion Failed",
              description: "An error occurred while deleting the ticket tier.",
            }),
          });
        }
      },
    [],
  );

  // Function to open delete dialog
  const handleOpenDeleteDialog = useCallback((ticketTier: TTicketTier) => {
    setTierToDelete(ticketTier);
    setIsDeleteDialogOpen(true);
  }, []);

  const { getAllParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();

  // Memoize query object to prevent unnecessary re-renders
  const queryObject = useMemo(() => getAllParamValue(), [getAllParamValue]);

  const { data: allTicketTierRes, ...allTicketTierApiState } =
    useGetAllTicketTierQuery(
      {
        ...queryObject,
        pageSize: contentPerPageOptions[4],
        page: queryObject.page || contentPerPageOptions.initialPage,
        eventId,
      },
      {
        skip: !checkIsValidId(eventId),
      },
    );

  const getAllTicketTierData = allTicketTierRes?.data;
  const getAllTicketTierPagination = allTicketTierRes?.pagination;

  // Memoize the manageRelease function to prevent recreation on every render
  const manageRelease: TTManageRelease = useCallback(
    ({
      selectedTicketTier,
      setSelectedTicketTier,
      status,
      updateATicketTier,
      toastHookProps,
      setIsSubmitting,
      setClose,
    }) =>
      async () => {
        const isActive = status === "Active";
        const toastId = toastHookProps.toast({
          variant: "loading",
          title: `${isActive ? "Releasing" : "Ending"} Ticket Tier`,
          description: `Please wait while we ${isActive ? "release" : "end"} the Ticket Tier`,
        });
        setSelectedTicketTier(selectedTicketTier);
        setIsSubmitting?.(true);

        try {
          const apiRes: TCreateTicketTierRes = await updateATicketTier({
            slug: selectedTicketTier?.slug,
            body: {
              status,
            },
          }).unwrap();

          if (!apiRes?.success) {
            throw new Error(
              apiRes?.message ||
                `Failed to ${isActive ? "update" : "create"} ticket tier`,
            );
          }

          if (!apiRes?.data) {
            throw new Error("Data is not available in response");
          }

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: `Ticket Tier ${isActive ? "Release" : "End"} Successfully!`,
            description: `The Ticket Tier status have been successfully updated to ${isActive ? "release" : "end"}.`,
          });

          setClose?.();
        } catch (error) {
          console.error("Error creating ticket tier:", error);
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Ticket Tier Update Failed",
              description: `An error occurred while updating status to ${isActive ? "release" : "end"} the ticket tier.`,
            }),
          });
        } finally {
          setSelectedTicketTier(null);
          setIsSubmitting?.(false);
        }
      },
    [],
  );

  // Memoize the handleTierEdit function
  const handleTierEdit = useCallback(
    ({
      setOpen,
      disableModalOpen,
    }: {
      setOpen: (props: Partial<TExternalState> | void) => () => void;
      disableModalOpen?: boolean;
    }) =>
      (ticketTier: TTicketTier) => {
        setSelectedTicketTier(ticketTier);
        if (!disableModalOpen) {
          setOpen()();
        }
      },
    [],
  );

  // Memoize the loading skeleton to prevent recreation
  const loadingSkeleton = useMemo(
    () => (
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    ),
    [],
  );

  return (
    <>
      <div className="mt-4">
        <RenderData
          {...allTicketTierApiState}
          expectedDataType="array"
          data={getAllTicketTierData}
          loadingSkeleton={loadingSkeleton}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {getAllTicketTierData?.map((item) => (
              <TicketsCard
                key={item?.id}
                {...item}
                editTierHandler={
                  isPastEvent
                    ? undefined
                    : handleTierEdit({
                        setOpen,
                      })
                }
                onReleaseTierClick={
                  isPastEvent
                    ? undefined
                    : manageRelease({
                        selectedTicketTier: item,
                        setSelectedTicketTier,
                        status: "Active",
                        toastHookProps,
                        updateATicketTier,
                      })
                }
                onEndTierClick={
                  isPastEvent
                    ? undefined
                    : manageRelease({
                        selectedTicketTier: item,
                        setSelectedTicketTier,
                        status: "Ended",
                        toastHookProps,
                        updateATicketTier,
                      })
                }
                onDeleteTierClick={
                  isPastEvent ? undefined : handleOpenDeleteDialog
                }
                disableReleaseTier={
                  isPastEvent ? true : isUpdateATicketTierLoading
                }
                disableEndTier={isPastEvent ? true : isUpdateATicketTierLoading}
                disableDeleteTier={
                  isPastEvent ? true : isDeleteATicketTierLoading
                }
                isShowBadge={isShowBadge}
              />
            ))}
          </div>
        </RenderData>

        {getAllTicketTierPagination &&
          getAllTicketTierPagination?.totalPages > 1 && (
            <Separator className="my-5" />
          )}

        <OutlinePagination
          isLoading={
            allTicketTierApiState.isLoading || allTicketTierApiState.isFetching
          }
          totalPages={getAllTicketTierPagination?.totalPages || 1}
          hideForTotalPagesOne
        />
      </div>

      <EditTierDialog
        open={open}
        setOpen={setClose({
          beforeExecute: clearSlug,
        })}
        eventId={eventId}
        selectedSlug={selectedTicketTier?.slug}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <StatusAlert
          status="warning"
          withCloseButton
          icon={<InfoIcon className="size-5" />}
          title="Delete Ticket Tier"
          description={`Are you sure you want to delete "${tierToDelete?.name}"? This action cannot be undone.`}
        >
          <StatusAlert.Buttons>
            <StatusAlert.Buttons.SecondaryButton
              disabled={isDeleteATicketTierLoading}
              onClick={clearDeleteState}
            >
              Cancel
            </StatusAlert.Buttons.SecondaryButton>

            <StatusAlert.Buttons.PrimaryButton
              disabled={isDeleteATicketTierLoading}
              onClick={handleDeleteTier({
                tierToDelete,
                deleteATicketTier,
                toastHookProps,
                clearDeleteState,
              })}
            >
              <ButtonLoadingContent
                isLoading={isDeleteATicketTierLoading}
                actionContent="Delete"
              />
            </StatusAlert.Buttons.PrimaryButton>
          </StatusAlert.Buttons>
        </StatusAlert>
      </AlertDialog>
    </>
  );
}

export default memo(TicketsList);
