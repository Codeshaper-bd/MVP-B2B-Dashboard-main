"use client";
import Image from "next/image";
import { useRef } from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import FoodSelectContent, {
  type IFoodSelectContentProps,
} from "@/components/FoodSelectContent";
import type { TFoodCardProps } from "@/components/FoodSelectContent/FoodCardList/FoodCard";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import { CrossIcon as CrossIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const handleSelectFood =
  ({
    closeButtonRef,
    onChange,
  }: {
    closeButtonRef: React.RefObject<HTMLButtonElement | null>;
    onChange?: ISelectFoodItemModalProps["onChange"];
  }): IFoodSelectContentProps["onSelectFood"] =>
  (e, data) => {
    onChange?.(e, data);
    closeButtonRef.current?.click();
  };

interface ISelectFoodItemModalProps {
  value: TFoodCardProps | null | undefined;
  onChange?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: TFoodCardProps | null | undefined,
  ) => void;
  placeholder?: string;
}

function SelectFoodItemModal({
  value,
  onChange,
  placeholder = "Select item",
}: ISelectFoodItemModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  let triggerContent = (
    <p className="flex items-center justify-between">
      <span>{placeholder}</span>
      <ChevronDownIcon className="h-full w-5 shrink-0 text-default-600" />
    </p>
  );

  if (value) {
    triggerContent = (
      <p className="flex items-center gap-2">
        <span
          className={cn(
            "relative block size-6 shrink-0 overflow-hidden rounded",
            {
              "bg-gradient-to-b from-[#FFCE62] to-[#E7FFF2]": value?.image,
            },
          )}
        >
          <Image
            src={
              getImageFallback({ src: value?.image, fallbackImageSize: 100 }) ||
              ""
            }
            alt={value?.title || "selected product"}
            width={24}
            height={24}
            className="h-full w-full object-contain"
          />
        </span>

        <span className="line-clamp-1 overflow-hidden text-ellipsis text-base font-medium leading-6 text-[#F5F5F6]">
          {value?.title}
        </span>
      </p>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Default</Button> */}
        <button
          type="button"
          className="block min-h-10 w-full cursor-pointer overflow-hidden text-ellipsis rounded-[8px] border border-solid border-[#333741] bg-[#0C111D] px-3.5 py-2.5 text-base font-normal leading-6 text-[#85888E] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.051)]"
        >
          {triggerContent}
        </button>
      </DialogTrigger>

      <DialogContent
        hideInternalClose
        className={cn(
          "pb-6",
          "!w-full max-w-[100vw] md:!max-w-[800px]",
          "flex w-full flex-col justify-start",
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-5 border-b border-b-default-100 p-6">
          <h2 className={"text-2xl font-semibold leading-8 text-[#F5F5F6]"}>
            Select Item
          </h2>

          <DialogClose asChild>
            <Button
              size={"40"}
              color={"secondary"}
              rounded={"md"}
              ref={closeButtonRef}
            >
              <CrossIcon className={"h-full w-3 text-default-700"} />
            </Button>
          </DialogClose>
        </div>

        <FoodSelectContent
          className={"px-6"}
          // eslint-disable-next-line react-compiler/react-compiler
          onSelectFood={handleSelectFood({ closeButtonRef, onChange })}
          selectedFoodId={value?.id}
          gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 items-stretch"
        />
      </DialogContent>
    </Dialog>
  );
}

export default SelectFoodItemModal;
