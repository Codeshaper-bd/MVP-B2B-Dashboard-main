import React, { forwardRef } from "react";
import type {
  GridComponents,
  GridListProps,
  ContextProp,
} from "react-virtuoso";

import { cn } from "@/lib/utils";
import LoadingIcon from "@/components/icons/LoadingIcon";

export function GridFooter({
  context: { hasMore, isFetching },
}: ContextProp<{ hasMore: boolean; isFetching: boolean }>) {
  return (
    <div className="col-span-full flex w-full items-center justify-center py-4">
      {isFetching ? (
        <div className="flex items-center gap-2">
          <LoadingIcon className="transition-linear h-4 w-4 !animate-spin text-default-900" />
          <p className="text-sm text-default-900">Loading...</p>
        </div>
      ) : !hasMore ? (
        <p className="text-sm text-default-900">No more data to load.</p>
      ) : null}
    </div>
  );
}

// Grid List wrapper (for VirtuosoGrid)
export const GridList = forwardRef<HTMLDivElement, GridListProps>(
  ({ style, children, className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  ),
);
GridList.displayName = "VirtuosoGridList";

// Grid Item wrapper (each card)
export function GridItem({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className="w-full">
      {children}
    </div>
  );
}
GridItem.displayName = "VirtuosoGridItem";

export const getGridComponents = ({
  gridClassName,
}: {
  gridClassName?: string;
}): GridComponents => ({
  // eslint-disable-next-line react/display-name
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
        gridClassName,
      )}
    >
      {children}
    </div>
  )),
  Item: GridItem,
  Footer: GridFooter,
});
