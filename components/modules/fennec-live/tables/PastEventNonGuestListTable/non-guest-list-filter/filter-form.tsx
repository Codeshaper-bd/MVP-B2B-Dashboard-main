import { useCallback, useState } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { type TUseManageSearchParamsReturnType } from "@/hooks/useManageSearchParams";
import type { TGetPastEventGuestListCheckInArgs } from "@/store/api/past-event/past-event.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";
import { Button } from "@/components/ui/button";

import type { IGuestListFilterSearchProps } from ".";

const radioProps: ICustomRadioLabelProps = {
  textSize: "16px",
  centerColor: "transparent",
  ringSize: "5px",
  mode: "label-right",
};
type THandleSubmit = (props: {
  setGenderState: React.Dispatch<React.SetStateAction<TGender>>;
  setClose: () => void;
  genderState: TGender | undefined;

  updateMultipleParam: TUseManageSearchParamsReturnType<
    Exclude<TGetPastEventGuestListCheckInArgs, void>
  >["updateMultipleParam"];
}) => React.FormEventHandler<HTMLFormElement>;

type TGender =
  | Exclude<TGetPastEventGuestListCheckInArgs, void>["sex"]
  | undefined;

type TOptions<T> = {
  label: string;
  value: T;
  radioProps: ICustomRadioLabelProps;
}[];

const genderOptions: TOptions<TGender> = [
  {
    label: "Male",
    value: "male",
    radioProps,
  },
  {
    label: "Female",
    value: "female",
    radioProps,
  },
  {
    label: "Unisex",
    value: "unisex",
    radioProps,
  },
];

function FilterForm({ manageStateParams }: IGuestListFilterSearchProps) {
  // get param value
  const { updateMultipleParam, getAllParamValue } = manageStateParams;
  const { sex } = getAllParamValue();
  // manage state

  const [genderState, setGenderState] = useState<TGender | undefined>(sex);

  const { setClose } = useBooleanContext();
  const isStateAndParamSame = genderState === sex;
  const handleSubmit: THandleSubmit = useCallback(
    ({ setClose, genderState, setGenderState, updateMultipleParam }) =>
      (e) => {
        e.preventDefault();
        if (isStateAndParamSame) {
          updateMultipleParam({
            page: undefined,
            sex: undefined,
          });
        } else {
          updateMultipleParam({
            page: undefined,
            sex: genderState,
          });
        }

        setGenderState(undefined);
        setClose();
      },

    [isStateAndParamSame],
  );

  const handleGenderChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setGenderState(e.target.value as TGender | undefined);
    }, []);

  return (
    <form
      onSubmit={handleSubmit({
        setClose,
        setGenderState,
        updateMultipleParam,
        genderState,
      })}
      className="space-y-8"
      noValidate
    >
      <CustomRadioGroup
        direction="column"
        gap="gap-3"
        label={"Sex"}
        className="pl-2.5"
        labelClassName="text-sm mb-[18px] font-medium sm:text-sm text-default-700"
        options={genderOptions}
        onChange={handleGenderChange}
        value={genderState}
      />

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button fullWidth type="button" onClick={setClose}>
          Cancel
        </Button>

        <Button fullWidth color="primary" type="submit" disabled={!genderState}>
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
