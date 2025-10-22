import type { Content } from "@radix-ui/react-dropdown-menu";

import type { TNullish } from "@/store/api/common-api-types";
import type { TDiscountType } from "@/store/api/discounts/discounts.types";

export type TDiscountTypeDropdownProps = {
  value?: TDiscountType | TNullish;
  onChange?: (value: TDiscountType) => void;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
} & Pick<React.ComponentPropsWithoutRef<typeof Content>, "align">;

export type TDiscountTypeOption = {
  value: TDiscountType;
  label: string;
  symbol: string;
};

export type THandleSelect = (
  props: {
    selectedValue: TDiscountType;
  } & Pick<TDiscountTypeDropdownProps, "onChange" | "value">,
) => () => void;
