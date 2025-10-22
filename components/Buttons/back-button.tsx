"use client";

import { memo } from "react";

import { cn } from "@/lib/utils";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import { useRouter } from "@/components/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";

function BackButton({
  label = "Back",
  className,
  color = "secondary",
  disabled,
  isShowArrowIcon = true,
}: {
  label?: string;
  className?: string;
  color?: ButtonProps["color"];
  disabled?: boolean;
  isShowArrowIcon?: boolean;
}) {
  const router = useRouter();

  return (
    <Button
      type="button"
      color={color}
      onClick={router.back}
      className={cn(className)}
      disabled={disabled}
    >
      {isShowArrowIcon && <LeftArrowIcon className="me-1.5 size-4" />}
      {label}
    </Button>
  );
}

export default memo(BackButton);
