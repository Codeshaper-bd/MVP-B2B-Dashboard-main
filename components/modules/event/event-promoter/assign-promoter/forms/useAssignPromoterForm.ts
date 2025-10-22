import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm, useWatch, type UseFormReturn } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateALinkTrackingMutation,
  useGetAllLinkTrackingQuery,
} from "@/store/api/link-tracking/link-tracking-api";
import type { TCreateALinkTrackingMutation } from "@/store/api/link-tracking/link-tracking.types";
import {
  useGetAllPromotersQuery,
  useLazyGetAllPromotersQuery,
} from "@/store/api/promoters/promoters-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type {
  IAssignPromoter,
  TAssignPromoterFormInput,
  THandleLoadOptions,
} from "./types";
import { defaultValues } from "./utils";

const useAssignPromoterForm = ({
  eventId,
  isEditMode,
  isSubmitting,
  setIsSubmitting,
}: IAssignPromoter) => {
  const {
    data: getEventAttachedPromotersRes,
    ...getEventAttachedPromotersApiState
  } = useGetAllLinkTrackingQuery(
    {
      eventId,
    },
    {
      skip: !checkIsValidId(eventId),
    },
  );

  const getEventAttachedPromotersData = getEventAttachedPromotersRes?.data;

  const [getAllPromoters] = useLazyGetAllPromotersQuery();
  const [createALinkTracking] = useCreateALinkTrackingMutation();
  const searchTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const { data: getAllPromotersRes, ...getAllPromotersApiState } =
    useGetAllPromotersQuery();
  const getAllPromotersData = getAllPromotersRes?.data;

  // Reusable function to filter out already attached promoters
  const filterAttachedPromoters = useCallback(
    (promoters: typeof getAllPromotersData) => {
      if (!promoters) {
        return [];
      }

      // Get IDs of promoters already attached to this event
      const attachedPromoterIds = new Set(
        getEventAttachedPromotersData
          ?.map((linkTracking) => linkTracking.promoter?.id)
          .filter((id) => id !== null && id !== undefined)
          .map(String) ?? [],
      );

      // Filter out already attached promoters from the options
      return promoters
        .filter((promoter) => {
          const promoterId = String(promoter.userId ?? -1);
          return !attachedPromoterIds.has(promoterId);
        })
        .map(
          (promoter): IOption => ({
            value: promoter.userId ?? -1,
            label: promoter?.fullName,
          }),
        );
    },
    [getEventAttachedPromotersData],
  );

  const defaultOptions: IOption[] = useMemo(
    () => filterAttachedPromoters(getAllPromotersData),
    [getAllPromotersData, filterAttachedPromoters],
  );

  const toastHookProps = useToast();
  const { setClose } = useDialogContext();

  const handleLoadOptions: THandleLoadOptions = useCallback(
    ({ getAllPromoters }) =>
      async (inputValue, callback) => {
        // debounce implementation start
        if (searchTimeoutId.current) {
          clearTimeout(searchTimeoutId.current);
        }
        let searchValue: string | undefined = undefined;
        await new Promise<void>((resolve) => {
          searchTimeoutId.current = setTimeout(() => {
            searchValue = inputValue;
            resolve();
          }, 800);
        });
        searchValue = inputValue;
        // debounce implementation end

        /* ---------------------------------------------------------------------------------------- */

        // data fetching (by debounced search) start
        try {
          const getAllPromotersRes = await getAllPromoters(
            {
              search: searchValue?.toLowerCase(),
            },
            true,
          ).unwrap();
          const getAllPromotersData = getAllPromotersRes?.data;

          // Use the reusable filtering function
          return filterAttachedPromoters(getAllPromotersData);
        } catch (error) {
          console.error("Error fetching promoters:", error);
          return [];
        }
        // data fetching (by debounced search) end
      },
    [filterAttachedPromoters],
  );

  // debounce implementation cleanup start
  useEffect(() => {
    const currentSearchTimeoutId = searchTimeoutId.current;
    return () => {
      if (currentSearchTimeoutId) {
        clearTimeout(currentSearchTimeoutId);
      }
    };
  }, []);
  // debounce implementation cleanup end

  const formProps = useForm<TAssignPromoterFormInput>({
    defaultValues,
  });

  const promoter = useWatch({
    control: formProps.control,
    name: "promoter",
    defaultValue: defaultValues.promoter,
  });

  const onSubmit =
    ({
      toastHookProps,
      formProps,
      isEditMode,
      setIsSubmitting,
      createALinkTracking,
      setClose,
    }: {
      toastHookProps: TUseToastReturnType;
      isSubmitting?: boolean;
      setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
      formProps: UseFormReturn<TAssignPromoterFormInput>;
      createALinkTracking: TCreateALinkTrackingMutation;
      eventId: number | undefined;
      isEditMode: boolean | undefined;
      setClose: () => void;
    }) =>
    async (data: TAssignPromoterFormInput) => {
      const toastId = toastHookProps.toast({
        variant: "loading",
        title: `${isEditMode ? "Updating" : "Creating"} Assign Promoter`,
        description: `Please wait while we ${isEditMode ? "update" : "create"} your promoter`,
      });
      setIsSubmitting?.(true);

      try {
        if (isEditMode) {
          throw new Error("There is no endpoint to edit a promoter");
        }
        if (!checkIsValidId(eventId)) {
          throw new Error("Event Id is required");
        }

        await createALinkTracking({
          eventId,
          type: "EMPLOYEE",
          promoterId: Number(data?.promoter?.value ?? -1),
        }).unwrap();

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: `Promoter ${isEditMode ? "Updated" : "Created"} Successfully!`,
          description: `The Promoter details have been successfully ${isEditMode ? "updated" : "created"}.`,
        });

        formProps?.reset?.();
        setClose();
      } catch (error) {
        console.error("Error creating promoter:", error);
        toastId.update({
          id: toastId.id,
          variant: "error",
          ...getApiErrorMessages({
            error,
            title: `${isEditMode ? "Promoter Update" : "Promoter Creation"} Failed`,
            description: `An error occurred while ${isEditMode ? "updating" : "creating"} the promoter.`,
          }),
        });
        formProps.reset();
      } finally {
        setIsSubmitting?.(false);
      }
    };

  return {
    formProps,
    onSubmit,
    asyncSelectProps: {
      defaultOptions,
      handleLoadOptions,
      getAllPromoters,
      getAllPromotersApiState,
    },
    toastHookProps,
    watchValues: {
      promoter,
    },
    onSubmitAssistProps: {
      toastHookProps,
      isSubmitting,
      setIsSubmitting,
      formProps,
      createALinkTracking,
      eventId,
      isEditMode,
      setClose,
    },
    getEventAttachedPromotersApiState,
  };
};

export default useAssignPromoterForm;
