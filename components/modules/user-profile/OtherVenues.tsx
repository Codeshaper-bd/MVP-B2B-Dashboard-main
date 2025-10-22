"use client";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import {
  useDeleteAVenueMutation,
  useGetAllVenueQuery,
} from "@/store/api/venues/venues-api";
import type { TVenue } from "@/store/api/venues/venues.types";
import AddOrEditVenueDialog from "@/components/modules/venue/modals/AddOrEditVenueDialog";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import VenueCardSkeleton from "@/components/skeleton/venue-card-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import Venue from "./Forms/Venue";

function OtherVenues() {
  const toastProps = useToast();
  const [deleteAVenue, { isLoading: isDeleteAVenueLoading }] =
    useDeleteAVenueMutation();
  const { data: getAllVenueRes, ...getAllVenueApiState } = useGetAllVenueQuery({
    isPrimary: false,
  });
  const getAllVenueData = getAllVenueRes?.data;
  const getAllVenuePagination = getAllVenueRes?.pagination;

  const handleDeleteVenue =
    ({
      venue,
      toastProps,
    }: {
      venue: TVenue;
      toastProps: TUseToastReturnType;
    }) =>
    async () => {
      const toastId = toastProps?.toast({
        variant: "loading",
        title: "Venue delete",
        description: "Executing delete venue operation",
      });
      try {
        await deleteAVenue({
          slug: venue?.slug,
        }).unwrap();
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Venue deleted",
          description: "The venue has been deleted successfully",
        });
      } catch (error) {
        toastId.update({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: "Failed to delete venue",
            description: "Failed to delete venue",
          }),
        });
      }
    };

  return (
    <Card className="w-full p-6" id="other-venues">
      <CardContent className="w-full p-0">
        <div className="mb-5 flex w-full items-center justify-between">
          <h3 className="text-lg font-semibold leading-7 text-default-900">
            Other Venues
          </h3>

          <div className="w-fit">
            <AddOrEditVenueDialog
              targetButton={<Button color="primary">+ Add Other Venue</Button>}
            />
          </div>
        </div>

        <RenderData
          loadingSkeleton={<VenueCardSkeleton />}
          {...getAllVenueApiState}
          data={getAllVenueData}
          expectedDataType={"array"}
        >
          <div className="grid gap-8">
            {getAllVenueData?.map((venue) => (
              <Venue
                key={venue?.id}
                withActionButtons
                images={venue?.media?.map((media) => media?.url)}
                id={venue?.slug}
                title={venue?.name}
                email={venue?.email}
                location={venue?.city}
                phone={venue?.phone}
                users={venue?.capacity}
                onDelete={handleDeleteVenue({ venue, toastProps })}
                isDeleteLoading={isDeleteAVenueLoading}
              />
            ))}
          </div>
        </RenderData>

        <div className="mt-5">
          <BasicPagination
            isLoading={
              getAllVenueApiState.isLoading || getAllVenueApiState?.isFetching
            }
            totalPages={getAllVenuePagination?.totalPages || 1}
            hideForTotalPagesOne
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default OtherVenues;
