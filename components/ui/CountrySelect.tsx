"use client";
import type { ActionMeta } from "react-select";

import useGetCountries from "@/hooks/useGetCountries";
import LabelErrorWrapper, {
  type TLabelErrorWrapperProps,
} from "@/components/ui/LabelErrorWrapper";
import { SelectReact } from "@/components/ui/select-react";

type TOption = {
  value?: string;
  label?: React.ReactNode;
};

type TCountrySelectProps = TLabelErrorWrapperProps & {
  value?: TOption | null;
  onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly?: boolean;
};

function CountrySelect({
  label,
  labelClassName,
  error,
  fragmentWrapper,
  value,
  onChange,
  onBlur,
  readonly,
}: TCountrySelectProps) {
  // Read the JSON file from the public folder asynchronously
  // const data = await getCountriesData();
  const { data, isLoading } = useGetCountries();

  const countries =
    data?.map((country) => ({
      value: country.name,
      label: (
        <div className="flex items-center gap-2">
          <div
            dangerouslySetInnerHTML={{ __html: country?.image ?? "" }}
            className="size-6 rounded-full object-cover"
          />

          <p className="text-base font-medium leading-6 text-default-900">
            {country.name}
          </p>
        </div>
      ),
    })) ?? [];

  return (
    <LabelErrorWrapper
      label={label}
      labelClassName={labelClassName}
      fragmentWrapper={fragmentWrapper}
      error={error}
    >
      <SelectReact
        options={countries}
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </LabelErrorWrapper>
  );
}

export default CountrySelect;
