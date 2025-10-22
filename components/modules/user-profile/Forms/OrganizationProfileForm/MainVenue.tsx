import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import {
  useDeleteAVenueMutation,
  useGetAllVenueQuery,
} from "@/store/api/venues/venues-api";
import type { TVenue } from "@/store/api/venues/venues.types";
import AddOrEditVenueDialog from "@/components/modules/venue/modals/AddOrEditVenueDialog";
import RenderData from "@/components/render-data";
import VenueCardSkeleton from "@/components/skeleton/venue-card-skeleton";
import { Button } from "@/components/ui/button";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import Venue from "../Venue";

interface IMainVenueProps {
  isValidToken?: boolean;
}

function MainVenue({ isValidToken }: IMainVenueProps) {
  const toastProps = useToast();
  const [deleteAVenue, { isLoading: isDeleteAVenueLoading }] =
    useDeleteAVenueMutation();
  const { data: getAllVenueRes, ...getAllVenueApiState } = useGetAllVenueQuery({
    isPrimary: true,
  });
  const getAllVenueData = getAllVenueRes?.data;
  const featuredVenue = getAllVenueData?.[0];

  const handleDeleteVenue =
    ({
      venue,
      toastProps,
    }: {
      venue?: TVenue;
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
    <div>
      <div className="mb-6 flex !w-full items-center !justify-between gap-2">
        <h3 className="w-full text-lg font-semibold leading-7 text-default-900">
          Main Venue
        </h3>

        {!featuredVenue && !!isValidToken && (
          <AddOrEditVenueDialog
            targetButton={
              <Button type="button" color="primary">
                + Add Main Venue
              </Button>
            }
            isPrimaryMode
          />
        )}
      </div>
      <RenderData
        loadingSkeleton={<VenueCardSkeleton />}
        {...getAllVenueApiState}
        data={featuredVenue}
        expectedDataType={"object"}
      >
        <Venue
          images={featuredVenue?.media?.map((media) => media?.url)}
          id={featuredVenue?.slug}
          title={featuredVenue?.name}
          email={featuredVenue?.email}
          location={featuredVenue?.city}
          phone={featuredVenue?.phone}
          users={featuredVenue?.capacity}
          withActionButtons
          onDelete={handleDeleteVenue({
            venue: featuredVenue,
            toastProps,
          })}
          isDeleteLoading={isDeleteAVenueLoading}
          editDisabled={!isValidToken}
          deleteDisabled={!isValidToken}
        />
      </RenderData>
    </div>
  );
}

export default MainVenue;
