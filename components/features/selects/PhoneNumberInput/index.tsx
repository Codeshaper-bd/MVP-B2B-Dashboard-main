import { useRef } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import { useBooleanContext } from "@/contexts/BooleanContext";
import useClickOutside from "@/hooks/use-click-outside";
import useManageStateParams from "@/hooks/useManageStateParams";
import { useGetAllAvailablePromotersQuery } from "@/store/api/promoters/promoters-api";
import type { TGetAllPromotersArgs } from "@/store/api/promoters/promoters.types";

// import type { ICreatePromoterFormValues } from "../types";

function PhoneNumberInput() {
  // state to manage the select dropdown for promoters
  const selectRef = useRef<HTMLDivElement | null>(null);
  const {
    isOpen: isSelectOpen,
    setOpen: setSelectOpen,
    setClose: setSelectClose,
  } = useBooleanContext();
  // state to manage the phone number input and its related data
  // const {
  //   setValue,
  //   formState: { errors },
  //   trigger,
  //   control,
  // } = useFormContext<ICreatePromoterFormValues>();
  // hooks to manage the API call for fetching available promoters
  const { getAllParamValue, updateAParam, updateMultipleParam } =
    useManageStateParams<Exclude<TGetAllPromotersArgs, void>>();
  const queryParams = getAllParamValue();
  const {
    data: getAllAvailablePromotersRes,
    ...getAllAvailablePromotersApiState
  } = useGetAllAvailablePromotersQuery({
    page: 1,
    pageSize: contentPerPageOptions[10],
    ...queryParams,
  });
  const getAllAvailablePromotersData = getAllAvailablePromotersRes?.data;

  useClickOutside({
    ref: selectRef,
    callback: () => {
      setSelectClose();
      updateMultipleParam({ search: undefined, page: undefined });
    },
  });

  // function to handle the change in phone number input
  // const handleChange = (value: string) => {
  //   setValue("phoneNumber", value);
  //   updateAParam({
  //     key: "search",
  //     value,
  //   });
  //   setSelectOpen();
  // };

  // const handleSelectPromoter = (promoter: TPromoter) => {
  //   setValue("promoter", promoter);
  //   setSelectClose();
  // };

  // const isNewPromoter = useWatch({
  //   control,
  //   name: "isNewPromoter",
  //   defaultValue: true,
  // });

  return (
    <>
      <div className="relative w-full" ref={selectRef} onClick={setSelectOpen}>
        {/* <LabelErrorWrapper
          label="Phone Number"
          error={errors?.phoneNumber?.message}
        >
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <PhoneInput
                onChange={(value) => {
                  handleChange(value);
                  trigger("phoneNumber");
                }}
                value={field.value}
                country={"ca"}
                placeholder="Your Phone Number"
              />
            )}
          />
        </LabelErrorWrapper> */}
        {/* <Loader {...getAllAvailablePromotersApiState} />
        {isSelectOpen && (
          <div className="absolute start-0 top-full z-[9999] mt-1 w-full rounded-md border border-default-200 bg-secondary">
            <div className="space-y-1">
              {getAllAvailablePromotersData?.length === 0 && (
                <div className="border-default-200 px-3 py-1.5 last:border-b-0 hover:bg-default-100">
                  No Promoter Found
                </div>
              )}
              {getAllAvailablePromotersData?.map((promoter) => (
                <PromoterOption
                  promoter={promoter}
                  key={promoter.id}
                  onSelect={handleSelectPromoter}
                />
              ))}
            </div>
          </div>
        )}
          // */}
      </div>
      {/* {!isNewPromoter && (
        <p className="mt-1 text-sm text-success">
          This number is already linked to an existing Promoter profile
        </p>
      )}  */}
    </>
  );
}

export default PhoneNumberInput;
