import { useCallback } from "react";
import type { UseFormTrigger } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { Button } from "@/components/ui/button";

import type { IEventsCompareState } from "./type";
import useCompareEventsForm from "./useCompareEventsForm";
import EventSelect, {
  type TSelectOptionData,
} from "../../FilterOptions/EventSelect";
import { useSalesRevenueFilterContext } from "../../SalesRevenueFilterContext";
import type { ISalesRevenueFilterContextProps } from "../../SalesRevenueFilterContext/types";

type THandleModalClose = ({
  derived,
  dropdowns,
  modals,
  values,
}: ISalesRevenueFilterContextProps & {
  trigger: UseFormTrigger<IEventsCompareState>;
}) => () => void;

function CompareEventsForm() {
  const filterContextValues = useSalesRevenueFilterContext();
  const { compareEventsFormProps, getAllEventData, getAllEventApiState } =
    useCompareEventsForm();

  const { handleSubmit, watch, trigger, setValue, formState } =
    compareEventsFormProps;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (values: IEventsCompareState) => {
    try {
      filterContextValues?.values?.resetToInitialValues?.();
      filterContextValues?.values?.filterType?.set((prev) => {
        filterContextValues?.values?.tempFilterType?.set(prev);
        return prev;
      });
      filterContextValues?.values?.compareEvents?.set(values);
      filterContextValues?.modals?.compareEvents?.setIsOpen(false);
    } catch (error) {
      console.error("Add Promo Or Gift Card Error: ", error);
    }
  };

  const handleModalClose: THandleModalClose = useCallback(
    ({ values, modals, trigger }) =>
      () => {
        values?.tempFilterType?.set((prev) => {
          values?.filterType?.set(prev);
          return prev;
        });
        modals?.compareEvents?.setIsOpen(false);
      },
    [],
  );
  const getFilteredOptions = (
    excludeEventValue: TSelectOptionData | undefined,
  ) =>
    getAllEventData
      ?.filter(
        ({ details }) =>
          !excludeEventValue || details?.id !== excludeEventValue?.value,
      )
      ?.map(({ details }) => ({
        label: details?.name,
        value: details?.id,
        description: details?.description ?? "",
        image:
          details?.media?.find((item) => item?.isFeatured)?.url ?? undefined,
        startTime: details?.startTime ?? "",
      }));

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2.5 md:grid-cols-[1fr,auto,1fr]">
        <div className="flex-grow">
          <EventSelect
            disableLabel
            value={watch("eventOne")}
            placeholder="Select event"
            options={getFilteredOptions(watch("eventTwo"))}
            onChange={(value) => {
              if (value) {
                setValue("eventOne", value);
                trigger("eventOne");
              }
            }}
            errorMessage={
              errors?.root?.message ||
              errors?.eventOne?.description?.message ||
              errors?.eventOne?.label?.message ||
              errors?.eventOne?.value?.message
            }
          />
        </div>
        <div>
          <p className="text-center text-base font-normal leading-6 text-default-1000 md:mt-3">
            to
          </p>
        </div>
        <div className="flex-grow">
          <EventSelect
            isDisabled={!watch("eventOne")}
            disableLabel
            value={watch("eventTwo")}
            placeholder="Select event"
            options={getFilteredOptions(watch("eventOne"))}
            onChange={(value) => {
              if (value) {
                setValue("eventTwo", value);
                trigger("eventTwo");
              }
            }}
            errorMessage={
              errors?.eventTwo?.message ||
              errors?.root?.message ||
              errors?.eventTwo?.description?.message ||
              errors?.eventTwo?.label?.message ||
              errors?.eventTwo?.value?.message
            }
            isLoading={
              getAllEventApiState?.isLoading || getAllEventApiState?.isFetching
            }
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          color="secondary"
          type="button"
          className="w-full flex-1 text-base font-semibold leading-6"
          size="lg"
          onClick={handleModalClose({
            ...filterContextValues,
            trigger,
          })}
        >
          Cancel
        </Button>

        <Button
          color="primary"
          type="submit"
          className="w-full flex-1 text-base font-semibold leading-6"
          size="lg"
          disabled={!!errors?.eventTwo?.message}
        >
          <ButtonLoadingContent
            isLoading={isSubmitting}
            actionContent="Confirm"
          />
        </Button>
      </div>
    </form>
  );
}

export default CompareEventsForm;
