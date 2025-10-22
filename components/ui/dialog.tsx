"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import * as React from "react";

import type { size } from "@/lib/type";
import { cn } from "@/lib/utils";
import XIcon from "@/components/icons/X";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const dialogVariants = cva(
  "fixed z-50 w-full max-w-lg border bg-default p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl",
  {
    variants: {
      size: {
        sm: "md:max-w-[384px] w-[90%]",
        default: "md:max-w-[444px] w-[90%]",
        md: "md:max-w-[996px] w-[90%]",
        lg: "md:max-w-[90%] w-[90%]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
const DialogOverlay = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
  >(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-default-100/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  )),
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: size;
  hideInternalClose?: boolean;
}

const DialogContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    DialogContentProps
  >(({ className, children, hideInternalClose, size, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay>
        <div className="absolute inset-0 flex overflow-y-auto">
          <div className="m-auto flex grow justify-center p-4">
            <DialogPrimitive.Content
              ref={ref}
              className={cn(
                dialogVariants({ size }),
                "relative z-[9999] !bg-default p-0",
                className,
              )}
              {...props}
            >
              <DialogTitle className="sr-only" />
              <DialogDescription className="sr-only" />
              {children}

              {!hideInternalClose && (
                <DialogPrimitive.Close className="absolute right-7 top-7 rounded-sm bg-default opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <XIcon className="h-4 w-4 hover:text-destructive" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </DialogPrimitive.Content>
          </div>
        </div>
      </DialogOverlay>
    </DialogPortal>
  )),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = React.memo(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn("relative flex flex-col space-y-1.5 text-left", className)}
      {...props}
    />
  ),
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.memo(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("relative", className)} {...props} />
  ),
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
  >(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "mb-1 text-lg font-semibold leading-7 tracking-tight text-default-900",
        className,
      )}
      {...props}
    />
  )),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
  >(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(
        "relative text-sm font-normal leading-5 text-default-600",
        className,
      )}
      {...props}
    />
  )),
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
