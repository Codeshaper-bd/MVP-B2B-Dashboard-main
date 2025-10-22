import { useCallback, useState } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { type TUseManageSearchParamsReturnType } from "@/hooks/useManageSearchParams";
import type {
  TCheckInStatus,
  TGetFennecLiveGuestlistDetailsArgs,
} from "@/store/api/fennec-live/fennec-live.types";
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
  setStatusState: (value: React.SetStateAction<TStatus>) => void;
  setGenderState: React.Dispatch<React.SetStateAction<TGender>>;
  setClose: () => void;
  statusState: TCheckInStatus | undefined;
  genderState: TGender | undefined;

  updateMultipleParam: TUseManageSearchParamsReturnType<
    Exclude<TGetFennecLiveGuestlistDetailsArgs, void>
  >["updateMultipleParam"];
}) => React.FormEventHandler<HTMLFormElement>;

type TStatus =
  | Exclude<TGetFennecLiveGuestlistDetailsArgs, void>["status"]
  | undefined;
type TGender =
  | Exclude<TGetFennecLiveGuestlistDetailsArgs, void>["sex"]
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

const statusOptions: TOptions<TCheckInStatus> = [
  {
    label: "Entered",
    value: "entired",
    radioProps,
  },
  {
    label: "Expecting",
    value: "expecting",
    radioProps,
  },
];

function FilterForm({ manageStateParams }: IGuestListFilterSearchProps) {
  // get param value
  const { updateMultipleParam, getAllParamValue } = manageStateParams;
  const { status, sex } = getAllParamValue();
  // manage state

  const [statusState, setStatusState] = useState<TStatus>(status);
  const [genderState, setGenderState] = useState<TGender | undefined>(sex);

  const { setClose } = useBooleanContext();
  const isStateAndParamSame = statusState === status && genderState === sex;
  const handleSubmit: THandleSubmit = useCallback(
    ({
      setClose,
      statusState,
      genderState,
      setGenderState,
      updateMultipleParam,
    }) =>
      (e) => {
        e.preventDefault();
        if (isStateAndParamSame) {
          updateMultipleParam({
            page: undefined,
            status: undefined,
            sex: undefined,
          });
        } else {
          updateMultipleParam({
            page: undefined,
            status: statusState,
            sex: genderState,
          });
        }

        setStatusState(undefined);
        setGenderState(undefined);
        setClose();
      },

    [isStateAndParamSame],
  );

  const handleStatusChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setStatusState(e.target.value as TStatus | undefined);
    }, []);

  const handleGenderChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setGenderState(e.target.value as TGender | undefined);
    }, []);

  return (
    <form
      onSubmit={handleSubmit({
        setClose,
        setStatusState,
        setGenderState,
        updateMultipleParam,
        statusState,
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
      <CustomRadioGroup
        direction="column"
        gap="gap-3"
        label={"Status"}
        className="pl-2.5"
        labelClassName="text-sm mb-[18px] font-medium sm:text-sm text-default-700"
        options={statusOptions}
        onChange={handleStatusChange}
        value={statusState}
      />

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button fullWidth type="button" onClick={setClose}>
          Cancel
        </Button>

        <Button
          fullWidth
          color="primary"
          type="submit"
          disabled={!statusState && !genderState}
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
