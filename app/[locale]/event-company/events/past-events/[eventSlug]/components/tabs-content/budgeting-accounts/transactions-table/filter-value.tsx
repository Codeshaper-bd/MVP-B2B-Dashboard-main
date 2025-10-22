import type { TUseManageSearchParamsReturnType } from "@/hooks/useManageSearchParams";
import { getStatusColors } from "@/lib/get-status-colors";
import type { TGetPastEventTransactionArgs } from "@/store/api/past-event/past-event.types";
import { Tag } from "@/components/ui/tag";

interface IFilteredValueProps {
  manageStateParams: TUseManageSearchParamsReturnType<
    Exclude<TGetPastEventTransactionArgs, void>
  >;
}

function FilteredValue({ manageStateParams }: IFilteredValueProps) {
  const { getAParamValue, deleteAParam } = manageStateParams;

  const category = getAParamValue<string>("category");

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-3 md:justify-end">
      {category ? (
        <Tag
          dot
          label={category as string}
          onRemove={() => deleteAParam("category")}
          className={getStatusColors(category as string)}
          iconClass="text-default-700"
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default FilteredValue;
