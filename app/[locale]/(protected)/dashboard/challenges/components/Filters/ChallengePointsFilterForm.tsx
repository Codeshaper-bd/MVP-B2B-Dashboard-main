"use client";

import { useState, useCallback } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";

import type { TFilterOption, TFiltersProps } from "./type";
import { challengeTypeOptions } from "./utils";

function ChallengePointsFilterForm({ manageStateParamsProps }: TFiltersProps) {
  const { getAParamValue, updateAParam, deleteAParam } = manageStateParamsProps;

  const { setClose: setFilterModalClose } = useBooleanContext();

  const paramType = getAParamValue("type");
  const [challengeTypeState, setChallengeTypeState] =
    useState<TFilterOption | null>(
      () =>
        challengeTypeOptions.find((option) => option?.value === paramType) ??
        null,
    );

  const isSameType = challengeTypeState?.value === paramType;
  const buttonMode = !challengeTypeState
    ? "apply"
    : isSameType
      ? "clear"
      : "apply";

  const handleApplyOrClear = useCallback(() => {
    if (buttonMode === "clear") {
      deleteAParam("type");
      setChallengeTypeState(null);
      setFilterModalClose();
      return;
    }

    updateAParam({
      key: "type",
      value: challengeTypeState?.value,
    });

    setFilterModalClose();
  }, [
    buttonMode,
    challengeTypeState,
    updateAParam,
    deleteAParam,
    setFilterModalClose,
  ]);

  return (
    <div>
      <div>
        <SelectInput
          label="Challenge Type"
          value={challengeTypeState}
          onChange={(newValue) => setChallengeTypeState(newValue ?? null)}
          options={challengeTypeOptions}
          placeholder="Select Challenge Type"
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button fullWidth type="button" onClick={setFilterModalClose}>
          Cancel
        </Button>

        <Button
          fullWidth
          color="primary"
          type="button"
          disabled={buttonMode === "clear" && !challengeTypeState}
          onClick={handleApplyOrClear}
        >
          {buttonMode === "clear" ? "Clear" : "Apply"}
        </Button>
      </div>
    </div>
  );
}

export default ChallengePointsFilterForm;
