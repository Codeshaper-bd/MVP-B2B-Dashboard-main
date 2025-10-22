"use client";
import { type GroupBase, type OptionProps, components } from "react-select";
import AsyncSelect from "react-select/async";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TCustomerLookup } from "@/store/api/customer-lookup/customer-lookup.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DataBaseIcon from "@/components/icons/DataBaseIcon";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import NumberInput from "@/components/ui/NumberInput";

import useAdditionalForm from "./useAdditionalForm";

function CustomOption(
  props: OptionProps<IOption, true, GroupBase<IOption>>,
): React.ReactElement {
  const { data } = props.data;
  const customer = data as TCustomerLookup;
  const customerFullName = `${customer?.firstName} ${customer?.lastName}`;
  return (
    <components.Option {...props}>
      <div className="flex gap-2">
        <div className="flex-none">
          <Avatar className="h-8 w-8 rounded-none">
            <AvatarImage
              src={getImageFallback({
                src: customer?.media?.[0]?.url,
                fallbackImageSize: 100,
              })}
            />
            <AvatarFallback>{customerFullName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="mt-1">{customerFullName}</div>
        </div>
      </div>
    </components.Option>
  );
}
function AdditionalSettings() {
  const {
    formProps: {
      formState: { errors },
      handleSubmit,
      register,
      setValue,
      watch,
    },
    asyncSelectProps: {
      defaultOptions,
      getAllCustomerLookup,
      getAllCustomersApiState,
      handleLoadOptions,
    },
    onSubmit,
    toastHookProps,
    isSubmitting,
  } = useAdditionalForm();
  return (
    <form
      onSubmit={handleSubmit(
        onSubmit({
          toastHookProps,
        }),
      )}
      className="mt-6"
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        <NumberInput
          id="additionalSettingPoint"
          label=" Add Free Points"
          required
          size="md"
          placeholder="120"
          value={watch("points")}
          onChange={(value) => {
            setValue("points", Number(value));
          }}
          error={errors.points?.message}
          leftContent={<DataBaseIcon className="h-5 w-5" />}
        />

        <div className="flex-none">
          <div className="lg:mt-8">To</div>
        </div>

        <div className="w-full lg:w-[260px]">
          <LabelErrorWrapper
            label="Select Customer"
            error={errors?.user?.message}
          >
            <AsyncSelect
              cacheOptions
              defaultOptions={defaultOptions}
              menuPlacement="auto"
              loadOptions={handleLoadOptions({ getAllCustomerLookup })}
              isClearable
              value={watch("user")}
              placeholder="Search Customer..."
              className="react-select"
              classNamePrefix="select"
              onChange={(selected) => {
                setValue("user", selected as IOption<unknown>);
              }}
              isLoading={
                getAllCustomersApiState?.isLoading ||
                getAllCustomersApiState?.isFetching
              }
              components={{ Option: CustomOption }}
            />
          </LabelErrorWrapper>
        </div>
        <Button color="primary" type="submit" className="lg:mt-7" size="lg">
          <ButtonLoadingContent actionContent="Send" isLoading={isSubmitting} />
        </Button>
      </div>
    </form>
  );
}

export default AdditionalSettings;
