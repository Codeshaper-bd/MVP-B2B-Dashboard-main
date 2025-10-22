import { yupResolver } from "@hookform/resolvers/yup";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { type Resolver, useForm, useWatch } from "react-hook-form";

import type { TEventDetailsInputs } from "@/app/[locale]/(protected)/events/host-event/form-stepper/steps/step-one/types";
import eventDetailsValidationSchema from "@/app/[locale]/(protected)/events/host-event/form-stepper/steps/step-one/validation";
import { eventDetailsValues } from "@/app/[locale]/(protected)/events/host-event/form-stepper/steps/step-one/values";
import { prepareEventDetailsFormStateData } from "@/app/[locale]/(protected)/events/host-event/form-stepper/utils/form-state/event-details";
import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import { combineDateAndTimeToUTC } from "@/lib/date-time/utc-date";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { uploadOnlyRequiredImages } from "@/lib/media/upload-only-required-images";
import { fetchMediaListToFileListByRtk } from "@/lib/media/url-to-file/using-rtk-query.ts/fetch-media-list-to-file-list-by-rtk";
import {
  useUpdateAnEventMutation,
  useUpdateAnEventRelationMutation,
} from "@/store/api/events/events-api";
import type {
  TRequiredGratuity,
  TRequiredRecurring,
  TUpdateAnEventArgs,
} from "@/store/api/events/events.types";
import { useLazyFetchFileQuery } from "@/store/api/files-api/fetch-file-api";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import { useGetAllVenueQuery } from "@/store/api/venues/venues-api";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { useToast } from "@/components/ui/use-toast";

type TPageParams = Params & {
  locale: string;
  eventSlug: string;
};

function useEventAboutForm() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();
  const { data: getAllVenueRes, ...getAllVenueApiState } =
    useGetAllVenueQuery();
  const getAllVenueData = getAllVenueRes?.data;

  const venueOptions: IOption[] = useMemo(
    (): IOption[] =>
      getAllVenueData?.map(
        (venue): IOption => ({
          label: venue.name,
          value: venue.id,
        }),
      ) ?? [],
    [getAllVenueData],
  );

  const formProps = useForm<TEventDetailsInputs>({
    resolver: yupResolver(
      eventDetailsValidationSchema,
    ) as unknown as Resolver<TEventDetailsInputs>,
    defaultValues: eventDetailsValues,
  });

  const isGratuity = useWatch({
    control: formProps.control,
    name: "isGratuity",
    defaultValue: eventDetailsValues.isGratuity,
  });
  const isRecurring = useWatch({
    control: formProps.control,
    name: "isRecurring",
    defaultValue: eventDetailsValues.isRecurring,
  });
  const recurringFor = useWatch({
    control: formProps.control,
    name: "recurringFor",
    defaultValue: eventDetailsValues.recurringFor,
  });
  const startTimeDateField = useWatch({
    control: formProps.control,
    name: "startTimeDateField",
    defaultValue: eventDetailsValues?.startTimeDateField,
  });
  const startTimeTimeField = useWatch({
    control: formProps.control,
    name: "startTimeTimeField",
    defaultValue: eventDetailsValues?.startTimeTimeField,
  });
  const endTimeDateField = useWatch({
    control: formProps.control,
    name: "endTimeDateField",
    defaultValue: eventDetailsValues?.endTimeDateField,
  });
  const endTimeTimeField = useWatch({
    control: formProps.control,
    name: "endTimeTimeField",
    defaultValue: eventDetailsValues?.endTimeTimeField,
  });
  const checkInEndDateField = useWatch({
    control: formProps.control,
    name: "checkInEndDateField",
    defaultValue: eventDetailsValues?.checkInEndDateField,
  });
  const checkInEndTimeField = useWatch({
    control: formProps.control,
    name: "checkInEndTimeField",
    defaultValue: eventDetailsValues?.checkInEndTimeField,
  });
  const media = useWatch({
    control: formProps.control,
    name: "media",
    defaultValue: eventDetailsValues.media,
  });
  const venueId = useWatch({
    control: formProps.control,
    name: "venueId",
    defaultValue: eventDetailsValues.venueId,
  });
  const isCrowdMeterEnabled = useWatch({
    control: formProps.control,
    name: "isCrowdMeterEnabled",
    defaultValue: eventDetailsValues.isCrowdMeterEnabled,
  });

  const [updateAnEvent] = useUpdateAnEventMutation();
  const [uploadAMedia] = useUploadAMediaMutation();
  const [updateAnEventRelation] = useUpdateAnEventRelationMutation();
  const toastProps = useToast();
  const { eventSlug } = useParams<TPageParams>();

  useEffect(() => {
    (async () => {
      if (
        !getAnEventApiState?.isLoading &&
        !getAnEventApiState?.isFetching &&
        !getAnEventApiState?.isError &&
        getAnEventData
      ) {
        /* step 1 start */
        const { eventDetails } = await prepareEventDetailsFormStateData({
          getAnEventData,
        });
        formProps.reset(eventDetails);
      }
    })();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAnEventApiState?.isLoading,
    getAnEventApiState?.isFetching,
    getAnEventApiState?.isError,
    getAnEventData,
  ]);

  const [fetchFile] = useLazyFetchFileQuery();
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  // set media to form state
  useEffect(() => {
    const iife = async () => {
      setIsMediaLoading(true);
      if (
        !getAnEventApiState?.isLoading &&
        !getAnEventApiState?.isFetching &&
        !getAnEventApiState?.isError &&
        !getAnEventApiState?.isUninitialized &&
        getAnEventData?.details?.media
      ) {
        const { data } = await fetchMediaListToFileListByRtk({
          mediaList: getAnEventData?.details?.media,
          lazyFetchFileQueryFunction: fetchFile,
        });
        formProps?.setValue("media", data);
        setIsMediaLoading(false);
      }
    };
    iife();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAnEventData?.details?.media,
    getAnEventApiState?.isError,
    getAnEventApiState?.isFetching,
    getAnEventApiState?.isLoading,
    getAnEventApiState?.isUninitialized,
  ]);

  const onSubmit = async (data: TEventDetailsInputs) => {
    const toastId = toastProps.toast({
      title: "Updating Event",
      description: "Please wait...",
      variant: "loading",
    });

    try {
      const formData: TUpdateAnEventArgs["body"] = {
        name: data?.name,
        venueId: data?.venueId,
        startTime: combineDateAndTimeToUTC({
          date: data?.startTimeDateField,
          time: data?.startTimeTimeField,
        }),
        endTime: combineDateAndTimeToUTC({
          date: data?.endTimeDateField,
          time: data?.endTimeTimeField,
        }),
        checkInEnd: combineDateAndTimeToUTC({
          date: data?.checkInEndDateField,
          time: data?.checkInEndTimeField,
        }),
        description: data?.description,
        hideGuestlist: data?.hideGuestlist,
        isCrowdMeterEnabled: data?.isCrowdMeterEnabled,
        isFennecLive: data?.isFennecLive,
        // tax related fields
        isTaxEnabled: data?.isTaxEnabled,
        taxId: data?.taxId,
        taxName: data?.taxName,
        taxRate: data?.taxRate,
        // end tax related fields
      };
      formData.media = (
        await uploadOnlyRequiredImages({
          filesData: {
            mainImage: data?.media?.[0],
            galleryImages: data?.media?.slice(1),
          },
          mediaList: getAnEventData?.details?.media,
          uploadAMedia,
          toastProps,
          toastMode: "group",
        })
      )?.finalMediaList;
      // gratuity
      if (
        data?.isGratuity &&
        data?.gratuityValue !== null &&
        data?.gratuityValue !== undefined &&
        typeof data?.gratuityValue === "number"
      ) {
        (formData.isGratuity as TRequiredGratuity["isGratuity"]) =
          data?.isGratuity;
        (formData.gratuityValue as unknown as TRequiredGratuity["gratuityValue"]) =
          data?.gratuityValue;
      } else if (!data?.isGratuity) {
        formData.isGratuity = false;
        formData.gratuityValue = undefined;
      }
      // recurring
      if (
        data?.isRecurring &&
        data?.recurringFor !== null &&
        data?.recurringFor !== undefined &&
        typeof data?.recurringFor === "string"
      ) {
        (formData.isRecurring as TRequiredRecurring["isRecurring"]) =
          data?.isRecurring;
        (formData.recurringFor as unknown as TRequiredRecurring["recurringFor"]) =
          data?.recurringFor;
      } else if (!data?.isRecurring) {
        formData.isRecurring = false;
        formData.recurringFor = undefined;
      }
      const updateEventRes = await updateAnEvent({
        slug: eventSlug,
        body: formData,
      }).unwrap();

      if (!updateEventRes?.success) {
        throw new Error(updateEventRes?.message || "Failed to update event");
      }

      toastId.update({
        id: toastId.id,
        title: "Event Updated",
        description: "Event has been updated   successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error in publishing event: ", error);
      toastProps.toast({
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Failed to update event",
          description: "Failed to update event. Please try again later.",
        }),
      });
    }
  };

  return {
    formProps,
    getAnEventData,
    getAnEventApiState,
    venueOptions,
    isVenueLoading:
      getAllVenueApiState?.isLoading || getAllVenueApiState?.isFetching,
    isMediaLoading,
    onSubmit,
    uploadAMedia,
    updateAnEventRelation,
    watchValues: {
      isGratuity,
      isRecurring,
      recurringFor,
      media,
      venueId,
      // date related fields start
      startTimeDateField,
      startTimeTimeField,
      endTimeDateField,
      endTimeTimeField,
      checkInEndDateField,
      checkInEndTimeField,
      isCrowdMeterEnabled,
      // date related fields end
    },
  };
}

export default useEventAboutForm;
