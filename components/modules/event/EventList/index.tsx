"use client";
import { memo, useCallback, useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TNullish } from "@/store/api/common-api-types";
import {
  useGetAllEventQuery,
  useUpdateAnEventMutation,
} from "@/store/api/events/events-api";
import type {
  TEvent,
  TEventType,
  TGetAllEventArgs,
  TUpdateAnEventMutation,
} from "@/store/api/events/events.types";
import EventCard from "@/components/modules/event/EventList/EventCard";
import DeleteEventAlert from "@/components/modules/event/modals/DeleteEventAlert";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import PostCardSkeleton from "@/components/skeleton/post-card-skeleton";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

export interface IEventListProps {
  type: TEventType;
  status?: string;
}

function EventList({ type, status }: IEventListProps) {
  const {
    state: isDeleteEventAlertOpen,
    setOpen: setDeleteEventAlertOpen,
    setClose: setDeleteEventAlertClose,
  } = useBooleanState();
  const [targetEvent, setTargetEvent] = useState<TEvent | null>(null);

  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllEventArgs, void>>();
  const [updateAnEvent] = useUpdateAnEventMutation();
  const toastProps = useToast();

  const { data: getAllEventRes, ...getAllEventApiState } = useGetAllEventQuery({
    ...getAllParamValue(),
    pageSize: contentPerPageOptions[12],
    type,
    status: status ? status : undefined,
  });
  const getAllEventData = getAllEventRes?.data;
  const getAllEventPagination = getAllEventRes?.pagination;

  const handlePublish = useCallback(
    ({
      updateAnEvent,
      toastProps: { toast },
    }: {
      toastProps: TUseToastReturnType;
      updateAnEvent: TUpdateAnEventMutation;
    }) =>
      async (event: TEvent | TNullish) => {
        const toastId = toast({
          variant: "loading",
          title: "Publishing Event",
          description: "Please wait...",
        });

        try {
          if (!event?.details?.slug) {
            throw new Error("Event slug not found");
          }
          const updateAnEventRes = await updateAnEvent({
            slug: event?.details?.slug,
            body: {
              status: "Published",
            },
          }).unwrap();

          if (!updateAnEventRes?.success) {
            throw new Error(
              updateAnEventRes?.message || "Failed to publish event",
            );
          }

          toastId.update({
            id: toastId?.id,
            variant: "success",
            title: "Event Published",
            description: updateAnEventRes?.message,
          });
        } catch (error) {
          toastId.update({
            id: toastId?.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Failed to Publish Event",
              description: "An error occurred while publishing the event",
            }),
          });
        }
      },
    [],
  );

  return (
    <div>
      <RenderData
        {...getAllEventApiState}
        expectedDataType="array"
        data={getAllEventData}
        loadingSkeleton={
          <SkeletonWrapper size={12}>
            <PostCardSkeleton />
          </SkeletonWrapper>
        }
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {getAllEventData?.map((event) => (
            <EventCard
              {...event}
              key={event?.details?.id}
              eventCardType={type ?? "upcoming"}
              onDeleteClick={setDeleteEventAlertOpen({
                beforeExecute: () => setTargetEvent(event),
              })}
              onPublishNowClick={handlePublish({
                updateAnEvent,
                toastProps,
              })}
            />
          ))}
        </div>
      </RenderData>

      <div className="mb-14 mt-4">
        <BasicPagination
          isLoading={
            getAllEventApiState.isLoading || getAllEventApiState.isFetching
          }
          totalPages={getAllEventPagination?.totalPages || 1}
          hideForTotalPagesOne
        />
      </div>

      <DeleteEventAlert
        isOpen={isDeleteEventAlertOpen}
        event={targetEvent}
        setIsOpen={setDeleteEventAlertClose({
          beforeExecute: () => setTargetEvent(null),
        })}
      />
    </div>
  );
}

export default memo(EventList);
