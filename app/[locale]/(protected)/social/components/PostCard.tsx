"use client";
import Image from "next/image";
import { memo } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import ChatLeftIcon from "@/components/icons/ChatLeftIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import ThumbsUpIcon from "@/components/icons/ThumbsUpIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type TDraftPostMode = {
  mode: "draft";
  id?: string | number;
  image?: string;
  title?: string;
  onEdit?: (data: Pick<TDraftPostMode, "id" | "image" | "title">) => void;
  onDelete?: (data: Pick<TDraftPostMode, "id" | "image" | "title">) => void;
  isDeleteLoading?: boolean;
  isDeleteModalOpen?: boolean;
};

export type TScheduledMode = Omit<TDraftPostMode, "mode"> & {
  mode: "scheduled";
  date?: string | Date;
};

export type TPostedMode = Omit<
  TDraftPostMode,
  "mode" | "onDelete" | "isDeleteLoading" | "isDeleteModalOpen" | "onEdit"
> & {
  mode: "posted";
  date?: string | Date;
  likes?: number;
  comments?: number;
  onView?: (data: Pick<TDraftPostMode, "id" | "image" | "title">) => void;
  onLike?: (data: Pick<TDraftPostMode, "id" | "image" | "title">) => void;
  isOnLikeLoading?: boolean;
  onComment?: (data: Pick<TDraftPostMode, "id" | "image" | "title">) => void;
  isOnCommentLoading?: boolean;
};

export type TPostCardProps = TDraftPostMode | TScheduledMode | TPostedMode;

const handleCallBack =
  ({
    onComment,
    onDelete,
    onEdit,
    onLike,
    onView,
    eventFor,
    ...data
  }: Pick<TDraftPostMode, "id" | "image" | "title"> &
    Pick<TPostedMode, "onLike" | "onComment" | "onView"> &
    Pick<TDraftPostMode, "onDelete" | "onEdit"> & {
      eventFor: "onComment" | "onDelete" | "onEdit" | "onLike" | "onView";
    }) =>
  () => {
    switch (eventFor) {
      case "onComment":
        return onComment?.(data);
      case "onDelete":
        return onDelete?.(data);
      case "onEdit":
        return onEdit?.(data);
      case "onLike":
        return onLike?.(data);
      case "onView":
        return onView?.(data);
    }
  };

function PostCard(props: TPostCardProps) {
  return (
    <Card className="rounded-xl p-4">
      <div className="group relative overflow-hidden rounded-lg">
        <Image
          src={props?.image || "/assets/product-2/event-post/post.svg"}
          alt="instagram post"
          width={275}
          height={240}
          className="h-full w-full object-contain transition-all duration-700 ease-linear group-hover:scale-[1.02]"
        />
      </div>

      <div className="my-5 space-y-1">
        <h3 className="text-wrap break-words text-lg font-medium leading-7 text-default-900">
          {props?.title}
        </h3>

        {(props?.mode === "posted" || props?.mode === "scheduled") && (
          <p className="text-sm font-semibold leading-5 text-default-700">
            <span>
              Posted:{" "}
              {!!props?.date &&
                convertUTCToLocal({
                  utcDateTime: props.date.toString(),
                  format: "DD-MM-YYYY • hh:mm A",
                })}
            </span>
          </p>
        )}

        {props?.mode === "posted" && (
          <div className="flex items-center gap-1">
            <span className="flex w-12 items-center gap-1 text-sm font-normal leading-5 tracking-[-0.084px] text-default-700">
              <ThumbsUpIcon
                className="size-3.5 cursor-pointer text-default-600"
                onClick={handleCallBack({
                  eventFor: "onLike",
                  ...props,
                })}
              />{" "}
              {props.likes}
            </span>

            <span className="flex w-12 items-center gap-1 space-x-1 text-sm font-normal leading-5 tracking-[-0.084px] text-default-700">
              <ChatLeftIcon
                className="size-3.5 cursor-pointer text-default-600"
                onClick={handleCallBack({
                  eventFor: "onComment",
                  ...props,
                })}
              />{" "}
              {props.comments}
            </span>
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        {(props?.mode === "draft" || props?.mode === "scheduled") && (
          <>
            <Button
              type="button"
              color="secondary"
              className="gap-1.5 !rounded-[8px]"
              fullWidth
              onClick={handleCallBack({
                eventFor: "onEdit",
                ...props,
              })}
            >
              <EditPenIcon className="size-5 text-default-700" />
              <span className="text-sm font-semibold leading-5 text-default-700">
                Edit
              </span>
            </Button>

            <Button
              type="button"
              color="secondary"
              className={cn(
                "group gap-1.5 !rounded-[8px] hover:border-[#F97066]",
                {
                  "border-[#F97066]": props?.isDeleteModalOpen,
                },
              )}
              fullWidth
              onClick={handleCallBack({
                eventFor: "onDelete",
                ...props,
              })}
            >
              <EditPenIcon
                className={cn(
                  "size-5 text-default-700 group-hover:text-[#F04438]",
                  {
                    "text-[#F04438]": props?.isDeleteModalOpen,
                  },
                )}
              />
              <span
                className={cn(
                  "text-sm font-semibold leading-5 text-default-700 group-hover:text-[#F04438]",
                  { "text-[#F04438]": props?.isDeleteModalOpen },
                )}
              >
                Delete
              </span>
            </Button>
          </>
        )}

        {props?.mode === "posted" && (
          <Button
            type="button"
            color="secondary"
            className="gap-1.5 !rounded-[8px]"
            fullWidth
            onClick={handleCallBack({
              eventFor: "onView",
              ...props,
            })}
          >
            <EyeIcon className="size-5 text-default-700" />
            <span className="text-sm font-semibold leading-5 text-default-700">
              View
            </span>
          </Button>
        )}
      </div>
    </Card>
  );
}

export default memo(PostCard);
