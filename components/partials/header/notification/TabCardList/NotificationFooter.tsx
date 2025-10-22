import { type ContextProp } from "react-virtuoso";

import LoadingIcon from "@/components/icons/LoadingIcon";

function NotificationFooter({
  context: { hasMore },
}: ContextProp<{ hasMore: boolean }>) {
  if (!hasMore) {
    return (
      <p className="flex w-full justify-center pb-2 text-sm text-default-900">
        No more data to load.
      </p>
    );
  }

  return (
    <div className="flex w-full items-center justify-center gap-2 pb-2">
      <LoadingIcon className="transition-linear h-4 w-4 !animate-spin text-default-900" />

      <p className="text-sm text-default-900">Loading...</p>
    </div>
  );
}

export default NotificationFooter;
