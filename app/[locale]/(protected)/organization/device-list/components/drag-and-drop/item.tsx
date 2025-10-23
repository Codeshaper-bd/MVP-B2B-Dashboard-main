"use client";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import DeviceIcon from "@/components/icons/DeviceIcon";
import PingIcon from "@/components/icons/ping-icon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type TRenderItem = (args: {
  dragOverlay: boolean;
  dragging: boolean;
  sorting: boolean;
  index: number | undefined;
  fadeIn: boolean;
  listeners: DraggableSyntheticListeners;
  ref: React.Ref<HTMLElement>;
  style: React.CSSProperties | undefined;
  transform: Props["transform"];
  transition: Props["transition"];
  value: Props["value"];
}) => React.ReactElement;

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  onRemove?(): void;
  renderItem?: TRenderItem;
}

export const Item = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref,
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);
      const [isModalOpen, setIsModalOpen] = useState(false);

      return renderItem ? (
        // eslint-disable-next-line react-compiler/react-compiler
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <div
          className={cn(
            "box-border flex origin-center cursor-grab touch-manipulation",
            dragOverlay &&
              "z-50 -rotate-6 shadow-[0_11px_15px_rgba(251,208,208,0.1)]",
          )}
          // className={cn(
          //   styles.Wrapper,
          //   fadeIn && styles.fadeIn,
          //   sorting && styles.sorting,
          //   dragOverlay && styles.dragOverlay,
          // )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
              "--color": color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={cn(
              "w-full rounded-xl bg-default p-6",
              dragging && "z-0 opacity-30",
              dragOverlay && "cursor-grabbing opacity-100",
              // handle && styles.withHandle,
              // dragOverlay && styles.dragOverlay,
              // disabled && styles.disabled,
              // color && styles.color,
            )}
            // style={style}
            // style={}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {/* {value} */}
            <div className="mb-6 flex gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F04438] p-1 text-white shadow-inner">
                <DeviceIcon className="h-6 w-6" />
              </div>
              <div className="grow space-y-1.5">
                <h5 className="-mt-1 text-base text-default-900">
                  Device {value}
                </h5>
                <Badge color="success" className="py-0.5 text-xs" dot={true}>
                  Active
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="lg"
                rounded="lg"
                className="border-default-200 text-xs md:px-3.5"
              >
                00-1s-99-f1-d2-4f
              </Button>
              <Button
                size="icon"
                rounded="lg"
                className="h-11 w-11 border-default-200"
              >
                <PingIcon className="h-5 w-5 text-default-600" />
              </Button>
              <AlertDialog open={isModalOpen}>
                <StatusAlert
                  status="destructive"
                  withCloseButton
                  icon={<DeleteIcon className="size-6" />}
                  title="Are you sure you want to remove this device?"
                  description="This device will be permanently removed from your list. Are you sure you want to continue?"
                >
                  <div className="grid w-full grid-cols-2 gap-3">
                    <Button
                      fullWidth
                      color="secondary"
                      className="bg-default-50"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>

                    <Button
                      fullWidth
                      color="primary"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Remove
                    </Button>
                  </div>
                </StatusAlert>
              </AlertDialog>
              <Button
                size="icon"
                rounded="lg"
                className="h-11 w-11 border-default-200"
              >
                <DeleteIcon className="h-5 w-5 text-default-600" />
              </Button>
            </div>
          </div>
        </div>
      );
    },
  ),
);
