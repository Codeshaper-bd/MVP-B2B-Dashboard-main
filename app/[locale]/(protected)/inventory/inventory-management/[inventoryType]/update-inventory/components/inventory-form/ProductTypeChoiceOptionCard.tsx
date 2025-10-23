import Image from "next/image";
import { memo } from "react";

import { cn } from "@/lib/utils";
import { ArrowRightIcon as RightArrowIcon } from "@/components/icons";

import type { IProductTypeOption } from "./ProductTypeChoiceModalContent";

export type TOnClick = (
  e: React.MouseEvent<HTMLDivElement>,
  value: Omit<IProductTypeChoiceOptionCardProps, "onClick" | "isSelected">,
) => void;

type THandleClick = (props: {
  data: Omit<IProductTypeChoiceOptionCardProps, "onClick" | "isSelected">;
  onClick?: TOnClick;
}) => (e: React.MouseEvent<HTMLDivElement>) => void | undefined;

const handleClick: THandleClick =
  ({ data, onClick }) =>
  (e) =>
    onClick?.(e, data);

interface IProductTypeChoiceOptionCardProps extends IProductTypeOption {
  isSelected?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    value: Omit<IProductTypeChoiceOptionCardProps, "onClick" | "isSelected">,
  ) => void;
}

function ProductTypeChoiceOptionCard({
  icon,
  label,
  value,
  isSelected,
  onClick,
}: IProductTypeChoiceOptionCardProps) {
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center gap-5 self-stretch rounded-xl bg-[#161B26] px-5 py-4 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#161B26]/60",
        isSelected ? "bg-[#161B26]/60 hover:bg-[#161B26]/60" : "",
      )}
      onClick={handleClick({
        data: { icon, label, value },
        onClick,
      })}
    >
      <Image
        src={icon || ""}
        alt={label || "product type choice option"}
        width={40}
        height={40}
        className="shrink-0 rounded-full"
      />

      <div className="flex w-full items-center justify-between gap-4">
        <p className="line-clamp-1 text-base font-semibold not-italic leading-6 text-default-700">
          {label}
        </p>

        <RightArrowIcon className="size-3.5 shrink-0 text-[#94969C]" />
      </div>
    </div>
  );
}

export default memo(ProductTypeChoiceOptionCard);
