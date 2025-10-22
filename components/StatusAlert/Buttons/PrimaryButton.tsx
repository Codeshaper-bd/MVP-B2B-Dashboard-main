import React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

interface IPrimaryButtonProps extends Omit<ButtonProps, "color"> {}

function PrimaryButton({
  fullWidth = true,
  ...restProps
}: IPrimaryButtonProps) {
  return <Button color={"primary"} fullWidth={fullWidth} {...restProps} />;
}

export default PrimaryButton;
