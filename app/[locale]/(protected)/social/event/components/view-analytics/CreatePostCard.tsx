import Link from "next/link";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export type TCreatePostCardProps = {
  id?: string | number;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
} & (
  | { link: string }
  | {
      onClick?: (
        data: Pick<TCreatePostCardProps, "id" | "title" | "description">,
      ) => void;
    }
);

function CreatePostCard({
  id,
  title,
  icon,
  description,
  ...restProps
}: TCreatePostCardProps) {
  const isButtonMode =
    "onClick" in restProps && restProps?.onClick !== undefined;
  const isLinkMode =
    "link" in restProps &&
    !isButtonMode &&
    restProps?.link !== undefined &&
    restProps?.link !== "" &&
    restProps?.link !== "#" &&
    restProps?.link !== null;

  const content = (
    <Card
      className={cn(
        "flex items-center gap-3 overflow-hidden rounded-xl p-4",
        isLinkMode || isButtonMode ? "cursor-pointer" : "",
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-xl bg-[#7F56D9] text-[#E9D7FE]">
        {icon}
      </div>

      <div className="space-y-0.5">
        <h4 className="text-wrap break-words text-lg font-semibold leading-7 text-default-700">
          {title}
        </h4>

        <p className="overflow-hidden text-ellipsis text-wrap break-words text-base font-normal leading-6 text-[#94969C]">
          {description}
        </p>
      </div>
    </Card>
  );

  if (isLinkMode) {
    return <Link href={restProps.link}>{content}</Link>;
  }

  return content;
}

export default CreatePostCard;
