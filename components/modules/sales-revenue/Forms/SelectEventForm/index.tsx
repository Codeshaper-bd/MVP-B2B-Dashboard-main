import { useCallback } from "react";
import type { UseFormTrigger } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { Button } from "@/components/ui/button";

import type { IEventSelectState } from "./type";
import useSelectEventForm from "./useSelectEventForm";
import EventSelect from "../../FilterOptions/EventSelect";
import { useSalesRevenueFilterContext } from "../../SalesRevenueFilterContext";
import type { ISalesRevenueFilterContextProps } from "../../SalesRevenueFilterContext/types";

type THandleModalClose = ({
  derived,
  dropdowns,
  modals,
  values,
}: ISalesRevenueFilterContextProps & {
  trigger: UseFormTrigger<IEventSelectState>;
}) => () => void;

function SelectEventForm() {
  const filterContextValues = useSalesRevenueFilterContext();

  const { selectEventFormProps, getAllEventData, getAllEventApiState } =
    useSelectEventForm();

  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { isSubmitting },
  } = selectEventFormProps;

  const onSubmit = async (values: IEventSelectState) => {
    try {
      filterContextValues?.values?.resetToInitialValues?.();
      filterContextValues?.values?.filterType?.set((prev) => {
        filterContextValues?.values?.tempFilterType?.set(prev);
        return prev;
      });
      filterContextValues?.values?.event?.set(values?.event);
      filterContextValues?.modals?.eventSelect?.setIsOpen?.(false);
    } catch (error) {
      console.error("Add Promo Or Gift Card Error: ", error);
    }
  };

  const handleModalClose: THandleModalClose = useCallback(
    ({ values, modals, trigger }) =>
      () => {
        //
        values?.tempFilterType?.set((prev) => {
          values?.filterType?.set(prev);
          return prev;
        });
        modals?.eventSelect?.setIsOpen?.(false);
      },
    [],
  );

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <EventSelect
        value={watch("event", undefined)}
        placeholder="Select Event"
        options={getAllEventData?.map(({ details }) => ({
          label: details?.name,
          value: details?.id,
          description: details?.description ?? "",
          image: details?.media?.[0]?.url ?? undefined,
          startTime: details?.startTime ?? "",
        }))}
        onChange={(eventItem) => {
          const numberValue = Number(eventItem?.value);
          if (eventItem?.value && !isNaN(numberValue)) {
            setValue("event", eventItem);
          }
        }}
        isLoading={
          getAllEventApiState?.isLoading || getAllEventApiState?.isFetching
        }
      />

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          color="secondary"
          type="button"
          className="w-full flex-1 text-base font-semibold leading-6"
          onClick={handleModalClose({ ...filterContextValues, trigger })}
        >
          Cancel
        </Button>

        <Button
          color="primary"
          type="submit"
          className="w-full flex-1 text-base font-semibold leading-6"
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

export default SelectEventForm;
