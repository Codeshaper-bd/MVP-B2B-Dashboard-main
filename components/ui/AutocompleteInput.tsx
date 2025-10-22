"use client";

import React, { useRef } from "react";
import Autocomplete from "react-google-autocomplete";

import { clientEnv } from "@/config/client-config";
import { cn } from "@/lib/utils";

import LabelErrorWrapper, {
  type TLabelErrorWrapperProps,
} from "./LabelErrorWrapper";

export interface IAutocompleteInputProps extends TLabelErrorWrapperProps {
  inputClassName?: string;
  defaultValue?: string;
  placeholder?: string;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  options?: google.maps.places.AutocompleteOptions;
}
function AutocompleteInput({
  label,
  error,
  required,
  htmlFor,
  className,
  defaultValue = "Dhaka, Bangladesh",
  placeholder = "Enter address",
  options,
  onPlaceSelected,
}: IAutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
  //   const address = place.formatted_address ?? "";
  //   if (inputRef.current) {
  //     inputRef.current.value = address;
  //   }
  //   console.log("Selected Place: ", place);

  //   onPlaceSelected?.(place);
  // };
  return (
    <div className="relative z-50">
      <LabelErrorWrapper
        label={label}
        error={error}
        htmlFor={htmlFor}
        required={required}
        className={className}
      >
        <Autocomplete
          className={cn(
            "w-full rounded-md border border-default-200 bg-transparent p-2",
            className,
          )}
          ref={inputRef}
          apiKey={clientEnv.GOOGLE_MAP_API_KEY}
          onPlaceSelected={onPlaceSelected}
          options={options}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      </LabelErrorWrapper>
    </div>
  );
}

export default AutocompleteInput;
