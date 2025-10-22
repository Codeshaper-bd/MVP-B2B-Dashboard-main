"use client";

import { CircleAlert, Loader } from "lucide-react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import CheckCircleIcon from "../icons/CheckCircleIcon";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, image, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex gap-x-[7px]">
            <div className="flex-none">
              {props?.variant === "loading" && (
                <div className="rounded-full border-2 border-solid border-white/10 p-[5px]">
                  <div className="rounded-full border-2 border-solid border-white/30 p-1">
                    {/* <CheckCircleIcon className="size-[16.67px] text-[#17B26A]" /> */}
                    <Loader className="size-[16.67px] animate-spin" />
                  </div>
                </div>
              )}

              {props?.variant === "success" && (
                <div className="rounded-full border-2 border-solid border-[#17B26A]/10 p-[5px]">
                  <div className="rounded-full border-2 border-solid border-[#17B26A]/30 p-1">
                    <CheckCircleIcon className="size-[16.67px] text-[#17B26A]" />
                  </div>
                </div>
              )}

              {props?.variant === "error" && (
                <div className="rounded-full border-2 border-solid border-destructive/10 p-[5px]">
                  <div className="rounded-full border-2 border-solid border-destructive/30 p-1">
                    <CircleAlert className="size-[16.67px] text-destructive" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1">
              {title && <ToastTitle className="mt-[9px]">{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
          </div>

          {action}

          <ToastClose className="mt-[5px]" />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
