import Link from "next/link";
import React, { memo } from "react";

import { cn } from "@/lib/utils";

type TActionTriggerCommonProps = {
  className?: string;
  actionTriggerContent?: string;
  hideActionTrigger?: boolean;
};

type TLinkActionTrigger = {
  type?: "link";
  href?: string;
} & TActionTriggerCommonProps;

type TButtonActionTrigger = {
  type?: "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
} & TActionTriggerCommonProps;

type TActionTrigger = TLinkActionTrigger | TButtonActionTrigger;

type TInputHelperProps = {
  classNames?: {
    wrapper?: string;
    textOne?: string;
    textTwo?: string;
    actionTrigger?: string;
  };
  textOne?: string;
  textTwo?: string;
} & TActionTrigger;

function InputHelper(props: TInputHelperProps) {
  return (
    <div className={cn("!mt-1.5 space-y-4", props?.classNames?.wrapper)}>
      <p
        className={cn(
          "block text-sm font-normal not-italic leading-5 text-[#94969C]",
          props?.classNames?.textOne,
        )}
      >
        {props?.textOne}
      </p>

      <div className="space-y-1">
        <p
          className={cn(
            "block text-sm font-normal not-italic leading-5 text-[#94969C]",
            props?.classNames?.textTwo,
          )}
        >
          {props?.textTwo}
        </p>

        {!props?.hideActionTrigger && props?.type === "button" ? (
          <button
            onClick={props?.onClick}
            disabled={props?.disabled}
            className={cn(
              "inline-block text-sm font-semibold not-italic leading-5 text-[#47CD89]",
              props?.className,
            )}
          >
            {props?.actionTriggerContent}
          </button>
        ) : null}

        {!props?.hideActionTrigger && props?.type === "link" ? (
          <Link
            href={props?.href || "#"}
            className={cn(
              "inline-block text-sm font-semibold not-italic leading-5 text-[#47CD89]",
              props?.className,
            )}
          >
            Configure
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default memo(InputHelper);
