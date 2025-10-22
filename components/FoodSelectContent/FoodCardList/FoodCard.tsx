"use client";

import Image from "next/image";
import { useCallback } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { cn } from "@/lib/utils";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";

export type TFoodCardProps = {
  id?: string | number;
  slug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  categorySlug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  title?: string;
  subTitle?: string;
  currentStock?: string | number;
  stock?: number | string;
  foodVolume?: string;
  image?: string;
  currency?: string;
  price?: string;
  category?: string | number;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: TFoodCardProps | null | undefined,
  ) => void;
  selectedFoodId: string | number | null | undefined;
  description?: string;
  isNotInsideModal?: boolean | undefined;
  type?: "ALCOHOLIC" | "NON_ALCOHOLIC";
};

type THandleClick = ({
  onClick,
  data,
  selectedFoodId,
}: {
  data: TFoodCardProps | null | undefined;
  onClick: TFoodCardProps["onClick"];
  selectedFoodId: TFoodCardProps["selectedFoodId"];
}) => (e: React.MouseEvent<HTMLDivElement>) => void;

function FoodCard(props: TFoodCardProps) {
  const {
    id,
    slug,
    categorySlug,
    title,
    subTitle,
    currentStock = 0,
    stock = 0,
    foodVolume,
    image,
    price,
    currency,
    onClick,
    selectedFoodId,
    isNotInsideModal,
    type,
  } = props;
  const isSelected =
    selectedFoodId !== null &&
    selectedFoodId !== undefined &&
    selectedFoodId !== "" &&
    selectedFoodId !== " " &&
    String(selectedFoodId) === String(id);

  const handleClick: THandleClick = useCallback(
    ({ data, onClick, selectedFoodId }) =>
      (e) => {
        if (data === null || data === undefined) {
          return;
        }

        if (
          selectedFoodId !== null &&
          selectedFoodId !== undefined &&
          selectedFoodId !== -1 &&
          selectedFoodId !== "" &&
          selectedFoodId !== " " &&
          data?.id !== null &&
          data?.id !== undefined &&
          data?.id !== -1 &&
          String(data?.id) === String(selectedFoodId)
        ) {
          onClick?.(e, null);
          return;
        }

        onClick?.(e, data);
      },
    [],
  );

  return (
    <div
      className={cn(
        "relative !z-0 h-full w-full overflow-hidden rounded-xl",
        "cursor-pointer ring ring-primary ring-opacity-0",
        {
          "ring-opacity-100": isSelected,
        },
      )}
      onClick={handleClick({ data: props, onClick, selectedFoodId })}
    >
      {/* <Image
        src={"/assets/placeholders/product-background.png"}
        alt={"background"}
        width={330}
        height={330}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
      /> */}
      <Image
        src={
          type === "ALCOHOLIC"
            ? "/images/all-img/bg-alcoholic.png"
            : "/images/all-img/bg-non-alcoholic.png"
        }
        alt={"background"}
        width={330}
        height={330}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
      />
      {image && (
        // <div
        //   className={cn(
        //     "absolute bottom-0 right-0 flex max-w-[35%] items-end justify-end",
        //     isNotInsideModal
        //       ? "max-h-[240px] min-w-[80px] pb-16"
        //       : "max-h-[135px] min-w-[70px] pb-8",
        //   )}
        // >
        //   <Image
        //     src={image || ""}
        //     // src="/images/all-img/Image Product.png"
        //     alt={title || "drink"}
        //     width={100}
        //     height={100}
        //     className="h-full w-full object-contain"
        //   />
        // </div>
        <div
          className={cn(
            "absolute bottom-6 right-2 z-10 h-[150px] w-[80px]",
            isNotInsideModal ? "h-[150px] w-[80px]" : "h-[100px] w-[50px]",
          )}
        >
          <Image
            src={image}
            alt={title || "drink"}
            width={80}
            height={280}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div
        className={cn(
          "relative !z-[1] h-full max-w-[65%] py-4",
          isNotInsideModal ? "px-6 pb-16" : "px-3 pb-8",
        )}
      >
        <div className="space-y-1">
          <h3
            className={cn(
              "line-clamp-3 text-wrap break-words font-semibold uppercase leading-[18px] text-default-1000",
              isNotInsideModal ? "text-lg" : "text-xs",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "mt-2 line-clamp-2 text-wrap break-words text-[10px] font-medium text-primary",
              isNotInsideModal ? "text-sm" : "text-xs",
            )}
          >
            {subTitle}
          </p>
        </div>

        <p
          className={cn(
            "mb-3 mt-4 text-wrap break-words text-xs font-medium text-default-1000",
            isNotInsideModal ? "text-lg" : "text-xs",
          )}
        >
          {foodVolume}
        </p>
      </div>

      {/* Footer Part */}
      <div
        className={cn(
          "absolute bottom-0 z-50 flex h-fit min-h-8 w-full items-center justify-between gap-1 self-stretch bg-[#293445]",
          isNotInsideModal ? "px-6 py-4" : "px-3 py-1.5",
        )}
      >
        {isNotInsideModal ? (
          <div className="text-base font-semibold text-default-1000">Price</div>
        ) : (
          <div>
            <p className="text-xs font-medium leading-[18px] text-default-1000">
              {currentStock ?? "N/A"}
              <span className="ml-1 text-xs font-normal leading-[18px] text-[#CECFD2]">
                {`/${stock ?? "N/A"}`}
              </span>
            </p>
          </div>
        )}

        <p
          className={cn(
            "text-right font-semibold leading-[18px] text-[#FFC833]",
            isNotInsideModal ? "text-lg" : "text-xs",
          )}
        >
          {!!currency && currency}
          {convertToNumber({
            value: price,
            digit: 2,
            fallback: 0,
          })}
        </p>
      </div>
    </div>
  );
}

export default FoodCard;
