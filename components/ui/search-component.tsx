"use client";
import { useCallback } from "react";

import useDebounce from "@/hooks/useDebounce";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import { Input } from "@/components/ui/input";

import SearchIcon from "../icons/SearchIcon";

type TSearchComponentCommonProps = {
  placeholder?: string;
  searchIcon?: React.ReactElement;
  className?: string;
  type?:
    | "number"
    | "hidden"
    | "text"
    | "email"
    | "search"
    | "password"
    | "tel"
    | "url"
    | "file";
};

enum EMode {
  URL = "url",
  EXTERNAL = "external",
}
type TExternalMode = `${EMode.EXTERNAL}`;
type TUrlMode = `${EMode.URL}`;
type TMode = `${EMode}`;

type TUrlModeProps = {
  mode?: TUrlMode;
};

type TExternalModeProps = {
  mode: TExternalMode;
  search?: string | undefined;
  setSearch?: (value: string | undefined) => void;
};

type TSearchComponentProps<T extends TMode> = (T extends TExternalMode
  ? TExternalModeProps
  : TUrlModeProps) &
  TSearchComponentCommonProps;

type THandleChange = (
  setSearch: Pick<TExternalModeProps, "setSearch">,
) => React.ChangeEventHandler<HTMLInputElement>;

export default function SearchComponent<T extends TMode = TUrlMode>(
  props: TSearchComponentProps<T>,
) {
  const {
    placeholder = "Search",
    searchIcon,
    className,
    type = "search",
  } = props;

  const { updateMultipleParam, getAParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();
  const search = getAParamValue("search");

  const { debounce, nonDebouncedValue } = useDebounce<string, undefined>({
    value: props?.mode === "external" ? props?.search : search,
    delay: 700,
    debouncedFallbackValue: undefined,
    nonDebouncedValueFallback: "",
    debouncedFunction: (value) => {
      if (props?.mode === "external") {
        props.setSearch?.(value);
        return;
      }
      updateMultipleParam({ search: value, page: undefined });
    },
  });

  const handleChange: THandleChange = useCallback(
    ({ setSearch }) =>
      (e) =>
        setSearch?.(e.target.value),
    [],
  );

  switch (props.mode) {
    case EMode.EXTERNAL: {
      return (
        <Input
          type={type}
          placeholder={placeholder}
          value={props?.search}
          onChange={handleChange({ setSearch: props.setSearch })}
          className={cn(
            "z-0 ps-10 text-base placeholder:text-default-500",
            className,
          )}
          leftContent={
            searchIcon || (
              <SearchIcon className="size-5 h-full shrink-0 text-default-600" />
            )
          }
        />
      );
    }

    case EMode.URL:
    case undefined: {
      return (
        <Input
          type={type}
          placeholder={placeholder}
          value={nonDebouncedValue}
          onChange={handleChange({ setSearch: debounce() })}
          className={cn(
            "z-0 ps-10 text-base placeholder:text-default-500",
            className,
          )}
          leftContent={
            searchIcon || (
              <SearchIcon className="size-5 h-full shrink-0 text-default-600" />
            )
          }
        />
      );
    }

    default:
      return null;
  }
}
