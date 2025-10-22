"use client";

import Link from "next/link";
import { Fragment, memo } from "react";

import useNext14DynamicBreadcrumb from "@/hooks/useNext14DynamicBreadcrumb";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Breadcrumbs() {
  const { breadcrumbs } = useNext14DynamicBreadcrumb();

  return breadcrumbs?.map((item) =>
    item?.name !== "en" ? (
      <Fragment key={item?.name}>
        <BreadcrumbSeparator />

        <BreadcrumbItem key={item?.name}>
          <BreadcrumbLink asChild>
            <Link href={item?.href}>{item?.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Fragment>
    ) : null,
  );
}

export default memo(Breadcrumbs);
