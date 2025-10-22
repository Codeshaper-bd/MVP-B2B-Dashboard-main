import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Button,
  buttonVariants,
  type ButtonProps,
} from "@/components/ui/button";

import ArrowLeftIcon from "../icons/ArrowLeftIcon";

type TColor =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "warning"
  | "info"
  | "success"
  | "pagination-btn-active"
  | "pagination-btn-inactive"
  | "pagination-outline-btn-active"
  | "pagination-outline-btn-inactive";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul"> & {
    variant?: "general" | "outline";
  }
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-0.5",
      {
        "gap-0 first:rounded-xl": props.variant === "outline",
      },
      className,
    )}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

type PaginationButtonProps = {
  isActive?: boolean;
  isLeftRounded?: boolean;
  isRightRounded?: boolean;
  variant?: "general" | "outline";
} & React.ComponentProps<"button"> &
  Pick<ButtonProps, "size" | "color" | "rounded">;

type PaginationPrevNextButtonProps = React.ComponentProps<"button"> &
  Pick<ButtonProps, "size" | "color" | "rounded"> & {
    variant?: "general" | "outline";
    isLeftRounded?: boolean;
    isRightRounded?: boolean;
  };

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "shadow" : "outline",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}
PaginationLink.displayName = "PaginationLink";

function PaginationButton({
  className,
  isActive,
  size = "40",
  type = "button",
  rounded = "lg",
  variant = "general",
  isLeftRounded,
  isRightRounded,
  ...props
}: PaginationButtonProps) {
  const color: TColor = isActive
    ? "pagination-btn-active"
    : "pagination-btn-inactive";
  // if (variant === "outline") {
  //   color = isActive
  //     ? "pagination-outline-btn-active"
  //     : "pagination-outline-btn-inactive";
  // }

  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: variant === "outline" ? "default" : "noborder",
          color,
          rounded: variant === "outline" ? "none" : rounded,
          size,
        }),
        {
          "border border-default-200": variant === "outline",
          "bg-transparent text-sm font-semibold leading-5 text-default-700 ring-[1px] ring-default-200 hover:bg-default-100/70 hover:ring-[1px] hover:ring-default-200":
            variant === "outline" && !isActive,
          "bg-default-100 text-sm font-semibold leading-5 text-[#ECECED] ring-[1px] ring-default-200 hover:bg-default-100 hover:ring-[1px] hover:ring-default-200":
            variant === "outline" && isActive,
        },
        {
          "rounded-l-lg": isLeftRounded && variant === "outline",
          "rounded-r-lg": isRightRounded && variant === "outline",
        },
        className,
      )}
      type={type}
      {...props}
    />
  );
}
PaginationButton.displayName = "PaginationButton";

function PaginationLinkPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 ps-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
}
PaginationLinkPrevious.displayName = "PaginationLinkPrevious";

function PaginationButtonPrevious({
  className,
  size = "default",
  type = "button",
  rounded = "lg",
  variant = "general",
  isLeftRounded,
  ...props
}: Omit<PaginationPrevNextButtonProps, "isRightRounded">) {
  return (
    <Button
      aria-label="Go to next page"
      size="default"
      className={cn(
        buttonVariants({
          variant: "default",
          color: "secondary",
          rounded: variant === "outline" ? "none" : "lg",
          size,
        }),
        "space-x-1.5 !px-3 !py-2 !text-default-700 sm:!px-3 sm:!py-2",
        {
          "ring-[1px] ring-[#333741]": variant === "outline",
          "rounded-l-lg": isLeftRounded && variant === "outline",
        },
        className,
      )}
      {...props}
    >
      <ArrowLeftIcon className="size-5" />
      <span className="hidden md:block">Previous</span>
    </Button>
  );
}
PaginationButtonPrevious.displayName = "PaginationButtonPrevious";

function PaginationLinkNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span className="hidden md:block">Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}
PaginationLinkNext.displayName = "PaginationLinkNext";

function PaginationButtonNext({
  className,
  size = "default",
  type = "button",
  rounded = "lg",
  variant = "general",
  isRightRounded,
  ...props
}: Omit<PaginationPrevNextButtonProps, "isLeftRounded">) {
  return (
    <Button
      aria-label="Go to next page"
      size="default"
      className={cn(
        buttonVariants({
          variant: "default",
          color: "secondary",
          rounded: variant === "outline" ? "none" : "lg",
          size,
        }),
        "space-x-1.5 !px-3 !py-2 !text-default-700 sm:!px-3 sm:!py-2",
        {
          "ring-[1px] ring-[#333741]": variant === "outline",
          "rounded-r-lg": isRightRounded && variant === "outline",
        },
        className,
      )}
      {...props}
    >
      <span className="hidden md:block">Next</span>
      <ArrowLeftIcon className="size-5 rotate-180" />
    </Button>
  );
}
PaginationButtonNext.displayName = "PaginationButtonNext";

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationButton,
  PaginationButtonNext,
  PaginationButtonPrevious,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationLinkNext,
  PaginationLinkPrevious,
};
