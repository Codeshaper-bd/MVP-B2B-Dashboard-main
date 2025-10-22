import Link from "next/link";

import { cn } from "@/lib/utils";
import type { TInventoryItemType } from "@/store/api/inventory-item/inventory-item.types";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";

export interface IQuickLinksCardProps {
  id: string | number;
  title: string;
  icon: React.ReactNode;
  link?: string;
  onClick?: (data: Pick<IQuickLinksCardProps, "id" | "title">) => void;
  type?: TInventoryItemType | "TRANSFER_HISTORY";
}
function QuickLinksCard({
  icon,
  id,
  title,
  link,
  onClick,
  type,
}: IQuickLinksCardProps) {
  const content = (
    <div className="group overflow-hidden rounded-xl bg-default-50 p-6 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-default",
          {
            "bg-[#FF2C48]": type === "ALCOHOLIC",
            "bg-[#7F56D9]": type === "NON_ALCOHOLIC",
            "bg-[#FFC833]": type === "TRANSFER_HISTORY",
          },
        )}
      >
        {icon}
      </div>

      <div className="mt-4 flex w-full items-center justify-between text-lg font-semibold leading-7 text-default-700">
        <p className="group-hover:text-primary">{title}</p>

        <ArrowLeftIcon className="size-6 rotate-180 text-default-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </div>
  );

  if (link && link !== "#" && link !== "" && !onClick) {
    return <Link href={link}>{content}</Link>;
  }

  if (onClick && (!link || link === "#" || link === "")) {
    return <div onClick={() => onClick({ id, title })}>{content}</div>;
  }

  return content;
}

export default QuickLinksCard;
