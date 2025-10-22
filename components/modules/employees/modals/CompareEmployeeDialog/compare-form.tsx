import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import type { TCompareFormInput } from "./types";
import useGetEmployee from "./useGetEmployee";
export type TCompareIdProps = {
  compareEmployeeId: TIdOrSlugOrIdentifier<"id">["id"];
};

function CompareForm() {
  // state
  const { updateAParam } = useManageSearchParams<TCompareIdProps>();
  const {
    defaultOptions,
    getAllEmployee,
    getAllEmployeeApiState,
    handleLoadOptions,
  } = useGetEmployee();

  const { setClose } = useDialogContext();

  const { watch, setValue, handleSubmit, trigger } =
    useForm<TCompareFormInput>();

  const onSubmit = (data: TCompareFormInput) => {
    updateAParam({ key: "compareEmployeeId", value: data?.employee?.value });
    setClose();
  };

  const employee = watch("employee");

  return (
    <form noValidate className="py-4" onSubmit={handleSubmit(onSubmit)}>
      <LabelErrorWrapper label="Select Employees">
        <AsyncSelect
          cacheOptions
          defaultOptions={defaultOptions}
          loadOptions={handleLoadOptions({ getAllEmployee })}
          isClearable
          value={employee ?? null}
          placeholder="Search Employees..."
          className="react-select"
          classNamePrefix="select"
          onChange={(selected) => {
            setValue("employee", selected);
            trigger("employee");
          }}
          formatOptionLabel={(optionsData) => <div>{optionsData.label}</div>}
          isLoading={
            getAllEmployeeApiState.isLoading ||
            getAllEmployeeApiState?.isFetching
          }
        />
      </LabelErrorWrapper>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button type="button" color="secondary" onClick={setClose}>
          Cancel
        </Button>

        <Button type="submit" color="primary">
          Compare
        </Button>
      </div>
    </form>
  );
}

export default CompareForm;
