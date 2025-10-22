"use client";

import { memo } from "react";

import PageError, {
  type TPageErrorProps,
} from "@/components/page-states/page-error";

function Error(props: TPageErrorProps) {
  return <PageError {...props} />;
}

export default memo(Error);
