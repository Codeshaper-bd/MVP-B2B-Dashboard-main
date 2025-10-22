"use client";

import { forwardRef } from "react";
import AsyncSelect from "react-select/async";

import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import type { IAssignPromoter } from "./types";
import useAssignPromoterForm from "./useAssignPromoterForm";
import ConfigureDialog from "../Configure";

const AssignPromoterForm = forwardRef<
  HTMLButtonElement | null,
  IAssignPromoter
>(
  (
    { eventId, isEditMode, isSubmitting, setIsSubmitting }: IAssignPromoter,
    submitButtonRef,
  ) => {
    const {
      formProps: {
        control,
        setValue,
        formState: { errors },
      },
      onSubmit,

      asyncSelectProps: {
        defaultOptions,
        handleLoadOptions,
        getAllPromoters,
        getAllPromotersApiState,
      },
      watchValues: { promoter },
      onSubmitAssistProps,
      getEventAttachedPromotersApiState,
    } = useAssignPromoterForm({
      eventId,
      isEditMode,
      isSubmitting,
      setIsSubmitting,
    });

    return (
      <form noValidate className="mt-4">
        <LabelErrorWrapper
          label="Select Promoter"
          error={
            errors.promoter?.message ||
            errors.promoter?.value?.message ||
            errors.promoter?.label?.message
          }
        >
          <AsyncSelect
            cacheOptions
            defaultOptions={defaultOptions}
            loadOptions={handleLoadOptions({ getAllPromoters })}
            isClearable
            value={promoter ?? null}
            placeholder="Search from Promoter Library"
            className="react-select"
            classNamePrefix="select"
            onChange={(selected) => {
              setValue("promoter", selected);
            }}
            isLoading={
              getAllPromotersApiState?.isLoading ||
              getAllPromotersApiState?.isFetching ||
              getEventAttachedPromotersApiState?.isLoading ||
              getEventAttachedPromotersApiState?.isFetching
            }
          />
        </LabelErrorWrapper>
        <div className="h-2.5"></div>
        <ConfigureDialog eventId={eventId} promoter={promoter} />
        <button
          type="button"
          hidden
          ref={submitButtonRef}
          onClick={control?.handleSubmit(onSubmit(onSubmitAssistProps))}
        />
      </form>
    );
  },
);

AssignPromoterForm.displayName = "AssignPromoterForm";

export default AssignPromoterForm;
