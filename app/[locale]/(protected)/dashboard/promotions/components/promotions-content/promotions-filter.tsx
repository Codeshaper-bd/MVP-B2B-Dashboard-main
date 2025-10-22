"use client";

import { useCallback, useState } from "react";

import useBooleanState from "@/hooks/useBooleanState";
import { type TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type {
  TGetTotalEngagementOfPromotionArgs,
  TStatus,
} from "@/store/api/promotion/promotion.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";
import FilterContent from "@/components/filter-content";
import { Button } from "@/components/ui/button";

const radioProps: ICustomRadioLabelProps = {
  textSize: "16px",
  centerColor: "transparent",
  ringSize: "5px",
  mode: "button",
};

export interface IPromotionsFilter {
  queryStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetTotalEngagementOfPromotionArgs, void | undefined>
  >;
}

function PromotionsFilter({ queryStateParams }: IPromotionsFilter) {
  const { getAllParamValue, updateAParam, deleteAParam } = queryStateParams;
  const { status: paramStatus } = getAllParamValue();

  const [statusState, setStatusState] = useState<TStatus | undefined>(
    paramStatus,
  );

  const {
    state: isFilterOpen,
    setClose: closeFilter,
    toggle: toggleFilterOpen,
  } = useBooleanState();

  const isSameStatus = statusState === paramStatus;

  const buttonMode = !statusState ? "apply" : isSameStatus ? "clear" : "apply";

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (buttonMode === "clear") {
        deleteAParam("status");
        setStatusState(undefined);
        closeFilter()();
        return;
      }

      updateAParam({
        key: "status",
        value: statusState,
      });

      closeFilter()();
    },
    [buttonMode, statusState, updateAParam, deleteAParam, closeFilter],
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setStatusState(e.target.value as TStatus);
    },
    [],
  );

  return (
    <FilterContent
      className="-right-44 md:right-0"
      open={isFilterOpen}
      onClick={() => {
        setStatusState(paramStatus ?? undefined);
        toggleFilterOpen()();
      }}
      onClose={closeFilter()}
    >
      <form onSubmit={handleSubmit} noValidate>
        <CustomRadioGroup
          direction="column"
          gap="gap-0"
          label="Status"
          options={[
            {
              label: "Active",
              value: "Active",
              radioProps,
              onChange: handleChange,
              checked: statusState === "Active",
            },
            {
              label: "Inactive",
              value: "Inactive",
              radioProps,
              onChange: handleChange,
              checked: statusState === "Inactive",
            },
          ]}
        />

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth onClick={closeFilter()} type="button">
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            type="submit"
            disabled={!statusState && buttonMode !== "clear"}
          >
            <ButtonLoadingContent
              isLoading={false}
              actionContent={buttonMode === "clear" ? "Clear" : "Apply"}
            />
          </Button>
        </div>
      </form>
    </FilterContent>
  );
}

export default PromotionsFilter;
