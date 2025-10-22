"use client";

import { useState, useCallback } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { type TUseManageSearchParamsReturnType } from "@/hooks/useManageSearchParams";
import type { TGetPastEventTransactionArgs } from "@/store/api/past-event/past-event.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";

type TStatus =
  | Exclude<TGetPastEventTransactionArgs, void>["category"]
  | undefined;

const CategoryOptions = [
  { label: "Bar", value: "BAR" },
  { label: "Guest List", value: "GUESTLIST" },
];

interface TransactionsSearchProps {
  manageStateParams: TUseManageSearchParamsReturnType<
    Exclude<TGetPastEventTransactionArgs, void>
  >;
}

function FilterForm({ manageStateParams }: TransactionsSearchProps) {
  const { updateMultipleParam, deleteAParam, getAParamValue } =
    manageStateParams;
  const category = getAParamValue("category");
  const [categoryState, setCategoryState] = useState<TStatus>(category);
  const { setClose } = useBooleanContext();

  const isStateAndParamSame =
    categoryState === category &&
    (categoryState !== undefined || category !== undefined);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isStateAndParamSame) {
        deleteAParam("category");
        deleteAParam("page");
        setCategoryState(undefined);
      } else {
        updateMultipleParam({ page: undefined, category: categoryState });
      }

      setClose();
    },
    [
      isStateAndParamSame,
      categoryState,
      updateMultipleParam,
      setClose,
      deleteAParam,
    ],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <SelectInput<{ label: string; value: string }>
        options={CategoryOptions}
        label="Category"
        placeholder="Select a category"
        value={
          CategoryOptions.find((opt) => opt.value === categoryState) || null
        }
        onChange={(option) => {
          setCategoryState(option?.value ?? undefined);
        }}
      />

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button fullWidth type="button" onClick={setClose}>
          Cancel
        </Button>

        <Button
          fullWidth
          color="primary"
          type="submit"
          disabled={!categoryState && !category}
        >
          <ButtonLoadingContent
            isLoading={false}
            actionContent={isStateAndParamSame ? "Clear" : "Apply"}
          />
        </Button>
      </div>
    </form>
  );
}

export default FilterForm;
