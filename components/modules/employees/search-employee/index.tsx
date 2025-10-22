import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { usePathname } from "@/components/navigation";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import type { TCompareFormInput } from "./types";
import useSearchEmployee from "./useSearchEmployee";
export type TCompareIdProps = {
  compareEmployeeId: TIdOrSlugOrIdentifier<"id">["id"];
};
type SearchEmployeeProps = {
  isFromCompare?: boolean | undefined;
};
function SearchEmployee({ isFromCompare = false }: SearchEmployeeProps) {
  const router = useRouter();
  const isEventCompany = useIsEventCompany();
  const pathname = usePathname();
  const isEmployeeAnalyticsPage = pathname?.includes(
    "view-employment-analytics",
  );
  // state
  const { updateAParam, getAParamValue } =
    useManageSearchParams<TCompareIdProps>();
  const compareEmployeeId = getAParamValue("compareEmployeeId");
  const { defaultOptions, handleLoadOptions, getAllEmployeeApiState } =
    useSearchEmployee();

  const { watch, setValue, handleSubmit, trigger } =
    useForm<TCompareFormInput>();

  const onSubmit = (data: TCompareFormInput) => {
    const newId = data?.employee?.value;
    if (!newId) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    if (!isFromCompare && compareEmployeeId) {
      updateAParam({ key: "compareEmployeeId", value: newId });
    } else {
      let newPath = "";
      if (isEmployeeAnalyticsPage) {
        newPath = isEventCompany
          ? `/en/event-company/organization/employees/view-employment-analytics/${newId}`
          : `/en/organization/employees/view-employment-analytics/${newId}`;
      } else {
        newPath = isEventCompany
          ? `/en/event-company/organization/employees/view-employees/${newId}`
          : `/organization/employees/view-employees/${newId}`;
      }

      const finalUrl = compareEmployeeId
        ? `${newPath}?compareEmployeeId=${compareEmployeeId}`
        : newPath;
      router.push(finalUrl);
    }
  };

  const employee = watch("employee");

  return (
    <form noValidate className="" onSubmit={handleSubmit(onSubmit)}>
      <LabelErrorWrapper>
        <AsyncSelect
          cacheOptions
          defaultOptions={defaultOptions}
          loadOptions={handleLoadOptions}
          isClearable
          value={employee ?? null}
          placeholder="Search Employee"
          className="react-select w-[256px]"
          classNamePrefix="select"
          onChange={(selected) => {
            setValue("employee", selected);
            trigger("employee").then((isValid) => {
              if (isValid) {
                handleSubmit(onSubmit)();
              }
            });
          }}
          formatOptionLabel={(optionsData) => <div>{optionsData.label}</div>}
          isLoading={
            getAllEmployeeApiState.isLoading ||
            getAllEmployeeApiState?.isFetching
          }
        />
      </LabelErrorWrapper>
    </form>
  );
}

export default SearchEmployee;
