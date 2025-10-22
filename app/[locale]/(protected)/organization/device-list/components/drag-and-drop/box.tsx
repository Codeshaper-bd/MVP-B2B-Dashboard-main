"use client";
import {
  closestCorners,
  getFirstCollision,
  KeyboardCode,
  type DroppableContainer,
  type KeyboardCoordinateGetter,
} from "@dnd-kit/core";
import React, { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";

import CreateDevice from "../../../devices/components/create-device";

const directions: string[] = [
  KeyboardCode.Down,
  KeyboardCode.Right,
  KeyboardCode.Up,
  KeyboardCode.Left,
];

export const coordinateGetter: KeyboardCoordinateGetter = (
  event,
  { context: { active, droppableRects, droppableContainers, collisionRect } },
) => {
  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) {
      return;
    }

    const filteredContainers: DroppableContainer[] = [];

    droppableContainers.getEnabled().forEach((entry) => {
      if (!entry || entry?.disabled) {
        return;
      }

      const rect = droppableRects.get(entry.id);

      if (!rect) {
        return;
      }

      const data = entry.data.current;

      if (data) {
        const { type, children } = data;

        if (type === "container" && children?.length > 0) {
          if (active.data.current?.type !== "container") {
            return;
          }
        }
      }

      switch (event.code) {
        case KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Left:
          if (collisionRect.left >= rect.left + rect.width) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Right:
          if (collisionRect.left + collisionRect.width <= rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });

    const collisions = closestCorners({
      active,
      collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null,
    });
    const closestId = getFirstCollision(collisions, "id");

    if (closestId !== null) {
      const newDroppable = droppableContainers.get(closestId);
      const newNode = newDroppable?.node.current;
      const newRect = newDroppable?.rect.current;

      if (newNode && newRect) {
        if (newDroppable.id === "placeholder") {
          return {
            x: newRect.left + (newRect.width - collisionRect.width) / 2,
            y: newRect.top + (newRect.height - collisionRect.height) / 2,
          };
        }

        if (newDroppable.data.current?.type === "container") {
          return {
            x: newRect.left + 20,
            y: newRect.top + 74,
          };
        }

        return {
          x: newRect.left,
          y: newRect.top,
        };
      }
    }
  }

  return undefined;
};

export interface ContainerProps {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}

export const Container = forwardRef<HTMLButtonElement | null, ContainerProps>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: ContainerProps,
    ref,
  ) => {
    const [createDevice, setCreateDevice] = useState<
      boolean | void | null | undefined
    >(false);
    const Component = onClick ? "button" : "div";

    return (
      <>
        <CreateDevice open={!!createDevice} setOpen={setCreateDevice} />
        <Component
          {...props}
          ref={ref as any}
          className={cn(
            "rounded-2xl border-2 border-dashed border-default-100 bg-default-100 p-6",
            hover && "border-default-400",
          )}
          style={
            {
              ...style,
              "--columns": columns,
            } as React.CSSProperties
          }
          // className={cn(
          //   styles.Container,
          //   unstyled && styles.unstyled,
          //   horizontal && styles.horizontal,
          //   hover && styles.hover,
          //   placeholder && styles.placeholder,
          //   scrollable && styles.scrollable,
          //   shadow && styles.shadow,
          // )}
          onClick={onClick}
          tabIndex={onClick ? 0 : undefined}
        >
          {label ? (
            // <div className={styles.Header}>
            <div className="mb-3.5 flex items-center justify-between gap-3">
              <h4 className="text-lg font-medium text-default-900">{label}</h4>
              <Button
                onClick={() => setCreateDevice(true)}
                size="xl"
                rounded="lg"
                className="flex gap-2.5 bg-default-50 hover:bg-default md:px-5"
              >
                <PlusIcon className="h-3.5 w-3.5" /> Add Device
              </Button>
            </div>
          ) : null}
          {placeholder ? (
            children
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2.5">
              {children}
            </div>
          )}
        </Component>
      </>
    );
  },
);
Container.displayName = "Container";
