import Link from "next/link";

import { cn } from "@/lib/utils";
import HomeIcon from "@/components/icons/HomeIcon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import Breadcrumbs from "./breadcrumbs";

type TDynamicBreadcrumbProps = {
  className?: string;
  starterIcon?: React.ReactNode;
};

function DynamicBreadcrumb({
  className,
  starterIcon = <HomeIcon className="h-5 w-5" />,
}: TDynamicBreadcrumbProps) {
  return (
    <div className={cn("rounded-10 mb-6 flex flex-1 lg:mb-9", className)}>
      <Breadcrumb className="relative overflow-y-hidden overflow-x-visible px-3 py-2.5 lg:p-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/en/dashboard" className="text-default-600">
                {!!starterIcon && starterIcon}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <Breadcrumbs />
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
export default DynamicBreadcrumb;
