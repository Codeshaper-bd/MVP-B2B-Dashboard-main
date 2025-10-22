import { useCallback, useState } from "react";

import useBooleanState from "@/hooks/useBooleanState";
import useManageStateParams from "@/hooks/useManageStateParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import {
  useDeletePromoterFromEventMutation,
  useGetAnPromoterEventsQuery,
} from "@/store/api/promoters/promoters-api";
import type { TGetAnPromotersArgs } from "@/store/api/promoters/promoters.types";
import DeleteConfirmationDialog from "@/components/features/alert-dialog/DeleteConfirmationDialog";
import PlusIcon from "@/components/icons/PlusIcon";
import RenderData from "@/components/render-data";
import PostCardSkeleton from "@/components/skeleton/post-card-skeleton";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchComponent from "@/components/ui/search-component";
import { useToast } from "@/components/ui/use-toast";

import EventFilterButton from "./EventFilterButton";
import type { TTabContentProps } from "./types";
import EventCard from "../../EventCard";

function ListContent({ promoter, setTab }: TTabContentProps) {
  const { toast } = useToast();

  // unassign event from promoter
  const [
    deletePromoterFromEvent,
    { isLoading: isDeletePromoterFromEventLoading },
  ] = useDeletePromoterFromEventMutation();

  const manageStateParams =
    useManageStateParams<Exclude<TGetAnPromotersArgs, void>>();
  const { updateMultipleParam, getAllParamValue } = manageStateParams;

  const { search, eventStatus = "Published" } = getAllParamValue();
  const [eventToDelete, setEventToDelete] = useState<
    TIdOrSlugOrIdentifier<"id">["id"] | null
  >(null);
  const {
    state: isDeleteDialogOpen,
    setOpen: openDeleteDialog,
    setClose: closeDeleteDialog,
  } = useBooleanState();
  // api call to get all promoter events
  const { data: getAnPromoterEventsRes, ...getAnPromoterEventsApiState } =
    useGetAnPromoterEventsQuery(
      {
        promoterId: promoter?.userId,
        pageSize: 9,
        search,
        eventStatus,
      },
      {
        skip: !checkIsValidId(promoter?.userId, {
          type: "number",
        }),
      },
    );

  const getAnPromoterEventsData = getAnPromoterEventsRes?.data;
  const getAnPromoterEventsPagination = getAnPromoterEventsRes?.pagination;

  const handleDeleteClick = useCallback(
    (eventId: TIdOrSlugOrIdentifier<"id">["id"]) => {
      setEventToDelete(eventId);
      openDeleteDialog()();
    },
    [openDeleteDialog],
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!eventToDelete) {
      return;
    }

    const toastId = toast({
      variant: "loading",
      title: "Deleting Event Assignment From Promoter",
      description: "Please wait while we delete event assignment from promoter",
    });

    try {
      await deletePromoterFromEvent({
        promoterId: promoter?.userId,
        eventId: eventToDelete,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Deleted Event Assignment From Promoter",
        description:
          "You have successfully deleted event assignment from promoter",
      });

      closeDeleteDialog()();
      setEventToDelete(null);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Failed to delete Event Assignment",
          description: "Please try again later.",
        }),
      });
    }
  }, [
    deletePromoterFromEvent,
    promoter?.userId,
    eventToDelete,
    toast,
    closeDeleteDialog,
  ]);
  return (
    <div>
      <DialogHeader className="p-6 pb-1 text-left">
        <DialogTitle className="mb-0 text-xl font-semibold leading-7 text-[#F5F5F6]">
          List of events
        </DialogTitle>
      </DialogHeader>
      <EventFilterButton
        eventStatus={eventStatus}
        manageStateParams={manageStateParams}
      />
      <div className="flex flex-col gap-4 px-6 pt-4 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex-1">
          <span className="text-lg font-semibold text-[#F5F5F6]">
            {eventStatus === "Published" ? "Upcoming Events" : "Past Events"}(
            {getAnPromoterEventsPagination?.totalCount || 0})
          </span>
        </div>
        <div className="flex-none">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchComponent<"external">
                mode="external"
                search={search}
                setSearch={(value) => {
                  updateMultipleParam({
                    search: value,
                    page: undefined,
                  });
                }}
                placeholder="Search"
                className="min-h-10"
              />
            </div>
            <Button
              color="primary"
              className="flex-none"
              size="lg"
              onClick={() => setTab("assign")}
            >
              <PlusIcon className="size-4" /> Assign Events
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh_-_340px)]">
        <div className="p-6">
          <RenderData
            data={getAnPromoterEventsData}
            expectedDataType="array"
            {...getAnPromoterEventsApiState}
            loadingSkeleton={
              <PostCardSkeleton
                size={9}
                className="grid grid-cols-1 gap-6 lg:grid-cols-3"
                imageWrapperClassName="p-0"
              />
            }
            dataNotFoundTitle="No events found"
            dataNotFoundSubtitle="There are no events assigned to this promoter."
          >
            <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
              {getAnPromoterEventsData?.map((event, index) => (
                <EventCard
                  key={event?.details?.id || index}
                  details={event?.details}
                  onDelete={handleDeleteClick}
                  promoterLink={event?.promoterLink || "#"}
                  promoterId={promoter?.userId}
                />
              ))}
            </div>
          </RenderData>
        </div>
      </ScrollArea>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={() => {
          closeDeleteDialog()();
          setEventToDelete(null);
        }}
        onConfirmClick={handleConfirmDelete}
        isLoading={isDeletePromoterFromEventLoading}
        confirmText="Remove"
        title="Delete Event Assignment"
        description="Are you sure you want to remove this event assignment from the promoter? You cannot undo this action"
      />
    </div>
  );
}

export default ListContent;
