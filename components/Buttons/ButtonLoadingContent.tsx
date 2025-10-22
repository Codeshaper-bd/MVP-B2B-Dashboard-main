import { memo } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import LoadingIcon from "@/components/icons/LoadingIcon";

type TButtonLoadingContentProps = {
  isLoading: boolean | TNullish;
  loadingContent?: React.ReactNode;
  actionContent: React.ReactNode;
};

function ButtonLoadingContent({
  isLoading,
  loadingContent = "Loading...",
  actionContent,
}: TButtonLoadingContentProps) {
  return (
    <>
      {!!isLoading && <LoadingIcon className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? loadingContent : actionContent}
    </>
  );
}

export default memo(ButtonLoadingContent);
