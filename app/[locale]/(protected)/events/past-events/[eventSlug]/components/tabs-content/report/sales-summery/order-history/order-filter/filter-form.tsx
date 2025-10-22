import { useCallback, useState } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { type TUseManageSearchParamsReturnType } from "@/hooks/useManageSearchParams";
import type {
  TGetPastEventOrderArgs,
  TOrderStatus,
} from "@/store/api/past-event/past-event.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";
import { Button } from "@/components/ui/button";

import type { IOrderFilterSearchProps } from ".";

const radioProps: ICustomRadioLabelProps = {
  textSize: "16px",
  centerColor: "transparent",
  ringSize: "5px",
  mode: "label-right",
};
type THandleSubmit = (props: {
  seTOrderStatusState: React.Dispatch<
    React.SetStateAction<TOrderStatus | undefined>
  >;
  setClose: () => void;
  orderStatusState: TOrderStatus | undefined;

  updateMultipleParam: TUseManageSearchParamsReturnType<
    Exclude<TGetPastEventOrderArgs, void>
  >["updateMultipleParam"];
}) => React.FormEventHandler<HTMLFormElement>;

type TOptions<T> = {
  label: string;
  value: T;
  radioProps: ICustomRadioLabelProps;
}[];

const genderOptions: TOptions<TOrderStatus> = [
  {
    label: "Completed",
    value: "Completed",
    radioProps,
  },
  {
    label: "Pending",
    value: "Pending",
    radioProps,
  },
  {
    label: "Cancelled",
    value: "Cancelled",
    radioProps,
  },
];

function FilterForm({ manageStateParams }: IOrderFilterSearchProps) {
  // get param value
  const { updateMultipleParam, getAllParamValue } = manageStateParams;
  const { status } = getAllParamValue();
  // manage state

  const [orderStatusState, seTOrderStatusState] = useState<
    TOrderStatus | undefined
  >(status);

  const { setClose } = useBooleanContext();
  const isStateAndParamSame = orderStatusState === status;
  const handleSubmit: THandleSubmit = useCallback(
    ({
      setClose,
      orderStatusState,
      seTOrderStatusState,
      updateMultipleParam,
    }) =>
      (e) => {
        e.preventDefault();
        if (isStateAndParamSame) {
          updateMultipleParam({
            page: undefined,
            status: undefined,
          });
        } else {
          updateMultipleParam({
            page: undefined,
            status: orderStatusState,
          });
        }

        seTOrderStatusState(undefined);
        setClose();
      },

    [isStateAndParamSame],
  );

  const handleStatusChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      seTOrderStatusState(e.target.value as TOrderStatus | undefined);
    }, []);

  return (
    <form
      onSubmit={handleSubmit({
        setClose,
        seTOrderStatusState,
        updateMultipleParam,
        orderStatusState,
      })}
      className="space-y-8"
      noValidate
    >
      <CustomRadioGroup
        direction="column"
        gap="gap-3"
        label={"Order Status"}
        className="pl-2.5"
        labelClassName="text-sm mb-[18px] font-medium sm:text-sm text-default-700"
        options={genderOptions}
        onChange={handleStatusChange}
        value={orderStatusState}
      />

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button fullWidth type="button" onClick={setClose}>
          Cancel
        </Button>

        <Button
          fullWidth
          color="primary"
          type="submit"
          disabled={!orderStatusState}
        >
          <ButtonLoadingContent
            isLoading={false}
            actionContent={isStateAndParamSame ? "Clear " : "Apply"}
          />
        </Button>
      </div>
    </form>
  );
}

export default FilterForm;
