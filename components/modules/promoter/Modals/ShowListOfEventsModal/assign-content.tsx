import { useCallback, useState } from "react";

import useManageStateParams from "@/hooks/useManageStateParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useAssignPromoterToEventMutation,
  useGetAllUnassignedPromotersQuery,
} from "@/store/api/promoters/promoters-api";
import type { TGetAllUnassignedPromotersArgs } from "@/store/api/promoters/promoters.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import RenderData from "@/components/render-data";
import PostCardSkeleton from "@/components/skeleton/post-card-skeleton";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchComponent from "@/components/ui/search-component";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import type { TTabContentProps } from "./types";
import EventCard from "../../EventCard";

function AssignContent({ promoter, setTab }: TTabContentProps) {
  // state
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSelected = selectedIds?.length;
  const { toast } = useToast();
  // api
  const [assignPromoterToEvent] = useAssignPromoterToEventMutation();
  const { updateMultipleParam, getAllParamValue } =
    useManageStateParams<Exclude<TGetAllUnassignedPromotersArgs, void>>();
  const queryParams = getAllParamValue();
  const {
    data: getAllUnassignedPromotersRes,
    ...getAllUnassignedPromotersApiState
  } = useGetAllUnassignedPromotersQuery(
    {
      promoterId: promoter?.userId,
      pageSize: 9,
      ...queryParams,
    },
    {
      skip: !checkIsValidId(promoter?.userId, {
        type: "number",
      }),
    },
  );
  const getAllUnassignedPromotersData = getAllUnassignedPromotersRes?.data;

  const handleSetTab = useCallback(() => {
    setTab("list");
    setSelectedIds([]);
  }, [setTab]);

  // call api for assign event
  const handleAssignEvent = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Assigning Events",
      description: "Please wait while we assign events",
    });

    try {
      setIsSubmitting?.(true);
      await assignPromoterToEvent({
        userId: promoter?.userId,
        eventIds: selectedIds,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Assigned Events",
        description: "You have successfully assigned events",
      });
      setIsSubmitting?.(false);
      handleSetTab();
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Failed to Update Challenges",
          description: "Something went wrong while assigning events.",
        }),
      });
      setIsSubmitting?.(false);
    }
  };

  return (
    <div className="relative pb-16">
      <DialogHeader className="p-6">
        <div className="flex items-center gap-4">
          <Button size="icon" onClick={handleSetTab}>
            <LeftArrowIcon className="size-4 text-default-1000" />
          </Button>
          <div>
            <DialogTitle className="mb-0 text-lg font-semibold leading-7 text-[#F5F5F6]">
              Assign More Events
            </DialogTitle>
            <DialogDescription className="text-sm font-normal leading-5 text-default-700">
              Select Events
            </DialogDescription>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <div className="flex-1">
            <SearchComponent<"external">
              mode="external"
              search={queryParams?.search}
              setSearch={(value) => {
                updateMultipleParam({
                  search: value,
                  page: undefined,
                });
              }}
              placeholder="Search"
            />
          </div>
        </div>
      </DialogHeader>
      <Separator className="w-full bg-[#1F242F]" />

      <ScrollArea className="h-[calc(100vh_-_395px)]">
        <div className="p-6">
          <RenderData
            data={getAllUnassignedPromotersData}
            expectedDataType="array"
            {...getAllUnassignedPromotersApiState}
            loadingSkeleton={
              <PostCardSkeleton
                size={9}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                imageWrapperClassName="p-0"
              />
            }
            dataNotFoundTitle="No events found"
            dataNotFoundSubtitle="There are no events available to assign."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getAllUnassignedPromotersData?.map((event, index) => (
                <EventCard
                  disableRedirect
                  key={event?.details?.id || index}
                  details={event?.details}
                  onClick={(selectedId) => {
                    if (selectedIds?.includes(selectedId)) {
                      setSelectedIds(
                        selectedIds?.filter((id) => id !== selectedId),
                      );
                    } else {
                      setSelectedIds?.([...selectedIds, selectedId]);
                    }
                  }}
                  selectedId={selectedIds?.find(
                    (id) => id === event?.details?.id,
                  )}
                />
              ))}
            </div>
          </RenderData>
        </div>
      </ScrollArea>
      <DialogFooter className="absolute bottom-0 w-full rounded-b-none bg-card px-6 py-4">
        <div className="flex justify-end gap-3">
          <Button type="button" color="secondary" onClick={handleSetTab}>
            Back
          </Button>
          <Button
            type="button"
            color="primary"
            disabled={!totalSelected}
            onClick={handleAssignEvent}
          >
            <ButtonLoadingContent
              actionContent={`Assign (${totalSelected} ${totalSelected > 1 ? "Events" : "Event"})`}
              loadingContent="Assigning..."
              isLoading={isSubmitting}
            />
          </Button>
        </div>
      </DialogFooter>
    </div>
  );
}

export default AssignContent;
