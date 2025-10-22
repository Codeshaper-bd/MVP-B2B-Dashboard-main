import Link from "next/link";

import { cn } from "@/lib/utils";
import IconBorder from "@/components/ui/icon-border";

import TopRightAngleArrowIcon from "./icons/TopRightAngleArrowIcon";

interface ICategoryCardProps {
  title: string;
  desc?: string;
  children: React.ReactNode;
  className?: string;
}
interface ICategoryItemProps {
  title: string;
  className?: string;
  icon?: React.ReactNode;
  href?: string;
}
function CategoryCard({
  title,
  desc,
  children,
  className,
}: ICategoryCardProps) {
  return (
    <div
      className={cn("flex flex-col gap-6 py-5 lg:flex-row lg:gap-8", className)}
    >
      <div className="w-full flex-none lg:w-[280px]">
        <h2 className="text-sm font-semibold text-default-700">{title}</h2>
        {desc && <p className="text-sm font-normal text-default-600">{desc}</p>}
      </div>
      <div className="w-full flex-1 lg:w-[calc(100%-280px)]">{children}</div>
    </div>
  );
}
function CategoryItem({
  title,
  href = "#",
  icon: Icon,
  className,
}: ICategoryItemProps) {
  return (
    <div
      className={cn(
        "mb-4 flex items-center gap-2 rounded-lg border border-border p-4 transition-colors last:mb-0 hover:bg-default-50/50",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-2">
        {Icon && <IconBorder>{Icon}</IconBorder>}
        <div className="text-sm font-medium text-default-700">{title}</div>
      </div>
      <div className="flex-none border-s ps-2">
        <Link href={href}>
          <TopRightAngleArrowIcon className="h-6 w-6 text-default-600 transition-all duration-200 hover:translate-x-0.5 hover:text-primary" />
        </Link>
      </div>
    </div>
  );
}

export { CategoryCard, CategoryItem };
