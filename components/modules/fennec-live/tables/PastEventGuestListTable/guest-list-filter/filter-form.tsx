import { useCallback, useEffect, useState } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { type TUseManageSearchParamsReturnType } from "@/hooks/useManageSearchParams";
import { convertToNumber } from "@/lib/data-types/number";
import type { TGuestListArgs } from "@/store/api/events/events.types";
import type {
  TCheckInStatus,
  TGetPastEventGuestListCheckInArgs,
} from "@/store/api/past-event/past-event.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  setNumberOfTicketsState: React.Dispatch<
    React.SetStateAction<TNumberOfTickets>
  >;
  setTicketTierState: React.Dispatch<React.SetStateAction<number | undefined>>;
  setPromoterState: React.Dispatch<React.SetStateAction<number | undefined>>;
  setClose: () => void;

  statusState: TCheckInStatus | undefined;
  genderState: TGender | undefined;
  numberOfTicketsState: TNumberOfTickets | undefined;
  ticketTierState: number | undefined;
  promoterState: number | undefined;
  updateMultipleParam: TUseManageSearchParamsReturnType<
    Exclude<TGetPastEventGuestListCheckInArgs, void>
  >["updateMultipleParam"];
}) => React.FormEventHandler<HTMLFormElement>;

type TStatus =
  | Exclude<TGetPastEventGuestListCheckInArgs, void>["status"]
  | undefined;
type TGender =
  | Exclude<TGetPastEventGuestListCheckInArgs, void>["sex"]
  | undefined;

type TNumberOfTickets =
  | Exclude<TGuestListArgs, void>["numberOfTickets"]
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
    label: "Others",
    value: "NOT_SPECIFIED",
    radioProps,
  },
];

const statusOptions: TOptions<TCheckInStatus> = [
  {
    label: "Entired",
    value: "entired",
    radioProps,
  },
  {
    label: "Expecting",
    value: "expecting",
    radioProps,
  },
];

function FilterForm({
  manageStateParams,
  ticketTiersOptions,
  ticketTierApiState,
  promoterOptions,
  promoterApiState,
}: IGuestListFilterSearchProps) {
  // get param value
  const { updateMultipleParam, deleteAParam, getAllParamValue } =
    manageStateParams;
  const { status, sex, ticketTierId, numberOfTickets, promoterId } =
    getAllParamValue();
  // manage state

  const [statusState, setStatusState] = useState<TStatus>(status);
  const [genderState, setGenderState] = useState<TGender | undefined>(sex);
  const [numberOfTicketsState, setNumberOfTicketsState] = useState<
    TNumberOfTickets | undefined
  >(numberOfTickets);
  const [ticketTierState, setTicketTierState] = useState<number | undefined>(
    ticketTierId,
  );
  const [promoterState, setPromoterState] = useState<number | undefined>(
    ticketTierId ? Number(ticketTierId) : undefined,
  );

  useEffect(() => {
    setStatusState(status);
    setGenderState(sex);
    setNumberOfTicketsState(numberOfTickets);
    setTicketTierState(ticketTierId);
    setPromoterState(promoterId ? Number(promoterId) : undefined);
  }, [status, sex, numberOfTickets, ticketTierId, promoterId]);

  const { setClose } = useBooleanContext();
  const isStateAndParamSame =
    statusState === status &&
    genderState === sex &&
    numberOfTicketsState === numberOfTickets &&
    ticketTierState === (ticketTierId ? Number(ticketTierId) : undefined) &&
    promoterState === (promoterId ? Number(promoterId) : undefined);

  const isDisabled =
    !statusState &&
    !genderState &&
    !numberOfTicketsState &&
    !ticketTierState &&
    !promoterState;

  const handleSubmit: THandleSubmit = useCallback(
    ({
      setClose,
      statusState,
      genderState,
      numberOfTicketsState,
      setNumberOfTicketsState,
      setStatusState,
      setGenderState,
      updateMultipleParam,
    }) =>
      (e) => {
        e.preventDefault();
        if (isStateAndParamSame) {
          deleteAParam("page");
          deleteAParam("status");
          deleteAParam("sex");
          deleteAParam("numberOfTickets");
          deleteAParam("ticketTierId");
          deleteAParam("promoterId");
        } else {
          updateMultipleParam({
            page: undefined,
            status: statusState,
            sex: genderState,
            numberOfTickets: numberOfTicketsState,
            ticketTierId: ticketTierState,
            promoterId: promoterState,
          });
        }

        setStatusState(undefined);
        setGenderState(undefined);
        setNumberOfTicketsState(undefined);
        setTicketTierState(undefined);
        setPromoterState(undefined);
        setClose();
      },
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleNumberOfTicketsChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      const inputValues = convertToNumber({
        value: e.target.value,
        digit: 0,
      });
      setNumberOfTicketsState(inputValues);
    }, []);

  return (
    <form
      onSubmit={handleSubmit({
        setClose,
        setStatusState,
        setGenderState,
        setNumberOfTicketsState,
        updateMultipleParam,
        statusState,
        genderState,
        numberOfTicketsState,
        ticketTierState,
        promoterState,
        setTicketTierState,
        setPromoterState,
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

      <SelectInput
        options={ticketTiersOptions}
        label="Ticket Tier"
        placeholder="Ticket Tier"
        value={ticketTierState}
        onChange={(option) => {
          setTicketTierState(option?.value);
        }}
        isLoading={
          ticketTierApiState.isLoading || ticketTierApiState.isFetching
        }
        disabled={
          ticketTierApiState.isLoading ||
          ticketTierApiState.isFetching ||
          !ticketTiersOptions?.length
        }
      />
      <SelectInput
        options={promoterOptions}
        label="Promoter"
        placeholder="Select Promoter"
        value={promoterState}
        onChange={(option) => {
          setPromoterState(Number(option?.value));
        }}
        isLoading={promoterApiState.isLoading || promoterApiState.isFetching}
        disabled={
          promoterApiState.isLoading ||
          promoterApiState.isFetching ||
          !promoterOptions?.length
        }
      />

      <Input
        label="Number Of Tickets"
        placeholder="Number Of Tickets"
        value={numberOfTicketsState || ""}
        onChange={handleNumberOfTicketsChange}
      />

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button fullWidth type="button" onClick={setClose}>
          Cancel
        </Button>

        <Button fullWidth color="primary" type="submit" disabled={isDisabled}>
          <ButtonLoadingContent
            isLoading={false}
            actionContent={
              isStateAndParamSame && !isDisabled ? "Clear" : "Apply"
            }
          />
        </Button>
      </div>
    </form>
  );
}

export default FilterForm;
